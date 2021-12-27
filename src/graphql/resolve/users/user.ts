const UserModel = require('../../../models/user.model');
const AuthService = require('../../../services/auth.service');

module.exports = {
    Query: {
        getUsers: () => UserModel.find(),

        getUser: async(_, { id }, context) => {
            if (!context.userId) throw new Error('Something wrong');

            if (context.userId !== id) throw new Error('Something wrong');

            return UserModel.findById(id);
        }
    }

    Mutation: {
        signup: async(_, { email, password, name}) => {
            const hashedPw = await AuthService.hashPW(password);

            const user = new UserModel({ email, name, password: hashedPw});

            await user.save();

            return 'true';
        },

        signin: async(_, { email, name, password }) => {
            if (!email) throw new Error('Bad auth');

            const user = await UserModel.findOne(email);
            if (!user) throw new Error('Bad auth');

            const checkPassword = await AuthService.matchPW(password, user.password);
            if (!checkPassword) throw new Error('Bad auth');

            return {
                jwt: AuthService.generateJwt({
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                }),
            };
        },
    }
}