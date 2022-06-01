import React from 'react';
import { connect } from 'react-redux';
import Style from './style'
import { withRouter } from 'react-router-dom';
import BreadCrumbs from "modules/generic/breadcrumbs"
import TextInput from "components/increment/generic/form/TextInput"
import Button from '@mui/material/Button';
import Colors from 'common/Colors'
import Grid from '@mui/material/Grid';
import { AttachFile, SentimentSatisfiedAltRounded, SearchRounded, SendRounded } from '@mui/icons-material';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { SvgIcon } from '@mui/material';
import { BasicStyles } from 'common';
import Message from './message';
import People from './people';
import MenuButton from 'components/increment/generic/pagination/menuButton';
import Config from 'config.js';
import API from 'services/api'
import Routes from 'common/Routes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import _ from 'lodash'
import Footer from './footer';
import Header from './header';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      text: null,
      search: null,
      error: null,
      selected: 'Agent',
      activeMessage: null,
      messages: [],
      updateMessage: []
    }
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.code) {
      const { user } = this.props.state;
      const { limit, offset, data } = this.state;
      if (user === null) return
      let parameter = {
        condition: [{
          value: 'Huening Kai Kamal',
          column: 'title',
          clause: '='
        }],
        limit: 1,
        offset: 0
      }
      this.setState({ isLoading: true })
      API.request(Routes.messengerGroupRetrieve, parameter, response => {
        this.setState({ isLoading: false })
        if (response.data.length > 0) {
          this.setState({
            activeMessage: {
              name: response.data[0].title,
              position: 'Sales manager, realtor',
              id: response.data[0].id
            }
          })
        }
      }, error => {
        this.setState({ isLoading: false })
      })
    }
  }

  menu = () => {
    const { selected } = this.state;
    return (
      <div style={{
        float: 'right',
        width: 250,
        position: 'absolute',
        right: 10,
        bottom: 0
      }}>
        <MenuButton
          data={['Agent', 'Freelancer']}
          selected={selected}
          style={{
            color: Colors.gray,
            backgroundColor: Colors.activeGray,
            float: 'left'
          }}
          onChange={(param) => {
            if (param == 'Agent') {
              window.location.href = Config.AGENT
            } else {
              window.location.href = Config.HELPA
            }
          }}
        />
      </div>
    )
  }


  searchRight = () => {
    const { search } = this.state;
    return (
      <div style={{
        padding: '25px 25px 0px 25px',
        height: '10vh'
      }}>
        <TextInput
          placeholder={'Search for job title, ID, Agent, date'}
          type={"text"}
          style={{
            background: 'transparent',
            float: 'left',
          }}
          value={search}
          onChange={(params, error) => {
            this.setState({
              search: params,
              error: ''
            })
          }}
          onClickRightIcon={() => {
            console.log('--')
          }}
          iconLeft={faSearch}
          iconStyle={Colors.gray}
          validation={{
            type: 'text_without_space',
            size: 0,
            column: 'Region'
          }}
        />
      </div>
    )
  }

  render() {
    const { activeMessage, messages, updateMessage } = this.state;
    return (
      <div style={Style.mainContainer}>
        <BreadCrumbs
          title={'Messages'}
          page={'work'}
          backIcon={true}
          description="keep your credentials private and secured."
          style={{
            borderBottomWidth: 0
          }}
        />
        {this.menu()}
        <div style={{
          width: '100%',
          float: 'left',
          height: '70vh',
          marginTop: 20,
          border: 'solid 1px ' + Colors.activeGray,
          borderRadius: 25,
          display: 'flex'
        }}>
          {<div className={activeMessage ? 'container-40-full-mobile-hide' : 'container-100'} style={{
            height: '70vh',
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 25
          }}>
            {this.searchRight()}
            <People
              setActiveMessage={(item) => {
                this.setState({
                  activeMessage: {
                    name: item.title,
                    position: 'Sales manager, realtor',
                    id: item.id
                  }
                })
              }}
            />
          </div>}
          {
            activeMessage &&
            <div className='container-70-full-mobile' style={{
              // border: 'solid 1px ' + Colors.activeGray,
              height: '70vh',
              borderTopRightRadius: 24,
              borderBottomRightRadius: 25
            }}>
              <Header activeMessage={activeMessage} removeActiveMessage={() => { this.setState({ activeMessage: null }) }} />
              <Message
                activeMessage={activeMessage}
                setMessages={(messages) => {
                  this.setState({ messages: messages })
                }}
                updatedMessage={updateMessage}
                clearUpdate={() => {
                  this.setState({ updateMessage: [] })
                }}
                ref={this.myRef}
              />
              <Footer
                activeMessage={activeMessage}
                messages={messages}
                updateMessage={(message) => { this.setState({ updatedMessage: message }) }}
              />
            </div>
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

