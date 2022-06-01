import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import Validator from 'services/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap';
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div
        style={{
          ...this.props.style
        }}
        className={this.props.className ? this.props.className : null}
      >
        <div style={{
          borderBottom: '2px solid ' + Colors.primary
        }}>
          <select
            style={{
              ...BasicStyles.formControl,
              backgroundColor: 'transparent',
              ...this.props.selectStyle
            }}
            value={this.props.value}
            onChange={(e) => {
              this.props.onChange(e.target.value)
            }}
            
            >
          {
              this.props.items.map(item => (
                <option disabled={this.props.defaultDisabled ? true : null} value={item}>{item}</option>
              ))
            }
          </select>
        </div>
        {
          this.props.checkBoxLabel !== undefined && this.props.checkBoxLabel.map(el => (
            <div className="mb-3">
              <Form.Check type='checkbox' label={el}/>
            </div>
          ))
        }
      </div>
    )
  }
}