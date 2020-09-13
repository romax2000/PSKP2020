const Sequelize = require ('sequelize');
const config =  {
  username: 'root',
  password: 'root',
  database: 'unik',
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  }
}
const sequelize = new Sequelize(config);

sequelize.authenticate()
.then(() =>{
  console.log('connect is ok');

  sequelize.close();
})
.catch(err => {console.log('error',err);});
