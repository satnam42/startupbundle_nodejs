"use strict";

const user = require('../models/user');

const imageUrl = require('config').get('image').url

exports.toModel = entity => {

    const model = {
        id: entity._id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        phoneNumber: entity.phoneNumber,
        status: entity.status,
        email: entity.email,
        token: entity.token,
        sex: entity.sex,
        // role: entity.role,
        deviceToken: entity.deviceToken,
        avatar: entity.image ? `${imageUrl}${entity.image.image}` : ""
    };

    if (entity.image && entity.image.gallery && entity.image.gallery.length > 0) {
        for (let index = 0; index < entity.image.gallery.length; index++) {
            entity.image.gallery[index].image = `${imageUrl}${entity.image.gallery[index].image}`;
        }
        model.gallery = entity.image.gallery
    }

    return model;

};


exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};