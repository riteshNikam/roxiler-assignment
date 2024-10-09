import { ProductTransaction } from "../models/productTransaction.model.js"

const getTransactionsController = async ( req, res, next ) => {
    try {
        const { month, page=1, perPage=10, search='' } = req.query
        const pageNum = parseInt(page, 10)
        const itemsPerPage = parseInt(perPage, 10)
        const monthNum = parseInt(month, 10)

        const searchQuery = search ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ]
        } : {};

        if (monthNum) {

            const totalRecordsPerMonth = await ProductTransaction.countDocuments({
                ...searchQuery,
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNum]
                },
            })

            const data = await ProductTransaction.find({
                ...searchQuery,
                $expr: {
                    $eq: [{$month: "$dateOfSale"}, monthNum]
                }
            })
            .skip((pageNum-1) * itemsPerPage)
            .limit(itemsPerPage)

            res.status(200).json({
                status: 200,
                message: `Data fetched successfully for month ${month}`,
                success: true,
                count: totalRecordsPerMonth,
                data: data,
            })
        } else {

            const data = await ProductTransaction.find(searchQuery)
            .skip((pageNum-1)*itemsPerPage)
            .limit(itemsPerPage)

            res.status(200).json({
                status: 200,
                message: 'Data fetched successfully',
                success: true,
                data: data,
                count: await ProductTransaction.countDocuments(searchQuery)
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `Error while fetching data ${error}`,
            success: false,
            data: null
        })
    }
}

export { getTransactionsController }
