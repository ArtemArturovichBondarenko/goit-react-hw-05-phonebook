import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideTransition from '../../transitions/slide_250ms.module.css';
import style from './ContactList.module.css';

const ContactList = ({ items, onDeleteContact }) => (
  <TransitionGroup component="ul">
    {items.map(item => (
      <CSSTransition key={item.id} timeout={250} unmountOnExit classNames={slideTransition}>
        <li key={item.id} className={style.li}>
          <Contact {...item} onDeleteContact={() => onDeleteContact(item.id)} />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
