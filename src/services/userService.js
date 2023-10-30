import db from "../models";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.Users.findOne({
            where : {email:email},
            attributes: ['email','roleId','password'],
            raw:  true
        });

        if(user) {
            //compape password
            let checkPass =  bcrypt.compareSync(password, user.password)

            if(checkPass) {
                userData.errCode ='0',
                userData.errMessage = 'ok'
                delete user.password
                userData.user = user 
            } else{
                userData.errCode = 3,
                userData.errMessage = 'Wrong password!'
            }
        } else{
            userData.errCode = 2,
            userData.errMessage = 'User not found!'
        }

        resolve(userData);
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your email isn't exist in system. please try other email.`;
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({ where: { email: userEmail } });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { handleUserLogin };
