
const users = require('../MOCK_DATA.json');

const sqlConfig = require('../Config/dbConfig')
const { user } = require('../Config/dbConfig')
const poolPromise = require('../Config/pool')

const controllers = {
    home: ((req, res) => {
        res.send("Welcome to the user DataBase")
    }),


    getAllusers: async(req, res) => {
        let pool = await poolPromise()
        pool.query(`SELECT * FROM userData`).then(data=>{
            console.log(data.recordset)
        })
        res.json({
            Status: 200,
            Success: true,
            Message: 'All users',
            Result: users
        })
    },

    getUser: ((req, res) => {
        const {email} = req.params;
        const user = users.find((data) => data.email === email)
        if (user) {
            return res.status(200).json({
                status: 200,
                Success: true,
                Message: 'User Found',
                Result: user

            })}

            res.status(404).json({
                Status: 404,
                Success: false,
                Message: 'User not found',
                result: []
            })

        
    }),

    login:((req,res)=>{
        const {email, pwd} = req.body
        const auth = users.find((data)=>data.email===email && data.Password===pwd)
        if(auth){
            return res.status(200).json({
                status:200,
                Success:true,
                Message:"Login Successful",
                result:auth})
        }
        res.status(403).json({
            status:403,
            Success:false,
            Message:"Login Failed",
            result:[]})
    })
    

}

module.exports = { ...controllers }