import React from 'react';
import {BasicStyles} from 'common'
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <button
            style={{...BasicStyles.btn, ...this.props.style}}
            onClick={() => this.props.onClick()}
            >
            {this.props.title}
        </button>
    )
  }
}
