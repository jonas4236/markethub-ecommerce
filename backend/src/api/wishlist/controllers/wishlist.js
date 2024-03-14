// @ts-nocheck
"use strict";

/**
 * wishlist controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::wishlist.wishlist",
  ({ strapi }) => ({
    async updateWishlistUsername(ctx) {
      const { username } = ctx.params;
      const { newWishlistUsername } = ctx.request.body;

      const findOldWishlistUsername = await strapi.entityService.findMany(
        "api::wishlist.wishlist",
        {
          filters: {
            username: username,
          },
        }
      );

      for (let y = 0; y < findOldWishlistUsername.length; y++) {
        const getIdOfWishlistItem = findOldWishlistUsername[y];

        await strapi.db.query("api::wishlist.wishlist").updateMany({
          where: { id: getIdOfWishlistItem.id },
          data: {
            username: newWishlistUsername,
          },
        });
      }

      return ctx.send(`update wishlist username successfully!.`);
    },
  })
);
