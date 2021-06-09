// all the middleware functions and logic for certain routes
// const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
// const { MongoClient } = require('mongodb');
// const mongoose = require('mongoose');

const HttpError = require('../models/http-error');

const User = require('../models/user');

// let DUMMY_USERS = [
//     {
//         id: 'u1',
//         name: 'Disha',
//         username: '@nutshell',
//         about: 'I am a student.',
//         // image: ''
//     },
// ];

const getUserById = async (req, res, next) => {
    // console.log('Get Request in users');
    const userId = req.params.uid;
    // let user;
    // const client = MongoClient(url);
    // try {
    //     await client.connect();
    //     const users = await client.db().collection('users').find().toArray();
    //     user = users.find((user) => user.id === userId);
    //     // .find((user) => user.id === userId);
    // } catch (error) {
    //     return res.status(404).json({ message: 'Unable to fetch user data.' });
    // }
    // const user = DUMMY_USERS.find((user) => {
    //     return user.id === userId;
    // });

    let user;
    try {
        const users = await User.find().exec();
        user = users.find((user) => user.id === userId);
    } catch (err) {
        return res.status(404).json({ message: 'Unable to fetch user data.' });
    }

    if (!user) {
        // return res.status(404).json({
        //     message: 'Could not find the user for the provided user id.',
        // });
        // throw error; // if in a synchronous code
        // with throw no need to use return since it already stops the function execution
        // but in database will be in async code so use
        const error = new HttpError(
            'Could not find the user with the provider user id.',
            404
        );
        return next(error); //more appropriate for async code which will be when we use database
    }
    res.json(user);
};

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError(
                'Desciption length too large. Please write briefly.',
                422
            )
        );
    }
    const { id, name, username, about } = req.body;

    const createdUser = new User({
        id,
        name,
        username,
        about,
    });

    // const createdUser = {
    //     // id: uuid(),
    //     id,
    //     name,
    //     username,
    //     about,
    // };

    // ################ Using mongoDB ##################
    // tells the client to which server we need to connect
    // const client = new MongoClient(url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });

    // try {
    //     await client.connect();
    //     const collection = await client.db().collection('users');
    //     await collection.insertOne(createdUser);
    // } catch (error) {
    //     return res.status(404).json({ message: 'Could not store data!' });
    // }
    // await client.close();
    // DUMMY_USERS.push(createdUser); //unshift(createdUser) // if wants to add as the first element
    // with push you add it at last

    // ############ Using mongoose ###############
    let user;
    try {
        user = await createdUser.save();
    } catch (error) {
        return res.status(404).json({ message: 'Could not store data!' });
    }

    //if create something new convention is send 201 status code
    res.status(201).json(user);
};

const updateUserData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError(
                'Desciption length too large. Please write briefly.',
                422
            )
        );
    }
    const { name, username, about } = req.body;
    const userId = req.params.uid;

    let user;
    try {
        const users = await User.find().exec();
        user = await users.find((user) => user.id === userId);
    } catch (error) {
        return next(
            new HttpError(
                'Something went wrong, could not update user data.',
                500
            )
        );
    }

    // objects are reference value in js
    // spread operator
    // creates a new object and copies all key value pairs of the old object
    // const updatedUser = { ...DUMMY_USERS.find((user) => user.id === userId) };
    // const userIndex = DUMMY_USERS.findIndex((user) => user.id === userId);
    // const stores the address of the object and not the object itself
    user.name = name;
    user.username = username;
    user.about = about;

    try {
        await user.save();
    } catch (err) {
        return next(
            new HttpError(
                'Something went wrong, could not update user data.',
                500
            )
        );
    }

    // DUMMY_USERS[userIndex] = updatedUser;

    // normal not 201 bcz we didnt created anything new
    res.status(200).json(user);
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;
    // if (!DUMMY_USERS.find((user) => user.id === userId)) {
    //     throw new HttpError('Could not find a user for this user id.', 404);
    // }
    // DUMMY_USERS = DUMMY_USERS.filter((user) => user.id !== userId);

    let user;
    try {
        const users = await User.find().exec();
        user = await users.find((user) => user.id === userId);
    } catch (error) {
        return next(
            new HttpError(
                'Something went wrong, could not delete the user',
                500
            )
        );
    }

    try {
        await user.remove();
    } catch (err) {
        return next(
            new HttpError(
                'Something went wrong, could not delete the user',
                500
            )
        );
    }

    res.status(200).json({
        message: `Deleted the user with userId: ${userId}!`,
    });
};

// This can only be used to export one function
// module.exports = getUserById;

// for exporting multiple functions
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUserData = updateUserData;
exports.deleteUser = deleteUser;
// exports.someOtherFunction = thatOtherFunction;
