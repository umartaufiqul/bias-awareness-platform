import React, {Component} from "react"
import { Scatter } from "react-chartjs-2"

var scatter_data = {
    labels: ['Scatter1', 'Scatter2'],
    datasets: [
        {
            backgroundColor: 'rgba(75,192,192,0.6)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointBackgroundColor: '#fff',
            label: 'Toxic speech',
            pointRadius: 5,
            data: []
        },
        {
            backgroundColor: 'rgba(56, 135, 111, 0.6)',
            pointBorderColor: 'rgba(56, 135, 111,1)',
            pointHoverBackgroundColor: 'rgba(56, 135, 111,1)',
            pointHoverBorderColor: 'rgba(56, 135, 111,1)',
            pointBackgroundColor: '#fff',
            label: 'Non-Toxic speech',
            pointRadius: 5,
            data: [
            ]
        }
    ]
}

const option = {
    scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false,
                color: "#131c2b"
            },
            scaleLabel: {
                display: true,
                labelString: 'Toxicity probability',
            },
            ticks: {
                suggestedMin: 0,
                maxTicksLimit: 5,
                suggestedMax: 1
            }  
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: false,
                color: "#131c2b"
            },
            scaleLabel: {
                display: true,
                labelString: 'AAE dialect probability',
            },
            ticks: {
                suggestedMin: 0,
                maxTicksLimit: 5,
                suggestedMax: 1
            }  
        }]
    }
}
class ScatterChart extends Component {

    componentDidMount() {
        this.getResult()
    }
    getResult() {
        fetch('/classifier').then(res => res.json()).then(data => {
            var toxic = []
            var nontoxic = []
            data.toxicity.map((element, index) => {
                if (element > 0.5) {
                    toxic.push({x: element, y: data.dialect[index]})
                } else {
                    nontoxic.push({x: element, y: data.dialect[index]})
                }
            })
            scatter_data.datasets[0].data = toxic
            scatter_data.datasets[1].data = nontoxic
            console.log(scatter_data)
        })
    }
    render() {
        return (
            <div className='text-center'>
                <Scatter data={scatter_data} options={option} height={250}/>
            </div>
        )
    }
}

export default ScatterChart