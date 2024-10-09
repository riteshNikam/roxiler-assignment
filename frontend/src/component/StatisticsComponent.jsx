import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StatisticsComponent = () => {

    const pagination = useSelector(state => state.pagination)
    const [ stats, setStats ] = useState([])
    const parameters = {}

    if (pagination.month >= 1 && pagination.month <= 12) {
        parameters.month = parseInt(pagination.month, 10)
    }


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/stats/', { params: parameters })
        .then(
            response => {
                setStats(response.data.data[0])
            }
        )
    }, [pagination])

    return (
        <>
            <div className="flex justify-around h-12 items-center border">
                <h1 className="mr-6 text-xl">Total sales amount: { stats.totalSaleAmount?.toFixed(2) }</h1>
                <h1 className="mr-6 text-xl">Total sold items: { stats.totalSoldItems }</h1>
                <h1 className="mr-6 text-xl">Total not sold items: { stats.totalNotSoldItems }</h1>
            </div>
        </>
    )
}

export default StatisticsComponent