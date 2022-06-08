import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import { Form } from 'react-bootstrap'
export default class SortEnhance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      inputType: null
    }
  }

  componentDidMount(){
    const { options } = this.props;
    this.setState({inputType: options[0].type})
  }

  handleDropDownChange(e){
    const { options } = this.props;
    let obj={}
    let selected = options[parseInt(e.target.value)]
    obj[selected.value] = selected.order
    this.setState({inputType: selected.type})
    this.props.onMenuChange(obj)
  }

  renderDropdown(){
    const { options } = this.props;
    return(
      <Form.Group className="mb-3" style={{width: '30%'}}>
        <Form.Select style={{
          height: '40px',
          width: '100%',
        }}
        onChange={(e) => {
          this.handleDropDownChange(e)
        }}
        >
          {
            (options.length > 0) && options.map((item, index) => (
              <option value={index}>{item.title}</option>
            ))
          }
        </Form.Select>
      </Form.Group>
    )
  }

  renderInput(){
    return (
      <Form.Control
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
        value={this.state.search}
        type={this.state.inputType}
        onChange={(e) => {
          this.validation(e)
        }}
        onKeyPress={event => (event.key === 'Enter') && this.props.onEnter(this.state.search !== null ? `%${this.state.search}%` : '%%')}
      />
    )
  }

  validation = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const { options } = this.props;
    return (

        <div style={{
          width: '100%',
          float: 'left',
          height: '40px',
          display: 'flex'
        }}>
          <span style={{
            height: '40px',
            width: '20%',
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
            float: 'left',
            margin: '0px',
            padding: '0px',
            backgroundColor:  this.props.color ?  this.props.color : Colors.black,
            color: Colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '40px',
            textAlign: 'center'
          }}>
            {this.props.label}
          </span>
            {
              (options) && this.renderDropdown()
            }
            {this.renderInput()}
        </div>
    )
  }
}
