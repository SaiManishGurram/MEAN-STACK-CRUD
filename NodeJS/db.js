const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://SaiManish:mongodbpass@cluster0.24mx0.mongodb.net/MEAN-CRUD?retryWrites=true&w=majority', (err)=>{
    if(!err) {
        console.log('MongoDB connection successfull..!');
    } else {
        console.log('Error in DB connection', JSON.stringify( err, undefined,2));
    }
})

module.exports = mongoose