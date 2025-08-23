import mongoose ,{Schema} from "mongoose";
import { rolesType } from "../../middlewares/auth.middleware.js"
const userSchema = new Schema ({
    userName:{
        type:String, 
        required: [true ,"userName is required"],
        minLength:[3,"user name must be at least 3 character long"],
        maxlength:[30,"username must be at most 30 character long "],
        trim:true

    },
    email:{
    type:String, 
    required:[true,"Email is required"],
    unique:[true,"email must be unique"],
    lowercase:true,
    trim:true,

    },
    password:{
        type:String, 
        required:[true ,"password is required"]
    },
    confirmpassword:{
        type:String, 
        default :false,
        
    },
    gender:{
        type:String, 
        enum:{
            values:["male","female"],
            message:"Gender must be male or female"
        }
    },
    confirmEmail:{
        type:String, 
        default :false,
        
    },
    role:{
        type:String, 
        enum: Object.values(rolesType),
        default:rolesType.User,
    },
     DOB:String,
     adress:String,
     phoneNumber:String,
     image:String,

},
{ timestamps: true }
 
);

const UserModel= mongoose.model("User",userSchema);
export default UserModel ;
