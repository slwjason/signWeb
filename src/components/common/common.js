export default {
    formatDate:function(date, fmt){
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
            }
        }
        return fmt
    },
    padLeftZero:function (str) {
        return ('00' + str).substr(str.length)
    },
    //电话号码效验
    checkPhone:function(rule, value, callback){
        const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
        if (!value) {
            return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
            if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'))
            } else {
                if (phoneReg.test(value)) {
                    callback()
                } else {
                    callback(new Error('电话号码格式不正确'))
                }
            }
        }, 100)
    },
    //数字效验
    checkNumber:function(rule,value,callback){
        if(/^[0-9]*$/.test(value) == false){
            callback(new Error("请输入正确的数字"));
        }else{
            callback();
        }
    },
    //密码效验
    checkPwd:function(rule,value,callback){
        if(/^[_a-zA-Z0-9]+$/.test(value) == false){
            callback(new Error("请输入正确的密码"));
        }else{
            callback();
        }
    },
    //年龄效验
    checkAge:function(rule,value,callback){
        if(/^\d{1,3}$/.test(value) == false){
            callback(new Error("请输入正确的年龄"));
        }else{
            callback();
        }
    },

    //班级效验
    checkClass:function(rule,value,callback){
        if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(value) == false){
            callback(new Error("请输入正确的班级"));
        }else{
            callback();
        }
    },
    //qq效验
    checkQq:function(rule,value,callback){
        if(/^\d{5,11}$/.test(value) == false){
            callback(new Error("请输入正确的qq"));
        }else{
            callback();
        }
    },
    //姓名效验
    checkName:function(rule,value,callback){
        if(/^[\u4e00-\u9fa5]$/.test(value) == false){
            callback(new Error("请输入正确的姓名"));
        }else{
            callback();
        }
    },
}

