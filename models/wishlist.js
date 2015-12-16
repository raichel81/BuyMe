'use strict';
module.exports = function(sequelize, DataTypes) {
  var wishlist = sequelize.define('wishlist', {
    listName: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        wishlist.hasMany(models.items);
        wishlist.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return wishlist;
};