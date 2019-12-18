const connection = require('./db')
const validator = require('email-validator')
const schema = require('password-validator')
const shortid = require('shortid')


const login = (email, password, result) => {
    connection.query('SELECT `customer_id`, `email`, `password` FROM `customer_login` JOIN `customer` USING (`email`) WHERE email=? LIMIT 1', email, (err, res) => {
        let data = ((!err) && (res.length == 1) && (res[0].password == password)) ? {id: res[0].customer_id} : null
        result(err, data)
    })
}

const register = (email ,first_name ,last_name ,gender ,birthday ,NIC ,category ,password ,result) => {
    connection.query('SELECT `email` FROM customer_login` JOIN `customer` USING (`email`) WHERE email=?', email, function(error) {
        if((!error) && (res.length == 0)) {
            var customer_id = shortid.generate();
            
            connection.query('SELECT `customer_id` FROM customer', function(error) {
                if(error){
                    throw error;
                }
                while(res.includes(customer_id)){
                    customer_id = shortid.generate();
                }
            });

            if (validations(email,password)){
                connection.beginTransaction(function(err) {
                    if (err) { result(err, null) }
                    connection.query('INSERT into customer_login (`email`,`password`) VALUES (?,?)', (email,password), function (error) {
                        if (error) {
                            return connection.rollback(function() {
                            throw error;
                            });
                        }
                
                    connection.query('INSERT INTO customer (`customer_id`,`email`,`first_name`,`last_name`,`gender`,`birthday`,`NIC`,`category`) VALUES (?,?,?,?,?,?,?,?)', (customer_id,email,first_name,last_name,gender,birthday,NIC,category), function (error) {
                        if (error) {
                        return connection.rollback(function() {
                            throw error;
                        });
                        }

                        connection.commit(function(err) {
                        let data = (!err) ? {id: customer_id} : null
                        if (err) {
                            return connection.rollback(function() {
                            //throw err;
                            result(err,data)
                            });
                        }
                        console.log('success!');
                        result(err, data)
                        });
                    });
                    });
                });
            }
        }
    }); 
}

function validations(email, pass){
    var schema = new passwordValidator();
    // Add properties to it
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces
    //.is().not().oneOf(['Password123']);             // Blacklist these values

    let mail = (validator.validate(email) ? true: console.log("email format is wrong"))
    let pass = (schema.validate(pass) ? true: console.log("password must have length 8<= pass<= 100, atleast an upperletter, a lowerletter, a digit and should not have 'space'"))

    if (mail && pass){
        return true;
    }
    return false;
}

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