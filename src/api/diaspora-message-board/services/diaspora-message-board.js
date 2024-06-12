'use strict';

/**
 * diaspora-message-board service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::diaspora-message-board.diaspora-message-board');
