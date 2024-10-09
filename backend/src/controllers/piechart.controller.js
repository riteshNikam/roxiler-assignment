import { ProductTransaction } from "../models/productTransaction.model.js";

const getpiechartdata = async (req, res, next) => {
    try {
        const { month } = req.query 
        const monthNum = parseInt(month, 10)
        const categoryCounts = {}

        if (monthNum) {

            const items = await ProductTransaction.find({
                $expr: {
                    $eq: [ { $month: "$dateOfSale" }, monthNum ]
                }
            })

            items.forEach((value) => {
                if (!categoryCounts[value.category]) {
                    categoryCounts[value.category] = 0
                }
                categoryCounts[value.category] += 1
            })

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Pie chart data fetched successfully.',
                data: categoryCounts
            })
        } else {
            const items = await ProductTransaction.find({})

            items.forEach((value) => {
                if (!categoryCounts[value.category]) {
                    categoryCounts[value.category] = 0
                }
                categoryCounts[value.category] += 1
            })

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Pie chart data fetched successfully.',
                data: categoryCounts
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Unable to fetch pie graph data.',
            data: null
        })
    }
}

export { getpiechartdata }
