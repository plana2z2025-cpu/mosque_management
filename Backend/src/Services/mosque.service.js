const mosqueModel = require("../Schema/mosque/mosque.model");

class MosqueServiceClass {
  constructor() {
    this.mosqueModel = mosqueModel;
    this.selectField = "*";
  }

  setSelectedFields = (Fields) => {
    this.selectField = Fields;
  };

  getMosqueById = async (id) => {
    let data = null;
    if (this.selectFieldfield === "*") {
      data = await this.mosqueModel.findById(id).lean();
    } else {
      data = await this.mosqueModel.findById(id).select(this.field).lean();
    }
    return data;
  };

  getMosqueFindOne = async (object) => {
    let data = null;
    if (this.selectFieldfield === "*") {
      data = await this.mosqueModel.findOne(object).lean();
    } else {
      data = await this.mosqueModel.findOne(object).select(this.field).lean();
    }

    return data;
  };

  async testOne(queryObject = {}) {
    const query = this.mosqueModel.findOne(queryObject);
    // console.log(query);

    if (this.selectField !== "*") {
      query.select(this.selectField);
    }
    const mosque = await query.lean();
    console.log(mosque);

    return mosque;
  }

  createMosqueDocument = async (details) => {
    return await this.mosqueModel.create(details);
  };
}

module.exports = MosqueServiceClass;
