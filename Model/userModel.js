import { Schema , model} from 'mongoose';

const userSchema = new Schema({
  userName: String, // String is shorthand for {type: String}
  email: String,
  
});






module.exports = model('user', userSchema)