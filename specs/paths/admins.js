module.exports = [{
    url: "/getAdmins",
    get: {
        summary: "get Admins",
        description: "get Admins list",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        }],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
}]