node-wenjuan
============

问卷网接入，第三方开发者接入


开放平台网站：[http://www.wenjuan.com/open/devmanual](http://www.wenjuan.com/open/devmanual)

## 快速开始

```
var wenjuan = require('wenjuan');
var config = {
    site: '你的站点',
    SECRET_KEY: '你的key',
    callback:'答完题的回调地址'
}
wenjuan.init(config);


//获取所有的问卷列表
var options = {
    user: 1,
    ctime: '2014-12-1 12:00',
    email: 'your email address',
};
var login_url = wenjuan.getLoginUrl(options);


```

### API
#### getLoginUrl(options)
获取管理员的登录地址

`options` 参数

```
var options = {
    user: 1,
    ctime: currentDate,
    email: '442180673@qq.com',
};
```

#### getAllProject(options)
获取管理员的所有问卷

`options` 参数

##### Example
```
var options = {user:1};
    wenjuan.getAllProject(options).then(function(data){
      var data = JSON.parse(data);
});
```

#### getPaperUrl(options)
答卷链接

`options` 参数


```
var options = {
    user: 2,
    repeat:0,
    proj_id: 'yqmIBr'
};
```

#### getPaperResult
查看结果报表 URL


`options` 参数


```
var options = {
    user: 1,   //管理员ID
    repeat:0,
    proj_id: 'yqmIBr'
};
```

#### getUserPaper
查看答题者最新一条答卷详情

var options = {
    user: 1,
    proj_id: 'yqmIBr',
    respondent: 2
};