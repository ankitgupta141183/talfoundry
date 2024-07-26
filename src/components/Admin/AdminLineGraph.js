import React  from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
// import { values } from 'lodash';
ChartJS.register(...registerables);
const AdminLineGraph = ({ProfileVIew}) => {
    // console.log(ProfileVIew , "ProfileVIew");
    const Dates = Object.keys(ProfileVIew?.total_cloud_experts)
    const total_cloud_experts = Object.values(ProfileVIew?.total_cloud_experts)
    const total_managers = Object.values(ProfileVIew?.total_managers)
    const ChartData = {
        labels: Dates,
        datasets: [{
            type: "line",
            label: "Managers",
            borderColor:"#ff5b37",
            lineTension: 0.4,
            data: total_managers,
            backgroundColor: "#ffc9bd",
            fill: true,
        },
        {
            type: "line",
            label: "Cloud Experts",
            borderColor:"#feb019",
            data: total_cloud_experts ,
            backgroundColor: "#fed1a6",
            fill: true,
            lineTension: 0.4
        },
    ]

    }
    total_managers.push(10)
    return (
        <div className='admin-overview-graph'>
            <Chart data={ChartData} height={200} options={{
                responsive: true,
                // maintainAspectRatio: false,
                plugins:{
                    tooltip:{
                        usePointStyle: true,
                        // boxWidth:10
                        // position:"top"
                    },
                    title:{
                        display:true,
                        text:"",
                        font:{size:24}
                    },
                    legend: {
                        labels: {
                            usePointStyle: true,
                            // boxWidth: 10
                          },
                        // display: true, //This will do the task
                     },
                   
                },
    

            }} />
        </div>
    )
}

export default AdminLineGraph;