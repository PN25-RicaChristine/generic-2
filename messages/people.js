import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import { BasicStyles, Color } from 'common';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    document.getElementsByClassName('people-container')[0].addEventListener('scroll', (event) => {
      var element = event.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight){
        this.retrieve()
      }
    })
  }

  retrieve = () => {
    this.props.retrieveMessengerGroup()
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  render() {
    const { messengerGroup, isLoading } = this.props
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
        {isLoading && [1,2,3,4].map(item => (<Skeleton height={150} style={{ marginBottom: 20, borderRadius: 5 }} />))}
        {messengerGroup.length === 0 && !isLoading && <p>You have no messages as of the moment.</p>}
        {
          messengerGroup.length > 0 && messengerGroup.map((el, ndx) => {
            return (
              <div
                key={'msg' + ndx}
                id={'msg' + ndx}
                style={
                  {
                    width: '100% !important',
                    marginTop: '10px',
                    marginBottom: ndx + 1 === messengerGroup.length ? '60px' : '10px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    position: 'relative',
                    background: el.read ? 'rgba(52, 71, 93, 0.06)' : '#FEF2F7',
                    padding: 15,
                    borderRadius: 23,
                    cursor: 'pointer'
                  }
                }
                onClick={() => {this.props.retrieveMessages(el)}}
              >
                <div>
                  <img src={'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSB19r_xX2ACRwem_jkPognrSavE_KPOVBiujil8oP12bDgSNr1uxvi_kfVL1s-'}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginRight: 20,
                      border: '1px solid #E62D7E'
                    }} />
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
                    fontWeight: 'bold',
                    marginTop: 10,
                  }}>{el.title}</h3>
                  <p style={{
                    color: Colors.rgbaGray
                  }}>{el.position}</p>
                  <p style={{
                    color: Colors.primary,
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
