module.exports = function(sequelize, DataTypes) {
    var Match = sequelize.define("Match", {
      // A match is 'owned' by one user, but has an association to another.
        userid1: 
          { type: DataTypes.INTEGER,
            allowNull: false},
        userid2:  
        { type: DataTypes.INTEGER,
          allowNull: false},
        deltascore:  
        { type: DataTypes.INTEGER,
          allowNull: false}        
    });
  
    Match.associate = function(models) {
      // We're saying that a Match should belong to an User
      // A Match can't be created without an User due to the foreign key constraint
      Match.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Match;
  };