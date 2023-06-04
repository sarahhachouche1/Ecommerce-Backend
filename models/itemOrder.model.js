import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import Item from './item.model.js'
import Order from './order.model.js'

const ItemOrderSchema = new Schema(
    {
        quantity: {
            type: Number,
        },
        ItemId: {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        },
        OrderId: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        }
    },

    {
        timestamps: true,
    }

);

const ItemOrder = model('ItemOrder', ItemOrderSchema);
export default ItemOrder;