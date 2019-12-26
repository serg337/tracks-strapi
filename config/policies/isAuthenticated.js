module.exports = async (ctx, next) => {
  // if I'm logedin
  if (ctx.state.user) {
    // retrieve the user id
    const { id } = ctx.state.user;
    // the request is for adding a new track POST /tracks
    // and the key `creator` is the relation
    ctx.request.body.userId = id;
    // continue the middleware stack (will call the controller action to create an article)
    return await next();
  } else {
    return ctx.unauthorized(`You're not logged in!`);
  }
};
