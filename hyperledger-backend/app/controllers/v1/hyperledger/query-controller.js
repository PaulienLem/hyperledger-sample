const queryService = require('../../../services/query-service.js');

function QueryController() {
}

function get(req, res, next) {
    const enrollId=  req.params.enrollId;
    const fcn = req.params.fcn;
    const queryArgs = [req.params.queryArg]
    let rp;
    queryService.query(enrollId, fcn, queryArgs).then((res)=>{
        console.log("queryres", res);
        rp = res;
    })
    return res.status(200).json(rp);
}

QueryController.prototype = {
    get: get
};

var queryController = new QueryController();

module.exports = queryController;
