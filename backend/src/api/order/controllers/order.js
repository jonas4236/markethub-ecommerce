// @ts-nocheck
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);

("use strict");
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    // @ts-ignore
    const { cartData, email, total } = ctx.request.body;

    const lineItems = await Promise.all(
      cartData?.data?.map(async (product) => {
        return {
          price_data: {
            currency: "thb",
            product_data: {
              name: product?.attributes.title,
              images: [product?.attributes.image],
            },
            unit_amount: product?.attributes.price * 100,
          },
          quantity: product?.attributes.quantity,
        };
      })
    );

    try {
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["TH"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/?success=false`,
        line_items: lineItems,
      });


      // push data from frontend to database (order).
      await strapi.service("api::order.order").create({
        data: {
          email: email,
          products: cartData,
          stripeId: session.id,
          total: total,
        },
      });

      const responseData = {
        sessionId: session.id,
        sessionUrl: session.url,
        success: true,
        stripeSession: session,
      };

      ctx.response.body = responseData;
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.statusText = err;
      console.log("error from order backend:", err);
    }
  },
}));
