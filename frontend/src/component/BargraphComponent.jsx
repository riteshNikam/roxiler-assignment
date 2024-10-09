import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)


const BargraphComponent = () => { 

    const [bargraphData, setBargraphData] = useState({})
    const pagination = useSelector(state => state.pagination)
    const parameters = {}

    if (pagination.month >= 1 && pagination.month <= 12) {
        parameters.month = parseInt(pagination.month)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/bargraph/', {params: parameters})
        .then(
            response => {
                setBargraphData(response.data.data)
            }
        )
    }, [ pagination ]);

    return (
        <>
            <div className="flex justify-center mt-10">
                <div style={{height: "700px", width:"700px"}}>
                    <Bar options={{}} data={
                        {
                            labels: Object.keys(bargraphData),
                            datasets: [
                                {
                                    label: 'Count',
                                    data: Object.values(bargraphData),
                                    backgroundColor: '#006BFF'
                                }
                            ]
                        }
                    }></Bar>
                </div>
            </div>
        </>
    )
}

export default BargraphComponent;
