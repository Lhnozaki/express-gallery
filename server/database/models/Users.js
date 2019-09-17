const bookshelf = require("../bookshelf");
require("./Gallery");

class User extends bookshelf.Model {
  get tableName() {
    return "users";
  }

  get hasTimestamps() {
    return true;
  }

  galleries() {
    return this.hasMany("Gallery", "user_id");
  }
}

module.exports = bookshelf.model("User", User);
