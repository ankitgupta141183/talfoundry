import React, { useEffect, useState } from 'react';
import userSvg from '../../../static/images/user.svg';
import webSvg from '../../../static/images/outline-language-24px.svg';
import launchSvg from '../../../static/images/baseline-launch-24px.svg';
import uploadSvg from '../../../static/images/outline-save_alt-24px.svg';
import Logo from '../../../static/images/logo/logo.png';
import favIcon from "../../../static/images/logo_old.png"
import Loader from "react-loader-spinner";


import './ProfileSettingTabs.css';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralSettingGET, GeneralSettingUpdate, GeneralSettingUpdateAction } from '../../../Actions/AdminSettingAction/AdminSettingAction';

const GeneralSetting = () => {
    const GeneralSetting = useSelector(state => state.AdminSettingState)
    const [generalInputValue, setGeneralInputValue] = useState(GeneralSetting.GENERALSETTING)
    const [fieldError, setFieldError] = useState({})
    const [isLoding , setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GeneralSettingGET())
        setIsLoading(true)
    }, [])
    useEffect(() => {
        setGeneralInputValue(GeneralSetting.GENERALSETTING)
        if (GeneralSetting.UpdateValue) {
            // console.log(GeneralSetting.UpdateValue, "GeneralSetting.UpdateValue");
            dispatch(GeneralSettingGET())
            dispatch(GeneralSettingUpdateAction(""))
         
        }
        setIsLoading(false)
    }, [GeneralSetting])


    const handleChange = (e) => {
        setGeneralInputValue({ ...generalInputValue, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        const target = e.target.name;
        console.log(target, e.target.name);
        let file = e.target.files[0];
        // let fileName = file.name;
        if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {

            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                var img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    var w = this.width;
                    var h = this.height
                    if (this.width > 200 && this.height > 50 && target === "logo" ) {
                        setFieldError({ [target + "TypeError"]: true, message: "File size is too laege." })
                    } else {
                        setFieldError({ ...fieldError, [target + "TypeError"]: false })
                        setGeneralInputValue({ ...generalInputValue, [target]: event.target.result })
                    }
                }


            }
        } else {
            console.log("this is else run");
            setFieldError({ ...fieldError, [target + "TypeError"]: true, message: "You must upload an image in the given format." })
            //   this.setState({ [target + "TypeError"]: true })
        }
    }

    const handleUpdate = () => {
        // GeneralSettingUpdATE
        dispatch(GeneralSettingUpdate(generalInputValue))
        setTimeout(()=>{
        setIsLoading(true)
        },300)
    }

    const fieldErrorMessase = (message) => {
        return (
            <p id="firstName" className="error-field">
                {message ? message : "This field can't be blank."}
            </p>
        )
    }
    return (
        <div>
            <div className="col-md-12 p-0 mb-4" id="general-setting">
                {
                    isLoding ? <div className="grid-loader">
                    <Loader type="Grid" color="#00BFFF" height={100} width={100} />
                </div>
                    :<div className="row setting-page-input">
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Website Basic Details</h5>
                            </div>
                            <div>
                                <div className="col-md-12">
                                    <div className="input-group">
                                        <h4>Website Name </h4>
                                        <div className="input-group-addon">
                                            <img src={webSvg} alt="" />
                                        </div>
                                        <input type='text' value={generalInputValue?.website_name} name="website_name" onChange={handleChange} className="form-control mn_input" placeholder="Enter Website Name" />
                                    </div>
                                </div>
                                <div className="col-md-12 file-upload_container">
                                    <div className="input-group">
                                        <h4>Logo </h4>
                                        <div className="input-group-addon">
                                            <img src={webSvg} alt="" />
                                        </div>
                                        <div className="visible-input">
                                            <input type='file' className="form-control mn_input" name="logo" placeholder="" onChange={handleImage} />
                                            <img src={uploadSvg} className="upload-custom_btn" alt="" />
                                        </div>
                                        <p>Recommended image size is <b><i>200px x 50px</i></b></p>
                                        {fieldError?.logoTypeError &&
                                            fieldErrorMessase(fieldError?.message)}
                                        <div className='upload-img__area'>
                                            <img src={(generalInputValue?.logo?.url ? `${generalInputValue?.logo?.url}` : generalInputValue?.logo) || generalInputValue?.logo || Logo} alt='Logo Url' />
                                            <i className='fa fa-close'></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 file-upload_container">
                                    <div className="input-group">
                                        <h4>Favicon </h4>
                                        <div className="input-group-addon">
                                            <img src={userSvg} alt="" />
                                        </div>
                                        <div className="visible-input">
                                            <input type='file' className="form-control mn_input" name="favicon" placeholder="" onChange={handleImage} />
                                            <img src={uploadSvg} className="upload-custom_btn" alt="" />
                                        </div>
                                        {fieldError?.faviconTypeError &&
                                            fieldErrorMessase(fieldError?.message)}
                                        <div className='upload-img__area'>
                                            <img src={(generalInputValue?.favicon?.url ? `${generalInputValue?.favicon?.url}` : generalInputValue?.favicon || favIcon)} alt='favicon image' />
                                            <i className='fa fa-close'></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 custom-flex">
                        <div className="custom-card">
                            <div className="mn_heading">
                                <h5 className="info_number">Address Details</h5>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Address Line 1 </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' value={generalInputValue?.add_line1} name="add_line1" onChange={handleChange} className="form-control mn_input" placeholder='Enter Address Line 1' />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="input-group">
                                    <h4>Address Line 2 </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' value={generalInputValue?.add_line2} name="add_line2" onChange={handleChange} className="form-control mn_input" placeholder='Enter Address Line 2' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group">
                                    <h4>City  </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' value={generalInputValue?.city} name="city" onChange={handleChange} className="form-control mn_input" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group">
                                    <h4>State/Province </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <select className="form-control mn_input">
                                        <option>City1</option>
                                        <option>City2</option>
                                        <option>City3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group">
                                    <h4>Zip/Postal Code </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <input type='text' value={generalInputValue?.zip} name="zip" onChange={handleChange} className="form-control mn_input" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group">
                                    <h4>Country </h4>
                                    <div className="input-group-addon">
                                        <img src={launchSvg} alt="" />
                                    </div>
                                    <select className="form-control mn_input">
                                        <option>Country1</option>
                                        <option>Country2</option>
                                        <option>Country3</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                                <button className="btn-blue">Update</button>
                                <button className="btn-black">Cancel</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-12 text-center">
                        <button className="btn-blue" onClick={handleUpdate}>Update</button>
                        <button className="btn-black">Cancel</button>
                    </div>
                </div>
                }
                
            </div>
        </div>
    );
}

export default GeneralSetting