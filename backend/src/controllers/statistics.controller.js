import { ProductTransaction } from "../models/productTransaction.model.js";

const getStatsController = async (req, res, next) => {
    try {
        const { month } = req.query
        const monthNum = parseInt(month, 10)
        
        if (monthNum) {
            const result = await ProductTransaction.aggregate([
                {
                    $match: {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, monthNum]
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
                        totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                        totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                    }
                }
            ])

            res.status(200).json({
                status: 200,
                message: 'Stats fetched successfully.',
                success: true,
                data: result
            })
        } else {
            const result = await ProductTransaction.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSaleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
                        totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                        totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                    }
                }
            ])

            res.status(200).json({
                status: 200,
                message: 'Stats fetched successfully.',
                success: true,
                data: result
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: `Something went wrong. ${error}`,
            success: false,
        })
    }
    
}

export { getStatsController }
