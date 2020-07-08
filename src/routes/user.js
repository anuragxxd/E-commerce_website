const User = require("../models/user");
const express = require("express");
const auth = require("../middlewares/auth");
const router = new express.Router();
const Item = require("../models/items");

router.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.createToken();
    res.cookie("token", token, {
      // maxAge: 60 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      // sameSite: true,
    });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findbyCreds(req.body.email, req.body.password);
    const token = await user.createToken();
    res.cookie("token", token, {
      // maxAge: 60 * 60 * 1000,
      httpOnly: true,
      // secure: true,
      // sameSite: true,
    });
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    res.clearCookie("token");
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send("not working");
  }
});

router.delete("/api/users", auth, async (req, res) => {
  try {
    await req.user.remove();
    await Item.deleteMany({ owner: req.user._id });
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/api/users", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send("invalid data!!");
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
