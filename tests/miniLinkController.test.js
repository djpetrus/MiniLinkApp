const request = require("supertest");
const miniLinkController = request("../controllers/miniLinkController");
const app = require("../app");

describe("Executar método GET /lista/miniLinks", () => {
  test("Retornar lista de todos os miniLinks", async () => {
    const response = await request(app).get("/lista/miniLinks");
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toHaveLength(0);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("Executar método GET /consulta/miniLink/:id", () => {
  test("Retornar lista de todos os miniLinks", async () => {
    const response = await request(app).get("/consulta/miniLink/w1ScE");
    console.log(response.text);
    expect(response.statusCode).toBe(200);
  });
});
