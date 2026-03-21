import stripe from "../config/stripe.js";
import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";

export const createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shipping, currency, status } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), //convert to rupees
      currency: currency || "inr",
      automatic_payment_methods: { enabled: true },
    });

    //Save order in DB
    const newOrder = new Order({
      user: req.user._id,
      products,
      amount,
      tax,
      shipping,
      currency: currency || "inr",
      status: status || "Pending",
      stripePaymentIntentId: paymentIntent.id,
    });

    await newOrder.save();

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      dbOrder: newOrder,
    });
  } catch (error) {
    console.error("❌ Error in create Order:", error);
    res.status(500).json({
      success: false,
      mesage: error.mesage,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "PaymentIntent ID missing",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Received PaymentIntentId:", paymentIntentId);

      const order = await Order.findOne({
        stripePaymentIntentId: paymentIntentId,
      });

      console.log("Order found:", order);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found for this payment",
        });
      }

      order.status = "Paid";
      await order.save();

      await Cart.findOneAndUpdate(
        { user: req.user._id },
        { $set: { items: [], totalPrice: 0 } },
      );

      return res.json({
        success: true,
        message: "Payment Successful",
        orderId: order._id,
        order,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment not completed",
    });
  } catch (error) {
    console.error("❌ Error in verify Payment:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      })
      .populate("user", "firstName lastName email");

    orders.forEach((order) => {
      order.products = order.products.filter((p) => p.productId);
    });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.log("Error fetching user orders: ", error);
    res.status(500).json({ message: error.message });
  }
};

//Admin Only
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; //userId will come from URL

    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName productPrice productImg",
      })
      .populate("user", "firstName lastName email"); //fetch user info

    orders.forEach((order) => {
      order.products = order.products.filter((p) => p.productId);
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error fetching user order:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName email") //populate user info
      .populate("products.productId", "productName productPrice"); //populate product info

    orders.forEach((order) => {
      order.products = order.products.filter((p) => p.productId);
    });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalOrders = await Order.countDocuments({ status: "Paid" });

    // Total Sales
    const totalSaleAgg = await Order.aggregate([
      {
        $match: { status: "Paid" },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalSales = totalSaleAgg[0]?.total || 0;

    // Sales grouped by date( last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesByDate = await Order.aggregate([
      { $match: { status: "Paid", createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedSales = salesByDate.map((item) => ({
      date: item._id,
      amount: item.amount,
    }));

    res.json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
      sales: formattedSales,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
