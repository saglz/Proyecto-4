const connMongoose = require('mongoose');
connMongoose.connect('mongodb://localhost:27017/project4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = connMongoose;