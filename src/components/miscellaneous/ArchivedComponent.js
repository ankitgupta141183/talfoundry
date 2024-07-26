// @HiredFreelancers.js
// * This component used as a container to display archived proposals on both freelancer and project manager side.

import React, {Component} from "react";
import questionIcon from '../../static/images/question.png';
import {getManagerArchives} from '../../Actions/projectManagerArchiveActions';
import { connect } from "react-redux";
import TimeAgo from 'react-timeago';
import Loader from "react-loader-spinner";
import {isEmpty} from 'lodash';
import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class ArchivesContainer extends Component {

  componentDidMount() {
    this.props.getManagerArchives("archived")
  }

  render() {
    const {managerArchives, currentUser} = this.props;

    return (
      <div className="tf_freelancer_pro tf_hr1">


         <div id="archived-proposals-container">
        <div className="col-md-12">
          <h2>Archived proposals ({managerArchives.length}) {" "}
            <a data-tip="tooltip" data-type="warning" data-place="right"  data-for='archived'>
              <img
                style={{ height: "20px", width: "20px" }}
                src={questionIcon}
                alt="que"
                />
                <ReactTooltip id="archived">This screen displays all of your archived proposals.</ReactTooltip>
              </a>
            </h2>
        </div>
        <div className="clearfix"></div>
        <hr/>
        {
          !isEmpty(managerArchives) ? managerArchives.map((archive, idx) => {
            const archiveDate = new Date(archive.archived_at)
            const pathname = currentUser.role === "Project Manager" ? `/freelancer-proposal/${archive.uuid}/${archive.job_uuid}` : `/proposal-details/${archive.uuid}`;
            return <React.Fragment key={idx}>
              <div className="projects__table-sec">
                <table className="table">
                  <tbody>
                    <tr>
                    <td className="">
                      <div className="tf_pro_offers1">
                        <Link to={{pathname: pathname, state: {isarchive: true, archiveId: archive.id, jobUuid: archive.job_uuid}}}><h4>{archive.job_title}</h4></Link>
                      </div>
                    </td>
                    <td><p className="m-0">{archive.client_name}</p></td>
                    <td className="">
                      <div className="tf_pro_offers">
                        <p>Archived on { `${archiveDate.toLocaleString('default', { month: 'short' })} ${archiveDate.getDate()}, ${archiveDate.getFullYear()}`}</p>
                        <p>{<TimeAgo date={new Date(archive.archived_at).toUTCString()}/>}</p>
                      </div>
                    </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="clearfix"></div>
              <hr/>
            </React.Fragment>
          }) : this.props.isLoading ? (
            <div className="grid-loader my-feed-loader col-md-12">
              <Loader type="Grid" color="#00BFFF" height={100} width={100} />
            </div>
          ) : <p className="text-center">No items to display.</p>
        }


        </div>
      </div>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      managerArchives: state.managerArchives,
      isLoading: state.applicationIsLoading,
      currentUser: state.currentUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      getManagerArchives: (type) => dispatch(getManagerArchives(type)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ArchivesContainer)
