import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import searchIcon from "../../static/images/Icon_Search.svg";
import loadMoreSrc from "../../static/images/loadMore.gif";


export default class FreelancerActiveContracts extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      searchItem: "",
    }
  }


  render() {
    const { activeContracts } = this.props

    return (
      <div className="all-contacts-freelancer-account p-0">
        <div className="">
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="ALL">
              <div className="search-box-container">
                <div className="col-md-12 p-0">
                  <div className="input-group">
                    <div className="input-group-addon1">
                      <img src={searchIcon} alt="search" />
                    </div>
                    <div className="tf_search">
                      <input
                        type="text"
                        className="form-control mn_input"
                        onChange={(e) => this.props.searchForContracts(e)}
                        placeholder="Search Contract"
                        value={this.props.searchItem}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 p-0">
                <div className="p-4 box-shadow bg-white">
                  <div className="projects__table-sec">
                    <table className="table">
                    <thead>
                    <tr className="bg-light">
                      <th>Title</th>
                      <th>Client Name</th>
                      <th>Hourly</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                      <tbody>
                        {!isEmpty(activeContracts) ? (
                          activeContracts.map((contract) => {
                            return (
                              <tr className="" key={contract.uuid}>
                                <td>
                                  <Link to={`/contract-details/${contract.uuid}`}>
                                    <div className="">
                                      {/* <Link> */}
                                        {contract.title}
                                      {/* </Link> */}
                                    </div>
                                  </Link>
                                </td>
                                <td>
                                  <p>
                                    <strong>Hired by {contract.client_name}</strong>
                                  </p>
                                </td>
                                <td>
                                  <div className="">
                                    <p>
                                      <strong>
                                        $
                                        {contract.payment_mode === "fixed"
                                          ? `${parseFloat(contract.fixed_price_amount).toFixed(
                                            2
                                          )} - Fixed`
                                          : `${parseFloat(contract.hourly_rate).toFixed(2)} - Hourly`}
                                      </strong>
                                    </p>
                                  </div>
                                </td>
                                <td>
                                  <div className="">
                                    <p>
                                      <Link to="/messages">SEND MESSAGE</Link>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        ) : ''
                        }
                      </tbody>
                    </table>

                  </div>
                  {!this.props.hideShowMore && <button
                    className="load_more_btn_find_work mt-20 mb-15"
                    onClick={this.props.handleShowMore}
                  >
                    Show More
                  </button>
                  }
                  {this.props.issLoading &&
                    <img src={loadMoreSrc} alt="loader" />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

