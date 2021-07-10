const defaultRouter = absoluteRequire('routes/default');

module.exports = (app) => {
  app.use('/', defaultRouter);
};
