import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Base from '../Base/Base';

export default class DialogFooterImage extends Component {
  static propTypes = {
    /** Footer content inside the Dialog, a good place for an image */
    children: PropTypes.node,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <Base { ...rest } className="ax-dialog__footer-image">
        { children }
      </Base>
    );
  }
}
