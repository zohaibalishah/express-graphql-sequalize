import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST_NAME,
    port: process.env.DATABASE_PORT,
    // logging: true,
    dialect: 'mssql',
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('connected');
  })
  .catch((e) => {
    console.log('error', e);
  });

// sequelize.sync({alter:true}).then(()=>{
//   console.log('created ')
// })

export { sequelize, Sequelize };
