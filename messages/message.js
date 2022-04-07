import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import { BasicStyles } from 'common';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  convertLineToBreak(text) {
    return text.replace(/\n/g, '<br />')
  }

  render() {
    const { messengerGroup } = this.props
    const { user } = this.props.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          overflowY: 'scroll',
          height: '46vh',
          paddingRight: 25
        }}
      >
        {
          messengerGroup.length > 0 && messengerGroup.map((el, ndx) => {
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
                    fontWeight: 'bold'
                  }}>{el.title}</h3>
                  <h3 dangerouslySetInnerHTML={{ __html: this.convertLineToBreak(el.message) }}></h3>
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
