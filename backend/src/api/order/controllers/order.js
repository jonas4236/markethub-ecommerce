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
    const { cartData } = ctx.request.body;

    const lineItems = await Promise.all(
      cartData?.data?.map(async (product) => {
        // const item = await strapi
        //   .service("api::product.product")
        //   .findOne(product.id);

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
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
      });

      await strapi.service("api::order.order").create({
        data: {
          cartData,
          stripeId: session.id,
        },
      });

      return { stripeSession: session };
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.statusText = err;
      console.log("error from order backend:", err);
    }
  },
}));
