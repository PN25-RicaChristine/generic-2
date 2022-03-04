import React from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faFacebookF } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialLogin from "react-social-login";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  init = () => {
    console.log('hello')
    let FB = window.FB
    FB.init({
      appId            : config.facebook.id,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v13.0'
    });

    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }
  
  render() {
    return (
        <div
          onClick={() => {
            this.init()
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
