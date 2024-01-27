import {DataTypes} from 'sequelize'
import {sequelize} from '../config/dbconnection.js'

const NodejsUser = sequelize.define(
  'users',
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      unique:true,
      autoIncrement:true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    modelName:'users',
    tableName:'users'
  }
);

export default NodejsUser