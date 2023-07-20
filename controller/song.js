const db = require('../model');
const jwt = require('jsonwebtoken');

const Song = db.songs;

// create song
const createSong = async (req, res) => {
  try {
    const {
      id,
      audio,
      keywords,
      category,
      videoTitle,
      videoURL,
      thumbnail,
      videoChannelId,
    } = req.body;

    const token = req.headers.authorization;

    const userInfo = jwt.verify(token, process.env.secretKey);

    const songData = {
      user_id: userInfo.id,
      id,
      audio,
      keywords,
      category,
      videoTitle,
      videoURL,
      thumbnail,
      videoChannelId,
    };

    //saving song
    const song = await Song.findOne({
      where: {
        id,
      },
    });

    if (!song) {
      const createdSong = await Song.create(songData);

      return res.status(201).json({
        success: true,
        data: { ...createdSong?.dataValues },
        message: 'Song created successfully.',
      });
    } else {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'Song already exists!!!',
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: `Here ${error.message}` });
  }
};
// update song
const updateSong = async (req, res) => {
  try {
    const { id, videoTitle, ...rest } = req.body;

    const token = req.headers.authorization;

    const userInfo = jwt.verify(token, process.env.secretKey);

    const songData = {
      user_id: userInfo.id,
      id,
      videoTitle,
      ...rest,
    };

    //saving song
    const [updatedSong] = await Song.update(songData, {
      where: {
        id,
        user_id: userInfo.id,
      },
    });

    if (updatedSong === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Song doesn't exists",
      });
    } else {
      const finalSong = await Song.findOne({
        where: {
          id,
        },
      });

      if (finalSong) {
        return res.status(201).json({
          success: true,
          data: finalSong?.dataValues,
          message: 'Song updated successfully.',
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: `Here ${error.message}` });
  }
};
// delete one or multiple song
const deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;

    const songIds = songId.split(',').map((id) => id.trim());

    const token = req.headers.authorization;

    const userInfo = jwt.verify(token, process.env.secretKey);

    //saving song
    const deletedSong = await Song.destroy({
      where: {
        id: songIds,
        user_id: userInfo.id,
      },
    });

    if (deletedSong === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Song doesn't exists",
      });
    } else {
      return res.status(201).json({
        success: true,
        data: deletedSong,
        message: 'Song deleted successfully',
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: `Here ${error.message}` });
  }
};

module.exports = {
  createSong,
  updateSong,
  deleteSong,
};
