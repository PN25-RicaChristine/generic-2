import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import Validator from './Validator.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

          <div
            style={{
              ...BasicStyles.formControlContainer,
              ...this.props.style
            }}
          >
           {
              this.props.iconLeft && (
                <span style={{
                  width: '10%',
                  float: 'left',
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  height: 50
                }}
                className="href-link"
                onClick={() => {
                  this.props.onClickRightIcon()
                }}
                >
                  <FontAwesomeIcon icon={this.props.iconLeft} color={this.props.iconStyle != null ? this.props.iconStyle : 'black'} size="lg"/>
                </span>
              )
            }

            <input
              type={this.props.type}
              placeholder={this.props.placeholder}
              value={this.props.value}
              disabled={this.props.disable ? this.props.disable : false}
              style={{
                ...BasicStyles.formControl,
                width: this.props.iconRight || this.props.rightLabel || this.props.iconLeft ? '90%' : BasicStyles.formControl.width,
                float: 'left'
              }}
              onChange={(e) => {
                this.validation(e)
              }}
              onKeyPress={event => (event.key === 'Enter' && this.props.enterEnable) && this.props.onEnter()}
              ></input>
            {
              this.props.iconRight && (
                <span style={{
                  width: '10%',
                  float: 'left',
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  height: 50
                }}
                className="href-link"
                onClick={() => {
                  this.props.onClickRightIcon()
                }}
                >
                  <FontAwesomeIcon icon={this.props.iconRight} color={this.props.iconStyle != null ? this.props.iconStyle : 'black'} size="lg"/>
                </span>
              )
            }
            {
              this.props.rightLabel && (
                <span style={{
                  width: '10%',
                  float: 'left',
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  height: 50
                }}
                >
                  {this.props.rightLabel}
                </span>
              )
            }
          </div>
          {
            this.props.validation && this.props.validation.error && (
              <label style={{
                color: Colors.danger
              }}><b>Oops!</b> {this.props.validation.error}</label>
            )
          }
        </div>
    )
  }
}
