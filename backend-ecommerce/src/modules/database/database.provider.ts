import { env } from 'src/constants/environment';
import { DataSource } from 'typeorm';

export const databaseProvider = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "postgres",
                host: env.database.host,
                port: env.database.port,
                username: env.database.username,
                password: env.database.password,
                database: env.database.dbname,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];