/* 功能： @增删改查 */
const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
let passport = require("passport");

// $route POST /api/profiles/add
// @desc    创建信息接口
// @access  Private(私有)
/* 添加数据 */
router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.size) profileFields.size = req.body.size;
    if (req.body.remark) profileFields.remark = req.body.remark;
    new Profile(profileFields).save().then((profile) => {
      res.json(profile);
    });
  }
);

// $route GET /api/profiles
// @desc    获取 所有 信息数据接口
// @access  Private(私有)
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Profile.find()
      .then((profile) => {
        if (!profile) return res.json("没有任何数据!");
        res.json(profile);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

// $route GET /api/profiles/:id
// @desc    获取 单个 信息数据接口
// @access  Private(私有)
router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Profile.findOne({
      _id: req.params.id,
    })
      .then((profile) => {
        if (!profile) return res.json("没有数据!");
        res.json(profile);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  }
);

// $route POST /api/profiles/edit
// @desc    编辑信息数据接口
// @access  Private(私有)
router.post(
  "/edit/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const profileFields = {};
    if (req.body.type) profileFields.type = req.body.type;
    if (req.body.describe) profileFields.describe = req.body.describe;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.size) profileFields.size = req.body.size;
    if (req.body.remark) profileFields.remark = req.body.remark;
    Profile.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: profileFields,
      },
      {
        new: true,
      }
    ).then((proflie) => {
      res.json(proflie);
    });
  }
);

// $route DELETE /api/profiles/delete/:id
// @desc    删除信息数据接口
// @access  Private(私有)
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Profile.findOneAndRemove({
      _id: req.params.id,
    })
      .then((profile) => {
        res.json("删除成功!");
        // profile.save().then((profile) => {
        //   res.json(profile);
        // });
      })
      .catch((err) => {
        res.status(404).json("删除失败!");
      });
  }
);
module.exports = router;
