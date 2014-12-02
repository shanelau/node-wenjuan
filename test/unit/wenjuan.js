/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-12-1
 * @description
 *
 */
var should = require('should'),
moment = require('moment'),
_       = require('lodash');

var wenjuan = require('../../lib/index');
var config = require('../../lib/config');

//var currentDate = moment().format('YYYY-MM-DD HH:mm');
var currentDate = '2014-12-2 11:00';
var options = {
    user: 1,
    ctime: currentDate,
    email: '442180673@qq.com',
};

describe('Array', function(){
    describe('#getLoginUrl()', function(){
        it('should return -1 when the value is not present', function(){
            var result = wenjuan.getLoginUrl(options);
            console.log(result);
        })
    });
    describe("#getProjectList", function () {
        it("get json data", function (done) {
            options = _.pick(options,['user']);
            wenjuan.getAllProject(options).then(function(data){
                console.log(data);
                data.length.should.above(0);
                done();
            }).catch(function(err){
              console.error(err);
            });

        });
    });
    describe("#getProjectUrl", function () {
        it("return url", function (done) {
            var options = {
                user: 2,
                repeat:0,
                proj_id: 'yqmIBr'
            };
            var result = wenjuan.getPaperUrl(options);
            console.log(result);
            done();
        });
    })
    describe("#getPaperResult", function () {
        it("return url", function (done) {
            var options = {
                user: 1,
                proj_id: 'yqmIBr'
            };
            var result = wenjuan.getPaperResult(options);
            console.log(result);
            done();
        });
    });
    describe("#detail", function () {
        it("return url", function (done) {
            var options = {
                user: 1,
                proj_id: 'yqmIBr',
                respondent: 2
            };
            var result = wenjuan.getUserPaper(options);
            console.log(result);
            done();
        });
    });
})

  