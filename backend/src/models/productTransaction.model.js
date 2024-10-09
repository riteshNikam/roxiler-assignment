import mongoose, { Schema } from "mongoose";

const ProductTransactionSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        image: {
            type: String
        },
        sold: {
            type: Boolean,
        },
        dateOfSale: {
            type: Date
        }
    }
)

export const ProductTransaction = mongoose.model('ProductTransaction', ProductTransactionSchema)
