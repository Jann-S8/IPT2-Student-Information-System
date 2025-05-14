const mongoose = require("mongoose");

const Student = new mongoose.Schema(
    {
        IDnumber: {type: String, required: true,},
        Firstname: {type: String, required: true, },
        Lastname: {type: String, required: true, },
        Middlename: {type: String},
        Course: {type: String, required: true, },
        Year: {type: String, required: true, },
    },
        { collection: "student-data"}
    );

    module.exports = mongoose.model("Student", Student);