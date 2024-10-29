const CompanyArr = {
    test:{
        requestUrl:' http://local.cfeng.wang',
        title:'测试环境',
        name:'测试',
        doMainId:'0',
        wssUrl:'ws://127.0.0.1:9002'    //wss地址（含ssl证书域名）
    },
    v3:{
        requestUrl:'https://v3.cfeng.wang',
        title:'v3',
        name:'v3版本',  //岗亭登录 时  显示的品牌（平台）名称
        doMainId:'0',    //域名id，请登录后台 查看对应域名id（如果没有请新建登录域名后可获取域名id）
        wssUrl:'wss://wss.cfeng.wang',    //wss地址（含ssl证书域名）
        logoText:'智慧城市专家'    //登录二维码底部文字
    },
    fukang:{
        requestUrl:'https://park.fksg.net',
        title:'富康集团数字值守岗亭',
        name:'富康集团数字值守岗亭',  //岗亭登录 时  显示的品牌（平台）名称
        doMainId:'1775792331786608641',    //域名id，请登录后台 查看对应域名id（如果没有请新建登录域名后可获取域名id）
        wssUrl:'wss://ws.fksg.net',    //wss地址（含ssl证书域名）
        logoText:'富康数字，智行天下'    //登录二维码底部文字
    },
    czd:{
        requestUrl:'https://v3.cfeng.wang',
        title:'城知道停车值守岗亭',
        name:'城知道停车值守岗亭',  //岗亭登录 时  显示的品牌（平台）名称
        doMainId:'1793945905737580544',    //域名id，请登录后台 查看对应域名id（如果没有请新建登录域名后可获取域名id）
        wssUrl:'wss://wss.cfeng.wang',    //wss地址（含ssl证书域名）
        logoText:'城知道，智行天下'    //登录二维码底部文字
    }
}

module.exports =  CompanyArr.v3
