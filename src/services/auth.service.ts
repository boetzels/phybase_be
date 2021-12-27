const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

import User from '../interfaces/user';

// get env vars
dotenv.config();

class Auth {
    static async hashPW(password: string) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    }

    static async matchPW(checkPW: string, dbPW: string) {
        return bcrypt.compareSync(checkPW, dbPW);
    }

    static generateJwt(userData: User) {
        return jwt.sign(
            userData,
            process.env.TOKEN_SECRET,
            { expiresIn: '1 day'},
        );
    }

    static getJwtPayload(token: string) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    static getUserId({ req, authToken = ''}): string | null {
        if (req && req.request?.headers)   {
            const authHeader: string = req.request.authorization;

            if (authHeader) {
                const token = authHeader.replace('Bearer ','');
                if (!token) return null;
                const { userId } = this.getJwtPayload(token);
                return userId;
            }
            else if (authToken) {
                const { userId } = this.getJwtPayload(authToken);
                return userId;
            }
        }
        return null;
    }
}

module.exports = Auth;