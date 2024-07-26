import React  from "react";
import ReactCountryFlag from "react-country-flag";
import COUNTRIES from "../../../../constants/countryListWithCodes";
import Skills from "../../../Common/Skills";
import HireModal from "../HireModal/HireModal";

function CloudUserCard(props){
    const {freelancer , handleOPenModal , addFavourite ,  removeFavourite , ReadMore , job ,  modalIsOpen , closeModal ,
        subtitle , afterOpenModal , 
    } = props
    return (
        <div className="col-md-12" id={freelancer && freelancer.profile && freelancer.profile.uuid}>
        <div className="col-md-2 tf_full_width">
          <div className="tf_image">
                <img
                  className=""
                  src={freelancer?.profile?.profile_picture || faceImg }
                  alt="Cloud img"
                />
          </div>
        </div>
        {/* End Column 2 */}

        {/* Start Column 8 */}
        <div className="col-md-8">
          {/* Start Row */}
          <div className="row">
            <div className="col-md-10">
              <div className="row">
                {/* Start Cloud Expert Name */}
                <div className="col-md-6 p-0">
                  <Link
                    onClick={() => handleOPenModal(this, freelancer, idx)}
                  >

                    <h4>
                      {freelancer.full_name}

                      {/* { freelancer && freelancer.profile && freelancer.profile.is_certified && ( <img title="Certification Required" src={certification_required} alt="Certified" className="certification-required" /> )} */}
                    </h4>
                  </Link>
                </div>
                <div className="col-md-6">
                  <div className="">
                    <h5>
                      <strong>
                        {
                          freelancer && freelancer.profile &&
                          freelancer.profile.current_location_country &&
                          <ReactCountryFlag
                            countryCode={
                              COUNTRIES.find(c => c.label ===
                                freelancer.profile.current_location_country).value
                              || 'US'
                            }
                            svg
                            style={{
                              width: '2em',
                              height: '1.2em',
                              float: 'left',
                              marginLeft: '-2px',
                              marginRight: '20px'
                            }}
                            title={'country'}
                          />
                        }
                        {freelancer.profile &&
                          freelancer.profile.current_location_country}
                      </strong>
                    </h5>
                  </div>
                </div>
              </div>
              {/* End Cloud Expert Name */}
            </div>

            <div className="col-md-2">
              <div className="heart-fill add-to-favourite-container">
                {!freelancer.favorited_freelancer ? (
                  <Link
                    onClick={() => addFavourite(
                      this,
                      freelancer.id
                    )}
                    title="Favorited"
                  >
                    <i
                      className="fa fa-heart-o"
                      aria-hidden="true"
                    ></i>
                  </Link>
                ) : (
                  <Link
                    onClick={ () => removeFavourite(
                      this,
                      freelancer.id
                    )}
                    title="Favorited"
                  >
                    <i
                      className="fa fa-heart"
                      aria-hidden="true"
                    ></i>
                  </Link>
                )}
              </div>
            </div>

          </div>
          {/* End Row */}

          <div className="clearfix"></div>

          {/* Start Row */}
          <div className="row">
            {/* Start Column 6 */}
            <div className="col-md-6">
              <div className="">
                <h5>
                  <strong>
                    {freelancer &&
                      freelancer.profile &&
                      freelancer.profile.current_job_title}
                  </strong>
                </h5>
              </div>
            </div>
            {/* End Column 6 */}

          </div>
          {/* End Row */}

          {/* Start Description */}
          <div className="row project-manager-after-login-cloud-expert-description">

            <div className="col-md-12">
              {freelancer.profile ? (
                freelancer.profile.about_me && (
                  <ReadMoreAndLess
                    ref={ReadMore}
                    className="read-more-content"
                    charLimit={150}
                    readMoreText="Read more"
                    readLessText="Read less"
                  >
                    {freelancer.profile.about_me}
                  </ReadMoreAndLess>
                )
              ) : (
                <p></p>
              )}
            </div>


          </div>
          {/*End Description  */}

          {/* Start Skills */}
          {
            freelancer.profile.skill.length > 0 &&
            <Skills
              skill={freelancer.profile.skill}
              to={`/user-profile/${freelancer.profile && freelancer.profile.user && freelancer.profile.user.uuid}/true`}
              id={freelancer.uuid}
              displayCount={5}
            />
          }
          {/* End Skills */}

        </div>
        {/* End Column 8 */}

        {/* Start Column 2 */}
        <div className="col-md-2 text-center">

          {/* Start Hourly Rate */}
          <div className="">
            {
              freelancer.profile &&
                freelancer.profile.hourly_rate ? (
                <h5>
                  <strong>
                    $
                    {isNaN(freelancer.profile.hourly_rate)
                      ? "00"
                      : parseFloat(
                        freelancer.profile.hourly_rate
                      ).toFixed(2)}{" "}
                    / hr
                  </strong>
                </h5>
              ) : (
                <h5><strong>$0.00 / hr</strong></h5>
              )}
          </div>
          {/* End Hourly Rate */}

          {/* Start Hiring Button */}
          <div className="">
            {
              !isEmpty(job) &&
                !isEmpty(job.user) &&
                !isEmpty(job.user.payment_method) ? (

                <div className="hire-cloud-expert-button-search-list">
                  <Link to={{
                    pathname: `/hire-a-freelancer/${freelancer.uuid}/${job.uuid}`,
                    state: { fromManager: true },
                  }}
                  >
                    Hire Cloud Expert
                  </Link>
                </div>

              )
                :
                (
                  <div className="hire-cloud-expert-button-search-list">
                    <Link
                      to={{
                        pathname: "/settings",
                        state: "payMethodPresent",
                      }}
                    >
                      Hire Cloud Expert
                    </Link>
                  </div>
                )
            }
            <HireModal 
            modalIsOpen={modalIsOpen}
            afterOpenModal={afterOpenModal}
            closeModal={closeModal}
            subtitle={subtitle}
            />
          </div>
          {/* End Hiring Button */}

          {/* Start Invite Job */}
          <div className="invite-to-job-button-search-list">
            <div className="">
              <Link
                href="#"
                onClick={inviteFreelancer.bind(this, freelancer)}>
                Invite To Job
              </Link>
            </div>
          </div>
          {/* End Invite Job  */}

          {/* Start Earning  */}
          <div className="">
            <div className="">
              <h5><strong>${freelancer.amount_earned}k earned</strong></h5>
            </div>
          </div>
          {/* End Earning  */}






        </div>
        {/* End Column 2 */}


        <div className="clearfix"></div>


        <div className="col-md-12 mb-10">
        </div>

        <div className="clearfix"></div>

      </div>
    )

}


export default CloudUserCard