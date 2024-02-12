'use strict';

/**
 * job-location service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job-location.job-location');
