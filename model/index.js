const { Sequelize, DataTypes } = require('sequelize');
const { DB_CONFIG } = require('../config');

//DB Connection
const { USER_NAME, PASSWORD, DB, HOST, PORT } = DB_CONFIG;

const DATABASE_URL = `postgresql://${USER_NAME}:${PASSWORD}@${HOST}:${PORT}/${DB}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: require('pg'),
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .catch((error) => {
    console.log(error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
const SongModel = require('./song')(sequelize, DataTypes);
const VideoChannelModel = require('./videoChannel')(sequelize, DataTypes);
const PlaylistModel = require('./playlist')(sequelize, DataTypes);

db.songs = SongModel;
db.videoChannels = VideoChannelModel;
db.playlists = PlaylistModel;

//exporting module
module.exports = db;
