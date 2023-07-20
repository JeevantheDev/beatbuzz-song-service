// videoChannel model

const VideoChannelModel = (sequelize, DataTypes) => {
  const VideoChannel = sequelize.define(
    "videoChannel",
    {
      videoChannelId: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      videoChannelThumbnail: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
      videoChannel: {
        type: DataTypes.STRING(2048),
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  VideoChannel.associate = (models) => {
    VideoChannel.hasOne(models.song, {
      foreignKey: "videoChannelId",
    });
  };

  return VideoChannel;
};

module.exports = VideoChannelModel;
