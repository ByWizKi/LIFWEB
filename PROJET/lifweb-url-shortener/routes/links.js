import Joi from "joi";
import process from "node:process";

import * as handlers from "./handler.js";

export default {
  name: "links",
  version: process.env.npm_package_version,
  register: async function linksHandler(server, _options) {
    const { db } = server.app;
    // const { prefix } = server.realm.modifiers.route;

    server.route({
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        const link = await server.app.db.getAllLinksStats();
        //debug
        // server.log("debug", link);
        if (link === undefined) {
          return handlers.createGetApiResponseMessage(404);
        }
        return handlers.createGetApiResponseMessage(200, link);
      },
    });

    server.route({
      method: "GET",
      path: "/{short}",
      handler: async (request, h) => {
        const { short } = request.params;
        const link = await server.app.db.getLinkByShort(short);
        // debug
        server.log("debug", link);
        if (short === undefined) {
          return handlers.createGetShortResponseMessage(400);
        }
        if (link === undefined) {
          return handlers.createGetShortResponseMessage(404);
        }
        return handlers.createGetShortResponseMessage(200, link);
      },
    });

    server.route({
      method: "GET",
      path: "/{short}/status",
      handler: async (request, h) => {
        const { short } = request.params;
        const link = await server.app.db.getLinkByShortStatus(short);
        // debug
        server.log("debug", link);
        if (short === undefined) {
          server.log("debug", "no short");
          return handlers.createGetShortStatusResponseMessage(400);
        }
        if (link === undefined) {
          return handlers.createGetShortStatusResponseMessage(404);
        }
        return handlers.createGetShortStatusResponseMessage(200, link);
      },
    });

    server.route({
      method: "DELETE",
      path: "/{short}/{secret_key}",
      handler: async (request, h) => {
        const { short, secret_key } = request.params;
        const link = await server.app.db.deleteLink(short, secret_key);
        //debug
        server.log("debug", link);
        if (link === undefined && short !== undefined && secret_key !== undefined) {
          return handlers.createDeleteApiResponseMessage(400, false);
        }
        if (secret_key === undefined) {
          return handlers.createDeleteApiResponseMessage(401);
        }
        if (link === undefined) {
          return handlers.createDeleteApiResponseMessage(404);
        }
        return handlers.createDeleteApiResponseMessage(200);
      },
    });

    server.route({
      method: "POST",
      path: "/",
      handler: async (request, h) => {
        const { uri } = request.payload;
        const link = await db.createLink(uri);
        if (link === undefined) {
          return handlers.createPostApiResponseMessage(500);
        }
        if (uri === undefined) {
          return handlers.createPostApiResponseMessage(400);
        }
        return handlers.createPostApiResponseMessage(200, uri);
      },
      options: {
        validate: {
          payload: Joi.object({
            uri: Joi.string().uri().example("http://perdu.com"),
          }),
        },
      },
    });
  },
};
