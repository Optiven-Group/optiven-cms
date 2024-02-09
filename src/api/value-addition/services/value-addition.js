'use strict';

/**
 * value-addition service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::value-addition.value-addition');
