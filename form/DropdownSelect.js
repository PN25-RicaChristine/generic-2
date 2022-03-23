import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import Validator from 'services/validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Form } from 'react-bootstrap';
import Button from 'components/increment/generic/form/Button'
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { data, btn, selected } = this.props; 
    console.log({
        data
    })
    return (
    <div style={{
        ...this.props.style,
        float: 'left'
    }}>
        <select
            style={{
                ...BasicStyles.formControl,
                backgroundColor: 'transparent',
                ...this.props.selectStyle,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 0,
                paddingRight: 20,
                paddingLeft: 20,
                borderRight: 'none',
                float: 'left',
                width: '80%'
            }}
            value={selected ? selected.name : 'Select'}
            onChange={(e) => {
                this.props.onChange(e.target.value)
            }}
        >
        {
            data.map((item, index) => (
                <option value={index}>{item.name}</option>
            ))
        }
        </select>

        <Button
            title={btn.label}
            onClick={() => {

            }}
            style={{
                float: 'left',
                width: '10%',
                backgroundColor: Colors.primary,
                color: Colors.white,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 5,
            }}
        />
    </div>
    )
  }
}