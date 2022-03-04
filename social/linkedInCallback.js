import React from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faLinkedinIn } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
        <div
            onClick={() => {
                this.initialize()
            }}
        >
        </div>
    )
  }
}
