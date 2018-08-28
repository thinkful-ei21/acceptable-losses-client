import React from 'react';

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div>{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = <div>{this.props.meta.warning}</div>;
    }

    return (
      <div>
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
        </label>
        <input
          className={this.props.styleClass}
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          element={this.props.element}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}
