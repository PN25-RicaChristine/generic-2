import React from 'react';
import {BasicStyles} from 'common'
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            style={{...BasicStyles.formControl, ...this.props.style}}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.value)}
            ></input>
    )
  }
}
