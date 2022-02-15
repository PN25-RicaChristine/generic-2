import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import Validator from 'services/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap';
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <div>
        <div style={{
          borderBottom: '2px solid rgb(86, 102, 121)'
        }}>
          <select style={{...BasicStyles.formControl, backgroundColor: 'transparent'}}>
          {
              this.props.items.map(item => (
                <option value={item}>{item}</option>
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