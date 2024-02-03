// @ts-nocheck
"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx) {
    const { email, username, avatarURL } = ctx.request.body;
    try {
      const res = await strapi.service("api::review.review").create({
        data: {
          ...ctx.request.body,
          email,
          username,
          profileImage: avatarURL,
        },
      });

      return res;
    } catch (error) {
      ctx.response.status = 500;
      return error;
    }
  },
}));
