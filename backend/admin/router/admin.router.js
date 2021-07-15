const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const { pwd } = require('../../config');

const buildAdminRouter = (adminBro) => {
    const router = buildAuthenticatedRouter(
        adminBro,
        {
            authenticate: async (email, password) => {
                const admin = await Admin.findOne({ email });
                if (admin) {
                    const matched = await bcrypt.compare(
                        password,
                        admin.encryptedPassword
                    );
                    if (matched) {
                        return admin.toJSON();
                    }
                }
                return null;
            },
            cookieName: 'prnts-admin-panel',
            cookiePassword: 'some-secret-password-used-to-secure-cookie',
        },
        null,
        // session(
        {
            resave: false,
            saveUninitialized: true,
            // store: MongoStore.create({
            //     mongoUrl: `mongodb+srv://Disha:${pwd}@prnts.l6zjm.mongodb.net/prnts_test?retryWrites=true&w=majority`,
            //     // mongooseConnection: mongoose.connection,
            // }),
        }
    );
    return router;
};

module.exports = buildAdminRouter;
