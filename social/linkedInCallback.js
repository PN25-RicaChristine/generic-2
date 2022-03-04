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
    useEffect(() => {
        if(code == null){
            setCode(new URLSearchParams(search).get('code'))
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
