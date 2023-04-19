/**
 * @author Heyboi
 * @name ip变动更换白名单
 * @origin Heyboi自用
 * @version 1.0.0
 * @description 检测ip变动自动更换品易白名单
 * @rule ^白名单$
 * @priority 1000
 * @admin true
 * @public false
 * @disable false
 * @cron 0 *\/1 * * * *
*/

// **********填写品易参数************
const neek = '';
const appkey = '';
// *****是否将老ip从白名单里删除******
const deleteOldIp = true;
/* ********************************* */
const sysDB = new BncrDB('system');
const axios = require('axios').default;
module.exports = async s => {
    await sysMethod.testModule(['axios'], { install: true });
    const getip = await axios.get("https://pycn.yapi.3866866.com/get_client_ip");
    const localIp = getip.data.ret_data;
    const IpDB = await sysDB.get('oldIp');
    const nowip = localIp;
    console.log(`localIp:${localIp}\nIpDB:${IpDB}`)
    if (IpDB && nowip && IpDB !== nowip) {
        s.reply('正在更换白名单')
        await axios.get(`https://pycn.yapi.3866866.com/index/index/save_white?neek=${neek}&appkey=${appkey}&white=${localIp}`)
        if(deleteOldIp){
            s.reply('正在删除老ip');
            await axios.get(`https://pycn.yapi.3866866.com/index/index/del_white?neek==${neek}&appkey=${appkey}&white=${IpDB}`)
        }
    }else{
        await s.reply('无需更换白名单')
    }
    await sysDB.set('oldIp', nowip);
    await s.reply('运行完成');
};
