import React, { useEffect, useState } from "react";

function PayPalPaymentMethod() {
    const [isScriptedLoaded ,  setisScriptedLoaded] = useState(null)

    useEffect(()=>{
        const script = document.createElement("script")
        script.src = "https://www.paypalobjects.com/js/external/api.js";
        script.async = true;
        script.onload = () => { setisScriptedLoaded(true) }
    
        document.body.appendChild(script)
    },[])
    if (isScriptedLoaded) {
        // console.log( isScriptedLoaded)
        const windowRef = window;
        //console.log('windowRef', windowRef.paypal)
        windowRef.paypal.use(["login"], function (login) {
          login.render({
            "appid": "AZDgGNKyQoBs3jyD6kGoTmh1KuWJBhjdjJCMuoCP4wz0MdFlPsE8fqYWC8rDOlsS_OgXzuMjUKRiBJ10",
            "authend": "sandbox",
            "scopes": "openid email profile",
            "containerid": "paypalLogin",
            "responseType": "code",
            "locale": "en-us",
            "buttonType": "CWP",
            "buttonShape": "rectangle",
            //"buttonSize":"lg",
            "buttonText": "Payment By PayPal",
            "text": "Payment By PayPal",
            "fullPage": "true",
            // "theme": "neutral",
            // "returnurl": "https://talfoundry.com/settings"
            "returnurl": "http://127.0.0.1:3000/settings"
          })
        })
      }
    return (
        
            // <div className="col-md-3">
                <div className="tf_add_pay1 paypal-botton">
                    <a id="paypalLogin" style={{padding:"0px" , margin : "0"}}></a>
                </div>
            // </div>
    )
}
export default PayPalPaymentMethod