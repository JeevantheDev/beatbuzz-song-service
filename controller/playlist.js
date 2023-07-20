const db = require('../model');
const jwt = require('jsonwebtoken');

const Playlist = db.playlists;
const Songs = db.songs;

// create playlist
const createPlaylist = async (req, res) => {
  try {
    const { title, thumbnail, songs } = req.body;

    const token = req.headers.authorization;

    const userInfo = jwt.verify(token, process.env.secretKey);

    const playlistData = {
      user_id: userInfo.id,
      title,
      thumbnail,
      songs: songs || [],
    };

    //creating playlist
    const playlist = await Playlist.findOne({
      where: {
        title,
      },
    });

    if (!playlist) {
      const createdPlaylist = await Playlist.create(playlistData);

      return res.status(201).json({
        success: true,
        data: { ...createdPlaylist?.dataValues },
        message: 'Playlist created successfully.',
      });
    } else {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'Playlist already exists!!!',
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: `Here ${error.message}` });
  }
};
// update playlist
const updatePlaylist = async (req, res) => {
  try {
    const { id, ...rest } = req.body;

    const token = req.headers.authorization;

    const userInfo = jwt.verify(token, process.env.secretKey);

    const playlistData = {
      user_id: userInfo.id,
      id,
      ...rest,
    };

    //updating playlist
    const [updatedPlaylist] = await Playlist.update(playlistData, {
      where: {
        id,
        user_id: userInfo.id,
      },
    });

    if (updatedPlaylist === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Playlist doesn't exists",
      });
    } else {
      const finalPlaylist = await Playlist.findOne({
        where: {
          id,
        },
      });

      return res.status(201).json({
        success: true,
        data: finalPlaylist?.dataValues,
        message: 'Playlist updated successfully.',
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: `Here ${error.message}` });
  }
};
// delete one or multiple playlist
const deletePlaylist = async (req, res) => {
  try {
    const playlist = req.params.id;

    const playlistIds = playlist.split(',').map((id) => id.trim());

    const token = req.headers.authorization;

    const userInfo = jwt.verify(token, process.env.secretKey);

    //deleting playlist
    const deletedPlaylist = await Playlist.destroy({
      where: {
        id: playlistIds,
        user_id: userInfo.id,
      },
    });

    if (deletedPlaylist === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Playlist doesn't exists",
      });
    } else {
      return res.status(201).json({
        success: true,
        data: deletedPlaylist,
        message: 'Playlist deleted successfully',
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, data: null, message: `Here ${error.message}` });
  }
};

module.exports = {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
