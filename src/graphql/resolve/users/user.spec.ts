import { idText } from "typescript";

const User = require('../../../models/user.model');
const resolvers = require('./user');
const { setupDB } = require('../test-setup');

setupDB('users');

describe('getUser', () => {
    it('Should save user to DB', async done => {
        const newUser = new User({
            email: 'test@jest.com',
            password:'jest',
        });
        await newUser.save();

        const fetchedUser = await resolvers.Query.getUser(
            {},
            { id: newUser.id, },
            { userId: newUser.id, },
        );

        expect(fetchedUser.id).toBe(newUser.id);

        done();
    });

    it('Should throw if no auth', async done => {
        const newUser = new User({
            email: 'test@jest.com',
            password:'jest',
        });
        await newUser.save();

        await expect(resolvers.Query.getUser(
            {},
            { id: newUser.id },
            {},
        )).rejects.toThrow(/Something wrong/);

        done();
    });

    it('Should throw if no auth', async done => {
        const newUser = new User({
            email: 'test@jest.com',
            password:'jest',
        });
        await newUser.save();

        await expect(resolvers.Query.getUser(
            {},
            { id: newUser.id },
            { userId: '123' },
        )).rejects.toThrow(/Something still wrong/);

        done();
    });
});