import React, {Component} from 'react';
import calenderImg from '../../static/images/calender.png';

class TransactionHistory extends Component {

  render(){
    return <div className="tf_inter tf_all_cont">
    <div className="container">
      <div className="col-md-12">
        <div className="col-md-4 nopad">
          <h2>Earning by Client</h2>
        </div>
        <div className="col-md-8 nopad rtea">
          <p>All dates and times based on UTC</p>
        </div>
      </div>
      <div className="col-md-12">
        <div className="invite_freelancer tf_saved_jobs">
          <div className="col-md-4 col-sm-4">
            <div className="date-container">
              <div className="input-group2">
                <input type="text" id="datepicker" className="form-control mn_input3" placeholder="Wed 25 - 07, 2019"
                  value=""/>
                <span className="input-group-addon4 add-on"><img src={calenderImg} alt="calender"/></span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-4 pull-right">
            <div className="tf_downloadcsv1">
              <a href={`#`}>DOWNLOAD INVOICES (ZIP)</a>
            </div>
            <div className="tf_downloadcsv">
              <a href={`#`}>DOWNLOAD CSV</a>
            </div>
          </div>
          <div className="col-md-12 nopad">
            <div className="tf_select_fields">
              <div className="col-md-3">
                <div className="input-group tf_loca">
                  <div className="selectedwrap">
                    <select className="form-control mn_input mySelectBoxClass">
                      <option>All Transactions</option>
                      <option>lorem Ipsum</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-group tf_loca">
                  <div className="selectedwrap">
                    <select className="form-control mn_input mySelectBoxClass">
                      <option>All Clients</option>
                      <option>lorem Ipsum</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="tf_go">
                  <a href={`#`}>GO</a>
                </div>
              </div>
            </div>
            <div className="tf_job_filter1">
              <div className="col-md-2 col-sm-2">
                <p><strong>Date</strong></p>
              </div>
              <div className="col-md-1 col-sm-1">
                <p><strong>Type</strong></p>
              </div>
              <div className="col-md-3 col-sm-3">
                <p><strong>Description</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>Client</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>Amount / Balance</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>Ref ID</strong></p>
              </div>
            </div>
            <div className="tf_job_filter1">
              <div className="col-md-2 col-sm-2">
                <p><strong>Jun 7, 2019</strong></p>
              </div>
              <div className="col-md-1 col-sm-1">
                <p>Hourly</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p>John Doe</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>$100.00</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>123123124</strong></p>
              </div>
            </div>
            <div className="tf_job_filter1">
              <div className="col-md-2 col-sm-2">
                <p><strong>Jun 7, 2019</strong></p>
              </div>
              <div className="col-md-1 col-sm-1">
                <p>Hourly</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p>John Doe</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>$100.00</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>123123124</strong></p>
              </div>
            </div>
            <div className="tf_job_filter1">
              <div className="col-md-2 col-sm-2">
                <p><strong>Jun 7, 2019</strong></p>
              </div>
              <div className="col-md-1 col-sm-1">
                <p>Hourly</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p>John Doe</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>$100.00</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>123123124</strong></p>
              </div>
            </div>
            <div className="tf_job_filter1">
              <div className="col-md-2 col-sm-2">
                <p><strong>Jun 7, 2019</strong></p>
              </div>
              <div className="col-md-1 col-sm-1">
                <p>Hourly</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p>John Doe</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>$100.00</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>123123124</strong></p>
              </div>
            </div>
            <div className="tf_job_filter1">
              <div className="col-md-2 col-sm-2">
                <p><strong>Jun 7, 2019</strong></p>
              </div>
              <div className="col-md-1 col-sm-1">
                <p>Hourly</p>
              </div>
              <div className="col-md-3 col-sm-3">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p>John Doe</p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>$100.00</strong></p>
              </div>
              <div className="col-md-2 col-sm-2">
                <p><strong>123123124</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="col-md-12 tf_earning_by">
        <div className="col-md-4 pull-right nopad">
          <div className="col-md-12">
            <p><strong>Statement Period</strong></p>
            <p>May 5, 2019 to Jun 4, 2019</p>
          </div>
          <div className="col-md-8">
            <p><strong>Beginning Balance</strong></p>
          </div>
          <div className="col-md-4">
            <p><strong>$0.00</strong></p>
          </div>
          <div className="clearfix"></div>
          <hr/>
          <div className="col-md-8">
            <p>Total Debits</p>
          </div>
          <div className="col-md-4">
            <p>$0.00</p>
          </div>
          <div className="clearfix"></div>
          <hr/>
          <div className="col-md-8">
            <p>Total Credits</p>
          </div>
          <div className="col-md-4">
            <p>$0.00</p>
          </div>
          <div className="clearfix"></div>
          <hr/>
          <div className="col-md-8">
            <p><strong>Ending Balance</strong></p>
          </div>
          <div className="col-md-4">
            <p><strong>$0.00</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  }
}

export default TransactionHistory;