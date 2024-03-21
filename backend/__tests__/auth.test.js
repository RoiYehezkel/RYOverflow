require("dotenv").config();
const auth = require("../src/controllers/auth");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  connect,
  disconnect,
  cleanData,
} = require("./dbConnection/mongodb.memory.test.helper");
const User = require("../models/user");

describe("testing signup", () => {
  beforeAll(connect);
  beforeEach(cleanData);
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

    await auth.signup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "user saved successfully",
      })
    );
  });

  it("signup should fail email exist", async () => {
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

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: "password",
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }

    await auth.signup(req, res, next);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const errorPassedToNext = next.mock.calls[0][0];
    expect(errorPassedToNext.message).toBe("Email exists");
    expect(errorPassedToNext.status).toBe(409);
  });
});

describe("testing login", () => {
  beforeAll(connect);
  beforeEach(cleanData);
  afterAll(disconnect);

  it("login should succeed", async () => {
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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }

    await auth.login(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Auth successful",
        token: expect.any(String),
      })
    );
  });

  it("login should fail when user not exist", async () => {
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

    await auth.login(req, res, next);
    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const errorPassedToNext = next.mock.calls[0][0];
    expect(errorPassedToNext.message).toBe("Auth failed");
    expect(errorPassedToNext.status).toBe(401);
  });

  it("login should fail with wrong password", async () => {
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

    const hashedPassword = await bcrypt.hash(req.body.password + "pass", 10);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }

    await auth.login(req, res, next);
    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const errorPassedToNext = next.mock.calls[0][0];
    expect(errorPassedToNext.message).toBe("Incorrect password");
    expect(errorPassedToNext.status).toBe(401);
  });
});
