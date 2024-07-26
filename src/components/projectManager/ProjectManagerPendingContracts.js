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


class ProjectManagerPendingContracts extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      searchItem: "",
    }
  }


  render() {
    const { pendingContracts } = this.props;
    // console.log(pendingContracts.length)
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


          </div>
        </div>

        <div className="col-md-12 p-0">
          <div className="p-4 bg-white box-shadow">
            <div className="projects__table-sec">
              {!isEmpty(pendingContracts) ?
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="bg-light">
                        <th>Cloud Expert</th>
                        <th>Country</th>
                        <th>Title</th>
                        <th>Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingContracts.map((contract) => {
                        return (
                          <tr key={contract.id}>
                            <td className="table-profile-img" id="">
                              <span>
                                {/* {
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
                              }&nbsp;&nbsp; */}
                                {contract.freelacer_name}{" "}
                              </span>
                            </td>
                            <td>
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
                            </td>
                            <td className="">
                              <div className="">
                                <div className="">
                                  <Link to={`/contract-details/${contract.uuid}`}>
                                    <h5>{contract.title}</h5>
                                  </Link>
                                </div>
                              </div>

                            </td>
                            <td>
                              <div className="">
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
                              </div>

                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                : !this.props.isLoading && (
                  <div className="noJobsFound">
                    <img src={NODataFoundImg} alt="" />
                    <p className="text-center all-job-posting-center">No Pending Contract Found.</p>
                  </div>
                )}
            </div>


            {!this.props.isLoading && !this.props.hideShowMore && <button
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagerPendingContracts)
