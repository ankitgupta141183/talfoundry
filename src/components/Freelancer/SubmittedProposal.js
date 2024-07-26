import React, { Component } from "react";
import { connect } from "react-redux";
import TimeAgo from 'react-timeago';
import { isEmpty } from 'lodash';
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { getManagerArchives } from '../../Actions/projectManagerArchiveActions';
import questionIcon from '../../static/images/question.png';
import CertificateTitle from "../../static/images/certification-required.png";

const itemsCountPerPage = 5;

class SubmittedProposal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      activePage: 1
    }
  }
  componentDidMount() {
    let type = ""
    this.props.getManagerArchives(type)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: nextProps && nextProps.applicationIsLoading })
  }
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber })
    window.scrollTo(0, 0);
  }

  render() {
    const { managerArchives, proposalIsLoading } = this.props;
    const { activePage } = this.state;
    let proposals = JSON.parse(JSON.stringify((managerArchives))).splice(activePage === 1 ? 0 : ((activePage - 1) * itemsCountPerPage), itemsCountPerPage)

    return (
      <div className="submitted_proposals_container">
        {/* <div className="col-md-12">
          <h2>
            Submitted proposals ({managerArchives.length}) {" "}

            <a data-tip="tooltip" data-type="warning" data-place="right" data-for='proposals'>
              <img
                style={{ height: "20px", width: "20px" }}
                src={questionIcon}
                alt="que"
              />
              <ReactTooltip id="proposals">These are proposals you sent which have not yet received a reply.</ReactTooltip>
            </a>
          </h2>
        </div> */}
        {/* <div className="clearfix"></div> */}
        {/* <hr /> */}
        {proposalIsLoading && <div className="grid-loader col-md-3 col-sm-4">
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
        </div>}
        <div className="projects__table-sec">
          <table className="table">
            {(!isEmpty(managerArchives) &&
              <thead className="bg-light">
                <tr>
                  <th>Job Title</th>
                  <th>Received Date</th>
                  <th>Cloud Expert</th>
                  <th>Status</th>
                </tr>
              </thead>)}
            <tbody>
              {(!isEmpty(managerArchives) && !proposalIsLoading) ? proposals.map((proposal) => {
                const proposalDate = new Date(proposal.created_at)
                return <tr key={proposal.id}>
                  <td className="">
                    <div className="tf_pro_offers1">
                      <Link to={{ pathname: `/proposal-details/${proposal.uuid}` }}>
                        <p>
                          <b>
                            {proposal.job_title}
                            {proposal.certified_job ? <img src={CertificateTitle} alt="" title="Certification Required" className="certification-required" /> : ''}
                          </b>
                        </p></Link>
                    </div>
                  </td>
                  <td className="">
                    <div className="tf_pro_offers">
                      <p>Sent on {`${proposalDate.toLocaleString('default', { month: 'short' })} ${proposalDate.getDate()}, ${proposalDate.getFullYear()}`}</p>
                      <p>{<TimeAgo date={new Date(proposal.created_at).toUTCString()} />}</p>
                    </div>
                  </td>
                  <td className="">
                    <p className="job-manager-proposal-client-name1">{proposal.client_name}</p>
                  </td>
                  <td className="">
                    <p className="job-manager-proposal-client-status">{proposal.status}</p>
                  </td>
                </tr>
              }) :
                <tr>
                  <td colSpan='4'>
                    <p className="">No proposals received yet.</p>
                  </td>
                </tr>

              }
            </tbody>
          </table>

        </div>
        <div className="clearfix"></div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {

  return {
    getManagerArchives: (type) => dispatch(getManagerArchives(type))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubmittedProposal)
