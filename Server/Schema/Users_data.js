const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

const UserDetailsSchema=new mongoose.Schema(
    {
      Firstname:{
        type:String,
        required:true
      },
      Lastname:String,
      Username:String,
      Email:String,
      Password:String,
      Phone:Number,
      Tokens:[{
        token:{
         type:String,
         required:true
        }
     }],
    },
    {
      collection:"Users_data"
    }
)

UserDetailsSchema.methods.generateAuthToken= async function(){
  try {
     let tokenNew=jwt.sign({_id:this._id},"QWERTYUIOPLKJHGFDSAZXCVBNMLKJHGF")
     this.Tokens=this.Tokens.concat({token:tokenNew});
     await this.save();
     return tokenNew;
  } catch (error) {
    console.log(error);
    
  }
}
mongoose.model("Users_data",UserDetailsSchema);