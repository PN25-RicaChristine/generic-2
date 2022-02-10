import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import Validator from 'services/validator'
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  validation = (e) => {
    const { validation } = this.props;
    let response = Validator.validate(e.target.value, validation, validation.column);
    if(response == true){
      this.props.onChange(e.target.value, null)
    }else{
      this.props.onChange(e.target.value, response)
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
              this.validation(e)
            }}
            onKeyPress={event => (event.key === 'Enter' && this.props.enterEnable) && this.props.onEnter()}
            ></input>
            {
              (this.props.checkBoxQty !== undefined || this.props.checkBoxQty > 0) && [...Array(this.props.checkBoxQty)].map((el, index) => (
                <div>
                    <input
                        type='checkbox'
                        placeholder='Mobile'
                        style={{backgroundColor: 'transparent', marginTop: '10px', float: 'left'}}
                        value={this.props.checkBoxValue !== undefined ? this.props.checkBoxValue[index] : null}
                        onChange={(e) => {
                          this.validation(e)
                        }}
                        onKeyPress={event => (event.key === 'Enter' && this.props.enterEnable) && this.props.onEnter()}
                      ></input>
                      <label style={{marginLeft: '8px', marginTop: '5px'}}>{this.props.checkBoxLabel[index]}</label>
                </div>
              ))
            }
          {
            this.props.validation.error && (
              <label style={{
                color: Colors.danger
              }}><b>Oops!</b> {this.props.validation.error}</label>
            )
          }
        </div>
    )
  }
}
