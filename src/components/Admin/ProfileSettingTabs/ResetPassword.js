import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePMPassword } from "../../../Actions/ProjectManagerFreelancerActions";
import passwordLogo from "../../../static/images/password.svg";
import UpdateDetailsSweetAlert from "../../Common/updateDetailsSweetAlert/updateDetailsSweetAlert";


const ResetPassword = () => {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [passwords, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [passWordError, setPasswordError] = useState({
        currentPasswordError: false,
        newPasswordError: false,
        confirmPasswordError: false,
        passwordPolicy: true,
        isPassMatch: true,
    })
    const [isRequested, setIsRequested] = useState({ status: false, message: "", statusType: "success" })
    console.log(currentUser , "currentUser");



    const handleChange = (e) => {
        setPassword({ ...passwords, [e.target.name]: e.target.value })
    }

    const ResetInputField = () => {
        setPassword({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
        setPasswordError({
            currentPasswordError: false,
            newPasswordError: false,
            confirmPasswordError: false,
            passwordPolicy: true,
            isPassMatch: true,
        })
    }

    const updatePassword = () => {
        const { currentPassword, newPassword, confirmPassword } = passwords;
        const data = {
            user: {
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            },
        }
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%])(?=.{8,})")
        if (
            strongRegex.test(newPassword) &&
            currentPassword !== "" &&
            confirmPassword !== "" &&
            newPassword !== "" &&
            newPassword === confirmPassword
        ) {
            setDisableSubmit(true)
            dispatch(updatePMPassword(currentUser.uuid, data)).then((res) => {
                if (res.status === 200) {
                    setIsRequested({ status: true, message: "Password Reset successfully.", statusType: "success" })
                    ResetInputField()
                } else {
                    console.log(res.response.data, "res.response.data");
                    setIsRequested({ status: true, message: res.response.data?.message[0], statusType: "error" })
                }
                setDisableSubmit(false)
            })
        } else {
            setPasswordError({
                currentPasswordError: currentPassword === "",
                newPasswordError: newPassword === "",
                confirmPasswordError: confirmPassword === "",
                passwordPolicy: strongRegex.test(newPassword),
                isPassMatch: newPassword === confirmPassword,
            })
        }
    }

    const fieldError = (message) => {

        return (
            <p id="firstName" className="error-field">
                {message ? message : "This field can't be blank."}
            </p>
        )
    }
    const hideAlert = () => {
        setIsRequested({ status: false, message: "" })
    }


    return (
        <div>
            {isRequested.status && <UpdateDetailsSweetAlert hideAlert={hideAlert} alertDetails={isRequested} />}
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                <div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Reset Your Password</h5>
                            </div>
                            <div>
                                <div className="tf-forgot-password">
                                    <div className="col-md-12">
                                        <div className="input-group resetpassword-first-row">
                                            <h4>Current Password</h4>
                                            <div className="input-group-addon">
                                                <img src={passwordLogo} alt="password" />
                                            </div>
                                            <input
                                                type="password"
                                                onChange={handleChange}
                                                name="currentPassword"
                                                className="form-control mn_input"
                                                id="current_password"
                                                placeholder="Current Password"
                                                value={passwords.currentPassword}
                                            />
                                            {passWordError.currentPasswordError && fieldError()}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <h4>New Password</h4>
                                            <div className="input-group-addon">
                                                <img src={passwordLogo} alt="password" />
                                            </div>
                                            <input
                                                type="password"
                                                onChange={handleChange}
                                                className="form-control mn_input"
                                                name="newPassword"
                                                id="newPassword"
                                                placeholder="New Password"
                                                value={passwords.newPassword}
                                            />
                                            {passWordError.newPasswordError
                                                ? passWordError.newPasswordError && fieldError()
                                                : !passWordError.passwordPolicy &&
                                                fieldError(
                                                    "Make sure it's at least 8 characters including a number, a lowercase & uppercase letter and a special character."
                                                )}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <h4>Confirm Password</h4>
                                            <div className="input-group-addon">
                                                <img src={passwordLogo} alt="password" />
                                            </div>
                                            <input
                                                type="password"
                                                onChange={handleChange}
                                                className="form-control mn_input"
                                                name="confirmPassword"
                                                id="confirm_password"
                                                placeholder="Confirm Password"
                                                value={passwords.confirmPassword}
                                            />
                                            {passWordError.confirmPasswordError && fieldError()}
                                            {!passWordError.isPassMatch &&
                                                fieldError("Password does not match.")}
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group edit-setting">
                                            <button
                                                disabled={disableSubmit}
                                                className="btn-blue"
                                                onClick={updatePassword}
                                            >
                                                Save
                                            </button>
                                            <button
                                                name="passwordEdit"
                                                className="btn-black"
                                                onClick={ResetInputField}
                                            >
                                                Cancel
                                            </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword;