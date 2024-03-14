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

  async updateStock(ctx) {
    const { username } = ctx.params;
    const { dataStockQuantity } = ctx.request.body;

    // filters find product in cart to see which product have username equal with params "username".
    try {
      const findUser = await strapi.entityService.findMany("api::cart.cart", {
        filters: { username: username },
      });

      // if not found return this if\else.
      if (!findUser.length) {
        return ctx.send("No carts found for the given username.");
      }

      // get data from findUser and map for finding primary key(id) of product from cart.
      const stock = findUser.map((cart) => cart.pdId);

      // getting primary key(id) from product api.
      const idOfProduct = await strapi.entityService.findMany(
        "api::product.product",
        {
          filters: {
            id: stock,
          },
        }
      );

      // map data from idOfProduct to find the stock number of each product.
      const stockQuantity = idOfProduct.map((product) => product.Stock);
      // const stockValues = [10, 20, 30];

      // use for loop ทำการ loop update stock ที่ละครั้งจนกว่าจะครบ idOfProduct.length.
      // Iterate through each product and update its stock
      for (let i = 0; i < idOfProduct.length; i++) {
        const currentProduct = idOfProduct[i];
        const updatedStock = currentProduct.Stock - dataStockQuantity[i];
        await strapi.db.query("api::product.product").updateMany({
          where: { id: currentProduct.id },
          data: {
            Stock: updatedStock,
          },
        });
      }

      return ctx.send(`Stock updated successfully: ${stockQuantity}`);
    } catch (error) {
      console.error(error);
      return ctx.badRequest(`Failed to find stock in cart: ${error}`);
    }
  },

  async updateUsernameOfUser(ctx) {
    const { username } = ctx.params;
    const { newUsername } = ctx.request.body;

    const findOldUsername = await strapi.entityService.findMany(
      "api::cart.cart",
      {
        filters: {
          username: username,
        },
      }
    );

    // const queryUsername = findOldUsername.map((val) => val.username);

    for (let i = 0; i < findOldUsername.length; i++) {
      const queryOneByOneOfUsername = findOldUsername[i];
      await strapi.db.query("api::cart.cart").updateMany({
        where: { id: queryOneByOneOfUsername.id },
        data: {
          username: newUsername,
        },
      });
    }

    return ctx.send(`update username client successfully!.`);
  },
}));
