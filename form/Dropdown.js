import React from 'react';
import { BasicStyles } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RightClickMenu from './rightClick'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.element = null;
    this.state = {
      click: 0,
      show: false
    }
  }


  componentDidMount() {
    this.element.addEventListener('contextmenu', this.handleClick);
  }

  handleClick = (e = null) => {
    const { key } = this.props;
    if (e && e.type === 'click') {
      this.setState({
        show: !this.state.show
      })
    } else if (e && e.type === 'contextmenu') {
      this.setState({
        show: !this.state.show
      })
      e.preventDefault()
    } else {
      this.setState({
        show: !this.state.show
      })
    }
  }

  render() {
    return (
      <div style={{
        borderRadius: 25,
        height: 50,
        float: 'left',
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderStyle: 'solid',
        marginRight: '1%',
        marginBottom: 20,
        paddingLeft: 20,
        width: 125,
        paddingRight: 20,
        position: 'relative',
        ...this.props.style
      }}
        className="href-link"
        onClick={this.handleClick}
        ref={element => this.element = element}
      >
        <div style={{
          display: 'flex',
          height: 50,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <b style={{
            paddingRight: 20
          }}>{this.props.title}</b>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </div>
        {
          (this.props.menu && this.state.show) && (
            <RightClickMenu
              menu={this.props.menu}
              from="folder"
              onClick={(item) => { this.props.onClick(item) }}
              close={() => {
                this.handleClick()
              }}
            />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dropdown));
