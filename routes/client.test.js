const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const app = express();
const router = require("./crud.js");
const controller = require("../controllers/clientsController.js");
import { describe, expect, it } from "vitest";
import Client from "../models/client.js";


app.use("/", router);

function toMatchSnapshot(actual, expected) {
  expect(actual.status).toEqual(200);
 // expect(actual.body).toEqual(expected);
 expect(actual.body.id).toEqual(expected.id);
 expect(actual.body.name).toEqual(expected.name);
 expect(actual.body.surname).toEqual(expected.surname);
 expect(actual.body.email).toEqual(expected.email);
 expect(actual.body.phoneNumber).toEqual(expected.phoneNumber);
 expect(actual.body.debt).toEqual(expected.debt);
 expect(actual.body.details).toEqual(expected.details);
}

describe("Client Routes", () => {
  it('should match snapshot for "/" route', async () => {
    const response = await request(app).get("/");
    toMatchSnapshot(response, controller.getAll());
  });

  it("should match snapshot for / route with method post", async () => {
    const newItem = new Client({
        id:1111,
        name:"name",
        surname:"surname",
        phoneNumber:"0123456789",
        email:"email@gmail.com",
        debt: 100,
        details:"extra details wow",
    })
    
    const expectedResponse =await controller.addClient(newItem);
    const response = await request(app).post("/").send(newItem);

    toMatchSnapshot(response, expectedResponse);
  });
  it("should match snapshot for /:id route with method get", async () => {
    const expectedResponse = await controller.getClientById(761420374943296);
    const response = await request(app).get("/761420374943296");
    toMatchSnapshot(response, expectedResponse);
  });
  it("should match snapshot for /:id route with method delete", async()=>{
    const expectedResponse = await controller.deleteClientById(3);
    const response = await request(app).delete("/3");
    toMatchSnapshot(response, expectedResponse);
  })
});
