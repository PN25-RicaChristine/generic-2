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
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      search: null,
      error: null,
      messengerGroup: [],
      messages: [],
      selected: 'Agent',
      isLoading: false,
      isLoading1: false,
      activeMessage: null
    }
  }

  componentDidMount() {
    this.retrieveMessengerGroup()
  }

  retrieveMessages = (item) => {
    this.setState({
      isLoading1: true,
      activeMessage: {
        name: item.title,
        position: 'Sales manager, realtor',
        id: item.id
      },
      messages: []
    })
    let parameter = {
      condition: [{
        value: item.id,
        column: 'messenger_group_id',
        clause: '='
      }],
      limit: 20,
      offset: 0
    }
    API.request(Routes.messagesRetrieve, parameter, response => {
      this.setState({ isLoading1: false })
      if (response.data.length > 0) {
        let temp = response.data.reverse().map(item => {
          return {
            ...item,
            title: item.account.information ? item.account.information.first_name + ' ' + item.account.information.last_name : item.account.username,
            position: 'Sales manager, realtor',
            read: false
          }
        })
        this.setState({ messages: temp })
      }
    }, error => {
      this.setState({ isLoading1: false })
    })
  }

  retrieveMessengerGroup = () => {
    const { user } = this.props.state;
    if (user === null) return
    let parameter = {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }],
      limit: 5,
      offset: 0
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
        this.setState({ messengerGroup: temp })
      }
    }, error => {
      this.setState({ isLoading: false })
    })
  }

  sendMessage = () => {
    const { user } = this.props.state;
    if (user === null) return
    const { text, activeMessage, messages } = this.state;
    let parameter = {
      messenger_group_id: activeMessage.id,
      account_id: user.id,
      payload: 'text',
      message: text
    }
    this.setState({ isLoading1: true })
    API.request(Routes.messagesCreate, parameter, response => {
      this.setState({ isLoading1: false })
      if (response.data.length > 0) {
        let temp = messages
        temp.push({
          id: response.data,
          message: text,
          title: user.information ? user.information.first_name + ' ' + user.information.last_name : user.username,
          position: 'Sales manager, realtor',
          read: false,
          created_at: new Date()
        })
        this.setState({
          messages: temp,
          text: null
        })
      }
    }, error => {
      this.setState({ isLoading1: false })
    })
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

  footer = () => {
    const { text } = this.state;
    return (
      <div style={{
        padding: 20,
        height: '13vh',
        borderTop: 'solid 1px ' + Colors.activeGray,
        display: 'flex'
      }}>
        <Grid container columns={7}>
          <Grid item xs={1} style={{
            justifyContent: 'center',
            display: 'flex'
          }}>
            <Button style={{
              color: Colors.primary,
            }}>
              <SvgIcon component={AttachFile}
                style={{
                  fontSize: BasicStyles.iconSize
                }}
              />
            </Button>
            <Button style={{
              color: Colors.primary,
            }}>
              <SvgIcon component={SentimentSatisfiedAltRounded}
                style={{
                  fontSize: BasicStyles.iconSize
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={4} style={{
            justifyContent: 'center'
          }}>
            <TextInput
              placeholder={'Enter your message'}
              type={"text"}
              value={text}
              onChange={(text, error) => {
                this.setState({
                  text, error
                })
              }}
              validation={{
                type: 'text_without_space',
                size: 1,
                column: 'Enter your message',
                error: this.state.error
              }}
            />
          </Grid>
          <Grid container xs={2} style={{
            justifyContent: 'center'
          }}>
            <Button style={{
              borderRadius: 20,
              paddingLeft: '40px',
              paddingRight: '40px',
              color: Colors.primary,
              border: 'solid 1px ' + Colors.primary
            }}
            onClick={() => {
              this.sendMessage()
            }}>
              <SvgIcon component={SendRounded}
                style={{
                  fontSize: BasicStyles.iconSize,
                  margin: 10
                }}
              />Send</Button>
          </Grid>
        </Grid>
      </div>
    )
  }

  header = () => {
    const { activeMessage } = this.state;
    return (
      <div style={{
        padding: 20,
        borderBottom: 'solid 1px ' + Colors.activeGray,
        height: '11vh'
      }}>
        <Grid container columns={4}>
          <Grid item xs={3}>
            <h3 style={{
              color: Colors.primary,
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
    const { messengerGroup, messages, activeMessage, isLoading1, isLoading } = this.state;
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
        }}>
          <Grid container columns={10}>
            <Grid item xs={3} style={{
              border: 'solid 1px ' + Colors.activeGray,
              height: '70vh',
              borderTopLeftRadius: 24,
              borderBottomLeftRadius: 25,
            }}>
              {this.searchRight()}
              <People
                isLoading={isLoading}
                messengerGroup={messengerGroup}
                retrieveMessages={(item) => { this.retrieveMessages(item) }}
              />
            </Grid>
            <Grid item xs={7} style={{
              border: 'solid 1px ' + Colors.activeGray,
              height: '70vh',
              borderTopRightRadius: 24,
              borderBottomRightRadius: 25
            }}>
              {activeMessage !== null && this.header()}
              <div style={{
                height: '46vh'
              }}>
                {isLoading1 && <Skeleton height={20} style={{borderRadius: 5 }} />}
                <div style={{
                  padding: '0px 0px 0px 25px',
                }}>
                {messages.length > 0 && <Message messengerGroup={messages} />}
                </div>
              </div>
              {activeMessage !== null && this.footer()}
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

