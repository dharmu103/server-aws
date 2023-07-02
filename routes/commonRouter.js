/* 
 * Copyrights reserved 
 */
var mysql = require('mysql');
var appRoot = require('app-root-path');

/********************************************************/
// ******MYSQL  Configuration 
/********************************************************/


var propertyFilePath = appRoot + '/env_prop';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
var config = require(propertyFilePath)[process.env.NODE_ENV];
var pool = mysql.createPool(config.db);

exports.mysql_pool = pool;
var slave_pool = mysql.createPool(config.db);
exports.mysql_pool_slave = slave_pool;