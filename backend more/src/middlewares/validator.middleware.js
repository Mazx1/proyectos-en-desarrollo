export const validateSchema = (schema) =>(req, res, next) => {
    try {
    schema.parse(req.body);
    next();
    } catch (error) {
    if (error?.issues) {
    return res.status(400).json(error.issues.map((issue) => issue.message));
    }
    next(error); // cualquier otro error, que lo maneje Express
    }
};

