"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var BufferLine_1 = require("./BufferLine");
var Buffer_1 = require("./Buffer");
var TestBufferLine = (function (_super) {
    __extends(TestBufferLine, _super);
    function TestBufferLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestBufferLine.prototype.toArray = function () {
        return this._data;
    };
    return TestBufferLine;
}(BufferLine_1.BufferLine));
describe('BufferLine', function () {
    it('ctor', function () {
        var line = new TestBufferLine();
        chai.expect(line.length).equals(0);
        chai.expect(line.pop()).equals(undefined);
        chai.expect(line.isWrapped).equals(false);
        line = new TestBufferLine(10);
        chai.expect(line.length).equals(10);
        chai.expect(line.pop()).eql([0, Buffer_1.NULL_CELL_CHAR, Buffer_1.NULL_CELL_WIDTH, Buffer_1.NULL_CELL_CODE]);
        chai.expect(line.isWrapped).equals(false);
        line = new TestBufferLine(10, null, true);
        chai.expect(line.length).equals(10);
        chai.expect(line.pop()).eql([0, Buffer_1.NULL_CELL_CHAR, Buffer_1.NULL_CELL_WIDTH, Buffer_1.NULL_CELL_CODE]);
        chai.expect(line.isWrapped).equals(true);
        line = new TestBufferLine(10, [123, 'a', 456, 789], true);
        chai.expect(line.length).equals(10);
        chai.expect(line.pop()).eql([123, 'a', 456, 789]);
        chai.expect(line.isWrapped).equals(true);
    });
    it('splice', function () {
        var line = new TestBufferLine();
        var data = [
            [1, 'a', 0, 0],
            [2, 'b', 0, 0],
            [3, 'c', 0, 0]
        ];
        for (var i = 0; i < data.length; ++i)
            line.push(data[i]);
        chai.expect(line.length).equals(data.length);
        var removed1 = line.splice(1, 1, [4, 'd', 0, 0]);
        var removed2 = data.splice(1, 1, [4, 'd', 0, 0]);
        chai.expect(removed1).eql(removed2);
        chai.expect(line.toArray()).eql(data);
    });
    it('TerminalLine.blankLine', function () {
        var line = TestBufferLine.blankLine(5, 123);
        chai.expect(line.length).equals(5);
        chai.expect(line.isWrapped).equals(false);
        var ch = line.get(0);
        chai.expect(ch[Buffer_1.CHAR_DATA_ATTR_INDEX]).equals(123);
        chai.expect(ch[Buffer_1.CHAR_DATA_CHAR_INDEX]).equals(Buffer_1.NULL_CELL_CHAR);
        chai.expect(ch[Buffer_1.CHAR_DATA_WIDTH_INDEX]).equals(Buffer_1.NULL_CELL_WIDTH);
        chai.expect(ch[Buffer_1.CHAR_DATA_CODE_INDEX]).equals(Buffer_1.NULL_CELL_CODE);
    });
    it('insertCells', function () {
        var line = new TestBufferLine();
        var data = [
            [1, 'a', 0, 0],
            [2, 'b', 0, 0],
            [3, 'c', 0, 0]
        ];
        for (var i = 0; i < data.length; ++i)
            line.push(data[i]);
        line.insertCells(1, 3, [4, 'd', 0, 0]);
        chai.expect(line.toArray()).eql([[1, 'a', 0, 0], [4, 'd', 0, 0], [4, 'd', 0, 0]]);
    });
    it('deleteCells', function () {
        var line = new TestBufferLine();
        var data = [
            [1, 'a', 0, 0],
            [2, 'b', 0, 0],
            [3, 'c', 0, 0],
            [4, 'd', 0, 0],
            [5, 'e', 0, 0]
        ];
        for (var i = 0; i < data.length; ++i)
            line.push(data[i]);
        line.deleteCells(1, 2, [6, 'f', 0, 0]);
        chai.expect(line.toArray()).eql([[1, 'a', 0, 0], [4, 'd', 0, 0], [5, 'e', 0, 0], [6, 'f', 0, 0], [6, 'f', 0, 0]]);
    });
    it('replaceCells', function () {
        var line = new TestBufferLine();
        var data = [
            [1, 'a', 0, 0],
            [2, 'b', 0, 0],
            [3, 'c', 0, 0],
            [4, 'd', 0, 0],
            [5, 'e', 0, 0]
        ];
        for (var i = 0; i < data.length; ++i)
            line.push(data[i]);
        line.replaceCells(2, 4, [6, 'f', 0, 0]);
        chai.expect(line.toArray()).eql([[1, 'a', 0, 0], [2, 'b', 0, 0], [6, 'f', 0, 0], [6, 'f', 0, 0], [5, 'e', 0, 0]]);
    });
});
//# sourceMappingURL=BufferLine.test.js.map