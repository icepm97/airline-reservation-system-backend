const error = (res, code, error, message, err) => {
    res.status(code).json({
        error: {
            error: error,
            message: message
        },
        data: []
    })
    console.log(err)
}

const data = (res, code, data) => {
    res.status(code).json({
        error: {},
        data: data
    })
}

const jwt = (res, code, data, jwt) => {
    res.status(code).json({
        error: {},
        data: data,
        jwt: jwt
    })
}

module.exports = {error, data, jwt}