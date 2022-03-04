import React from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faFacebookF } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  login(){
    let FB = window.FB
    FB.login(function(response) {
      if (response.authResponse) {
        console.log({
          auth: response
        })
        FB.api('/me', function(user) {
          console.log({
            user
          });
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  statusChangeCallback = (response) => {
    let FB = window.FB
    if(response.status == 'connected'){
      console.log({
        auth: response
      })
      FB.api('/me', function(user) {
        console.log({
          user
        });
      });
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
