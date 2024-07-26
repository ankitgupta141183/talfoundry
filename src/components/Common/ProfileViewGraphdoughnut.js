import React, { useEffect, useState }  from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { values } from 'lodash';
ChartJS.register(...registerables);
const ProfileViewGraphdoughnut = ({ProfileVIew , type}) => {
    const [ProfileData , setProfileData] = useState("")
    // console.log(ProfileVIew ,"---ProfileVIew---" , type);
    useEffect(()=>{
        if(type === "CE"){
            setProfileData({proposal_count : ProfileVIew.proposal_count ,offer_count :ProfileVIew.offer_count , invite_count : ProfileVIew.invite_count , my_jobs_count : ProfileVIew.my_jobs_count })
        }else{
            console.log("this is run");
            setProfileData({proposal_count : ProfileVIew.proposal_count ,offer_count : ProfileVIew.jobs_posted , invite_count : ProfileVIew.invite_count , my_jobs_count : ProfileVIew.my_job_count })
        }
    },[])
    
    let Total_Count = ProfileData.proposal_count + ProfileData.offer_count + ProfileData.invite_count + ProfileData.my_jobs_count
    Total_Count = Total_Count === 0 ? 1 : Total_Count
    
    const proposal_count = [ProfileData.proposal_count , Total_Count - ProfileData.proposal_count]
    const offer_count = [ProfileData.offer_count , Total_Count - ProfileData.offer_count]
    const invite_count = [ProfileData.invite_count, Total_Count - ProfileData.invite_count ]
    const my_jobs_count = [ProfileData.my_jobs_count , Total_Count - ProfileData.my_jobs_count]
    const ChartData = {
        datasets: [
        {
            type: "doughnut",
            data: type === "CE"? invite_count : offer_count,
            backgroundColor: [
                'rgb(123, 70, 190)',
                'lightgray',
              ],
              
        },
        {
            type: "doughnut",
            data: proposal_count,
            backgroundColor: [
                'rgb(250, 108, 164)',
                'lightgray',
              ],
        },
        {
            type: "doughnut",
            data: type === "CE"? offer_count : invite_count ,
            backgroundColor: [
                'rgb(250, 205, 58)',
                'lightgray',
              ],
        },
        {
            type: "doughnut",
            data: my_jobs_count,
            backgroundColor: [
                'rgb(36, 192, 220)',
                'lightgray',
              ],
        },
        ]
    }
    return (
        <div style={{ height: "250px" }}>
            <Chart data={ChartData} options={{
                responsive: true,
                maintainAspectRatio: false,
               
                plugins:{
                    // tooltip: {
                    //     callbacks : {
                    //         label : function(context){
                    //             console.log(context ,"----doughnut-----");
                    //         }
                    //     }
                    //   },
                    title:{
                        display:true,
                        text:"",
                        font:{size:24}
                    },
                    legend: {
                        display: false //This will do the task
                     },
                    
                }

            }} />
        </div>
    )
}

export default ProfileViewGraphdoughnut;