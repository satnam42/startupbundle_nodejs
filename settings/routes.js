"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");
const path = require("path");
const express = require("express");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function(req, res) {
        fs.readFile("./public/specs.html", function(err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });

    app.get('/chat', function(req, res) {
        res.sendFile(__dirname, '../templates/index.html');
    });

    app.get("/api/specs", function(req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });
    ////react js project setup////
    const root = path.join(__dirname, '../../startupbundle_bin_reactjs/', 'build')

    app.use(express.static(root));

    app.get('/*', function(req, res, next) {
        if (!req.path.includes('api')) {

            res.sendFile('index.html', { root });
        } else next();
    });



    //user api's //
    app.post(
        "/api/users/create",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.get(
        "/api/users/currentUser/:id",
        permit.context.validateToken,
        api.users.currentUser
    );

    app.put(
        "/api/users/changePassword/:id",
        permit.context.validateToken,
        api.users.changePassword,
        validator.users.changePassword,
    );
    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );

    app.get(
        "/api/users/getUsers",
        permit.context.validateToken,
        api.users.getUsers
    );

    app.get(
        "/api/admins/getAdmins",
        permit.context.validateToken,
        api.admins.getAdmins
    );

    app.delete(
        "/api/users/delete/:id",
        permit.context.validateToken,
        api.users.deleteUser
    );

    app.put(
        "/api/users/update/:id",
        permit.context.validateToken,
        validator.users.update,
        api.users.update
    );


    app.post(
        "/api/users/otpVerifyAndChangePassword",
        permit.context.validateToken,
        api.users.otpVerifyAndChangePassword
    );

    //role api's //

    app.post(
        "/api/roles/create",
        permit.context.builder,
        validator.roles.create,
        api.roles.create
    );

    app.get(
        "/api/roles/getAll",
        permit.context.builder,
        api.roles.getRoles
    );

    app.delete(
        "/api/roles/deleteRole/:id",
        permit.context.validateToken,
        api.roles.deleteRole
    );

    // //admins api's //
    // app.post(
    //     "/api/admins/create",
    //     permit.context.builder,
    //     validator.admins.create,
    //     api.admins.create
    // );

    // app.post(
    //     "/api/admins/login",
    //     permit.context.builder,
    //     validator.admins.login,
    //     api.admins.login
    // );

    // app.put(
    //     "/api/admins/changePassword/:id",
    //     permit.context.validateToken,
    //     validator.admins.changePassword,
    //     api.admins.changePassword,
    // );
    // app.put(
    //     "/api/admins/update/:id",
    //     permit.context.validateToken,
    //     api.admins.update,
    // );

    // app.get(
    //     "/api/admins/getAdmins",
    //     permit.context.validateToken,
    //     api.admins.getAdmins
    // );

    // app.delete(
    //     "/api/admins/delete/:id",
    //     permit.context.validateToken,
    //     api.admins.deleteAdmin
    // );

    //// consversations api's ////

    app.get(
        '/api/conversations/getOldChat',
        permit.context.validateToken,
        api.conversations.getOldChat
    );

    //// images  ////

    app.post(
        '/api/images/uploadSingle',
        permit.context.builder,
        validator.images.upload,
        api.images.uploadSingle
    );

    app.post(
        '/api/images/uploadMultiple',
        permit.context.builder,
        validator.images.upload,
        api.images.uploadMultiple
    );

    app.put(
        '/api/images/remove',
        permit.context.builder,
        api.images.remove
    );

    ///////////////event api's /////////////////

    app.post(
        "/api/events/add",
        permit.context.builder,
        api.events.create
    );

    app.get(
        "/api/events/listByUserId/:id",
        permit.context.builder,
        api.events.listByUserId
    );
    app.get(
        "/api/events/list",
        permit.context.builder,
        api.events.list
    );
    app.put(
        "/api/events/update/:id",
        permit.context.builder,
        api.events.update
    );

    app.delete(
        "/api/events/delete/:id",
        permit.context.builder,
        api.events.remove
    );

    ///////////////notifications api's /////////////////
    // app.get(
    //     "/api/notifications/listByUserId/:id",
    //     permit.context.validateToken,
    //     api.notifications.listByUserId
    // );

    // app.get(
    //     "/api/notifications/list",
    //     permit.context.validateToken,
    //     api.notifications.list
    // );
    log.end();
};

exports.configure = configure;