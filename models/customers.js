const pool = require('./db')
const validator = require('email-validator')
const schema = require('password-validator')
const shortid = require('shortid')
const bcrypt = require('bcrypt')


const login = async (email, password, result) => {
    let { rows } = await pool.query('SELECT "customer_id", "email", "first_name", "last_name", "gender", "birthday", "NIC", "category", "password" FROM "customer_login" JOIN "customer" USING ("customer_id") WHERE "email" = $1 LIMIT 1', [email])
    if ((rows.length == 1) && (await bcrypt.compare(password, rows[0].password))) {
        let {password, ...data} = rows[0]
        return data
    }
    return null
}

const register = (email, first_name, last_name, gender, birthday, NIC, category, password, result) => {
    //connection.query('SELECT checkMail(?) AS `count`', email, function(error,res) 
    connection.query('SELECT checkMail(?) AS `count`', email, function (error, res) {
        if ((!error) && (res[0].count == 0)) {
            var customer_id = shortid.generate();

            connection.query('SELECT `customer_id` FROM customer', function (error, res) {
                if (error) {
                    result(error, null)
                }
                while (res.includes(customer_id)) {
                    customer_id = shortid.generate();
                }
            });

            if (validations(email, password)) {
                connection.beginTransaction(function (err) {
                    if (err) { result(err, null) }
                    connection.query('INSERT into customer_login (`email`,`password`) VALUES (?,?)', (email, password), function (error) {
                        if (error) {
                            return connection.rollback(function () {
                                tresult(error, null)
                            });
                        }

                        connection.query('INSERT INTO customer (`customer_id`,`email`,`first_name`,`last_name`,`gender`,`birthday`,`NIC`,`category`) VALUES (?,?,?,?,?,?,?,?)', (customer_id, email, first_name, last_name, gender, birthday, NIC, category), function (error) {
                            if (error) {
                                return connection.rollback(function () {
                                    result(error, null)
                                });
                            }

                            connection.commit(function (err) {
                                let data = { id: customer_id }
                                if (err) {
                                    return connection.rollback(function () {
                                        result(err, null)
                                    });
                                }
                                console.log('success!');
                                result(null, data)
                            });
                        });
                    });
                });
            }
        }
    });
}

function validations(email, password) {
    var schema = new schema();
    // Add properties to it
    schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces
    //.is().not().oneOf(['Password123']);             // Blacklist these values

    let mail = (validator.validate(email) ? true : console.log("email format is wrong"))
    let pass = (schema.validate(password) ? true : console.log("password must have length 8<= pass<= 100, atleast an upperletter, a lowerletter, a digit and should not have 'space'"))

    if (mail && pass) {
        return true;
    }
    return false;
}


module.exports = { login, register }