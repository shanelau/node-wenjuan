/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-12-1
 * @description
 *
 */
var _   = require('lodash'),
    md5 = require('md5-node'),
    config = require('./config'),
    request = require('request'),
    Promise = require('bluebird'),
    qs = require('querystring');

/**
 * apitest.wenjuan.com:8000/openapi/login/? site=1& user=2&ctime=3 &email=4&mobile=5
 * 传入参数按参数名升序排列，如下：
 * 传入顺序为 site, user, ctime, email, mobile
 * 排序后为ctime, email, mobile, site, user
 * 所以md5校验码就为md5(“3”+“4”+“5”+“1”+“2" + SECRET_KEY) SECRET_KEY由问卷网提供。
 * @param options
 * @retrun
 */

function getMD5(options){
    if(config.site == '' || config.site == null){
        throw  new Error('config.site is null,Maybe you need init wenjuan');
    }
    options.site = config.site;
    var querys = _.sortBy(Object.keys(options));
    var source = '';
    _.forEach(querys, function (item) {
        source += options[item];
    });
    options.md5 =  md5(source+config.SECRET_KEY);
    return options;
}

module.exports = {
    /**
     *  初始化 配置文件， site, SECRET_KEY, answer_callback
     * @param options
     */
    init: function (options) {
        config = _.assign(config,options);
    },
    /**
     *  获取第三方用户登录链接
     * @param options
     * @returns {string}
     */
     getLoginUrl : function (options) {
        options = _.pick(options,'user','nickname','ctime','email');
        options = getMD5(options);
        var login_url = config.api_url+config.login;
        return login_url +'?'+ qs.stringify(options);
    },
    /**
     * 获取某一个用户下面的所有链接
     * @param options
     * @returns {Promise}
     */
    getAllProject: function (options) {
        options.type = options.type || 'survey';

        options = _.pick(options,'user','type');
        options = getMD5(options);
        var data = {
            url: config.api_url+config.proj_list,
            qs: options
        };
        return new Promise(function (resovle, reject) {
            request(data, function (err, res, body) {
                if(err) {
                    reject(err);
                }
                resovle(body);
            });
        });
    },
    /**
     * 获取答卷地址
     * @param options
     * @returns {string}
     */
    getPaperUrl: function (options) {
        var callback_url = 'http://localhost:3000/wenjuan/callback';
        options = _.pick(options,['user','proj_id','repeat']);
        options.callback = callback_url;
        options = getMD5(options);
        return config.api_url+config.proj_id+options.proj_id+'?'+qs.stringify(options);
    },
    /**
     *  获取答卷的结果url
     * @param options
     * @returns {string}
     */
    getPaperResult: function (options) {
        options = _.pick(options,['user','proj_id']);
        options = getMD5(options);
        return config.api_url+config.basic_chart+'?'+qs.stringify(options);
    },
    /**
     * 获取某一个用户的某个答卷
     * @param options
     * @returns {string}
     */
    getUserPaper: function (options) {
        options.datatype = options.datatype || 'html'; // html or json
        options = _.pick(options,'user','proj_id','respondent');
        options = getMD5(options);
        return config.api_url+config.detail+'?'+qs.stringify(options);
    }
};