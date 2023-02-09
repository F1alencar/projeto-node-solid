import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import { AppDataSource } from "../../../../shared/infra/typeorm";

let connection: DataSource;

describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = AppDataSource;

    const password = await hash("admin", 8);
    if (!connection.isInitialized) await connection.initialize();
    await connection.runMigrations();
    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
        values('${uuidV4()}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXX')
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });
  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const aux = await request(app)
      .post("/categories")
      .send({
        name: "Category Test",
        description: "Category Test Description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Test");
  });
});
