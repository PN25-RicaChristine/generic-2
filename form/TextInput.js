import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div style={{
          width: '100%',
          float: 'left'
        }}>
          {
            this.props.label && (
              <label style={{
                paddingTop: 10,
                paddingBottom: 10,
                fontWeight: 'bold'
              }}>{this.props.label}</label>
            )
          }

          {
            this.props.error && (
              <label style={{
                fontWeight: 'bold',
                color: Colors.danger
              }}>{this.props.error}</label>
            )
          }

          <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            style={{...BasicStyles.formControl, ...this.props.style}}
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.value)}
            ></input>
        </div>
    )
  }
}
