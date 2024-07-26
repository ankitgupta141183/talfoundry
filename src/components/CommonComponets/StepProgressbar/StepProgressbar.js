import React from "react";
import { Link } from "react-router-dom";
import "./StepProgressbar.css"

function StepProgressbar(props) {
    const { step, section, visitedSteps, text, handleClick, completedSteps, iconClassName, lastStep = false , number } = props

    return (
        <div className={visitedSteps.includes(step) ?
            "bs-wizard-step"
            :
            "bs-wizard-step not-visited"} id={section}>
            <div className="text-center bs-wizard-stepnum">
            </div>
            <Link
                data-step={step}
                onClick={visitedSteps.includes(step) ? (e) => { e.preventDefault(); handleClick(step) } :
                    ''}>
                <h3 style={{ fontSize: '14px', marginTop: '-10px' }}><span>{number}</span>&nbsp;{text}</h3>
            </Link>
            <Link
                data-step={step}
                onClick={visitedSteps.includes(step) ? (e) => { e.preventDefault(); handleClick(step) } : ''}
                className={completedSteps.includes(step) ? "bs-wizard-dot complete" : "bs-wizard-dot visited"}>
                {
                    completedSteps.includes(step) ?
                        <i className="fa fa-check" aria-hidden="true"> </i>
                        :
                        <i className={iconClassName} aria-hidden="true"></i>
                }
            </Link>
            {
                !lastStep && <>
                    <div className={visitedSteps.includes(step) ? "progress step-done progress-small" : "progress progress-small"}>
                        <div className="progress-bar"></div>
                    </div>
                    <div className={completedSteps.includes(step) ? "progress step-done" : "progress"}>
                        <div className="progress-bar"></div>
                    </div>
                </>
            }

        </div>
    )

}

export default StepProgressbar
