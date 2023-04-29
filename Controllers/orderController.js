const Order = require("../Model/orderModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const { uuid } = require("uuidv4");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox
// middleware
const makeOrder = asyncHandler(async (req, res) => {
  const order = req.query;
  console.log(order);
  // res.json("user created")
  //   const OrderExists = await Order.findOne(order.tran_id);
  //   if (OrderExists) {
  //     res.status(422).json({
  //       error: "Order already exists",
  //       token: generateToken(OrderExists._id),
  //       OrderExists,
  //     });
  //     throw new Error("User already exists");
  //   }
  const dataId = uuid();
  const data = {
    //need to change the price according to the serviceInfo
    serviceId: "",
    total_amount: 99.99,
    currency: "BDT",
    tran_id: dataId, // use unique tran_id for each api call
    success_url:
      "https://devhiveserver.vercel.app/order/success?transactionId=" + dataId,
    fail_url: "https://devhiveserver.vercel.app/order/fail",
    cancel_url: "https://devhiveserver.vercel.app/order/cancel",
    ipn_url: "https://devhiveserver.vercel.app/order/ipn",
    shipping_method: "Online",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: order.cus_name,
    cus_id: order.cus_id,
    cus_email: order.cus_email,
    cus_add1: order.cus_add1,
    cus_add2: order.cus_add1,
    cus_city: order.cus_city,
    cus_state: order.cus_city,
    cus_postcode: order.cus_postcode,
    cus_country: order.cus_country,
    cus_phone: order.cus_phone,
    cus_fax: order.cus_phone,
    ship_name: order.cus_name,
    ship_add1: order.cus_add1,
    ship_add2: order.cus_add1,
    ship_city: order.cus_city,
    ship_state: order.cus_city,
    ship_postcode: order.cus_postcode,
    ship_country: order.cus_country,
    paid: false,
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    const newOrder = Order.create(data);
    console.log(newOrder);
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
    console.log("Redirecting to: ", GatewayPageURL);
    console.log(data);
  });
});

const orderStatus = async (req, res) => {
  const { transactionId } = req.query;
  console.log("transId is: ", transactionId);
  try {
    const order = await Order.updateOne(
      { tran_id: transactionId },
      { $set: { paid: true } }
    );
    console.log(order);
    // res.send(order);
    if (order.modifiedCount > 0) {
      res.redirect(
        `https://devhiveclient.vercel.app/checkout/success?transactionId=${transactionId}`
      );
      return;
    }
    res.redirect(
      `https://devhiveclient.vercel.app/checkout/fail?transactionId=${transactionId}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
    res.redirect(
      `https://devhiveclient.vercel.app/checkout/fail?transactionId=${transactionId}`
    );
  }
};

module.exports = {
  makeOrder,
  orderStatus,
};
