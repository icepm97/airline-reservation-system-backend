const connection = require('./db')
var shortid = require('shortid')

const login = (email, password, result) => {
    connection.query('SELECT `customer_id`, `email`, `password` FROM `customer_login` JOIN `customer` USING (`email`) WHERE email=? LIMIT 1', email, (err, res) => {
        let data = ((!err) && (res.length == 1) && (res[0].password == password)) ? {id: res[0].customer_id} : null
        result(err, data)
    })
}


const register = (email, password, first_name, last_name, gender, birthday, NIC, category, result) => {
    var con = connection.getConnection()
    //check email in customer_login
    var count = 0
    con.query('CALL chekEmail(?)',email,(err, res) => {
        var count = (!err) && (res.length == 1) ? res[0].emailCount : null
        
    })
    if(count==0){

        //email, validate

        var customer_id = shortid.generate()
        // con.query('INSERT INTO customer_login (`email`, `password`) values (?,?)', [email, password], (err, res) => {
        //     let data = ((!err)) ? {id: customer_id} : null
        //     result(err, data)
        // })

        // Transaction
        con.beginTransaction(function(err) {
            if (err) { throw err; }
            con.query('INSERT INTO customer_login (`email`, `password`) values (?,?)', [email, password], function (error, res, fields) {
              if (error) {
                return con.rollback(function() {
                  throw error;
                });
              }
          
            var log = 'Post ' + res.insertId + ' added';
          
            con.query('INSERT INTO customer (`customer_id`,`email`,`first_name`,`last_name`,`gender`,`birthday`,`NIC`,`category`) values (?,?,?,?,?,?,?,?)', [customer_id, email, first_name, last_name, gender, birthday, NIC, category], function (error, res, fields) {
                if (error) {
                  return con.rollback(function() {
                    throw error;
                  });
                }
                con.commit(function(err) {
                  if (err) {
                    return con.rollback(function() {
                      throw err;
                    });
                  }
                  console.log('success!');
                });
              });
            });
            let data = ((!err)) ? {id: customer_id} : null
            result(err, data)
          });
    }
    else{
        let err = null
        let data = {id: '#already_register#'}
        result(err, data)
    }
}

module.exports = {login, register}