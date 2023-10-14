import { DataSource } from "typeorm"

export const dataSource = new DataSource ({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'Kay80704080.',
    database: 'contentor',
    entities: [__dirname+ '/../**/*.entity.js'],
    synchronize: true
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })