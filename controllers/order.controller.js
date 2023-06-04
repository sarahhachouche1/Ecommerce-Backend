import Order from "../models/order.model.js"
import ItemOrder from '../models/itemOrder.model.js'
import Item from '../models/item.model.js'

class Controller {
    async createOrder(req, res) {
        try {
            const { firstName, lastName, email, phone, country, city, state, street, building, Q, size, ItemId } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !email || !phone || !country || !city || !state || !street || !building || !Q || !size || !ItemId) {
                return res.status(400).json({ message: 'Please fill in all required fields.' });
            }

            // Retrieve the item and calculate the total
            const item = await Item.findById(ItemId);
            const quantity = Q;

            // Check if there is enough stock
            if (quantity > item.stock) {
                return res.status(400).json({ message: 'This item is out of stock.' });
            }

            const price = item.price;
            const total = quantity * price;

            // Update the stock of the item
            item.stock -= quantity;
            await item.save();

            // Create new order and save it
            const newOrder = new Order({
                firstName,
                lastName,
                email,
                phone,
                country,
                city,
                state,
                street,
                building,
                Q,
                size,
                total,
                ItemId
            });
            const savedOrder = await newOrder.save();


            // Create new item order and save it
            const newItemOrder = new ItemOrder({
                OrderId: savedOrder._id,
                ItemId,
                quantity
            });
            await newItemOrder.save();

            // Populate the Item field of the saved order and send response
            const populatedOrder = await savedOrder.populate('ItemId');
            res.status(200).json({ message: `Order Created successfully`, populatedOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to create order.' });
        }
    }

    async getOrderById(req, res) {
        const { id } = req.params

        try {
            const order = await Order.findById(id).populate('ItemId');
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async updateOrder(req, res) {
        const { id } = req.params;
        const { firstName, lastName, email, phone, country, city, state, street, building, Q, size, total, ItemId } = req.body;

        try {
            const updatedOrder = await Order.findByIdAndUpdate(id, { firstName, lastName, email, phone, country, city, state, street, building, Q , size, total, ItemId }, { new: true }).populate('ItemId');
            res.status(200).json({ message: `Updated successfully`, updatedOrder });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deletedOrder(req, res) {
        try {
            const { id } = req.params;

            const deletedOrder = await Order.findByIdAndRemove(id).populate('ItemId');
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json({ message: `Deleted successfully `, deletedOrder });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async getOrders(req, res) {
        try {
            const orders = await Order.find().populate('ItemId');
            res.status(200).json(orders);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

}
const controller = new Controller()
export default controller;

