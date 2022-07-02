
const users = require('../MOCK_DATA.json');
const poolPromise = require('../Config/pool')


const controllers = {
    home: ((req, res) => {
        res.send("Welcome to the user DataBase")
    }),


    getAllusers: async (req, res) => {
        let pool = await poolPromise()
        pool.query(`SELECT * FROM userData`).then(data => {
            if (data.recordset) {
                return res.status(200).json({
                    Status: 200,
                    Success: true,
                    Message: 'All users',
                    Result: data.recordset
                }) && console.log(data.recordset)
            }
            res.status(404).json({
                Status: 404,
                Success: false,
                Message: 'Users not found',
                result: []
            })

        }
        )
    },

    getUser: async (req, res) => {
        const { email } = req.params;
        let pool = await poolPromise()
        pool.query(`SELECT * FROM userData WHERE email = '${email}'`)
            .then(data => {
                if (data.recordset) {
                    return res.status(200).json({
                        status: 200,
                        Success: true,
                        Message: 'User Found',
                        Result: data.recordset
                    }) &&
                        console.log(data.recordset)

                }

                res.status(404).json({
                    Status: 404,
                    Success: false,
                    Message: 'User not found',
                    result: []
                })
            })

    },


    login: async (req, res) => {
        const { email, pwd } = req.body
        let pool = await poolPromise()
        pool.query(`SELECT * FROM userData WHERE email = '${email}' AND password = '${pwd}'`)

            .then(data => {
                if (data.recordset) {
                    return res.status(200).json({
                        status: 200,
                        Success: true,
                        Message: "Login Successful",
                        result: data.recordset
                    }) && console.log(data.recordset)
                }
                res.status(403).json({
                    status: 403,
                    Success: false,
                    Message: "Login Failed",
                    result: []
                })
            })
    },


    createUser: async (req, res) => {
        let { id, first_name, last_name, email, gender, pwd } = req.body
        let pool = await poolPromise()
        pool.query(`INSERT INTO userData VALUES('${id}', '${first_name}', '${last_name}', '${email}', '${gender}', '${pwd}')`)
            .then(result => {
                if (result.rowsAffected) {
                    return res.status(200).json({
                        status: 200,
                        Success: true,
                        Message: "User Added"
                    }) && console.log("User added")
                }
                res.status(403).json({
                    status: 404,
                    Success: false,
                    Message: "User not added"
                })
            }
            )

    },

    addAllUsers: async (req, res) => {
        let pool = await poolPromise()
        {
            users.map((user) => (
                pool.query(`INSERT INTO userData VALUES('${user.id}', '${user.first_name}', '${user.last_name}', '${user.email}', '${user.gender}', '${user.Password}')`)
            ))
        } try {
            console.log('finished updating database')
            res.send('finished updating database')
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    }



}

module.exports = { ...controllers }