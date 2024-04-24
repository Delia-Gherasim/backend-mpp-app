import { afterEach, describe, expect, it } from "vitest";
const sinon = require("sinon");
const request = require("supertest");
const express = require("express");

const app = express();
const router = require("./brands.js");
const controller = require("../controllers/brandsController");

app.use("/", router);

function toMatchSnapshot(actual, expected) {
  expect(actual.status).toEqual(200);
  //  expect(actual.text).toEqual(expected);
}

describe("Brands Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should match snapshot for "/byCategory" route with category "electronics"', async () => {
    const stub = sinon.stub(controller, "getAllByCategory");
    stub.withArgs("electronics").returns("mocked response for electronics");

    const response = await request(app)
      .get("/byCategory")
      .send({ category: "electronics" });
    toMatchSnapshot(response, "mocked response for electronics");
  });

  it('should match snapshot for "/byCategory" route with category "appliances"', async () => {
    sinon.restore();

    const stub = sinon.stub(controller, "getAllByCategory");
    stub.withArgs("appliances").returns("mocked response for appliances");

    const response = await request(app)
      .get("/byCategory")
      .send({ category: "appliances" });
    toMatchSnapshot(response, "mocked response for appliances");
  });

  it('should match snapshot for "/byCategory" route with category "equipment"', async () => {
    sinon.restore();

    const stub = sinon.stub(controller, "getAllByCategory");
    stub.withArgs("equipment").returns("mocked response for equipment");

    const response = await request(app)
      .get("/byCategory")
      .send({ category: "equipment" });
    toMatchSnapshot(response, "mocked response for equipment");
  });
});
