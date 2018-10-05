"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestUtils_test_1 = require("./utils/TestUtils.test");
var chai_1 = require("chai");
var CharWidth_1 = require("./CharWidth");
var Buffer_1 = require("./Buffer");
describe('getStringCellWidth', function () {
    var terminal;
    beforeEach(function () {
        terminal = new TestUtils_test_1.TestTerminal({ rows: 5, cols: 30 });
    });
    function sumWidths(buffer, start, end, sentinel) {
        var result = 0;
        for (var i = start; i < end; ++i) {
            var line = buffer.lines.get(i);
            for (var j = 0; j < line.length; ++j) {
                var ch = line.get(j);
                result += ch[Buffer_1.CHAR_DATA_WIDTH_INDEX];
                if (ch[Buffer_1.CHAR_DATA_CHAR_INDEX] === sentinel) {
                    return result;
                }
            }
        }
        return result;
    }
    it('ASCII chars', function () {
        var input = 'This is just ASCII text.#';
        terminal.writeSync(input);
        var s = terminal.buffer.iterator(true).next().content;
        chai_1.assert.equal(input, s);
        chai_1.assert.equal(CharWidth_1.getStringCellWidth(s), sumWidths(terminal.buffer, 0, 1, '#'));
    });
    it('combining chars', function () {
        var input = 'e\u0301e\u0301e\u0301e\u0301e\u0301e\u0301e\u0301e\u0301e\u0301#';
        terminal.writeSync(input);
        var s = terminal.buffer.iterator(true).next().content;
        chai_1.assert.equal(input, s);
        chai_1.assert.equal(CharWidth_1.getStringCellWidth(s), sumWidths(terminal.buffer, 0, 1, '#'));
    });
    it('surrogate chars', function () {
        var input = '𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞𝄞#';
        terminal.writeSync(input);
        var s = terminal.buffer.iterator(true).next().content;
        chai_1.assert.equal(input, s);
        chai_1.assert.equal(CharWidth_1.getStringCellWidth(s), sumWidths(terminal.buffer, 0, 1, '#'));
    });
    it('surrogate combining chars', function () {
        var input = '𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301𓂀\u0301#';
        terminal.writeSync(input);
        var s = terminal.buffer.iterator(true).next().content;
        chai_1.assert.equal(input, s);
        chai_1.assert.equal(CharWidth_1.getStringCellWidth(s), sumWidths(terminal.buffer, 0, 1, '#'));
    });
    it('fullwidth chars', function () {
        var input = '１２３４５６７８９０#';
        terminal.writeSync(input);
        var s = terminal.buffer.iterator(true).next().content;
        chai_1.assert.equal(input, s);
        chai_1.assert.equal(CharWidth_1.getStringCellWidth(s), sumWidths(terminal.buffer, 0, 1, '#'));
    });
    it('fullwidth chars offset 1', function () {
        var input = 'a１２３４５６７８９０#';
        terminal.writeSync(input);
        var s = terminal.buffer.iterator(true).next().content;
        chai_1.assert.equal(input, s);
        chai_1.assert.equal(CharWidth_1.getStringCellWidth(s), sumWidths(terminal.buffer, 0, 1, '#'));
    });
});
//# sourceMappingURL=CharWidth.test.js.map