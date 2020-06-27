import React from 'react';
import PropTypes from 'prop-types';

import style from '../ContactForm/ContactForm.module.css';
const Filter = ({ value, onChangeFilter, bule }) => (
  <div className={style.form}>
    <p className={style.p}>Find contacts by name</p>
    <input
      type="text"
      className={style.input}
      value={value}
      onChange={onChangeFilter}
    ></input>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
