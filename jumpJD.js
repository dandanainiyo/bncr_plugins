 /**
 * @author Heyboi
 * @name jumpJD
 * @origin Heyboi自用
 * @version 1.0.0
 * @rule ^(.跳|jump)
 * @admin true
 * @public false
 * @priority 99999
 * @disable false
 */
module.exports = async s => { 
    const msg = s.getMsg();
    regex = /https:\/\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\*\+,%;\=]*/g;
    let log = '';
    const matches = msg.match(regex);
    for (let i = 0; i < matches.length; i++) {
        url='https://www.yanyuwangluo.cn/jd/?url='+matches[i]
        log+=`跳转：${url}\n`
    }
    s.reply(log)
}
