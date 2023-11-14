import { Sequelize } from 'sequelize-typescript';
import { Account } from 'src/entities/account.entity';
import { Setting } from 'src/entities/setting.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'achit',
        password: 'achit',
        database: 'settings-application',
      });
      sequelize.addModels([Account, Setting]);
      await sequelize.sync();
      return sequelize;
    },
  },
];