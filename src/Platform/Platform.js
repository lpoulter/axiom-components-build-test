import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import omit from 'lodash.omit';
import Base from '../Base/Base';
import './Platform.css';

export default class Platform extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onConsoleClose: PropTypes.func,
    openConsolePosition: PropTypes.oneOf(['left', 'right']),
    openConsoleWidth: PropTypes.string,
    responsive: PropTypes.bool,
    shade: PropTypes.oneOf(['shade-1', 'shade-2']),
  };

  static defaultProps = {
    shade: 'shade-1',
  };

  static childContextTypes = {
    onConsoleClose: PropTypes.func,
    openConsoleWidth: PropTypes.string,
    openConsolePosition: PropTypes.string,
  };

  getChildContext() {
    return {
      onConsoleClose: this.props.onConsoleClose,
      openConsolePosition: this.props.openConsolePosition,
      openConsoleWidth: this.props.openConsoleWidth,
    };
  }

  render() {
    const {
      children,
      onConsoleClose,
      openConsolePosition,
      responsive,
      shade,
      ...rest
    } = this.props;

    const props = omit(rest, [
      'openConsoleWidth',
    ]);

    const classes = classnames('ax-platform', `ax-platform--${shade}`, {
      'ax-platform--responsive': responsive,
      'ax-platform--console-open': openConsolePosition,
    });

    return (
      <Base { ...props } className={ classes }>
        { children }
        <div
            className="ax-platform__mask"
            onClick={ () => onConsoleClose && onConsoleClose() } />
      </Base>
    );
  }
}
