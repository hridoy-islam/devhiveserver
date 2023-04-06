 const getUser = async (req, res) =>{
    res.json("user get")
} 
 const singleUser = async (req, res) =>{
    // 1 ta user 
    res.json("user singleId")
} 
 const deleteUser = async (req, res) =>{
    res.json("user created")
} 
 const createUser = async (req, res) =>{
    console.log(req.body)
    res.json("user created")
} 
 const updateUser = async (req, res) =>{
    res.json("user created")
}

module.exports={createUser, getUser, deleteUser, updateUser, singleUser}