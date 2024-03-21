const auth = require("../controllers/auth");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { connect, disconnect } = require("./helper/mongodb.memory.test.helper");
const User = require("../models/user");

jest.mock("../models/user");

describe("testing signup", () => {
  beforeAll(connect);
  afterAll(disconnect);

  it("signup should succeed", async () => {
    const req = {
      body: {
        email: "dummy@gmail.com",
        password: "qwerty",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const next = jest.fn();

    User.findOne.mockResolvedValueOnce(undefined);
    User.prototype.save.mockResolvedValueOnce(req.body);

    await auth.signup(req, res, next);

    // Check if status 200 is sent back
    expect(res.status).toHaveBeenCalledWith(200);

    // Optionally, you can also check if a response is sent
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "user saved successfully",
      })
    );
  });
});
