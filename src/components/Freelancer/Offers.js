import React, {Component} from "react";
import {} from '../../Actions/freelancerActions';
import { connect } from "react-redux";
import TimeAgo from 'react-timeago';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {getOffersForFreelancer} from '../../Actions/freelancerActions';

const itemsCountPerPage = 5;

class Offers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isLoading: false,
      activePage: 1
    }
  }
  componentDidMount() {
    this.props.getOffers()
  }

  componentWillReceiveProps(nextProps){
    this.setState({isLoading: nextProps && nextProps.applicationIsLoading})
  }
  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber})
    window.scrollTo(0, 0);
  }

  render() {
    const {submittedProposals} = this.props;
    const {activePage} = this.state;
    let proposals = JSON.parse(JSON.stringify((submittedProposals))).splice( activePage === 1 ? 0 : ((activePage - 1)*itemsCountPerPage), itemsCountPerPage)

    return (
      <div>
        <div className="col-md-12">
          <h2>Submitted proposals ({submittedProposals.length})</h2>
        </div>
        <div className="clearfix"></div>
        <hr/>
        {!isEmpty(submittedProposals) ? proposals.map((proposal) => {
          const proposalDate = new Date(proposal.created_at)
          return <div key={proposal.id}>
              <div className="col-md-3 col-sm-4">
                <div className="tf_pro_offers">
                  <p>Sent on { `${proposalDate.toLocaleString('default', { month: 'short' })} ${proposalDate.getDate()}, ${proposalDate.getFullYear()}`}</p>
                  <p>{<TimeAgo date={new Date(proposal.created_at).toUTCString()}/>}</p>
                </div>
              </div>
              <div className="col-md-9 col-sm-8">
                <div className="tf_pro_offers1">
                  <Link to={{pathname: `/proposal-details/${proposal.uuid}`}}><h4>{proposal.job_title}</h4></Link>
                  <p>{proposal.client_name}</p>
                </div>
              </div>
              <div className="clearfix"></div>
              <hr/>
            </div>
        }) : <p className="col-md-9 col-sm-8">No proposals received yet.</p>
        }
        <div className="tf_pagenation submitted-proposals">
          <div className="col-lg-5 col-md-4 col-sm-4"></div>
            <div className="col-lg-7 col-md-8 col-sm-8">
              {
                (!isEmpty(submittedProposals) && submittedProposals.length > 0) ? (
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={submittedProposals.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    prevPageText="Previous"
                    nextPageText="Next"
                  />
                ) : null
              }
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {

  return {
    getOffers: () => dispatch(getOffersForFreelancer())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Offers)
