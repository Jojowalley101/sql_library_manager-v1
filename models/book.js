'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Please enter a book title'
      }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author cannot be empty'
        },
        notNull: {
          msg: 'Please enter an author'
      }
    }
    },
    
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    //body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Book',
  });


  return Book;
};


// instanceMethods: {
//   publishedAt: function() {
//     return dateFormat(this.createdAt, "dddd, mmmm dS, yyyy, h:MM TT");
//   },
//   shortDescription: function() {
//     return this.body.length > 30 ? this.body.substr(0, 30) + "..." : this.body;
//   }
// }
//   });