import { Auth as AuthService } from './auth.service';

describe('JWT', () => {
    const jwt_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaHliYXNlIiwiaWF0IjoxNjQxMjQyMDY1LCJleHAiOjE2NDEyNDMyNjYsImF1ZCI6Ind3dy5leGFtcGxlLmNvbSIsInN1YiI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJ1c2VySWQiOiIxIiwiZW1haWwiOiJ0ZXN0QGplc3QuY29tIn0.-LG5sF--C5RYvnwjNvt_Wh2WKAHbmvFU38Mu1U44SJs';

    it('Should generate a JWT', (done: any) => {
        const token = AuthService.generateJwt({
            email: 'test@jest.com' ,
            userId: '1',
        });

        const jwtRegex = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

        expect(token.match(jwtRegex)).toBeTruthy();

        done();
    });

    it('Should retrieve jwt-payload', (done: any) => {
        const tokenPayload = AuthService.getJwtPayload(jwt_token);

        expect(tokenPayload).toHaveProperty('email','test@jest.com');
        expect(tokenPayload).toHaveProperty('userId','1');

        done();
    });

    it('Should retrieve userId from authorization header', (done: any) => {
        const req = {
            request: {
                headers: {
                    authorization: `Bearer ${jwt_token}`,
                },
            },
        };

        const userId = AuthService.getUserId({ req });

        expect(userId).toBe('1');

        done();
    });

    it('Should retrieve userId from token', (done: any) => {
        const userId = AuthService.getUserId({ authToken: jwt_token });

        expect(userId).toBe('1');

        done();
    });

    it('Should return null on empty header', (done: any) => {
        const req = {
            request: {
                headers: {
                    authorization: '',
                },
            },
        };

        const userId = AuthService.getUserId({ req });

        expect(userId).toBeNull;

        done();
    });
});

describe('PWD', () => {
    it('Should match password', async () => {
        const hashedPW = await AuthService.hashPW('fuuguL$1');
        const matchPW = await AuthService.matchPW('fuuguL$1', hashedPW);

        expect(matchPW).toBe(true);

        //done();
    });

    it('Should not match password', async () => {
        const hashedPW = await AuthService.hashPW('fuuguL$1');
        const matchPW = await AuthService.matchPW('FuguL$1', hashedPW);

        expect(matchPW).toBe(false);

        //done();
    });
});

export {};