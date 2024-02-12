// @ts-nocheck
"use strict";

/**
 * cart Controller
 */
const { createCoreController } = require("@strapi/strapi").factories;
const { entityService } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::cart.cart", ({ strapi }) => ({
  async deleteCartByUsername(ctx) {
    const { username } = ctx.params;

    try {
      const cartsToDelete = await strapi.entityService.findMany(
        "api::cart.cart",
        {
          filters: { username: username },
        }
      );

      if (!cartsToDelete.length) {
        return ctx.send("No carts found for the given username.");
      }

      // get data from cartsToDelete and map.
      const result = cartsToDelete.map((cart) => cart.id);

      // delete item all item in database (cart) 
      await strapi.entityService.deleteMany("api::cart.cart", {
        id: result,
      });

      // return ctx.send("Carts deleted successfully.");
      return ctx.send(`cart deleted successfully: ${result}`);
    } catch (error) {
      console.error(error);
      return ctx.badRequest(`Failed to delete carts: ${error}`);
    }
  },
}));
