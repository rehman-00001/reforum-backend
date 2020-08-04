const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./model');
const { getFullProfile } = require('./controller');
const checkAuth = require('../../utilities/check-auth');
const JWT_KEY = process.env.JWT_KEY;
/**
 * user apis
 */
const userAPI = (app) => {
  app.post('/api/user/signup', async (req, res) => {
    console.log(req.body);
    const { email, password, fullName, city } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      fullName,
      email,
      city,
      avatarUrl: '',
      password: hashedPassword,
    });

    await createdUser.save();

    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      JWT_KEY
    );

    res
      .status(201)
      .json({ userId: createdUser.id, email: createdUser.email, token });
  });

  app.post('/api/user/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) res.status(401).send('Incorrect credentials');

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      res.status(401).send('Incorrect credentials');
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      JWT_KEY
    );

    res
      .status(200)
      .json({ userId: existingUser.id, email: existingUser.email, token });
  });

  // get user full profile
  app.get('/api/user/profile/:username', (req, res) => {
    if (checkAuth(req)) {
      getFullProfile(req.params.username).then(
        (result) => {
          res.send(result);
        },
        (error) => {
          res.send({ error });
        }
      );
    }
  });

  // get authenticated user
  app.get('/api/user/getUser', async (req, res) => {
    console.log(('userId', req.userId));

    if (checkAuth(req)) {
      const user = await User.findOne({ _id: req.userId });
      if (user) {
        return res.status(200).json(user.toObject());
      }
    }
    return res.send(null);
  });
};

module.exports = userAPI;
