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
    const id = req.params.id;
    const updatedValue = req.body
    const filter = {_id: id};
    const user = await UserModel.findOneAndUpdate(filter, updatedValue, {
        new: true,
    })
    res.send(user)
} 

const deleteUser = async (req, res) =>{
    const id = req.params.id;
    const user = await UserModel.deleteOne({id});
    console.log(user)
    res.send(user)
} 

module.exports={createUser, getUser, deleteUser, updateUser, singleUser}