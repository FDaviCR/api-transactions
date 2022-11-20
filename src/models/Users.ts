import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';
const Account = require('./Accounts')

export interface UsersInstance extends Model {
  id: Number;
  username: String;
  password: String;
  accountId: Number;
}

const Users = sequelize.define<UsersInstance>('Users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Users',
  timestamps: false
});

Users.belongsTo(Account);

Users.sync({force: false});
module.exports = Users;