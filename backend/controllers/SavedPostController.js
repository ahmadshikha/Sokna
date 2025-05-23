import SavedPost  from "../model/SavedPostModel.js";


export const savePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.userId;
    console.log("test savefun");
    
    try {
      const existing = await SavedPost.findOne({ userId, postId });
      
      if (existing) {
        await SavedPost.deleteOne({ _id: existing._id });
    console.log("test unsave");
  
        return res.json({ saved: false });
      } else {
        await SavedPost.create({ userId, postId });
    console.log("test save");
  
        return res.json({ saved: true });
      }
    } catch (err) {
      if (err.code === 11000) {
        console.log(err.message);
        
        return res.status(400).json({ message: "This post is already saved" });
      }
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  };