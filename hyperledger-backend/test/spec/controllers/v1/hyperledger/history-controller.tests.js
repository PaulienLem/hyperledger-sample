
describe('HistoryController Tests', function() {

  var historyController;
  var req;
  var res;
  var next;

  beforeEach(function() {
    req = {};
    res = { status: function(code) { return { json: function(obj) {} }} };

    sinon.spy(res, "status");

    historyController = require('../../../../../app/controllers/v1/hyperledger/history-controller');
  });

  describe('get()', function() {

    it('should be a function', function(done) {
      expect(historyController.get).to.be.a('function');
      done();
    });

    it('should call res.status() one time', function(done) {
      historyController.get(req, res, next);

      expect(res.status.callCount).to.equal(1);
      done();
    });

    it('should call res.status() with 200', function(done) {
        historyController.get(req, res, next);

      expect(res.status.calledWith(200)).to.equal(true);
      done();
    });

  });
});
