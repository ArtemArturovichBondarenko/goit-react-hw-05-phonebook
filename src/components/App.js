import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';
import { CSSTransition } from 'react-transition-group';
import Filter from './Filter/Filter';
import { v4 as uuidv4 } from 'uuid';
import slideTransition from '../transitions/slide_500ms.module.css';
import popTransition from '../transitions/pop.module.css';
import slideRightTransition from '../transitions/slide_right_250ms.module.css';

import style from './App.module.css';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isLoading: false,
    notification: false,
  };
  componentDidMount() {
    const persistContacts = localStorage.getItem('contacts');
    this.togleLoading();

    if (persistContacts) {
      try {
        const contacts = JSON.parse(persistContacts);
        this.setState({ contacts });
      } catch (error) {
        console.log(error);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  togleLoading = () => {
    this.setState(state => ({ isLoading: !state.isLoading }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  changenotification = () => {
    if (this.state.notification) {
      setTimeout(() => {
        this.setState(state => ({ notification: !state.notification }));
      }, 1000);
    }
  };

  addContact = item => {
    const { contacts } = this.state;

    const searchExistingContact = contacts.some(
      contact => contact.name === item.name,
    );

    if (searchExistingContact === true) {
      this.setState(state => ({ notification: !state.notification }));
      return;
    } else {
      const contactToAdd = {
        ...item,
        id: uuidv4(),
      };
      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    }
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, isLoading, notification } = this.state;

    // console.log(contacts.length >= 2);
    console.log(notification);

    const filteredContacts = filterContacts(contacts, filter);
    return (
      <div className={style.container}>
        <CSSTransition
          in={notification}
          timeout={250}
          unmountOnExit
          classNames={slideRightTransition}
        >
          <Notification onClick={this.changenotification} />
        </CSSTransition>

        <CSSTransition
          in={isLoading}
          timeout={500}
          unmountOnExit
          classNames={slideTransition}
        >
          <h1 className={style.h1}>Phonebook</h1>
        </CSSTransition>
{/* //==================================== */}
        {/* <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={style.h1_slideIn}
          unmountOnExit
        >
          <h1 className={style.h1}>Phonebook</h1>;
        </CSSTransition> */}
{/* //======================================= */}
        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={contacts.length >= 2}
          timeout={250}
          unmountOnExit
          classNames={popTransition}
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        <ContactList
          items={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
