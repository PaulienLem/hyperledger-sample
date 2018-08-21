const invokeService = require('../../../services/invoke-service.js');

function InvokeController() {
}

function post(req, res, next) {
    const rp = invokeService.invoke('Lander', "createCoachingPlan", ["PLAN9", "Lander", "Paulien", "Cookies"]);
    rp.then((res)=>console.log(res))
    res.status(200).json(rp);
}

InvokeController.prototype = {
  post: post
};

var invokeController = new InvokeController();

module.exports = invokeController;
