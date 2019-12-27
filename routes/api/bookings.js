const router = require('express').Router()
const book = require('../../models/booking')
const response = require('../../helper/response')
const jwt = require('jsonwebtoken')
const jwtconfig = require('../../config/jwt')


router.get('/:booking_id', (req, res) => {
  book.getticketids(req.params.booking_id)
    .then(result => {
      if (!result) {
        return response.error(res, 409, 'invalid_input', 'booking id is invalid')
      }

      response.data(res, 200, result) //check passing response from the server as list of ticket_ids
    })
    .catch(error => {
      response.error(res, 500, 'server_error', 'Server Error', error)
    })
});




// let checkToken = (req, res, next) => {
//   let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
//   if (token.startsWith('Bearer ')) {
//     // Remove Bearer from string
//     token = token.slice(7, token.length);
//   }

//   if (token) {
//     jwt.verify(token, jwtconfig.secret, (err, decoded) => {
//       if (err) {
//         return response.error(res, 401, 'unauthorized', 'Token is not valid')
//       }
//       else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   }
//   else {
//     return response.error(res, 401, 'unauthorized', 'Auth token is not supplied')
//   }
// };


router.get('/', (req, res) => {
  book.tickethistory(req.decoded)
    .then(result => {
      if (!result) {
        return response.error(res, 409, 'invalid_input', 'passenger id is invalid')
      }

      response.data(res, 200, result) //check passing response from the server as list of ticket_ids
    })
    .catch(error => {
      response.error(res, 500, 'server_error', 'Server Error', error)
    })
})


module.exports = router