import { useDispatch, useSelector } from "react-redux";
import { toggleMonth, toggleDashboard, setSearchString } from "../store/paginationSlice";
import { useState } from "react";

const FormComponent = () => {
    const dispatch = useDispatch()
    const pagination = useSelector(state => state.pagination)

    return (
        <>
            <div className="flex bg-gray-100 items-center h-12 justify-between px-6">
                <div>
                    { 
                    pagination.dashboard ? <button className="border rounded-lg border-green-700 bg-green-700 font-bold text-white h-8 px-5" onClick={ () => {
                        dispatch(toggleDashboard({
                            type: "pagination/toggleDashboard",
                            dashboard: false
                        }))
                    } }>Product List</button> : <button className="border rounded-lg border-green-700 bg-green-700 font-bold text-white h-8 px-5" onClick={ () => {
                        dispatch(toggleDashboard({
                            type: "pagination/toggleDashboard",
                            dashboard: true
                        }))
                    } }>Dashboard</button>
                    }
                </div>
                <div className="flex bg-gray-100 justify-between items-center">
                    <div className="flex">
                        <div className={`mr-4 ${ pagination.dashboard ? "invisible" : "visible"}`}>
                            <label htmlFor="" className="mr-4">Search: </label>
                            <input type="text" name="" id="" className="h-10 border outline-none px-2 rounded-lg" onChange={ event => setTimeout(() => {
                                dispatch(setSearchString({
                                    type: "pagination/setSearchString",
                                    search: event.target.value
                                }))
                            }, 2000) }/>
                        </div>
                        <div>
                            <label htmlFor="" className="mr-4">Month: </label>
                            <select name="" id="" defaultValue={3} className="h-10 border bg-white px-2 rounded-lg" onChange={ event => dispatch(toggleMonth({
                                type: "pagination/toggleMonth",
                                month: event.target.value
                            })) }>
                                <option value={13}>All Months</option>
                                <option value={1}>January</option>
                                <option value={2}>February</option>
                                <option value={3}>March</option>
                                <option value={4}>April</option>
                                <option value={5}>May</option>
                                <option value={6}>June</option>
                                <option value={7}>July</option>
                                <option value={8}>August</option>
                                <option value={9}>September</option>
                                <option value={10}>October</option>
                                <option value={11}>November</option>
                                <option value={12}>December</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default FormComponent;
