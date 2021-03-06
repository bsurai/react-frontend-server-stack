//"use strict";

export const compose: (f1: Function, f2: Function, ...funcs: Function[]) => any
    = function () {
        for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
            funcs[_key] = arguments[_key];
        }

        if (funcs.length === 0) {
            return function (arg) {
                return arg;
            };
        }

        if (funcs.length === 1) {
            return funcs[0];
        }

        var last = funcs[funcs.length - 1];
        var rest = funcs.slice(0, -1);
        return function () {
            return rest.reduceRight(function (composed, f) {
                return f(composed);
            }, last.apply(undefined, arguments));
        };
    }