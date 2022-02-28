import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { data, selected } = this.props;
    console.log({
      style: this.props.style
    })
    return (
      <div style={{
          borderRadius: '25px',
          backgroundColor: Colors.activeGray,
          padding: '5px',
          ...this.props.style,
          float: 'left',
          width: '100%'
        }}>
        {
          data && data.map((item) => (
            <span
              style={{
                width: '50%',
                paddingTop: '15px',
                paddingBottom: '15px',
                float: 'left',
                borderRadius: '25px',
                backgroundColor: item == selected ? Colors.menuButton.backgroundColor : Colors.menuButton.activeColor,
                color: item == selected ? Colors.white : Colors.darkGray,
                fontWeight: 'bold',
                textAlign: 'center'
              }}
              className="cursor-hover"
              onClick={() => {
                this.props.onChange(item)
              }}
              >{item}</span>
          ))
        }

      </div>
    )
  }
}
