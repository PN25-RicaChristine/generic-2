import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import API from 'services/api'
import Routes from 'common/Routes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import _ from 'lodash'
import Config from 'config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      limit: 4,
      offset: 0,
      data: []
    }
  }

  componentDidMount() {
    this.retrieveMessengerGroup(false)
    document.getElementsByClassName('people-container')[0].addEventListener('scroll', (event) => {
      var element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        this.retrieve()
      }
    })
  }

  retrieveMessengerGroup = (flag) => {
    const { user } = this.props.state;
    const { limit, offset, data } = this.state;
    if (user === null) return
    let parameter = {
      condition: [{
        value: 8,
        column: 'account_id',
        clause: '='
      }],
      limit: limit,
      offset: flag === true && offset > 0 ? offset * limit : offset
    }
    this.setState({ isLoading: true })
    API.request(Routes.messengerGroupRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        let temp = response.data.map(item => {
          return {
            ...item,
            position: 'Sales manager, realtor',
            messages: 'Last message here',
            read: false
          }
        })
        this.setState({
          data: flag === false ? temp : _.uniqBy([...data, ...temp], 'id'),
          offset: flag === false ? 1 : offset + 1
        })
      } else {
        this.setState({
          data: flag === false ? [] : data,
          offset: flag === false ? 0 : offset
        })
      }
    }, error => {
      this.setState({ isLoading: false })
    })
  }

  retrieve = () => {
    this.retrieveMessengerGroup(true)
  }

  render() {
    const { data, isLoading } = this.state;
    const { user } = this.props.state
    return (
      <div
        style={{
          overflowY: 'scroll',
          height: '56vh',
          padding: '0px 25px 25px 25px'
        }}
        className={'people-container'}
      >
        {isLoading && [1, 2, 3, 4].map(item => (<Skeleton height={150} style={{ marginBottom: 20, borderRadius: 5 }} />))}
        {data.length === 0 && !isLoading && <p>You have no messages as of the moment.</p>}
        {
          data.length > 0 && data.map((el, ndx) => {
            return (
              <div
                key={'msg' + ndx}
                id={'msg' + ndx}
                style={
                  {
                    width: '100% !important',
                    marginTop: '10px',
                    marginBottom: ndx + 1 === data.length ? '60px' : '10px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    background: el.read ? 'rgba(52, 71, 93, 0.06)' : '#FEF2F7',
                    padding: 15,
                    borderRadius: 23,
                    cursor: 'pointer'
                  }
                }
                onClick={() => { this.props.setActiveMessage(el) }}
              >
                <div>
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
                      padding: '10px 0px 10px 0px',
                      wordBreak: 'break-all',
                      width: '100% !important',
                    }
                  }
                >
                  <h3 style={{
                    color: '#34475D',
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>{el.title}</h3>
                  <p style={{
                    color: Colors.rgbaGray
                  }}>{el.position}</p>
                  <p style={{
                    color: '#34475D',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: 200,
                  }}>{el.messages}</p>
                  <p style={{
                    color: Colors.rgbaGray,
                    position: 'absolute',
                    top: 10,
                    right: 15
                  }}>{el.created_at}</p>
                </div>
              </div>
            )
          })
        }
      </div >
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
