import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

const invalidId = (id) => !mongoose.Types.ObjectId.isValid(id);

// CREATE
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || age === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({ name, description, age });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// READ (all)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// READ (one)
const getPostById = async (req, res) => {
  try {
    if (invalidId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// UPDATE
const updatePost = async (req, res) => {
  try {
    if (invalidId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });

    // basic validation: body must not be empty
    if (Object.keys(req.body || {}).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// DELETE
const deletePost = async (req, res) => {
  try {
    if (invalidId(req.params.id)) return res.status(400).json({ message: "Invalid post id" });

    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { createPost, getPosts, getPostById, updatePost, deletePost };
