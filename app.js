const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const index = require('./routes/index');
const hello = require('./routes/hello');
const register = require('./routes/register');
const login = require('./routes/login');
const reports = require('./routes/reports');


const app = express();
const port = 1337;

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use('/', index);
app.use('/hello', hello);
app.use('/register', register);
app.use('/login', login);
app.use('/reports', reports);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//     var err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//         return next(err);
//     }
//
//     res.status(err.status || 500).json({
//         "errors": [
//             {
//                 "status": err.status,
//                 "title": err.message,
//                 "detail": err.message
//             }
//         ]
//     });
// })

// Start up server
app.listen(port, () => console.log('Example API listening on port ${port}!'));
