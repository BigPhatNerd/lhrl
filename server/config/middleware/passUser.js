//Middleware for restricting routes a user is not allowed to visit if not logged in.
module.exports = (req, res, next) => {
    res.locals.user_id = req.body.user_id;
    console.log("\n\ntestUserId: ", res.locals.user_id);
    next();

}