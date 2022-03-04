import React from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faGooglePlusG } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.GoogleAuth = null
  }

  signIn(instance){
    console.log({
        instance
    })
    if(instance.isSignedIn.get() == true){
        instance.signIn().then(response => {
            console.log({
                response
            })
        })
    }else{
        instance.signIn().then(response => {
            console.log({
                response
            })
        })
    }
  }

  signOut() {
    let gapi = window.gapi
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  initClient = (response) => {
      let gapi = window.gapi
      gapi.auth2.init({
          'clientId': config.google.id,
          'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
      }).then(() => {
          this.signIn(gapi.auth2.getAuthInstance())
      })
  }
  initialize = () => {
    let gapi = window.gapi
    console.log('Google Authenticate')
    gapi.load('client:auth2', this.initClient)
  }
  
  render() {
    return (
        <div
            onClick={() => {
                this.initialize()
            }}
        >
          <FontAwesomeIcon
              icon={faGooglePlusG}
              size="1x"
              />

          <Helmet>
                <meta name="google-signin-client_id" content={config.google.id} />
                <script src="https://apis.google.com/js/platform.js" async defer></script>
          </Helmet>
        </div>
    )
  }
}
