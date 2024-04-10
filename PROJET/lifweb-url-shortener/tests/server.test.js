/* eslint-disable no-unused-vars */
import { expect } from "@hapi/code";
import Lab from "@hapi/lab";
import { init } from "../server.js";

export const lab = Lab.script();
const { after, before, describe, it } = lab;

function checkLinkObject(payload) {
  for (const key of ["created_at", "long", "short", "visits", "last_visited_at", "secret_key"]) {
    expect(payload).to.include(key);
  }
}

describe("Server", () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  describe("Links router", () => {
    it("GET /api is 200", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/api",
      });
      expect(response.headers).to.include("content-type");
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.statusCode).to.equal(200);
      const { links_count } = JSON.parse(response.payload);
      expect(links_count).to.be.a.number();
    });

    it("GET /api/{short} is 404", async () => {
      const response = await server.inject({
        method: "GET",
        url: `/api/OwSEIeAt`,
      });
      expect(response.statusCode).to.equal(404);
    });

    describe("Create/Read/Status/Delete", () => {
      // scenario
      let link;

      it("POST /api is 201", async () => {
        const response = await server.inject({
          method: "POST",
          url: "/api",
          payload: { uri: "https://perdu.com" },
        });
        expect(response.headers).to.include("content-type");
        expect(response.headers["content-type"]).to.include("application/json");
        expect(response.statusCode).to.equal(201);
        const payload = JSON.parse(response.payload);
        checkLinkObject(payload);
        expect(payload.long).to.equal("https://perdu.com");
        expect(payload.secret_key).to.be.a.string();
        expect(payload.visits).to.equal(0);
        link = payload;
      });

      it("GET /api/{short} is 302", async () => {
        const response = await server.inject({
          method: "GET",
          url: `/api/${link.short}`,
        });
        expect(response.headers).to.include("location");
        expect(response.headers.location).to.equal("https://perdu.com");
        expect(response.statusCode).to.equal(302);
      });
    });
  });
});
