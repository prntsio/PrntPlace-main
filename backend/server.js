const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('admin-bro-expressjs');

AdminBro.registerAdapter(require('admin-bro-mongoose'));

const usersRoutes = require('./routes/users-routes');
const requestsRoutes = require('./routes/requests-routes');
const HttpError = require('./models/http-error');
const { pwd } = require('./config.js');
const User = require('./models/user');
const ApprovalRequest = require('./models/approvalRequest');

const app = express();

app.use(bodyParser.json()); // next() is auto called inside
app.use(cors());

// restrict to a specific origin
// app.use(cors({
//     origin: 'https://prnts.netlify.app'
//   }));

app.use('/api/users', usersRoutes);

app.use('/api/approvalRequests', requestsRoutes);

const adminBro = new AdminBro({
    resources: [User, ApprovalRequest],
    branding: {
        companyName: 'Prnts',
    },
    rootPath: '/admin',
});

const router = AdminBroExpressjs.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

// Error handling for unsupported routes
app.use((req, res, next) => {
    throw new HttpError('Could not find route.', 404);
});

// Error Handling
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || 'An unknown error occured!',
    });
});

const url = `mongodb+srv://Disha:${pwd}@prnts.l6zjm.mongodb.net/prnts_test?retryWrites=true&w=majority`;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Connection failed!');
        console.log(err);
    });
