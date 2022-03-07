import React,  {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import config from 'config'
import { faLinkedinIn } from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { withRouter, useLocation } from 'react-router-dom';
function Stack() {
    const { search } = useLocation()
    const [ code, setCode ] = useState(null)

    const getToken = () => {
        axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        }, {
            grant_type: 'authorization_code',
            code: code,
            client_id: config.linkedIn.id,
            client_secret: config.linkedIn.secret,
            redirect_uri: config.linkedIn.redirectUrl
        }).then(response => {
            console.log({
                response
            })
        })
    }
    useEffect(() => {
        if(code == null){
            setCode(new URLSearchParams(search).get('code'))
            getToken()
        }
    })

  
    console.log({
        code
    })
    return (
        <div
            onClick={() => {
                this.initialize()
            }}
        >
        </div>
    )
}

export default withRouter(Stack);
