// import { Schema , model} from 'mongoose';
// const userSchema = new Schema({
//   userName: String,
//   email: String,
  
// });
// module.exports = model('user', userSchema)

const mongoose =require ('mongoose')

const userSchema = mongoose.Schema({
  name: String, 
  email: String,
  password: String,
  image: String,
});
const user = mongoose.model("user", userSchema);
module.exports =  {user};