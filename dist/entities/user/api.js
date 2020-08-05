"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('./model');

var _require = require('./controller'),
    getFullProfile = _require.getFullProfile;

var checkAuth = require('../../utilities/check-auth');

var JWT_KEY = process.env.JWT_KEY;
/**
 * user apis
 */

var userAPI = function userAPI(app) {
  app.post('/api/user/signup', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var _req$body, email, password, fullName, city, hashedPassword, createdUser, token;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.body);
              _req$body = req.body, email = _req$body.email, password = _req$body.password, fullName = _req$body.fullName, city = _req$body.city;
              _context.next = 4;
              return bcrypt.hash(password, 12);

            case 4:
              hashedPassword = _context.sent;
              createdUser = new User({
                fullName: fullName,
                email: email,
                city: city,
                avatarUrl: '',
                password: hashedPassword
              });
              _context.next = 8;
              return createdUser.save();

            case 8:
              token = jwt.sign({
                userId: createdUser.id,
                email: createdUser.email
              }, JWT_KEY);
              res.status(201).json({
                userId: createdUser.id,
                email: createdUser.email,
                token: token
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.post('/api/user/login', /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, email, password, existingUser, isValidPassword, token;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(req.body);
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context2.next = 4;
              return User.findOne({
                email: email
              });

            case 4:
              existingUser = _context2.sent;
              if (!existingUser) res.status(401).send('Incorrect credentials');
              _context2.next = 8;
              return bcrypt.compare(password, existingUser.password);

            case 8:
              isValidPassword = _context2.sent;

              if (!isValidPassword) {
                res.status(401).send('Incorrect credentials');
              }

              token = jwt.sign({
                userId: existingUser.id,
                email: existingUser.email
              }, JWT_KEY);
              res.status(200).json({
                userId: existingUser.id,
                email: existingUser.email,
                token: token
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()); // get user full profile

  app.get('/api/user/profile/:username', function (req, res) {
    if (checkAuth(req)) {
      getFullProfile(req.params.username).then(function (result) {
        res.send(result);
      }, function (error) {
        res.send({
          error: error
        });
      });
    }
  }); // get authenticated user

  app.get('/api/user/getUser', /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var user;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(('userId', req.userId));

              if (!checkAuth(req)) {
                _context3.next = 7;
                break;
              }

              _context3.next = 4;
              return User.findOne({
                _id: req.userId
              });

            case 4:
              user = _context3.sent;

              if (!user) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(200).json(user.toObject()));

            case 7:
              return _context3.abrupt("return", res.send(null));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};

module.exports = userAPI;
//# sourceMappingURL=api.js.map