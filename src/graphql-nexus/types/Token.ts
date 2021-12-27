import { objectType } from "nexus";

export const Token = objectType({
    name: "Token",
    definition(t) {
        t.nonNull.id("jwt");
    }
});