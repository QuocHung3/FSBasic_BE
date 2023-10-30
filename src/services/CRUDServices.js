import db from "../models";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBscript = await hashUserPassword(data.password);
      await db.Users.create({
        email: data.email,
        password: hashPasswordFromBscript,
        firstName: data.fname,
        lastName: data.lname,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.role,
      });

      resolve("ok create new user Success");
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.Users.findAll({ raw: true });

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({ where: { id: userId }, raw: true });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({ where: { id: data.id } });
      if (user) {
        user.firstName = data.fname;
        user.lastName = data.lname;
        user.address = data.address;

        await user.save();
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserInfo = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({ where: { id: id } });
      if (user) {
        await user.destroy();
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getUserData,
  updateUserData,
  deleteUserInfo,
};
