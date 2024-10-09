import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";

const Content = () => {

    const pagination = useSelector(state => state.pagination)

    return (
        <>
            {
                pagination.dashboard ? <Dashboard /> : <ProductList />
            }
        </>
    )
}

export default Content;
