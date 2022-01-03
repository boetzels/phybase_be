//import { idText } from "typescript";
/*
    jest tests for the user resolvers
*/

import { UserModel } from '../../../db/models/user.dbmodel';
import { UserResolvers } from './user.resolve';
import { setupDB } from '../test-setup';

setupDB('users-test');

describe('getUser', () => {
    it('Should save user to DB', async () => {
        const newUser = new UserModel({
            email: 'test@jest.com',
            password:'jest',
        });
        await newUser.save();

        const fetchedUser = await UserResolvers.Query.getUser(
            {},
            { id: newUser.id, },
            { userId: newUser.id, },
        );

        expect(fetchedUser.id).toBe(newUser.id);

        //done();
    });

    it('Should throw if no auth', async () => {
        const newUser = new UserModel({
            email: 'test@jest.com',
            password:'jest',
        });
        await newUser.save();

        await expect(UserResolvers.Query.getUser(
            {},
            { id: newUser.id },
            {},
        )).rejects.toThrow(/Something wrong/);

        //done();
    });

    it('Should throw if no auth', async () => {
        const newUser = new UserModel({
            email: 'test@jest.com',
            password:'jest',
        });
        await newUser.save();

        await expect(UserResolvers.Query.getUser(
            {},
            { id: newUser.id },
            { userId: '123' },
        )).rejects.toThrow(/Something still wrong/);

        //done();
    });
});