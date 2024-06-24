const { validationResult } = require("express-validator");
const multer = require("multer");

const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        posts: posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  const upload = multer();
  if (!errors.isEmpty()) {
    const error = new Error("validation failed, incorrect data");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No Image provided");
    res.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl,
    creator: { name: "Maximilian" },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Post created",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("couldn't find post ");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "successfully fetched",
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
