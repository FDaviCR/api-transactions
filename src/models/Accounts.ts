import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';

export interface AccountsInstance extends Model {
  id: Number;
  balance: Number;
}

const Accounts = sequelize.define<AccountsInstance>('Accounts', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  balance: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'Accounts',
  timestamps: false
});

Accounts.sync({force: false});
module.exports = Accounts;