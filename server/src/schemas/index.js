const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

dotenv.config();

module.exports = () => {
    const connect = () => {
        mongoose.connect(process.env.MONGO_URI, {
        }, (error) => {
            if (error) {
                console.log('몽고디비 연결 에러', error);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });

    // require('./User');
    // require('./Diary');
};