import { extendType, objectType } from "nexus";

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.id("id");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("name");
    }
});

export const UserQuery = extendType({
    type: "Query",
    definition(t) {
        t.field("getUser", {
            type: "User",
            args: { id: nonNull(intArg('id of the user')) },
            resolve(parent, args, context, info) {
                return 'works';
            },
        });
        t.list.field("getUsers", {
            type: "User",
            resolve(parent, args, context, info) {
                return [1,2,3];
            },
        })
    }
})