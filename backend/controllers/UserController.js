import bcryptjs from "bcryptjs";
import User from '../model/UserModel.js'
// import SavedPost from '../model/SavedPostModel.js'
// import Post from '../model/PostModel.js'
import Chat from '../model/ChatModel.js'

export const getUsers = async (req, res) => {
  try{

const Users=await User.find()
res.status(200).json(Users)

}
catch(err){
  console.log(err);
  res.status(400).json({message: err.message})
  
}
};

export const getUser = async (req, res) => {
  console.log("Test");
  
  const id=req.params.id

  try{
  const user=await User.findById(id)
  res.status(200).json(user)
    
  }
  catch(err){
    res.json({message: err.message})
    
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;
  console.log("id"+id)
  console.log(tokenUserId)

  if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
      if (password) {
          updatedPassword = await bcryptjs.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
          id,
          {
              ...inputs,
              ...(updatedPassword && { password: updatedPassword }),
              ...(avatar && { avatar }),
          },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found!" });
      }

      const { password: userPassword, ...rest } = updatedUser;

      res.status(200).json({ message: "User updated successfully", user: rest,tokenUserId });
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update user!" });
  }
}


export const deleteUser = async (req, res) => {
 const id=req.params.id;
 const tokenUserId=req.userId;
 if(id!==tokenUserId) 
 return res.status(403).json({ message: "User token Invalid"})
 try{
  const finduser= await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully",finduser})

 }
 catch(err){
  res.status(403).json({message:
    "Failed to delete user!"
  })
 }
};




