'use strict';

/**
 * new-product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::new-product.new-product');
