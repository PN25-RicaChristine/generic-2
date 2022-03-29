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
    this.state = {
        input: null,
        selected: null
    }
  }

  componentDidMount(){
      const { selected } = this.props;
      this.setState({
          selected: selected
      })
  }
  
  render(){
    const { data, btn } = this.props;
    const { selected } = this.state;
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
                width: '70%'
            }}
            value={selected ? selected.name : 'Select'}
            onChange={(e) => {
                this.setState({
                    input: parseInt(e.target.value)
                })
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    if(element.name == e.target.value){
                        this.setState({
                            selected: element
                        })
                        break
                    }
                }
            }}
        >
        {
            data.map((item, index) => (
                <option value={item.name}>{item.name}</option>
            ))
        }
        </select>

        <Button
            title={btn.label}
            onClick={() => {
                this.props.onChange(selected)
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