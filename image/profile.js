import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
export default class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data, size } = this.props;
    return (
      <div style={{
          backgroundColor: Colors.primary,
          height: size,
          width: size,
          borderRadius: size /2,
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center'
      }}
      >
        {
            data && data.url && (
                <div></div>
            )
        }
        {
            (data == null || (data && data.url == null)) && (
                <FontAwesomeIcon icon={faUserCircle} size={this.props.iconSize ? this.props.iconSize : '10x'} color={Colors.white}/>
            )
        }
      </div>
    )
  }
}
