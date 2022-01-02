import { UserModel } from '../../../db/models/user.dbmodel';
import { User as UserInterface } from '../../../interfaces/user.interface';
import { Auth as AuthService } from '../../../services/auth.service';

export const UserResolvers = {
    Query: {
        getUsers: () => UserModel.find(),

        getUser: async(parent: any, { id }: { id: string}, context: any) => {
            if (!context.userId) throw new Error('Something wrong');

            if (context.userId !== id) throw new Error('Something still wrong');

            return UserModel.findById(id);
        }
    },

    Mutation: {
        signup: async(parent: any, { email, password, name}: { email: string, password: string, name: string }) => {
            const hashedPw = await AuthService.hashPW(password);

            const user = new UserModel({ email, name, password: hashedPw});

            await user.save();

            return 'true';
        },

        signin: async(parent: any, { email, password, name }: { email: string, password: string, name: string }) => {
            if (!email) throw new Error('Bad auth');

            const user = await UserModel.findOne({ email: email});
            if (!user) throw new Error('Bad auth');

            const checkPassword = await AuthService.matchPW(password, user.password);
            if (!checkPassword) throw new Error('Bad auth');

            const jwtPayload: UserInterface = {
                userId: user.id,
                name: user.name,
                email: user.email,
            };

            return {
                jwt: AuthService.generateJwt(jwtPayload),
            };
        },
    },
}