import React from "react"
import { Link } from "react-router-dom"

const JobContainer = ({ title, data_count, link , container_number, type, handleClick , HandleJobContainerClick = () => {} }) => {
    return (
        <div className="dash-widget">
            <div className="dash-info">
                <div className="row">
                    <div className="col-md-8">
                        <div className="dash-widget-info">
                            {title}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={`icon-container-${container_number} icon-dashboard`}>
                            <i className={`fa fa-${type}`}></i>
                        </div>
                    </div>
                    <div className= {handleClick ? "col-md-12 text-center curserPointer" : "col-md-12 text-center" } onClick={HandleJobContainerClick}>
                        <div className="dash-widget-count">
                            
                            {data_count}
                        </div>
                    </div>
                </div>
            </div>
            <div className="dash-widget-more">
                <Link to={link} className="d-flex">View Details <i className="fa fa-arrow-right ms-auto"></i></Link>
            </div>
        </div>
    )
}

export default JobContainer