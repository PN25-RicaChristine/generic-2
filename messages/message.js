import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import API from 'services/api'
import Routes from 'common/Routes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import _ from 'lodash'
import Config from 'common/Config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      limit: 100,
      offset: 0,
      data: []
    }
  }

  convertLineToBreak(text) {
    if(text) {
      return text.replace(/\n/g, '<br />')
    }
  }

  componentDidUpdate(){
    const { updatedMessage, clearUpdate } = this.props;
    if(updatedMessage.length > 0) {
      this.setState({data: updatedMessage}, () => {
        clearUpdate()
      })
    }
  }

  componentDidMount() {
    const { activeMessage } = this.props;
    this.retrieveMessages(activeMessage, false)
    document.getElementsByClassName('message-container')[0].addEventListener('scroll', (event) => {
      var element = event.target
      if (parseInt(element.scrollHeight + element.scrollTop) === element.clientHeight) {
        this.retrieve()
      }
    })
  }

  retrieveMessages = (item, flag) => {
    const { limit, offset, data } = this.state;
    let parameter = {
      condition: [{
        value: item.id,
        column: 'messenger_group_id',
        clause: '='
      }],
      limit: limit,
      offset: flag === true && offset > 0 ? offset * limit : offset
    }
    this.setState({ isLoading: true })
    API.request(Routes.messagesRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        let temp = response.data.reverse().map(item => {
          return {
            ...item,
            title: item.account.information ? item.account.information.first_name + ' ' + item.account.information.last_name : item.account.username,
            position: 'Sales manager, realtor',
            read: false
          }
        })
        this.setState({
          data: flag === false ? temp : _.uniqBy([...data, ...temp], 'id'),
          offset: flag === false ? 0 : offset + 1
        }, () => {
          this.props.setMessages(flag === false ? temp : _.uniqBy([...data, ...temp], 'id'))
        })
      } else {
        this.setState({
          data: flag === false ? [] : data,
          offset: flag === false ? 0 : offset
        })
      }
    }, error => {
      this.setState({ isLoading1: false })
    })
  }

  retrieve = () => {
    this.retrieveMessages(true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', () => {
      return
    });
  }

  componentDidUpdate() {
    const { activeMessage } = this.props;
    console.log(activeMessage, '-------')
  }

  render() {
    const { data, isLoading } = this.state
    const { user } = this.props.state
    return (
      <div>
        {isLoading && <Skeleton height={20} style={{ borderRadius: 5 }} />}
        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          padding: '0px 25px 0px 25px',
          overflowY: 'scroll',
          height: '46vh'
        }}
        className={'message-container'}>
          {
            data.length > 0 && data.map((el, ndx) => {
              return (
                <div
                  key={'msg' + ndx}
                  style={
                    {
                      width: '100% !important',
                      marginTop: '10px',
                      marginBottom: '10px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      position: 'relative'
                    }
                  }
                >
                  <div style={{
                    alignItems: 'center',
                    display: 'flex'
                  }}>
                    {el.account.profile ? <img
                      src={Config.BACKEND_URL + el.account.profile}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 20,
                        border: '1px solid #E62D7E'
                      }} /> : <AccountCircleIcon
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginRight: 20,
                          border: '1px solid #E62D7E'
                        }}
                      />}
                  </div>
                  <div
                    style={
                      {
                        color: Colors.primary,
                        padding: '10px 0px 10px 0px',
                        wordBreak: 'break-all',
                        width: '100% !important',
                      }
                    }
                  >
                    <h3 style={{
                      color: Colors.primary,
                      fontWeight: 'bold'
                    }}>{el.title}</h3>
                    {el.payload === 'text' && <h3 dangerouslySetInnerHTML={{ __html: this.convertLineToBreak(el.message) }}></h3>}
                    {el.payload === 'image' &&
                      (el.files?.length > 0 && el.files.map((item, index) => (<img
                        src={Config.BACKEND_URL + item.url}
                        style={{
                          width: 300,
                          height: 200
                        }}
                        key={index}
                      />)))
                    }
                    <p style={{
                      color: Colors.rgbaGray,
                      position: 'absolute',
                      top: 10,
                      right: 0
                    }}>{el.created_at}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
