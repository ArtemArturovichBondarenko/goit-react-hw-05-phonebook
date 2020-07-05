import React, { Component, createContext } from 'react';
import method from '../components/methods/LocalStorage';

const { Provider, Consumer } = createContext();

export default class ThemeContext extends Component {
  static Consumer = Consumer;

  togleTheme = () => {
    this.setState(state => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
  };

  state = {
    theme: 'light',
    togleTheme: this.togleTheme,
  };

  componentDidMount() {
    const key = 'theme';
    this.setState({ theme: method.get(key) });
  }

  componentDidUpdate(prevProps, prevState) {
    const key = 'theme';
    const value = this.state.theme;

    if (prevState.theme !== value) {
      method.save(key, value);
    }
  }

  render() {
    console.log(this.state.theme);
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
