const userModel = require("../Schema/users/user.model");

class UserServiceClass {
  constructor() {
    this.userModel = userModel;
    this.field = "*";
  }

  setField = (Fields) => {
    this.field = Fields;
  };

  getUserById = async (id) => {
    let data = null;
    if (this.field === "*") {
      data = await this.userModel.findById(id).lean();
    } else {
      data = await this.userModel.findById(id).select(this.field).lean();
    }
    return data;
  };

  getUserFindOne = async (object) => {
    let data = null;
    if (this.field === "*") {
      data = await this.userModel.findOne(object).lean();
    } else {
      data = await this.userModel.findOne(object).select(this.field).lean();
    }

    return data;
  };

  createUserDocument = async (details) => {
    return await userModel.create(details);
  };
}

module.exports = UserServiceClass;
