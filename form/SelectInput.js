import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import Validator from 'services/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render(){
    return (
      <select style={{...BasicStyles.formControl, backgroundColor: 'transparent', borderBottomColor: 'red'}}>
      {
          this.props.items.map(item => (
            <option value={item}>{item}</option>
          ))
        }
      </select>
    )
  }
}