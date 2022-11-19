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
      type: DataTypes.INTEGER,
      allowNull: false
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
/*
Users.hasOne(Account, {
  foreignKey: 'accountId'
})
*/

Users.sync({force: false});
module.exports = Users;