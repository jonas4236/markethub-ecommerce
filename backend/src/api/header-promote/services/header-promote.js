'use strict';

/**
 * header-promote service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::header-promote.header-promote');
