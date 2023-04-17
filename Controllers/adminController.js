const Admin = require("../Model/adminModel");
const User = require("../Model/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");

const createAdmin = asyncHandler(async (req, res) => {
  const id = req.body._id;
  const adminExists = await Admin.findById(id);
  // console.log(adminExists);
  if (adminExists) {
    res.status(422).json({
      error: "User already exists",
      token: generateToken(id),
      adminExists,
    });
    throw new Error("Admin already exists");
  }

  const adminInfo = await User.findById(id);
  // console.log(adminInfo);
  const { name, email, uid, verified, pic, _id } = adminInfo;
  const admin = await Admin.create({
    _id,
    name,
    email,
    uid,
    verified,
    pic,
    isAdmin: true,
    isSuperAdmin: false,
  });
  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      uid: admin.uid,
      pic: admin.pic,
      verified: admin.verified,
      isAdmin: admin.isAdmin,
      isSuperAdmin: admin.isSuperAdmin,

      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// const allUser = async (req, res) => {
//   const page = req.query.page ? parseInt(req.query.page) : 1;
//   const limit = req.query.limit ? parseInt(req.query.limit) : 50;
//   const skipIndex = (page - 1) * limit;
//   const user = await User.find().skip(skipIndex).limit(limit);

//   res.send(user);
// };

// const getUser = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};
// });

// const singleUser = async (req, res) => {
//   const user = await User.findById(req.params.id);
//   res.json(user);
// };
// const updateUser = async (req, res) => {
//   const id = req.params.id;
//   const updatedValue = req.body;
//   const filter = { _id: id };
//   const user = await User.findOneAndUpdate(filter, updatedValue, {
//     new: true,
//   });
//   res.send(user);
// };

// const deleteUser = async (req, res) => {
//   const id = req.params.id;
//   const user = await User.deleteOne({ _id: id });
//   console.log(user);
//   res.send(user);
// };

module.exports = {
  createAdmin,
  // getUser,
  // allUser,
  // deleteUser,
  // updateUser,
  // singleUser,
};
