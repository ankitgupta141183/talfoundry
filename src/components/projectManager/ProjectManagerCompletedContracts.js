import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getContractsForHiringManager,
  searchContractsForHiringManager,
} from "../../Actions/ProjectManagerFreelancerActions";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import searchIcon from "../../static/images/Icon_Search.svg";
import faceImg from "../../static/images/profile-placeholder.png";
import COUNTRIES from '../../constants/countryListWithCodes'
import ReactCountryFlag from "react-country-flag"
import loadMoreSrc from "../../static/images/loadMore.gif";
import NODataFoundImg from "./../../static/images/noDataFound.png"

class ProjectManagerCompletedContracts extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      searchItem: "",
    }
  }


  render() {
    const { completedContracts } = this.props;

    return (
      <div className="">
        <div className="">
          <div className="tf_all_search_filter">
            <div className="col-md-12 px-0">
              <div className="input-group">
                <div className="input-group-addon1">
                  <img src={searchIcon} alt="search" />
                </div>
                <div className="tf_search">
                  <form>
                    <input
                      type="text"
                      className="form-control mn_input"
                      onChange={this.props.handleSearchChange}
                      placeholder="Search Contract"
                      value={this.props.searchItem}
                    />
                  </form>
                </div>
              </div>
            </div>


            {/* <div className="col-md-2">
                                  {
                                    contract.freelacer_picture ? (
                                      <img
                                        src={contract.freelacer_picture}
                                        className="contract-user-profile-image"
                                        alt="img"
                                      />
                                    ) : (
                                      <img
                                        src={faceImg}
                                        className="contract-user-profile-image"
                                        alt="img"
                                      />
                                    )
                                  }
                                </div> */}
          </div>
        </div>
        <div className="">

          <div className="active-all-contracts-list-view-strip-box">
            <div className="row">

              {(!isEmpty(completedContracts) || completedContracts.length > 0) ? (
                <div className="col-md-12">
                  <div className="projects__table-sec">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          {completedContracts.map((contract) => {
                            return (
                              <tr key={contract.id}>
                                <td>
                                  <Link to={`/contract-details/${contract.uuid}`}>
                                    <h5>{contract.title}</h5>
                                  </Link>

                                  <p>
                                    {contract.freelacer_name}{" "}
                                    <span className="active-contract-country-name">
                                      {
                                        contract && contract.freelacer_country &&
                                        <ReactCountryFlag
                                          countryCode={
                                            COUNTRIES.find(c => c.label ===
                                              contract.freelacer_country).value
                                            || 'US'
                                          }
                                          svg
                                          style={{
                                            width: '2em',
                                            height: '1.2em',
                                            marginRight: '10px',
                                            marginLeft: '10px',
                                            marginTop: '0px'
                                          }}
                                          title={'country'}
                                        />
                                      }

                                      {contract.freelacer_country}
                                    </span>
                                  </p>
                                </td>

                                <td>
                                  <p className="project-manager-payment-requested">
                                    <strong>
                                      $
                                      {contract.payment_mode === "fixed"
                                        ? `${parseFloat(contract.fixed_price_amount).toFixed(
                                          2
                                        )} - Fixed`
                                        : `${parseFloat(contract.hourly_rate).toFixed(2)} - Hourly`}
                                    </strong>
                                    {!isEmpty(contract.payment_requested)
                                      ? "- PAYMENT REQUESTED"
                                      : null}
                                  </p>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="noJobsFound">
                  <img src={NODataFoundImg} alt="" />
                  <p className="text-center all-job-posting-center">No completed Contract Found.</p>
                </div>
              )}

            </div>
          </div>
          {!this.props.hideShowMore && <button
            className="load_more_btn_find_work mt-20"
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contracts: state.contractsForHiringManager,
    issLoading: state.applicationIsLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContracts: () => dispatch(getContractsForHiringManager()),
    searchContracts: (query) => dispatch(searchContractsForHiringManager(query)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagerCompletedContracts)
