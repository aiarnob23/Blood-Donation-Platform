import { Post } from "../post/post.model";
import { User } from "../user/user.model";

//get all users from db
const getAllUsers = async () => {
  const result = await User.find();
  console.log(result);
  return result;
};

//get all user posts
const getAllPosts = async () => {
  const result = await Post.find();
  return result;
};
export const adminServices = {
  getAllUsers,
  getAllPosts,
};
