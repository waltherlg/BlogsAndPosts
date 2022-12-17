import {NextFunction, Request, Response} from "express";


export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // let authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     return res.sendStatus(401)
    // }
    // const authType = authHeader.split(' ')[0]
    // const authData = authHeader.split(' ')[1]
    // if (authType !== 'Basic') return res.sendStatus(401)
    // if (authData !== 'YWRtaW46cXdlcnR5') return res.sendStatus(401)

    const authheader = req.headers.authorization;
    if (!authheader) {
        return res.status(401).send("Unauthorized")
    }
    let auth =  Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];
    if (!(user == 'admin' && pass == 'qwerty')) {
        return res.status(401).send("Unauthorized")
    }
    return next()
}