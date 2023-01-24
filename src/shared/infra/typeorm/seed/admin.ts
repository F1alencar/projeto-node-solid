import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { AppDataSource } from "..";

async function create() {
  const connection = AppDataSource;

  await connection.initialize();

  const password = await hash("admin", 8);
  await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
        values('${uuidV4()}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXX')
    `
  );
  await connection.destroy();
}

create().then(() => console.log("User admin created!"));
