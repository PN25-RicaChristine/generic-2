import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
export default class Sort extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            backgroundColor: Colors.black,
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
            {this.props.label}
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
            />
        </div>
    )
  }
}
