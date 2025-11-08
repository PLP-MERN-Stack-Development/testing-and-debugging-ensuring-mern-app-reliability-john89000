const express = require('express');
const Post = require('../models/Post');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

// Create post (auth required)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Validation error' });

    const slug = (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const post = await Post.create({ title, content, author: req.user.id, category, slug });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts (with optional category filter and pagination)
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const skip = (Number(page) - 1) * Number(limit);
    const posts = await Post.find(filter).skip(skip).limit(Number(limit)).lean();
    res.json(posts.map(p => ({ ...p, id: p._id.toString(), _id: p._id.toString() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json({ ...post, _id: post._id.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post (auth required and author match)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    await post.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
