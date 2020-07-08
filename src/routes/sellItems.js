const Item = require("../models/items");
const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const router = new express.Router();
const auth = require("../middlewares/auth");
ObjectId = require("mongodb").ObjectID;

router.post("/api/sell", auth, async (req, res) => {
  const item = new Item({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await item.save();
    res.status(201).send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/sell", auth, async (req, res) => {
  const items = await Item.find({ owner: req.user._id });
  res.send(items);
});

router.patch("/api/sell/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "quantity",
    "price",
    "description",
    "name",
    "category",
  ];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(400).send("Invalid Updates");
  }
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!item) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      item[update] = req.body[update];
    });
    await item.save();
    res.send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/api/sell/:id", auth, async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!item) {
      return res.status(404).send();
    }
    res.send(item);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (
      !(
        file.originalname.endsWith(".jpg") ||
        file.originalname.endsWith(".jpeg") ||
        file.originalname.endsWith(".png")
      )
    ) {
      return cb(new Error("Provide an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/api/items/:id/image",
  auth,
  upload.single("itemImage"),
  async (req, res) => {
    const item = await Item.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    const image = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    item.images = item.images.concat({ image });
    await item.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/api/items/:id/image/:imageId", auth, async (req, res) => {
  const item = await Item.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });
  const images = item.images.filter((image) => {
    return image._id != req.params.imageId;
  });
  item.images = images;
  item.save();
  res.send(item);
});

module.exports = router;
