module.exports = [

    {
        name: "userCreate",
        properties: {

            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            status: {
                enum: ['active', 'inactive']
            },
            password: {
                type: "string"
            },
            deviceToken: {
                type: "string"
            },
            // loc: {
            //     properties: {
            //         type: 'array',
            //         // items: {
            //         properties: {
            //             coordinates: { type: 'number' }
            //         },

            //     }
            // }
            roleId: {
                type: "string"
            },
        },
    }

];