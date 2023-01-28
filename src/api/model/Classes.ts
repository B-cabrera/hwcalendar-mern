import mongoose from "mongoose";


const Schema = mongoose.Schema;

const hw = new Schema ({
    name: {type: String, required: true},
    dueDate: {type: Date, required: true, default: Date.now},
})

function validator(val: []) {
    return Array.isArray(val);
}

const ClassHWSchema = new Schema({
    class: {
        type: String, 
        required: true,
        unique: true,
    },
    assignments: {
        type: [hw],
        validate : validator,
    }
});



const ClassHW = mongoose.model("ClassHW", ClassHWSchema);


export default ClassHW;
