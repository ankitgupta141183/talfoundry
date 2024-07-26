import React  from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'
// import { values } from 'lodash';
ChartJS.register(...registerables);
const ProfileViewGraph = ({ProfileVIew}) => {
    const Dates = Object.keys(ProfileVIew)
    const Viewers = Object.values(ProfileVIew)
    const ChartData = {
        labels: Dates,
        datasets: [{
            type: "line",
            label: "",
            borderColor:"#0da4de",
            data: Viewers,
            backgroundColor:"#bdecf4",
            lineTension: 0.4,
            fill:true,
        },
        
    ]

    }
    Viewers.push(10)
    return (
        <div style={{ height: "450px" }}>
            <Chart data={ChartData} options={{
                responsive: true,
                maintainAspectRatio: false,
              
                plugins:{
                    title:{
                        display:true,
                        text:"",
                        font:{size:24}
                    },
                    legend: {
                        // labels: {
                        //     usePointStyle: true,
                        //     boxWidth: 10
                        //   },
                        display: false //This will do the task
                     },
                   
                }

            }} />
        </div>
    )
}

export default ProfileViewGraph;