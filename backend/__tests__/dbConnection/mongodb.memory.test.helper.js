const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

const disconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const cleanData = async () => {
  await mongoose.connection.db.dropDatabase();
};

module.exports = {
  connect,
  disconnect,
  cleanData,
};
