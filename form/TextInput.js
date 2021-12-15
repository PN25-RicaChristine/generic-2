import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: 'This is a test'
    };
  }

  validation = () => {
    const { validation, value } = this.props;
    if(validation && value){
      if(validation.type == 'text'){
        if(validation.size && value.length < validation.size){
          this.setState({
            error: 'Minimum required is ' + validation.size
          })
        }
      }
    }
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

          <input
            type={this.props.type}
            placeholder={this.props.placeholder}
            style={{...BasicStyles.formControl, ...this.props.style}}
            value={this.props.value}
            onChange={(e) => {
              this.props.onChange(e.value)
              this.validation()
            }}
            ></input>
          {
            this.state.error && (
              <label style={{
                color: Colors.danger
              }}><b>Oops!</b> {this.state.error}</label>
            )
          }
        </div>
    )
  }
}
