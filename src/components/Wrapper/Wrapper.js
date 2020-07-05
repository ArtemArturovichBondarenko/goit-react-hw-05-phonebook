import React from 'react';
import withTheme from '../hoc/withTheme';
import style from './Wrapper.module.css';

const Wrapper = ({ theme, children }) => {
  const divClass = theme.theme === 'dark' ? style.dark : style.light;
  return <div className={`${style.container} ${divClass}`}>{children}</div>;
};

export default withTheme(Wrapper);
