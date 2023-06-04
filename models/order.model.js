import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import Item from './item.model.js';

const orderSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        building: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        Q: {
            type: Number,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        ItemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },

        UserId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },

    {
        timestamps: true,
    }

);

const Order = model('Order', orderSchema);
export default Order;