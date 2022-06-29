const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const buildUser = async (model, context) => {
    const { userRole, userName, email, password } = model;
    const log = context.logger.start(`services:users:build${model}`);
    const user = await new db.newUser({
        userRole: userRole,
        userName: userName,
        email: email,
        password: password,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return user;
};
const createUser = async (model, context) => {

    const log = context.logger.start("services:newUser:createUser");
    const isEmail = await db.newUser.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new error("Email already exists!")
    }
    else {
        model.password = encrypt.getHash(model.password, context)
        const user = buildUser(model, context)
        log.end();
        return user;
    }
}


//User Login
// const userLogin = async (model, context) => {
//     const log = context.logger.start("services:users:userLogin");

//     const query = {};

//     if (model.email) {
//         query.email = model.email;
//     }

//     let user = await db.user.findOne(query).populate('role')

//     if (!user) {
//         log.end();
//         throw new Error("user not found");
//     }

//     if (user.status === 'inactive') {
//         throw new Error("user Is inactive please contact with admin");
//     }

//     const isMatched = encrypt.compareHash(model.password, user.password, context);

//     if (!isMatched) {
//         log.end();
//         throw new Error("password mismatch");
//     }
//     const msg = 'Notification sent to user';
//     const token = auth.getToken(user.id, false, context);
//     let response = service.pushNotification(user.deviceToken, user.firstName, msg)
//     console.log(response);
//     user.token = token;
//     user.updatedOn = new Date();
//     user.save();
//     log.end();
//     return user;
// };

exports.createUser = createUser;
