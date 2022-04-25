import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Grid from '@mui/material/Grid';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    const { activeMessage } = this.props;
    return (
      <div className='container-40-full-mobile-not-hide' style={{
        padding: 20,
        borderBottom: 'solid 1px ' + Colors.activeGray
      }}>
        <div className='message-header-full-mobile'>
          <h3 style={{
            color: '#34475D',
            fontWeight: 'bold'
          }}>{activeMessage.name}</h3>
          <p style={{
            color: Colors.rgbaGray,
            margin: '5px 5px 0px 0px',
          }}>{activeMessage.position}</p>
          <h3 style={{
            color: Colors.primary,
            fontWeight: 'bold',
          }}>View Contract</h3>
        </div>
        <div className={activeMessage ? 'container-100-full-mobile-hide' : 'container-100'}>
        <Grid container columns={4}>
          <Grid item xs={3}>
            <h3 style={{
              color: '#34475D',
              fontWeight: 'bold'
            }}>{activeMessage.name}</h3>
            <p style={{
              color: Colors.rgbaGray,
              margin: '5px 5px 0px 0px',
            }}>{activeMessage.position}</p>
          </Grid>
          <Grid item xs={1}>
            <p style={{
              color: Colors.rgbaGray,
              margin: '5px 5px 0px 0px',
            }}>&nbsp;</p>
            <h3 style={{
              color: Colors.primary,
              fontWeight: 'bold',
              float: 'right',
            }}>View Contract</h3>
          </Grid>
        </Grid>
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

