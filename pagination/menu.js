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
          float: 'left',
          ...this.props.style
        }}>
        {
          data && data.map((item) => (
            <span
              style={{
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '15px',
                paddingBottom: '15px',
                borderBottomWidth: '2px',
                borderBottomColor: item == selected ? this.props.activeColor : 'transparent',
                borderBottomStyle: 'solid',
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
