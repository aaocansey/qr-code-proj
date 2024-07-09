const mongoose = require('mongoose');


const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://albertocansey582:WGZbAi9ykcBOQ9oT@cluster0.cpscziy.mongodb.net/qr-code-project?retryWrites=true&w=majority')
    } catch (error) {
        console.log(error)
    }
}


module.exports = connect;