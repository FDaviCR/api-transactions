import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/pg';
const Accounts = sequelize.define('Accounts', { name: DataTypes.STRING });

export interface TransactionsInstance extends Model {
  id: Number;
  debitedAccountId: Number;
  creditedAccountId: Number;
  value: Number;
  createdAt: Date;
}

const Transactions = sequelize.define<TransactionsInstance>('Transactions', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  debitedAccountId:{
    type: DataTypes.INTEGER,
    references: {
      model: Accounts,
      key: 'id'
    }
  },
  creditedAccountId:{
    type: DataTypes.INTEGER,
    references: {
      model: Accounts,
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'Transactions',
  timestamps: false
});

Transactions.sync({force: false});
module.exports = Transactions;