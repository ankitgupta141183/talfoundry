import React, {Component} from "react";
import {Link} from 'react-router-dom';


export default class JobFilter extends Component {

    constructor(props){
        super(props)
        this.state = {
            job_pay_type: 'all',
            job_status: 'All'
        }
    }

    handleFilter = (e) => {
     switch(e.target.name){
         case 'jobType':
          this.setState({job_pay_type: e.target.id}, () => {
            this.props.handleFilter(this.state)
           })
          break;

         case 'status':
          this.setState({job_status: e.target.id}, () => {
            this.props.handleFilter(this.state)
           })
          break;
     }
    }

    UNSAFE_componentWillUnmount(){
        this.setState({
            job_pay_type: 'all',
            job_status: 'All'
        })
    }


    handleReset = () => {
        this.setState({
            job_pay_type: 'all',
            job_status: 'All'
          }, () => {
            this.props.handleFilter(this.state)
           })
    }


    render(){
        const {job_pay_type,job_status} = this.state
        return(
            <div className="col-md-12">
                            <div id="all-job-postings-filter" className={this.props.handleToggle ? '':'collapse'}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <h4 className="filter-heading">Posted By</h4>
                                            <div className="input-group ">
                                                <div className="selectedwrap">
                                                    <select className="form-control mn_input posted-by-filter-dropdown" disabled>
                                                    <option>All coworkers</option>
                                                    <option>What primary school did you attend?</option>
                                                    <option>In what town or city was your first full time job?</option>
                                                    <option>In what town or city did you meet your spouse/partner?</option>
                                                    <option>What is your spouse or partner's mother's maiden name?</option>
                                                    <option>What time of the day were you born? (hh:mm)</option>
                                                    </select>
                                                </div>
                                            </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className="filter-heading">visibility</h4>
                                        <div className="">
                                            <input type="radio" name="visibility-radio-group" id="visibility-all" disabled />
                                            <label htmlFor="visibility-all">All </label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="visibility-radio-group" id="visibility-invite-only" disabled />
                                            <label htmlFor="visibility-invite-only">Invite-only</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="visibility-radio-group" id="visibility-public"  disabled/>
                                            <label htmlFor="visibility-public">Public</label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <h4 className="filter-heading">Job Status</h4>
                                        <div className="">
                                            <input
                                               type="radio"
                                               onClick={this.handleFilter}
                                               name="status"
                                               id="All"
                                               checked={job_status === "All" } />
                                            <label htmlFor="All">All </label>
                                        </div>
                                        <div className="">
                                            <input
                                              type="radio"
                                              onClick={this.handleFilter}
                                              name="status"
                                              id="new"
                                              checked={job_status === "new" } />
                                            <label htmlFor="new">New</label>
                                        </div>
                                        <div className="">
                                            <input
                                              type="radio"
                                              onClick={this.handleFilter}
                                              name="status"
                                              id="active"
                                              checked={job_status === "active" } />
                                            <label htmlFor="active">Active</label>
                                        </div>
                                        <div className="">
                                            <input
                                             type="radio"
                                             onClick={this.handleFilter}
                                             name="status"
                                             id="completed"
                                             checked={job_status === "completed" }
                                             />
                                            <label htmlFor="completed">Completed</label>
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <h4 className="filter-heading">Pay Type</h4>
                                        <div className="">
                                            <input
                                               type="radio"
                                                name="jobType"
                                                id="all"
                                                onClick={this.handleFilter}
                                               checked={job_pay_type === "all" }  />
                                            <label htmlFor="all">All </label>
                                        </div>
                                        <div className="">
                                            <input
                                               type="radio" name="jobType" id="Pay by hour"
                                                onClick={this.handleFilter} checked={job_pay_type === "Pay by hour" }/>
                                            <label htmlFor="Pay by hour">Pay by hour</label>
                                        </div>
                                        <div className="">
                                            <input
                                               type="radio" name="jobType" id="Pay a fixed price" onClick={this.handleFilter}
                                                checked={job_pay_type === "Pay a fixed price" }/>
                                            <label htmlFor="Pay a fixed price">Pay a fixed price</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <Link className="close-fiter-button" onClick={() => this.props.handleFilterToggle()}>Close Filter</Link>
                                    <div className='col-sm-8'> </div>
                                    <Link className="close-fiter-button" onClick={() => this.handleReset()}>Reset Filter</Link>
                                </div>
                            </div>
                        </div>
            )
    }
}