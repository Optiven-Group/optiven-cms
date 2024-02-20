'use strict';

/**
 * diaspora service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::diaspora.diaspora');
