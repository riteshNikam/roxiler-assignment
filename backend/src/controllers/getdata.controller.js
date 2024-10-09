import axios from "axios";
import { DATA_URL } from "../../constants.js";
import { ProductTransaction } from "../models/productTransaction.model.js";


const getdataController = async ( req, res, next ) => {
    try {
        axios.get(DATA_URL)
        .then(
            async data => {
                await ProductTransaction.deleteMany({})

                const items = data.data.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    sold: item.sold,
                    dateOfSale: new Date(item.dateOfSale)
                })
                )

                ProductTransaction.insertMany(items)
                
                res.status(200).json({
                    status: 200,
                    message: 'Third party data initialized successfully.',
                    success: true,
                    data: await ProductTransaction.find({}),
                })
            }
        )
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error while initializing data',
            success: false,
            data: null,
        })
    }
}

export { getdataController };
