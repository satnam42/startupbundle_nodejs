var admin = require("firebase-admin");
// let  deviceTokens = '3244d7ba6d7f941e'
const pushNotification = async (deviceTokens, title, body, model) => {
    
    // const log = logger.start(`services:pushNotification`);

    var payload = {
        notification: {
            title: title || 'hi',
            body: body || 'demo',
            sound: "default"
        }
    };
    try {
        let res = await admin.messaging().sendToDevice(deviceTokens, payload)

        console.log('res', res)
    } catch (error) {
        console.log('error', error)
    }

    //   .then(function(response) {
    //     console.log('Successfully sent message:', response);
    //   })
    //   .catch(function(error) {
    //     console.log('Error sending message:', error);
    //   });

    // return admin.messaging().sendToDevice(deviceTokens, payload)
    //     .then( (response) => {
    //         // const list = await new db.notification(model).save();
    //         console.log('Successfully sent message:', response);
    //         // log.end();
    //     })
    //     .catch((error) => {
    //         console.log('Error sending message:', error);
    //         // log.end();
    //     })


}

exports.pushNotification = pushNotification