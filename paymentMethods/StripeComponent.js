
import React, {useEffect} from 'react'
import {Elements, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors';


const StripeComponent = (props) => {
  const stripe = useStripe();
  const elements = useElements()

  // useEffect(() => {
  //   props.stripeFunc.current = handleSubmit
  // }, [])
  // const handleSubmit = async (event) => {
  //   event.preventDefault()

  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   console.log('>>>>>>>', elements);
  //   console.log('<<<<<<<<', stripe);
  // };
  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
        <PaymentElement></PaymentElement>
        <Button
            title={'Authorize'}
            onClick={() =>{
              props.handleSubmit()
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
      {/* </form> */}
    </div>
  )
}

export default StripeComponent