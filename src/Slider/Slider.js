import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash.omit';
import Base from '../Base/Base';
import Handle from './Handle';
import sliderDefaultProps from './DefaultProps';
import './Slider.css';

export default class Slider extends Component {
  static propTypes = {
    /** Disabled control of the slider */
    disabled: PropTypes.bool,
    /** Maximum number that can be selected */
    max: PropTypes.number.isRequired,
    /** Minimum number that can be selected */
    min: PropTypes.number.isRequired,
    /** Called when the sliders value changes */
    onChange: PropTypes.func.isRequired,
    /** Called when the slider is let go */
    onSlideEnd: PropTypes.func,
    /** Size of the slider */
    size: PropTypes.oneOf(['small', 'medium']),
    /** Configures the increments of the slide */
    step: PropTypes.number,
    /** Value */
    value: PropTypes.number.isRequired,
    /** Value formatter for the tooltip */
    valueFormatter: PropTypes.func,
    /** Enables a value indicating tooltip */
    withTooltip: PropTypes.bool,
  };


  static defaultProps = sliderDefaultProps;

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      isMouseOver: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  getValue(clientX) {
    const { max, min, step } = this.props;

    const value = (clientX - this.posMin) * (max - min) / (this.posMax - this.posMin) + min;
    const roundedValue = step * Math.round(value / step);

    return Math.max(min, Math.min(roundedValue, max));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(event) {
    const { left, width } = this.container.getBoundingClientRect();

    event.preventDefault();
    this.posMin = left;
    this.posMax = left + width;
    this.handleMouseMove(event);
    this.setState({ isDragging: true });
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp(event) {

    const { onSlideEnd } = this.props;
    const { clientX } = event;

    this.setState({ isDragging: false });
    onSlideEnd && onSlideEnd(this.getValue(clientX));

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleBlur() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleFocus() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleMouseMove(event) {
    const { onChange } = this.props;
    const { clientX } = event;

    event.preventDefault();
    onChange(this.getValue(clientX));
  }

  handleKeyDown(event) {
    const { max, min, onChange, step, value } = this.props;

    switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      onChange(Math.max(min, Math.min(value - step, max)));
      break;
    case 'ArrowRight':
    case 'ArrowUp':
      onChange(Math.max(min, Math.min(value + step, max)));
      break;
    }
  }

  render() {
    const { disabled, max, min, size, value, valueFormatter, withTooltip, ...rest } = this.props;
    const { isDragging, isMouseOver } = this.state;
    const valueInRange = Math.max(min, Math.min(value, max));
    const valueAsPercentage = ((valueInRange - min) / (max - min)) * 100;
    const classes = classnames('ax-slider', `ax-slider--${size}`, {
      'ax-slider--disabled': disabled,
    });

    return (
      <Base { ...omit(rest, ['onSlideEnd', 'min', 'max', 'step']) }
          className={ classes }
          onBlur={ this.handleBlur }
          onFocus={ disabled ? null : this.handleFocus }
          onMouseLeave={ () => this.setState({ isMouseOver: false }) }
          onMouseOver={ () => this.setState({ isMouseOver: true }) }
          tabIndex="0">
        <div
            className="ax-slider__track"
            onMouseDown={ disabled ? null : this.handleMouseDown }
            ref={ (el) => this.container = el }>
          <div
              className="ax-slider__fill"
              style={ { width: `${valueAsPercentage}%` } } />
        </div>
        <Handle disabled={ disabled } isVisible={ isDragging || isMouseOver }
            onMouseDown={ this.handleMouseDown }
            value={ value } valueAsPercentage={ valueAsPercentage }
            valueFormatter={ valueFormatter }
            withTooltip={ withTooltip }/>
      </Base>
    );
  }
}
