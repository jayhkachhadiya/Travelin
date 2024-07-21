import userModel from "../models/user.js";
let userService = [];
userService.findOne = (findPattern) => {
  return new Promise(async (resolve, reject) => {
    try {
      const savedUser = await userModel.findOne(findPattern)
      resolve(savedUser);
    } catch (e) {
      console.log(e)
      reject()
    }
  })
}
export default userService;