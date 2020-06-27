import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <p className={styles.p}>Name</p>
          <input
          className={styles.input}
            type="text"
            required
            name="name"
            value={name}
            onChange={this.handleChange}
          ></input>
          <p className={styles.p}>Number</p>
          <input
          className={styles.input}
            required
            placeholder="Enter the number"
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
          ></input>
          <button className={styles.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}
