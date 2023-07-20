// song model

const SongModel = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "song",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      audio: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      keywords: {
        type: DataTypes.ARRAY(DataTypes.STRING(2048)),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },

      videoChannelId: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      videoTitle: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      videoURL: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  Song.associate = (models) => {
    Song.belongsTo(models.videoChannel, {
      foreignKey: "videoChannelId",
    });
  };

  return Song;
};
module.exports = SongModel;
