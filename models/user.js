const {Schema, default: mongoose} = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    firstName:{
        type: String,
        required: [true,'please provide first Name']
    },
    lastName:{
        type: String,
        required: [true,'please provide last Name']
    },
    email:{
        type: String,
        required: [true,'please provide email']
    },
    password:{
        type: String,
        required: [true,'please provide password']
    },
    active:{
        type: Boolean,
        default: false,
    },

})
userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        const hash = await bcrypt.hash(this.password,10)
        this.password = hash
    }
    next()
})
const user = mongoose.model('user',userSchema)

module.exports = user