import { ProductTransaction } from "../models/productTransaction.model.js";

const bargraphController = async (req, res, next) => {
    try {
        const { month } = req.query
        const monthNum = parseInt(month, 10)
        const priceRanges = {
            '0 - 100': 0,
            '101 - 200': 0,
            '201 - 300': 0,
            '301 - 400': 0,
            '401 - 500': 0,
            '501 - 600': 0,
            '601 - 700': 0,
            '701 - 800': 0,
            '801 - 900': 0,
            '901 - above': 0
        }

        if (monthNum) {
            const items = await ProductTransaction.find({
                $expr: {
                    $eq: [{$month: "$dateOfSale"}, monthNum]
                },
            })

            items.forEach((value) => {
                if (value.price >= 0 && value.price <= 100) {
                    priceRanges['0 - 100'] += 1
                } else if (value.price >= 101 && value.price <= 200) {
                    priceRanges['101 - 200'] += 1
                } else if (value.price >= 201 && value.price <= 300) {
                    priceRanges['201 - 300'] += 1
                } else if (value.price >= 301 && value.price <= 400) {
                    priceRanges['301 - 400'] += 1
                } else if (value.price >= 401 && value.price <= 500) {
                    priceRanges['401 - 500'] += 1
                } else if (value.price >= 501 && value.price <= 600) {
                    priceRanges['501 - 600'] += 1
                } else if (value.price >= 601 && value.price <= 700) {
                    priceRanges['601 - 700'] += 1
                } else if (value.price >= 701 && value.price <= 800) {
                    priceRanges['701 - 800'] += 1
                } else if (value.price >= 801 && value.price <= 900) {
                    priceRanges['801 - 900'] += 1
                } else {
                    priceRanges['901 - above'] += 1
                }
            })

            res.status(200).json({
                status: 200,
                success: true,
                message: "Bar graph data fetched successfully.",
                data: priceRanges
            })
        } else {
            const items = await ProductTransaction.find({})

            items.forEach((value) => {
                if (value.price >= 0 && value.price <= 100) {
                    priceRanges['0 - 100'] += 1
                } else if (value.price >= 101 && value.price <= 200) {
                    priceRanges['101 - 200'] += 1
                } else if (value.price >= 201 && value.price <= 300) {
                    priceRanges['201 - 300'] += 1
                } else if (value.price >= 301 && value.price <= 400) {
                    priceRanges['301 - 400'] += 1
                } else if (value.price >= 401 && value.price <= 500) {
                    priceRanges['401 - 500'] += 1
                } else if (value.price >= 501 && value.price <= 600) {
                    priceRanges['501 - 600'] += 1
                } else if (value.price >= 601 && value.price <= 700) {
                    priceRanges['601 - 700'] += 1
                } else if (value.price >= 701 && value.price <= 800) {
                    priceRanges['701 - 800'] += 1
                } else if (value.price >= 801 && value.price <= 900) {
                    priceRanges['801 - 900'] += 1
                } else {
                    priceRanges['901 - above'] += 1
                }
            })

            res.status(200).json({
                status: 200,
                success: true,
                message: "Bar graph data fetched successfully.",
                data: priceRanges
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Unable to fetch bar graph data.",
            data: null
        })
    }
}

export { bargraphController }
