import React from "react"
import { Link } from "react-router-dom"
const BreadCrumb = ({ step0,step1, step2 , link , step3, step4 , step5, tab , step , redirect, nextLink }) => {
    return (
        <nav aria-label="breadcrumb" className="bg-breadcrumb">
        <ol className="breadcrumb container">
            {step0 && <li className="breadcrumb-item active" aria-current="page"><i className="fa fa-home"></i>&nbsp;Home</li>}
        { step1 && <><li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
           <li className="breadcrumb-item active" aria-current="page">{tab === "CE" ? "Find Work" :"Hire"}</li>
          <li className="breadcrumb-item active" aria-current="page">{link}</li></>}
          {step2 && <><li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
           <li className="breadcrumb-item active" aria-current="page">{ tab === "CE" ? "My Contracts" : "Manage"}</li>
          <li className="breadcrumb-item active" aria-current="page">{link}</li></>}
          {step3 && <><li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
           <li className="breadcrumb-item active" aria-current="page">Payment</li>
          <li className="breadcrumb-item active" aria-current="page">{link}</li></>}
          {step4 && <><li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{link}</li></>}
          {step5 && <><li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
           <li className="breadcrumb-item active" aria-current="page">{tab === "CE" ?"My Contracts" :"Setting" }</li>
          <li className="breadcrumb-item active" aria-current="page">{link}</li></>}
          {
            step === "step6" &&<>
            <li className="breadcrumb-item"><Link to="/"><i className="fa fa-home"></i>&nbsp;Home</Link></li>
           {/* <li className="breadcrumb-item active" aria-current="page"></li> */}
           {nextLink ? <>
            <li className="breadcrumb-item" aria-current="page"><Link to={redirect}>{link}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{nextLink}</li>
           </>
           :
           <li className="breadcrumb-item active" aria-current="page">{link}</li>
           }
            </>
          }
        </ol>
      </nav>
    )
}

export default BreadCrumb