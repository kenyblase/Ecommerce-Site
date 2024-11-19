import Order from "../models/orderModels.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const bankDetails = {
      accountName: process.env.ACCOUNT_NAME,
      accountNumber: process.env.ACCOUNT_NUMBER,
      bankName: process.env.BANK_NAME
    };

    res.status(200).json({
      message: 'Checkout session created',
      bankDetails
    });

  } catch (error) {
    console.log('Error in createCheckoutSession Controller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body

    // Save transaction to the database for tracking purposes
    const order = new Order({
      user: req.user._id,
      products: products?.map(product => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price
      })),
      totalAmount
    });

    await order.save();

    res.status(200).json({
      message: 'Order created successfully',
      orderId: order._id,
    });

  } catch (error) {
    console.log('Error in createOrder Controller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getContactNumber = async(req, res)=>{
  res.json({
     contactNumber: process.env.CONTACT_NUMBER, // Contact number for transaction confirmation
  })
}
