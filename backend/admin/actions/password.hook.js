const bcrypt = require('bcrypt');

const after = async (response) => {
    if (response.record && response.record.errors) {
        response.record.errors.password =
            response.record.errors.encryptedPassword;
    }
    return response;
};

const before = async (request) => {
    // console.log(request.payload);
    if (request.method === 'post') {
        const { password, ...otherParams } = request.payload;

        if (password) {
            const encryptedPassword = await bcrypt.hash(password, 10);

            return {
                ...request,
                payload: {
                    ...otherParams,
                    encryptedPassword,
                },
            };
        }
    }

    // if (request.payload.password) {
    //     request.payload = {
    //         ...request.payload,
    //         encryptedPassword: await bcrypt.hash(
    //             request.payload.password,
    //             10
    //         ),
    //         password: undefined,
    //     };
    // }
    return request;
};

module.exports = { after, before };
