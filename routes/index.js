const express = require("express");
const songContoller = require("../controller/song");
const playlistContoller = require("../controller/playlist");
const { validUser, saveChannel } = require("../middleware");

const { createSong, updateSong, deleteSong } = songContoller;
const { createPlaylist, updatePlaylist, deletePlaylist } = playlistContoller;

const router = express.Router();

router.post("/create/song", validUser, saveChannel, createSong);
router.put("/update/song", validUser, updateSong);
router.delete("/delete/song/:id", validUser, deleteSong);

router.post("/create/playlist", validUser, createPlaylist);
router.put("/update/playlist", validUser, updatePlaylist);
router.delete("/delete/playlist/:id", validUser, deletePlaylist);

module.exports = router;
