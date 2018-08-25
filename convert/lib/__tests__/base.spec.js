"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
describe("This is a simple test", function () {
    test("Check the sampleFunction function", function () {
        expect(src_1.sampleFunction("hello")).toEqual("hellohello");
    });
});
