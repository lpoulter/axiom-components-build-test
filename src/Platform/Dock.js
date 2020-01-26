import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Dock.css';

export default class Dock extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div { ...rest } className="ax-platform__dock">
        { children }
      </div>
    );
  }
}
