const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {


  constructor(opt={}) {
    super(opt);
    this.counter=0;
    this.MAX_COUNT=opt.limit;
    this.encoding = opt.encoding;

  }

  _transform(chunk, encoding, callback) {
    this.counter += chunk.length;
    if(this.counter > this.MAX_COUNT) {
      callback(new LimitExceededError());

    }else{
      callback(null,chunk);
    }

  }

}

module.exports = LimitSizeStream;
