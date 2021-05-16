const mongoose = require('mongoose');
const BD_URI = 'mongodb+srv://root:Ewhk5eF7FjNfphzS@cluster0.wlh44.mongodb.net/test'
const BD_DATABASE = 'shmdb'
const BD_PARAMS = {
    "useNewUrlParser": true,
    "useCreateIndex": true,
    "useUnifiedTopology": true,
    "dbName": BD_DATABASE
}

mongoose.connect(BD_URI,
    BD_PARAMS, (err) => {
        if (!err) {
            console.log('MongoDB connection succeeded.');
        }
        else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
    });

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = mongoose;