import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';
import payoneerImg from '../../static/images/pay_1.png';
import skrillImg from '../../static/images/pay_2.png';
import directBankImg from '../../static/images/pay_3.png';
import paypalImg from '../../static/images/pay_4.png';
import stripeImg from "../../static/images/pay_5.png";
import { getAuthPayPalToken } from '../../Actions/PaymentActions';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'transparent'
  }
}

class AddPaymentModal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isScriptedLoaded: false
    }
  }

  setupPaymentMethod = (e) => {
    console.log(e)
    if(e === "stripe"){
      this.props.history.push(`/stripe-payment-setup`)
    }else{

      this.props.history.push(`/setup-payment/${e}`)
    }
  }

  getAuthenticationToken = () => {
    this.props.getToken()
  }

  componentDidMount() {
    const script = document.createElement("script")
    script.src = "https://www.paypalobjects.com/js/external/api.js";
    script.async = true;
    script.onload = () => { this.setState({ isScriptedLoaded: true }) }
    document.body.appendChild(script)
  }

  UNSAFE_componentWillUnmount() {
    document.scripts[document.scripts.length - 1].remove()
  }

  render() {
    const { onOpen, onClose, currentUser, isPaypalAdded, isDirectBankAdded, isPayoneerAdded, isSkrillAdded } = this.props;
    const { isScriptedLoaded } = this.state;
    if (!isPaypalAdded && isScriptedLoaded) {
      console.log(!isPaypalAdded, isScriptedLoaded)
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
          "buttonText": "SET UP",
          "text": "SET UP",
          "fullPage": "true",
          // "theme": "neutral",
          "returnurl": "https://talfoundry.com/settings?"
          // "returnurl": "http://localhost:3000/settings?"
        })
      })
    }

    return (
      <Modal isOpen={onOpen} onRequestClose={() => onClose("isAddMethodModal")} style={customStyles}>
        <div id="myModal" tabindex="-1" role="dialog">
          <div className="modal-dialog tf_model1">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={() => onClose("isAddMethodModal")}><span>×</span></button>
                <h4 className="modal-title" id="myModalLabel">Add A Payment Method</h4>
              </div>
              <div className="modal-body ">
                <div className="container-fluid">
                {!isPayoneerAdded && 
                <div className="col-md-12 nopad tf_recommend">
                  <h4>Recommended for USA</h4>
                  <div className="col-md-2">
                    <div className="tf_add_pay">
                      <img src={payoneerImg} alt="payneer" />
                    </div>
                  </div>
                  <div className="col-md-7 nopad">
                    <div className="tf_add_pay">
                      <h5>Payoneer</h5>
                      <p>$2 USD per withdrawal. Additional activation and maintenance fees charges by Payoneer.
                      </p>
                      <a>Don’t have a Payoneer account?</a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="tf_add_pay1">
                      <a onClick={(e) => { e.preventDefault(); this.setupPaymentMethod("Payoneer") }}>SET UP</a>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <hr />
                </div>}
                {!isSkrillAdded && 
                <div className="col-md-12 nopad">
                  <div className="col-md-2">
                    <div className="tf_add_pay">
                      <img src={skrillImg} alt="sktrill" />
                    </div>
                  </div>
                  <div className="col-md-7 nopad">
                    <div className="tf_add_pay">
                      <h5>Skrill</h5>
                      <p>$1 USD per withdrawal. Additional activation and maintenance fees charges by Skrill.
                      </p>
                      <a>Don’t have a Skrill account?</a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="tf_add_pay1">
                      <a onClick={(e) => { e.preventDefault(); this.setupPaymentMethod("Skrill") }}>SET UP</a>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <hr />
                </div>}
                {!isDirectBankAdded && <div className="col-md-12 nopad">
                  <div className="col-md-2">
                    <div className="tf_add_pay2">
                      <img src={directBankImg} alt="directImg" />
                    </div>
                  </div>
                  <div className="col-md-7 nopad">
                    <div className="tf_add_pay">
                      <h5>Direct to U.S. Bank (USD)</h5>
                      <p>Free payments to U.S. banks</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="tf_add_pay2">
                      <a onClick={(e) => { e.preventDefault(); this.setupPaymentMethod("Direct to U.S. Bank (USD)") }}>SET UP</a>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <hr />
                </div>}
                {/* {!isSkrillAdded &&  */}
                {/* <div className="col-md-12 nopad">
                  <div className="col-md-2">
                    <div className="tf_add_pay">
                      <img src={stripeImg} alt="sktrill" />
                    </div>
                  </div>
                  <div className="col-md-7 nopad">
                    <div className="tf_add_pay">
                      <h5>Stripe</h5>
                      <p>$1 USD per withdrawal. Additional activation and maintenance fees charges by stripe.
                      </p>
                      <a>Don’t have a stripe account?</a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="tf_add_pay1">
                      <a onClick={(e) => { e.preventDefault(); this.setupPaymentMethod("stripe") }}>SET UP</a>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <hr />
                </div> */}

                {currentUser.role === "Freelancer" ?
                  (!isPaypalAdded && <div className="col-md-12 nopad">
                    <div className="col-md-2">
                      <div className="tf_add_pay">
                        <img src={paypalImg} alt="paypal" />
                      </div>
                    </div>
                    <div className="col-md-7 nopad">
                      <div className="tf_add_pay">
                        <h5>Paypal</h5>
                        <p>$1 USD per withdrawal. Additional activation and maintenance fees charges by Paypal.
                        </p>
                        <a>Don’t have a Paypal account?</a>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="tf_add_pay1 ">
                        <a onClick={(e) => { e.preventDefault(); this.setupPaymentMethod("paypal") }}>SET UP</a>

                      </div>
                    </div>
                  </div>)
                  :
                  (!isPaypalAdded && <div className="col-md-12 nopad">
                    <div className="col-md-2">
                      <div className="tf_add_pay">
                        <img src={paypalImg} alt="paypal" />
                      </div>
                    </div>
                    <div className="col-md-7 nopad">
                      <div className="tf_add_pay">
                        <h5>Paypal</h5>
                        <p>$1 USD per withdrawal. Additional activation and maintenance fees charges by Paypal.
                        </p>
                        <a>Don’t have a Paypal account?</a>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="tf_add_pay1 paypal-btn">
                        <a id="paypalLogin"></a>
                      </div>
                    </div>
                  </div>)
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: () => dispatch(getAuthPayPalToken()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentModal)
