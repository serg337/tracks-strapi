"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */
  async find(ctx) {
    let entities;
    let query = ctx.query;
    if (!ctx.state.user) {
      ctx.status = 403;
      return {
        error: "unauthorized",
        message: "Your user doesn't exist or you are not logged in"
      };
    } else {
      if (!query.userId) {
        query.userId = ctx.state.user.id;
      } else if (query.userId !== ctx.state.user.id) {
        query.userId = ctx.state.user.id;
      }
    }
    if (query._q) {
      entities = await strapi.services.track.search(query);
    } else {
      entities = await strapi.services.track.find(query);
    }
    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.track })
    );
  }
};
