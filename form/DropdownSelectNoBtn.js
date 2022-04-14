import React from 'react';
import {BasicStyles} from 'common'
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
                borderRadius: 5,
                paddingRight: 20,
                paddingLeft: 20,
                borderRight: 'none'
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
                        this.props.onChange(element)
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
    </div>
    )
  }
}