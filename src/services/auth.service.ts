const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

import { User as UserInterface } from '../interfaces/user.interface';

// get env vars
dotenv.config();

export class Auth {
    static async hashPW(password: string) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash: string = await bcrypt.hashSync(password, salt);
        return hash;
    }

    static async matchPW(checkPW: string, dbPW: string) {
        const compare = await bcrypt.compareSync(checkPW, dbPW);
        return compare;
    }

    static generateJwt(userData: UserInterface) {
        return jwt.sign(
            userData,
            process.env.TOKEN_SECRET,
            { expiresIn: '1d'},
        );
    }

    static getJwtPayload(token: string) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    static getUserId({ req, authToken }: { req?: any, authToken?: string}): string | null {
        if (req && req.headers)   {
            const authHeader: string | null = req.headers.authorization;

            if (authHeader) {
                const token = authHeader.replace('Bearer ','');
                if (!token) return null;
                const { userId } = this.getJwtPayload(token);
                return userId;
            }
        }
        else if (authToken) {
            const { userId } = this.getJwtPayload(authToken);
            return userId;
        }
        return null;
    }
}
