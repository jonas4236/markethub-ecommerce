'use strict';

/**
 * countdown service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::countdown.countdown');
