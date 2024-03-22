'use strict';

/**
 * new-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-product.new-product');
