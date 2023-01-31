import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentax_test" : "rentx",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
});

export { AppDataSource };
