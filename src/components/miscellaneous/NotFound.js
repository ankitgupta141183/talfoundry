import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div id="notfound">
  <div className="notfound">
    <h2>Error 404</h2>
    <div className="notfound-404">404</div>
    <center><Link to="/">Return to Home Page</Link></center>
  </div>
</div>
)
export default NotFound;