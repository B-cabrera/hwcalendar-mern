import mongoose from "mongoose";


// TEMP SCHEMA: WORKING OUT USER AUTH FLOW
const UserSchema = new mongoose.Schema({
  authCode: {
    type: String,
    unique: true
  }
})


const Users = mongoose.model('User', UserSchema);

export default Users;