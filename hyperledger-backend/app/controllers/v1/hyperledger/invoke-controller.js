const invokeService = require('../../../services/invoke-service.js');

function InvokeController() {
}

function post(req, res, next) {
    console.log(req.body)
    const rp = invokeService.invoke(req.body.invoker, req.body.invokeFcn, req.body.invokeArgs);
    rp.then((res)=>console.log(res))
    res.status(200).json(rp);
}

InvokeController.prototype = {
  post: post
};

var invokeController = new InvokeController();

module.exports = invokeController;
