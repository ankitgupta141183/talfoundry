import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { BreadCrumbAction } from "../../../Actions/BreadCrumbAction"
const NewBreadCrumb = ({ lable }) => {
    const BreadCrumbSteps = useSelector(states => states.BreadCrumbSteps)

    const dispatch = useDispatch()
    const [pathName, setPathName] = useState("/")
    const location = useLocation();
    // console.log(lable);

    useEffect(() => {
        const LocalStoB_C_S = JSON.parse(localStorage.getItem("BreadCrumb"))
        dispatch(BreadCrumbAction(LocalStoB_C_S))
        setPathName(location.pathname)
    }, []) // react-hooks/exhaustive-deps
    useEffect(() => {
        const LocalStoB_C_S = JSON.parse(localStorage.getItem("BreadCrumb"))

        if (LocalStoB_C_S && LocalStoB_C_S[LocalStoB_C_S.length - 1].link !== location.pathname) {
            const cloneSteps = [...BreadCrumbSteps]
            const BreadCrumbName = cloneSteps.map(value => value.BreadCrumbName)
            // console.log(BreadCrumbName);
            const SideBarTab =  ["Clients" , "CLOUD EXPERTS" , "Job Post" , "Transaction" , "User / Exec" ,  "Reports" , "Platforms" ,"Roles" ,"Settings" ,  "Notifications"]

            if (BreadCrumbName.includes(lable)) {
                const nameIndex = cloneSteps.findIndex(value => value.BreadCrumbName === lable)
                cloneSteps.splice(nameIndex + 1, cloneSteps.length)

            } else if (SideBarTab.includes(lable)) {
                cloneSteps.splice(1, 2)
                cloneSteps.push({ BreadCrumbName: lable, link: location.pathname })
            } else {
                cloneSteps.push({ BreadCrumbName: lable, link: location.pathname })

            }
            let wwww = JSON.stringify(cloneSteps)
            localStorage.setItem("BreadCrumb", wwww)
            setPathName(location.pathname)
            // console.log(cloneSteps);
            dispatch(BreadCrumbAction(cloneSteps))

            // setBreadCrumbSteps(cloneSteps)
        }
    }, [location]) // react-hooks/exhaustive-deps
    // console.log(pathName , "ppppppp");

    const Redirectlink = (link)  => ((pathName !== "/") || (pathName !== link)) && link
    return (
        <nav aria-label="breadcrumb" className="bg-breadcrumb">
            <ol className="breadcrumb container">
                {/* <li className="breadcrumb-item active" aria-current="page"><Link to={(pathName !=="/") && "/"} ><i className="fa fa-home"></i>&nbsp;Home</Link></li> */}
                {
                    BreadCrumbSteps.map((value, index) => {
                        return (
                            <li key={index} className="breadcrumb-item active" aria-current="page"><Link to={Redirectlink(value.link)} ><i className={value.BreadCrumbName === "Home" ? "fa fa-home" : ""}></i>&nbsp;{value.BreadCrumbName}</Link></li>
                        )
                    })
                }
            </ol>
        </nav>
    )
}

export default NewBreadCrumb