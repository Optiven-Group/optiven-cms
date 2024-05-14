'use strict';

/**
 * customer-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::customer-info.customer-info');
