const User = require("../Model/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const singleUser = async (req, res) => {
  res.json("user singleId");
};
const deleteUser = async (req, res) => {
  res.json("user created");
};
const createUser = asyncHandler(async (req, res) => {
  const { name, email, uid, verified, pic } = req.body;
  console.log(req.body);
  // res.json("user created")
  const userExists = await User.findOne({ uid });
  if (userExists) {
    res.status(422).json({ error: "User already exists" });
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const updateUser = async (req, res) => {
  res.json("user created");
};

const getUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //send top 7 results
  const users = await User.find({ ...keyword })
    .find({
      _id: { $ne: req?.user?._id },
    })
    .limit(7);
  // const users = await User.find({ ...keyword }).find;
  res.json(users);
});

module.exports = { createUser, getUser, deleteUser, updateUser, singleUser };
