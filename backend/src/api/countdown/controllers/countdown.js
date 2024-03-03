'use strict';

/**
 * countdown controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::countdown.countdown');
