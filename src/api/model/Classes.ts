import mongoose from "mongoose";


const Schema = mongoose.Schema;

const hw = new Schema ({
    name: {
        type: String, 
        required: true
    },
    dueDate: {
        type: Date, 
        required: true, 
        default: Date.now},
})

function assignmentValidator(val: []) {
    return Array.isArray(val);
}

function classValidator(val: string) {
    return val.trim();
}

const ClassHWSchema = new Schema({
    class: {
        type: String, 
        required: true,
        unique: true,
        validate: classValidator,
    },
    assignments: {
        type: [hw],
        validate : assignmentValidator,
    }
});



const ClassHW = mongoose.model("ClassHW", ClassHWSchema);


export default ClassHW;
