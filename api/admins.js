"use strict";
const service = require("../services/admins");
const response = require("../exchange/response");
const userMapper = require("../mappers/user");

const getAdmins = async (req, res) => {  
    const log = req.context.logger.start(`api:admins:getAdmins`);
    try {
        const admin = await service.getAdmins(req.body, req.context);
        const message = "Admins get Successfully";
        log.end();
        return response.success(res, message,  userMapper.toSearchModel(admin));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.getAdmins = getAdmins;
