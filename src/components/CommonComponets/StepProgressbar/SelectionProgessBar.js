import React from "react";
import StepProgressbar from "./StepProgressbar";
function SelectionProgessBar(props) {
    const { handleSideBarClick, visitedSteps = ["step1"], completedSteps = [], steps = [] } = props
    return (
        <div className="row p-0" id="step-wizard-for-post-a-job" style={{ position: 'relative' }}>
            <div className="steps-container d-flex bg-white mr-15">
                <div className="col-md-12 m-auto bg-white">
                    <div className="row bs-wizard">

                        {
                            steps?.map((stepItem, index) => {
                                return (
                                    <React.Fragment key={stepItem.step || index}>
                                    <StepProgressbar
                                        step={stepItem.step}
                                        section={stepItem.section}
                                        visitedSteps={visitedSteps}
                                        text={stepItem.text}
                                        handleClick={handleSideBarClick}
                                        completedSteps={completedSteps}
                                        iconClassName={stepItem.iconClassName}
                                        lastStep={stepItem.lastStep || false}
                                        number={`0${(index +1)}` }
                                    />
                                    </React.Fragment>
                                )
                            })
                        }
                        {/* First Icon Container End */}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SelectionProgessBar