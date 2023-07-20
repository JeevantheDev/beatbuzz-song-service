const jwt = require("jsonwebtoken");
const db = require("../model");

const VideoChannel = db.videoChannels;

const validUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "token is invalid", data: null });
    }

    jwt.verify(token, process.env.secretKey, (error, user) => {
      if (error) {
        return res
          .status(401)
          .json({ success: false, message: "token is expired!!!", data: null });
      }
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

const saveChannel = async (req, res, next) => {
  try {
    const { videoChannelId, videoChannel, videoChannelThumbnail } = req.body;
    // check videoChannel
    const channel = await VideoChannel.findOne({
      where: {
        videoChannelId,
      },
    });

    if (!channel) {
      const channelData = {
        videoChannelId,
        videoChannelThumbnail,
        videoChannel,
      };

      await VideoChannel.create(channelData);
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: error.message });
  }
};

//exporting module
module.exports = {
  validUser,
  saveChannel,
};
