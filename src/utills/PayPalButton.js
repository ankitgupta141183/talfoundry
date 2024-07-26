import React, {Component} from 'react';

class PayPalButton extends Component {
  // constructor(props, context){
  //   super(props, context)
  //   this.state = {
  //     isScriptLoaded: false,
  //   }
  // }

  componentDidMount(){
    const script = document.createElement("script")
    script.src = "https://www.paypal.com/sdk/js?client-id=AZDgGNKyQoBs3jyD6kGoTmh1KuWJBhjdjJCMuoCP4wz0MdFlPsE8fqYWC8rDOlsS_OgXzuMjUKRiBJ10&intent=authorize";
    script.async = true;
    script.onload = () => {window.paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }]
        })
      },
      onApprove: function(data, actions) {
        actions.order.authorize().then((res)=>{
          console.log(res)
        })
        // Authorize the transaction
        // actions.order.authorize().then(function(authorization) {
  
        //   // Get the authorization id
        //   var authorizationID = authorization.purchase_units[0]
        //     .payments.authorizations[0].id
  
        //   // Call your server to validate and capture the transaction
        //   return fetch('/paypal-transaction-complete', {
        //     method: 'post',
        //     headers: {
        //       'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       orderID: data.orderID,
        //       authorizationID: authorizationID
        //     })
        //   })
        // })
      }
    }).render("#paypal-button-container")};
    document.body.appendChild(script)
  }

  render(){
    return(
      <div id="paypal-button-container"></div>
    )
  }
}

export default PayPalButton;
