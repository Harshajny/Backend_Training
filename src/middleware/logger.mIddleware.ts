const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

export default loggerMiddleware;



//request body is a raw obj athu js akkanam .. so we need a parser and we used middle ware to make that happen