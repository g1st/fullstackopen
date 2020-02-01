const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    const passwrodLength = password.length;
    if (passwrodLength < 3) {
      return res.status(400).json({
        error: {
          message: 'Password must be at least 3 characters long.',
          value: password
        }
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      username,
      name,
      passwordHash
    };

    const userToSave = new User(user);
    const savedUser = await userToSave.save();

    return res.status(201).json(savedUser.toJSON());
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', 'url title author id');

    return res.status(200).json(users.map(user => user.toJSON()));
  } catch (e) {
    next(e);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(
      'blogs',
      'url title author id'
    );
    return res.status(200).json(user.toJSON());
  } catch (e) {
    next(e);
  }
});

module.exports = userRouter;
