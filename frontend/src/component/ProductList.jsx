import { useEffect, useState } from "react";
import axios from "axios";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { checkNextPage } from "../store/paginationSlice";
import { checkPrevPage } from "../store/paginationSlice";
import Pagination from "./Pagination";

const ProductList = () => {

    const [ products, setProducts ] = useState([])
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.pagination)

    const parameters = {}

    if (pagination.month >= 1 && pagination.month <= 12) {
        parameters.month = pagination.month
    }
    parameters.page = pagination.page
    parameters.perPage = pagination.perPage
    parameters.search = pagination.search
    const prevPage = parameters.page > 1 ? true : false

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/transactions/', {params: parameters})
        .then(
            response => {
                setProducts(response.data.data)
                dispatch(checkNextPage({
                    type: "pagination/checkNextPage",
                    nextPage: ( response.data.count > ( parameters.page * parameters.perPage ) ) ? true : false
                }))
                dispatch(checkPrevPage({
                    type: "pagination/checkPrevPage",
                    prevPage
                }))
            }
        )
    },
    [pagination])

    return (
        <>
            <Pagination />
            <div className="">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50"> 
                        <tr>
                            <th scope="col" className="px-6 py-3 border">id</th>
                            <th scope="col" className="px-6 py-3 border">title</th>
                            <th scope="col" className="px-6 py-3 border">price</th>
                            <th scope="col" className="px-6 py-3 border">description</th>
                            <th scope="col" className="px-6 py-3 border">category</th>
                            <th scope="col" className="px-6 py-3 border">sold</th>
                            <th scope="col" className="px-6 py-3 border">image</th>
                            <th scope="col" className="px-6 py-3 border">date of sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((value, index) => {
                                const date = new Date(value.dateOfSale).toISOString().split('T')[0]

                                return (<tr className="bg-white border-b" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border">{value.id}</th>
                                    <td className="px-6 py-4 border">{value.title}</td>
                                    <td className="px-6 py-4 border">{value.price?.toFixed(2)}</td>
                                    <td className="px-6 py-4 border">{value.description}</td>
                                    <td className="px-6 py-4 border">{value.category}</td>
                                    <td className="px-6 py-4 border text-2xl">{value.sold ?
                                     <span className="flex justify-center text-green-700"><BsCheckCircleFill /></span> : <span className="flex justify-center text-red-700"><BsXCircleFill /></span>}
                                    </td>
                                    <td><img src={value.image} alt={value.title} className="px-6 py-4" /></td>
                                    <td className="px-6 py-4 border">{date}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination />
        </>
    )
}

export default ProductList;
