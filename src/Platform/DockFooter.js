import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class DockFooter extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <ul { ...rest } className="ax-dock__list-footer">
        { children }
      </ul>
    );
  }
}
