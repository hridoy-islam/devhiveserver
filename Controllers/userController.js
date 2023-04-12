const User = require("../Model/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
<<<<<<< HEAD
=======
const singleUser = async (req, res) => {
  res.json("user singleId");
};
>>>>>>> 7ae1625caccd47daff36e7ec054fac7922830806

const createUser = asyncHandler(async (req, res) => {
  const { name, email, uid, verified, pic } = req.body;
  console.log(req.body);
  // res.json("user created")
  const userExists = await User.findOne({ uid });
  if (userExists) {
    res
      .status(422)
      .json({ error: "User already exists", token: generateToken(uid) });
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    uid,
    verified,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      uid: user.uid,
      pic: user.pic,
      verified: user.verified,
      token: generateToken(user.uid),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
<<<<<<< HEAD

});



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
=======
>>>>>>> 7ae1625caccd47daff36e7ec054fac7922830806


<<<<<<< HEAD
module.exports = { createUser, getUser, deleteUser, updateUser, singleUser };
=======
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await UserModel.deleteOne({ id });
  console.log(user);
  res.send(user);
} 

module.exports={createUser, getUser, deleteUser, updateUser, singleUser}
>>>>>>> 7ae1625caccd47daff36e7ec054fac7922830806
