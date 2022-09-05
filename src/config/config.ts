import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormOptions: TypeOrmModuleOptions = {
  type: "mysql",
  host: "localhost",
  port: 8889,
  username: "root",
  password: "root",
  database: "project-task",
  synchronize: true,
  autoLoadEntities: true
};
