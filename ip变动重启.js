/**
 * @author Heyboi
 * @name ip变动重启
 * @origin 红灯区
 * @version 1.0.0
 * @description ip变动重启,多拨慎用!
 * @rule ^ip检测$
 * @priority 1000
 * @admin true
 * @public false
 * @disable true
 * @cron 0 *\/1 * * * *
家宽专用魔改版
A佬原版publicIpv4包只能获取clash的地址，而地址一变动无界就重启
所以根据A佬的改了下
原理：获取通过请求国内网络api的方法获取真实ip地址，并监测
*/
/* 使用前先对机器人说 npm i axios */
const AmTool = require('./mod/AmTool');
const sysDB = new BncrDB('system');
const axios = require('axios').default;
module.exports = async s => {
    await sysMethod.testModule(['axios'], { install: true });
    const ipv4 = await axios({
                methods: 'GET',
                url: 'http://myip.ipip.net',
            }).then(function(result){
                return result.data
            })

    const v4DB = await sysDB.get('publicIpv4');
    const nowV4ip = await ipv4.toString().split('当前 IP：')[1].split(' ')[0];
    let logs = `上次ip:${(v4DB && AmTool.Masking(v4DB, 5, 6)) || '空'}\n`;
    logs += `本次ip:${(nowV4ip && AmTool.Masking(nowV4ip, 5, 6)) || '空'}\n`;
    let open = false;
    if (v4DB && nowV4ip && v4DB !== nowV4ip) {
        logs += '重启中...';
        open = true;
    }
    await sysDB.set('publicIpv4', nowV4ip);
    await s.reply(logs);
    open && (s.getFrom() === 'cron' ? sysMethod.inline('重启') : s.inlineSugar('重启'));
};
