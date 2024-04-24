const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();
const router = require("./crud.js");
const controller = require("../controllers/crudController.js");
import { describe, expect, it } from "vitest";
const Device = require("../models/device");

app.use("/", router);

function toMatchSnapshot(actual, expected) {
  //expect(actual.status).toEqual(200);
 // expect(actual.body).toEqual(expected);
 expect(actual.body.id).toEqual(expected.id);
 expect(actual.body.category).toEqual(expected.category);
 expect(actual.body.type).toEqual(expected.type);
 expect(actual.body.brand).toEqual(expected.brand);
 expect(actual.body.owner).toEqual(expected.owner);
 expect(actual.body.accessories).toEqual(expected.accessories);
 expect(actual.body.warranty).toEqual(expected.warranty);
}

describe("Crud Routes", () => {
  it('should match snapshot for "/" route', async () => {
    const response = await request(app).get("/");
    toMatchSnapshot(response, controller.getAll());
  });

  it("should match snapshot for / route with method post", async () => {
    const newItem = new Device({
      id: 1111111,
      category: "electronics",
      type: "Smartphone",
      brand: "Samsung",
      owner: "test",
      accessories: true,
      warranty: true,
      date: new Date().toDateString(),
    });

    const expectedResponse = await controller.addDevice(newItem);
    const response = await request(app).post("/").send(newItem);

    toMatchSnapshot(response, expectedResponse);
  });
  it("should match snapshot for /:id route with method get", async () => {
    const expectedResponse = await controller.getDeviceById(1998813940154368);
    const response = await request(app).get("/1998813940154368");
    toMatchSnapshot(response, expectedResponse);
  });
  it("should match snapshot for /:id route with method delete", async()=>{
    const expectedResponse = await controller.deleteDeviceById(3);
    const response = await request(app).delete("/3");
    toMatchSnapshot(response, expectedResponse);
  })
});
