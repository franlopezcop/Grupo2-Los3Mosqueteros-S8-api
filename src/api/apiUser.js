const path = require("path");

const {Users} = require('../database/models')
//const universalModel = require("../model/universalModel");
//const userModel = universalModel("users");

const apiUser = {

    mostrarUsers: async (req,res)=>{
        try {
            const allUsers = await Users.findAll();
            let meta = {
                status: 200,
                url: '/api/apiUser',
                count: allUsers.length
            }

            let users = []

            allUsers.forEach( user =>{
                users.push({
                    id: user.id,
                    name: user.firstname + ' ' + user.lastname,
                    email: user.email,
                    detail: `${req.headers.host}/api/users/${user.id}`
                })
            })

            let respuesta = {meta, data: users}
            return res.json(respuesta)

        } catch (error) {
            res.json({error: error.message});
        }
    },
    mostrarUser: async (req,res)=>{
        try {
            //const { file } = req;
            //const filePath = path.join(__dirname, `../../public/images/users/${file.filename}`);            
            const id = +req.params.id;
            const user = await Users.findOne({where:{'id' : id}});
            let meta = {
                status: 200,
                url: '/api/apiUser' 
            }
            let data = {
                id: user.id,
                name: user.firstname + ' ' + user.lastname,
                email: user.email,
                telephone: user.telephone,
                //image: filePath ni idea
            }

            let respuesta = {meta, data}
            return res.json(respuesta)
        } catch (error) {
            res.json({error: error.message});
        }
    }
}

module.exports = apiUser