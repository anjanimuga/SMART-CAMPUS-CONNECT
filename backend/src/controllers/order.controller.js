const Order = require("../models/order.model");
const Food = require("../models/food.model");

// CREATE ORDER
exports.createOrder = async (req, res) => {

  try {

    const order = await Order.create(req.body);

    // REDUCE STOCK
    for (const item of req.body.items) {

      const food = await Food.findById(item._id);

      if (!food) continue;

      food.stock = food.stock - item.quantity;

      if (food.stock <= 0) {

        food.stock = 0;
        food.available = false;

      }

      await food.save();

    }

    res.status(201).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// GET ORDERS
exports.getOrders = async (req, res) => {

  try {

    const role = req.headers.role;
    const userId = req.headers.userid;

    let orders;

    if (role === "admin") {

      orders = await Order.find().sort({
        createdAt: -1,
      });

    } else {

      orders = await Order.find({
        userId: userId,
      }).sort({
        createdAt: -1,
      });

    }

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// GET ACTIVE ORDER
exports.getActiveOrder = async (req, res) => {

  try {

    const userId = req.headers.userid;

    const order = await Order.findOne({
      userId: userId,
      status: { $ne: "Completed" },
    }).sort({
      createdAt: -1,
    });

    if (!order) {

      return res.json(null);

    }

    res.json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// UPDATE STATUS
exports.updateOrderStatus = async (req, res) => {

  try {

    const updateData = {
      status: req.body.status,
    };

    if (req.body.status === "Completed") {

      updateData.pickedUpAt =
        new Date().toLocaleString();

    }

    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

    res.json(updatedOrder);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

};