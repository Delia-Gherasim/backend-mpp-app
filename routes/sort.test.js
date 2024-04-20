const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();
const router = require("./sorting.js");
const controller = require("../controllers/sortingController");
import { describe, expect, it } from "vitest";

app.use("/", router);

function toMatchSnapshot(actual, expected) {
  expect(actual.status).toEqual(200);
  expect(actual.text).toEqual(expected);
}

describe("Sorting Routes", () => {
  it('should match snapshot for "/" route', async () => {
    const response = await request(app).get("/");
    toMatchSnapshot(response, "sorting");
  });

  it('should match snapshot for "/type" route', async () => {
    const stub = sinon
      .stub(controller, "sortByTypeAscending")
      .returns("mocked response");
    const response = await request(app).get("/type");
    toMatchSnapshot(response, "mocked response");
    stub.restore();
  });

  it('should match snapshot for "/category" route', async () => {
    const stub = sinon
      .stub(controller, "sortByCategoryAscending")
      .returns("mocked response");
    const response = await request(app).get("/category");
    toMatchSnapshot(response, "mocked response");
    stub.restore();
  });

  it('should match snapshot for "/brand" route', async () => {
    const stub = sinon
      .stub(controller, "sortByBrandAscending")
      .returns("mocked response");
    const response = await request(app).get("/brand");
    toMatchSnapshot(response, "mocked response");
    stub.restore();
  });
  it('should match snapshot for "/owner" route', async () => {
    const stub = sinon
      .stub(controller, "sortByOwnerAscending")
      .returns("mocked response");
    const response = await request(app).get("/owner");
    toMatchSnapshot(response, "mocked response");
    stub.restore();
  });
  it('should match snapshot for "/date" route', async () => {
    const stub = sinon
      .stub(controller, "sortByDateAscending")
      .returns("mocked response");
    const response = await request(app).get("/date");
    toMatchSnapshot(response, "mocked response");
    stub.restore();
  });
});
