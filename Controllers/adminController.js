const Admin = require("../Model/adminModel");
const User = require("../Model/userModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const createAdmin = asyncHandler(async (req, res) => {
  const id = req.body._id;
  const adminExists = await Admin.findById(id);
  // console.log(adminExists);
  if (adminExists) {
    res.status(422).json({
      error: "Admin already exists",
      token: generateToken(id),
      _id: adminExists._id,
      name: adminExists.name,
      email: adminExists.email,
      uid: adminExists.uid,
      pic: adminExists.pic,
      verified: adminExists.verified,
      isAdmin: adminExists.isAdmin,
      isSuperAdmin: adminExists.isSuperAdmin,
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
    password: "",
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
      password: admin.password,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const allAdmin = async (req, res) => {
  const admin = await Admin.find({}, { password: 0 });
  res.send(admin);
};

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
// const updateAdmin = async (req, res) => {
//   const id = req.params.id;
//   const updatedValue = req.body;
//   const filter = { _id: id };
//   const user = await User.findOneAndUpdate(filter, updatedValue, {
//     new: true,
//   });
//   res.send(user);
// };
const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const updateAdminPass = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  // Find the user in the database
  const user = await Admin.findById(userId);
  console.log("user before password update:", user);

  // Compare the current password entered by the user with the encrypted password in the database
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // Generate the hashed password
  // const hashedPassword = await generateHashedPassword(newPassword);

  // Update the user's password
  user.password = newPassword;
  await user.save();

  console.log("user after password update:", user);
  res.json(user);
});
const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  const user = await Admin.findById(id);
  if (user.isSuperAdmin === true) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  const admin = await Admin.deleteOne({ _id: id });
  console.log(admin);
  res.send(admin);
};

module.exports = {
  createAdmin,
  // getUser,
  allAdmin,
  deleteAdmin,
  updateAdminPass,
  // singleUser,
};
