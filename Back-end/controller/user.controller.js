const ErrorHandler = require("../utils/ErrorHandler.js");
const UserModel = require("../model/user.model.js");
const transporter = require("../utils/sendmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config({
  path: "../config/env",
});

async function CreateUser(req, res) {
  const { name, email, password } = req.body;
  

  // Check if the user already exists
  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    const error = new ErrorHandler("User is already present in database", 400);
    return res.status(404).send({
      message: error.message,
      status: error.statusCode,
      success: false,
    });
  }

  // Hash the password before saving
  bcrypt.hash(password, 10, async function (err, hashedPassword) {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,  // Save hashed password
    });

    const data = {
      name,
      email,
      password: hashedPassword,
    };

    const token = generateToken(data);
    
    // Uncomment and modify the below lines to send a verification email
    // await transporter.sendMail({
    //   to: "shangeshsixisvv@gmail.com",
    //   from: "simrank04u@gmail.com",
    //   subject: "Verification email for the e-commerce site",
    //   text: "Text",
    //   html: `<h1>Hello world http://localhost:5173/activation/${token}</h1>`,
    // });

    await newUser.save();
    return res.send("User Created Successfully");
  });
}

const generateToken = (data) => {
  const token = jwt.sign(
    { name: data.name, email: data.email },
    process.env.SECRET_KEY
  );
  return token;
};

const verifyUser = (token) => {
  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    return verify;
  } catch (error) {
    return false;
  }
};

async function verifyUserController(req, res) {
  const { token } = req.params;
  try {
    if (verifyUser(token)) {
      return res
        .status(200)
        .cookie("token", token)
        .json({ token, success: true });
    }
    return res.status(403).send({ message: "Token expired" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
}

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUserPresentinDB = await UserModel.findOne({ email: email });
    if (checkUserPresentinDB) {
      return res.status(403).send({ message: "User already present" });
    }

    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      try {
        if (err) {
          return res.status(403).send({ message: err.message });
        }
        await UserModel.create({
          Name: name,
          email,
          password: hashedPassword,
        });

        return res.status(201).send({ message: "User created successfully.." });
      } catch (er) {
        return res.status(500).send({ message: er.message });
      }
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserPresentinDB = await UserModel.findOne({ email: email });

    if (!checkUserPresentinDB) {
      return res.status(404).send({ message: "User not found" });
    }

    bcrypt.compare(password, checkUserPresentinDB.password, function (err, result) {
      if (err) {
        return res.status(403).send({ message: err.message, success: false });
      }
      if (result) {
        let data = {
          id: checkUserPresentinDB._id,
          email,
        };
        const token = generateToken(data);

        return res
          .status(200)
          .cookie("token", token)
          .send({ message: "User logged in successfully..", success: true });
      } else {
        return res.status(403).send({ message: "Incorrect password", success: false });
      }
    });
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

module.exports = {
  CreateUser,
  login,
  verifyUserController,
  signup,
  verifyUser
};
