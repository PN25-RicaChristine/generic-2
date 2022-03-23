import React from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faFacebookF } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from 'services/api'
import Routes from 'common/Routes'
import Helper from 'common/Helper'
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  createAccount(){
    const { user }  = this.state;
    if(user == null) return
    if(user && user.token == null) return
    if(user && user.email == null) return
    if(user && user.username == null) return

    this.props.isLoading(true)
    API.request(Routes.socialSignin, user, response => {
      const { login } = this.props;
      if(response && response.data && user && (user.account_type == Helper.ACCOUNT_TYPE || user.account_type == 'ADMIN')){
        this.props.isLoading(false)
        login(user, user.token.token)
        if(user.status == 'ACCOUNT_VERIFIED' || user.status == 'PROFILE_SETUP'){
          this.navigate(Helper.NEXT_ROUTE)
        }else{
          this.navigate(user.status)
        }
      }else{
        this.props.isLoading(false)
        this.props.errorMessage(response.error)
      }
    }, error => {
      this.props.isLoading(false)
      this.props.errorMessage('Invalid Accessed.')
    });
  }

  getUser(auth){
    let FB = window.FB
    FB.api('/me', {fields: 'last_name,first_name,email,picture,name,short_name'}, user => {
      this.setState({
        user: {
          username: user.email,
          email: user.email,
          account_type: Helper.ACCOUNT_TYPE,
          status: 'ADMIN',
          account_status: '/welcome',
          payload: this.props.payload,
          information: {
            first_name: user.first_name,
            last_name: user.last_name
          },
          merchant: {
            name: user.name
          },
          profile: user.profile ? {
            url: user.picture.url
          } : null,
          token: {
            ...auth,
            token: auth.accessToken
          }
        }
      })
      
      this.createAccount()
    });
  }

  login(){
    let FB = window.FB
    FB.login( auth => {
      if (auth.authResponse) {
        this.getUser(auth.authResponse)
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  statusChangeCallback = (response) => {
    let FB = window.FB
    if(response.status == 'connected'){
      // this.login()
      this.getUser(response.authResponse)
    }else{
      this.login()
    }
  }

  initialize = () => {
    console.log('Facebook Authentication')
    let FB = window.FB
    FB.init({
      appId            : config.facebook.id,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v13.0'
    });

    FB.getLoginStatus(response => {   // Called after the JS SDK has been initialized.
      this.statusChangeCallback(response);        // Returns the login status.
    });

  }
  
  render() {
    return (
        <div
          onClick={() => {
            this.initialize()
          }}
        >
          <FontAwesomeIcon
              icon={faFacebookF}
              size="1x"
              />

          <Helmet>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
          </Helmet>
        </div>
    )
  }
}
