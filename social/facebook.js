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
  
  render() {
    return (
        <div>
            <FontAwesomeIcon
                icon={faFacebookF}
                size="1x"
                />
        </div>
    )
  }
}
