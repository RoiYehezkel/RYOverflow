const auth = require("../controllers/auth");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongooseMock = require("mongoose-mock");
const User = require("../models/user");

jest.mock("../models/user");

describe("testing signup", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = MongoMemoryServer.create();
    await mongoServer.start(); // Start the server explicitly
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("signup should succeed", async () => {
    const req = {
      email: "dummy@gmail.com",
      password: "qwerty",
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    User.findOne.mockResolvedValueOnce(undefined);
    User.save.mockResolvedValueOnce(req);

    await auth.signup(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
