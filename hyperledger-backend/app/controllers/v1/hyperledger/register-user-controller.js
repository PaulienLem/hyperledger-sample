const registerUserService = require('../../../services/registerUser-service.js');

function RegisterUserController() {
}

function get(req, res, next) {
  const rp = registerUserService.registerUser(req.params.enrollId);
  console.log(rp)
  return res.status(200).json(rp);

}

RegisterUserController.prototype = {
  get: get
};

var registerUserController = new RegisterUserController();

module.exports = registerUserController;
