import Colors from 'common/Colors.js'
export default{
  StripeElementsStyles: {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: 'black',
            color: 'black',
            fontWeight: 300,
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                color: Colors.lightGray,
            },
        },
        invalid: {
            iconColor: 'red',
            color: 'red',
        },
    },
  },
  fieldStyle: {
    borderBottom: '1px solid',
    borderColor: Colors.darkGray,
    borderWidth: '20%',
    height: '40px',
    width: '100%',
    padding: 10
  }
}