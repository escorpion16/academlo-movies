const { app } = require('./app');

//Utils
const { sequelize } = require('./util/database');

sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((error) => console.log(error));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running in port ${PORT}`);
});
