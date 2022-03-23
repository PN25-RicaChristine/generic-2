import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import { Form } from 'react-bootstrap'
export default class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null
    }
  }

  renderDropdown(){
    const { options } = this.props;
    return(
      <Form.Group className="mb-3">
        <Form.Select style={{
          height: '50px',
          width: '100%',
          border: 'none',
          borderRight: 'solid 1px ' + Colors.gray
        }}
        onChange={(e) => {
          this.props.onMenuChange(options[parseInt(e.target.value)])
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
          height: '52px',
          borderRadius: '25px',
          borderWidth: 0.25,
          borderColor: Colors.gray,
          borderStyle: 'solid',
        }}>
          <span style={{
            height: '50px',
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
            lineHeight: '50px',
            textAlign: 'center'
          }}>
            {this.props.label}
          </span>
          <span style={{
            height: '50px',
            width: '20%',
            float: 'left',
            margin: '0px',
            padding: '0px',
            backgroundColor: Colors.white,
            color: Colors.black,
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '50px',
            textAlign: 'center'
          }}>
            {
              (options) && this.renderDropdown()
            }
          </span>
          <input
            style={{
              ...BasicStyles.formControl,
              width: '60%',
              borderWidth: '0px',
              borderStyle: 'none',
              borderRadius: 'unset',
              borderTopRightRadius: '25px',
              borderBottomRightRadius: '25px',
            }}
            value={this.state.search}
            onChange={(e) => {
              this.validation(e)
            }}
            onKeyPress={event => (event.key === 'Enter') && this.props.onEnter(this.state.search)}
            />
        </div>
    )
  }
}
