'use strict';
module.exports = function(sequelize, DataTypes) {
  var items = sequelize.define('items', {
    title: DataTypes.STRING,
    price: DataTypes.REAL,
    imageURL: DataTypes.STRING,
    amazonURL: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        items.belongsTo(models.wishlist, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return items;
};