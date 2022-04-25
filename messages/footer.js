import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from "components/increment/generic/form/TextInput"
import Button from '@mui/material/Button';
import Colors from 'common/Colors'
import Grid from '@mui/material/Grid';
import { AttachFile, SentimentSatisfiedAltRounded, SearchRounded, SendRounded } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { BasicStyles } from 'common';
import API from 'services/api'
import Routes from 'common/Routes'
import _ from 'lodash'
import Picker from 'emoji-picker-react';
import { FilePicker } from 'react-file-picker'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: null,
      error: null,
      isLoading: false,
      showEmoji: false
    }
  }

  attachfile = (file) => {
    const { user } = this.props.state
    let formData = new FormData();
    formData.append('file', file)
    formData.append('file_url', file.name)
    formData.append('account_id', user.id)
    formData.append('category', 'from-message')
    this.setState({isLoading: true})
    API.upload(CONFIG.API_URL + '/files/upload_file', formData, response => {
      this.setState({isLoading: false})
    }, error => {
      this.setState({isLoading: false})
    })
  }

  sendMessage = () => {
    const { user } = this.props.state;
    const { activeMessage, messages } = this.props;
    if (user === null) return
    const { text } = this.state;
    let parameter = {
      messenger_group_id: activeMessage.id,
      account_id: user.id,
      payload: 'text',
      message: text
    }
    this.setState({ isLoading: true })
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
          text: null
        })
        this.props.updateMessage(temp)
      }
    }, error => {
      this.setState({ isLoading: false })
    })
  }

  render() {
    const { text, showEmoji } = this.state;
    return (
      <div style={{
        padding: 20,
        height: '13vh',
        borderTop: 'solid 1px ' + Colors.activeGray,
        display: 'flex'
      }}>
        {showEmoji && <div style={{
          position: 'fixed',
          width: '280px',
          height: '320px',
          top: '25%',
          left: '25%',
          right: '25%',
          bottom: '25%',
          margin: 'auto',
          zIndex: 1
        }}>
          <Picker onEmojiClick={(event, emojiObject) => {
            this.setState({
              text: (text ? text : '') + emojiObject.emoji
            })
          }} />
        </div>}
        <Grid container columns={7}>
          <Grid item xs={1} style={{
            justifyContent: 'center',
            display: 'flex'
          }}>

            <FilePicker
              extensions={['jpeg', 'jpg', 'png', 'pdf']}
              onChange={file => { this.attachfile(file)}}
              onError={errMsg => { }}
              style={{
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <Button style={{
                color: Colors.primary,
              }}>
                <SvgIcon component={AttachFile}
                  style={{
                    fontSize: BasicStyles.iconSize
                  }}
                />
              </Button>
            </FilePicker>
            <Button style={{
              color: Colors.primary,
            }}
              onClick={() => {
                this.setState({ showEmoji: !showEmoji })
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

