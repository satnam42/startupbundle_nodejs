const getAdmins = async (query, context) => {
    const log = context.logger.start(`services:admins:getAdmins`);
    let allAdmins = await db.user.find().populate('role').populate('image');
    allAdmins.count = await db.user.find().count();
    log.end();
    return allAdmins;
};

exports.getAdmins = getAdmins;
