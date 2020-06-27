import React from 'react';
import PropTypes from 'prop-types';
import style from './Contact.module.css'

const Contact = ({ name, number, onDeleteContact }) => (
  <>
    <span className={style.span_name}>{name}</span>
    <span className={style.span_number}>{number}</span>
    <button type="button" className={style.button} onClick={onDeleteContact} >
    &#9587;
    </button>
  </>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contact;
