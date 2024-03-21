const auth = require("../controllers/auth");
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "user saved successfully",
      })
    );
  });

  it("signup should fail with status code 409", async () => {
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

    User.findOne.mockResolvedValueOnce({ email: req.body.email });

    await auth.signup(req, res, next);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const errorPassedToNext = next.mock.calls[0][0];
    expect(errorPassedToNext.message).toBe("Email exists");
    expect(errorPassedToNext.status).toBe(409);
  });
});
