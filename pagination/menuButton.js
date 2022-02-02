import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { data, selected } = this.props;
    return (
      <div style={{
          borderRadius: '25px',
          backgroundColor: Colors.activeGray,
          padding: '5px',
          ...this.props.style
        }}>
        {
          data && data.map((item) => (
            <span
              style={{
                paddingRight: '50px',
                paddingLeft: '50px',
                paddingTop: '15px',
                paddingBottom: '15px',
                float: 'left',
                borderRadius: '25px',
                backgroundColor: item == selected ? Colors.darkGray : Colors.activeGray,
                color: item == selected ? Colors.white : Colors.darkGray,
                fontWeight: 'bold'
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
