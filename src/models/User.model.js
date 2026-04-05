import mongoose, { model } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[ true, "name is required"],
            trim :true ,
            unique: [true," username already exists"]

        },
        email:{
            type:String,
            required:true,
            lowercase: true,
            trim:true
            
        },

        // if you use in password compare by bcryptjs then no need to use lowercase in password because it will be hashed and hashed password is case sensitive
        password:{
           type:String,
            required:true,
            // lowercase: true,
            trim:true  ,
            minlength: 6,
        

        },
     },
        {
            timestamps:true,
        }
    
   
)

// UserSchema.pre("save",async function(){
//     if(!this.isModified('password')) return next();

//     const hashedpassword = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password , hashedpassword);
//     next();
// });

// UserSchema.methods.comparePassword = async function(password){
//     return await bcrypt.compare(password , this.password);
// }
// ;

const User = mongoose.model("User", UserSchema);
 
export default User