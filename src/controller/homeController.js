import db from "../models/index";
import CRUDServices from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.Users.findAll();

    res.render("crud");
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud");
};

let postCRUD = async (req, res) => {
  await CRUDServices.createNewUser(req.body);
  return res.redirect("/get-crud");
};

let displayGetCRUD = async (req, res) => {
  let dataUsers = await CRUDServices.getAllUser();

  res.render("displayCRUD", { data: dataUsers });
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDServices.getUserData(userId);

    if (userData) {
      return res.render("editCRUD", { user: userData });
    }
  } else {
    res.send("Page error , no user data");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  if (data) {
    await CRUDServices.updateUserData(data);

    res.redirect("/get-crud");
  } else {
    res.send("Error. Cannot update!");
  }
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;

  if (id) {
    await CRUDServices.deleteUserInfo(id);
    res.redirect("/get-crud");
  } else {
    res.send("Error. User not found! ");
  }
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  editCRUD,
  putCRUD,
  deleteCRUD,
};
