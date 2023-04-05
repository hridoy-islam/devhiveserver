const {  user } = require("../Model/userModel")


 const deleteUser = async (req, res) =>{
    res.json("user created")
} 
 const createUser = async (req, res) =>{
    const newUser = new user(req.body);
    console.log(newUser);
    await newUser.save();
    res.json(newUser)
} 
const getUser = async (req, res) =>{
    try{
        const query = {};
        const cursor = await user.find(query);
        res.send(cursor);
    }catch(error){
        console.log(error)
    }
    res.json("user get")
    
}
const singleUser = async (req, res) =>{
    try{
        const id = req.params.id;
        const query = {_id: id};
        const cursor = await user.findOne(query);
        res.send(cursor);
    }catch(error){
        console.log(error)
    }
    res.json("user singleId")
    
}
 const updateUser = async (req, res) =>{
    res.json("user created")
} 


module.exports={createUser, getUser, deleteUser, updateUser, singleUser,  getUser}