const UserModel = require('../Model/userModel')


 const createUser = async (req, res) =>{
    const newUser = req.body;
    const result = await UserModel.create(newUser)
    console.log(result)
    res.send(result)
} 
const getUser = async (req, res) =>{
    const users = await UserModel.find({}).limit(20);
    res.json(users);
    
}
const singleUser = async (req, res) =>{
    const user = await UserModel.findById(req.params.id);
    res.json(user);
    
}
 const updateUser = async (req, res) =>{
    res.json("user created")
} 

const deleteUser = async (req, res) =>{
    res.json("user created")
} 

module.exports={createUser, getUser, deleteUser, updateUser, singleUser}