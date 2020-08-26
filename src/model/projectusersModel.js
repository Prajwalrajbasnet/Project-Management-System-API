const bookshelf = require('../db');
const Project = require('./projectModel');
const User = require('./userModel');

const ProjectUsers = bookshelf.Model.extend({
  tableName: 'projectusers',
  project: function () {
    return this.belongsTo(Project);
  },
  user: function () {
    return this.belongsTo(User);
  }
});
module.exports = ProjectUsers;
