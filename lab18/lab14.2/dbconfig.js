
const oracledb = require('oracledb');
module.exports = {
  user          : "C##ZRVV",
  password      : "pass",
  connectString : "localhost/orcl",
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};
