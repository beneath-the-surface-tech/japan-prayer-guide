import "server-only"
import { DataSource } from "typeorm"
import configs from "../../configs"
import * as entities from "./index"

export const getDataSource = () => {
    return new DataSource({
        type: "postgres",
        host: configs.POSTGRES_HOST,
        port: configs.POSTGRES_PORT,
        username: configs.POSTGRES_USER,
        password: configs.POSTGRES_PASSWORD,
        database: configs.POSTGRES_DB,
        entities,
        synchronize: false,
        ssl: true,
    })
}
