import mongoose from "mongoose";
const Schema = mongoose.Schema;
const logSchema = new Schema({
    message_id: { type: String, required: true },
    seen: { type: Number, default: 0 },
    title: { type: String, required: true },
    time: { type: Number, required: true },
    date: { type: String, required: true }
});

const appUserSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    balance: {type: Number, default: 0},
    code14Digit: {type: String, required: true, unique: true },
    pin: {type: String, required: true},
    notifications: [logSchema],
    logs: [logSchema]
},
{
    timestamps: true
});


//const AppUsers = mongoose.models.App_user2 || mongoose.model('App_user2', appUserSchema);
const AppUsers = mongoose.models.moneyapp || mongoose.model('moneyapp', appUserSchema);
export default AppUsers;

