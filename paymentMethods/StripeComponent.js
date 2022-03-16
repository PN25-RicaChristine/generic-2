
import React, {useEffect, useState} from 'react'
import {
  PaymentElement,
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors';
import style from './style.js'
import {  CreditCard
} from "@mui/icons-material";
import { SvgIcon } from '@mui/material'
import API from 'services/api'
import Routes from 'common/Routes'
import config from 'config';


const StripeComponent = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  // useEffect(() => {
  //   props.stripeFunc.current = handleSubmit
  // }, [])
  const handleSubmit = async (event) => {
    const {user} = props.state;
    const {elements, stripe} = props
    
    if (!stripe || !elements) {
      return;
    }
    console.log('>>>>>>>', elements);
    await stripe.createSource(elements.getElement('cardNumber')).then(res => {
      console.log('------------>><<', res);
      createMethod(res.source)
    }).catch(err => {
      console.log('------------>>[eror]<<', err);
    })
  }

  const createMethod = (source) => {
    const { user } = props.state
    if(!user) return;
    let parameter = {
      source: source,
      code: user.code,
      account_id: user.id,
      email: user.email,
      name: user.information.first_name + ' ' + user.information.last_name,
      status: 'authorized',
      next_route: '/verification',
      method: 'visa'
    }
    API.request(Routes.stripeCreate, parameter, response => {
      props.retrievePaymentMethods()
    })
  }

  const handlePayment_InputChange = (name, label) => (elementData) => {
    //store values

      let stateErrors = errors || {};

      if (!elementData.complete && !elementData.error) {
          stateErrors[name] = `Your ${label} is incomplete or invalid.`;
      } else if (elementData.complete && !elementData.error) {
          delete stateErrors[name];
      }

      setErrors(stateErrors);
  }
  
  const renderCardNumber = (name, label, className, type = "text") => {
    let err = errors ? (errors[name] || '') : '';
    return (
      <div>
        <div>
          <label htmlFor="cardNumber">{label}</label>
          <div style={{display: 'flex'}}>
            <div style={style.fieldStyle}>
              <CardNumberElement
                    showIcon={true}
                    id="cardNumber"
                    onChange={handlePayment_InputChange(name, label)}
                    options={style.StripeElementsStyles}
                />
            </div>
            <div style={{paddingTop: 10}}>
            <SvgIcon component={CreditCard}
                  style={{
                    fontSize: 20,
                    float: 'right',
                  }}
                />
            </div>
          </div>
        </div>
        {err && <p>{err}</p>}
      </div>
    )
  }

  const renderCardExpiryElement = (name, label, className, type = "text") => {
    let err = errors ? (errors[name] || '') : '';
    return (
      <div>
        <div>
          <label htmlFor="cardExpiry">{label}</label>
          <div style={style.fieldStyle}>
            <CardExpiryElement
                  id="cardExpiry"
                  onChange={handlePayment_InputChange(name, label)}
                  options={style.StripeElementsStyles}
              />
          </div>
        </div>
        {err && <p>{err}</p>}
      </div>
    )
  }

  
  const renderCardCvcElement = (name, label, className, type = "text") => {
    let err = errors ? (errors[name] || '') : '';
    return (
      <div>
        <div >
          <label htmlFor="cardCvc">{label}</label>
          <div style={style.fieldStyle}>
            <CardCvcElement
                  id="cardCvc"
                  onChange={handlePayment_InputChange(name, label)}
                  options={style.StripeElementsStyles}
              />
          </div>
        </div>
        {err && <p>{err}</p>}
      </div>
    )
  }

  return (
    <div className="  container-100">
        {/* <PaymentElement id="payment"></PaymentElement> */}
        {/* <CardElement /> */}
        {renderCardNumber('cardNumber', 'Card Number ')}
        <div className="container-45-full-mobile" style={{marginRight: '50px', marginTop: '20px'}}>
          {renderCardExpiryElement('cardExpiry', 'Expiry Date')}
        </div>
        <div className="container-45-full-mobile" style={{marginTop: '20px'}}>
          {renderCardCvcElement('cardCvc', 'Card Verification Code (CVC)')}
        </div>
        <Button
            title={'Authorize'}
            onClick={() =>{
              handleSubmit()
            }}
            style={{
              backgroundColor: Colors.primary,
              color: Colors.white,
              marginTop: 10
            }}
            key={2}
            isLoading={props.isLoading}
            className = "full-width-mobile"
          />
    </div>
  )
}

export default StripeComponent