import mongoose from "mongoose";


// TEMP SCHEMA: WORKING OUT USER AUTH FLOW
const UserSchema = new mongoose.Schema({
  authCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassHW'
  }]
})


const User = mongoose.model('User', UserSchema);

export default User;