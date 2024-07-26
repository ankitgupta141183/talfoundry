import React  from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
// import { values } from 'lodash';
ChartJS.register(...registerables);
const AdminBarGraph = ({ProfileVIew}) => {
    // console.log(ProfileVIew , "ProfileVIew");
    const Dates = Object.keys(ProfileVIew)
    const total_managers = Object.values(ProfileVIew)
    const ChartData = {
        labels: Dates,
        datasets: [{
            type: "bar",
            borderColor:"#3a6e8a",
            lineTension: 0.1,
            data: total_managers,
            backgroundColor: "#3a6e8a",
            fill: true,
        },
    ]

    }
    total_managers.push(10)
    return (
        <div className='admin-overview-graph'>
            <Chart data={ChartData} height={100} options={{
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
                            usePointStyle: false,
                            // boxWidth: 10
                          },
                        display: false,  //This will do the task
                     },
                   
                },
    

            }} />
        </div>
    )
}

export default AdminBarGraph;