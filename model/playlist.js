// playlist model

const PlaylistModel = (sequelize, DataTypes) => {
  const Playlist = sequelize.define(
    "playlist",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        unique: true,
      },
      thumbnail: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        unique: false,
      },
      songs: {
        type: DataTypes.ARRAY(DataTypes.STRING(2048)),
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Playlist;
};

module.exports = PlaylistModel;
