import ItemOrder from "../models/itemOrder.model.js";
import Item from "../models/item.model.js";
import Order from "../models/order.model.js";


class Controller {

    //Create
    async createItemOrder(req, res) {
        const { quantity, ItemId, OrderId } = req.body;
        try {
            const item = await Item.findById(ItemId);
            if (!item) {
                res.status(400).json({ message: 'Invalid ItemId' });
                return;
            }

            const order = await Order.findById(OrderId);
            if (!order) {
                res.status(400).json({ message: 'Invalid OrderId' });
                return;
            }

            const itemOrder = await ItemOrder.create({
                quantity,
                ItemId: item,
                OrderId: order,
            });

            res.status(201).json({ message: 'ItemOrder created successfully', itemOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to create order' });
        }
    };

    //get by id
    async getItemOrderById(req, res) {
        const { id } = req.params;
        try {
            const itemOrder = await ItemOrder.findById(id)
                .populate('ItemId')
                .populate('OrderId');
            if (!itemOrder) {
                res.status(404).json({ message: 'ItemOrder not found' });
                return;
            }
            res.status(200).json({ message: 'ItemOrder:', itemOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to create ItemOrder' });
        }
    };

    //get All
    async getItemOrders(req, res) {
        try {
            const itemOrders = await ItemOrder.find()
                .populate('ItemId')
                .populate('OrderId');
            res.status(200).json({ message: 'ItemOrders:', itemOrders });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to create ItemOrder' });
        }
    };

    //Update
    async updateItemOrder(req, res) {
        const { id } = req.params;
        const { quantity, ItemId, OrderId } = req.body;
        try {
            const itemOrder = await ItemOrder.findByIdAndUpdate(
                id,
                { quantity, ItemId, OrderId },
                { new: true }
            )
                .populate('ItemId')
                .populate('OrderId');
            if (!itemOrder) {
                res.status(404).json({ message: 'ItemOrder not found' });
                return;
            }
            res.status(200).json({ message: 'ItemOrder updated successfully', itemOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to create ItemOrder' });
        }
    };

    //delete
    async deletedItemOrder(req, res) {
        const { id } = req.params;
        try {
            const deletedItemOrder = await ItemOrder.findByIdAndDelete(id)
                .populate('ItemId')
                .populate('OrderId');
            if (!deletedItemOrder) {
                res.status(404).json({ message: 'ItemOrder not found' });
                return;
            }
            res.status(200).json({ message: 'ItemOrder deleted successfully', deletedItemOrder });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Unable to create ItemOrder' });
        }
    };

}

const controller = new Controller()
export default controller;
