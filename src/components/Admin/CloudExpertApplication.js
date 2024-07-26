import React, {Component} from "react";
import AdminDashboard from "./AdminDashboard";

class CloudApplication extends Component {
  render () {
    return <AdminDashboard history={this.props.history} location={this.props.location}/>
  }
}

export default CloudApplication
