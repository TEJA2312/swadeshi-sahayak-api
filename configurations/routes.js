
const express = require('express');
const applicationRouter = express.Router();

// register all module routes with prefixes here
applicationRouter.use('/user', require('../modules/user/routes/user.route'));

module.exports = applicationRouter;