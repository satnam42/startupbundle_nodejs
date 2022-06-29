const response = require("../exchange/response");
const service = require("../services/newUser");

const createNew = async (req, res) => {
    const log = req.context.logger.start(`api:users:create`);
    try {
        const user = await service.createUser(req.body, req.context);
        const message = "User Register Successfully";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
exports.createNew = createNew