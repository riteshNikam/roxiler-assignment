import { BsCaretLeftFill } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../store/paginationSlice";

const Pagination = () => {

    const dispatch = useDispatch()
    const pagination = useSelector(state => state.pagination)
    
    const handlePrevPage = () => {
        dispatch(prevPage({
            type: "pagination/prevPage"
        }))
    }
    const handleNextPage = () => {
        dispatch(nextPage({
            type: "pagination/nextPage"
        }))
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex h-12 w-96 items-center justify-between">
                    <button className="text-lg" onClick={ handlePrevPage } disabled={ !pagination.prevPage }><BsCaretLeftFill /></button>
                    <h4>Page: { pagination.page }</h4>
                    <button className="text-lg" onClick={ handleNextPage } disabled={ !pagination.nextPage }><BsCaretRightFill /></button>
                </div>
            </div>
        </>
    )
}

export default Pagination
