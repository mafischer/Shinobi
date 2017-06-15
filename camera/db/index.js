const util = require('../util');
const mysql = require('mysql');
const config = require('../../conf.json');
const sql  = mysql.createPool(Object.assign({connectionLimit : 10},config.db));
sql.on('error',function(err) {util.systemlog('DB Lost.. Retrying..');util.systemlog(err);s.disc();return;});
exports.sql = sql;