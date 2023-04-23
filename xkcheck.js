/**
 * @author Heyboi
 * @name 星空签到
 * @origin Heyboi自用
 * @version 1.0.0
 * @description 星空签到
 * @rule ^星空签到$
 * @admin true
 * @public false
 * @priority 0
 * @disable false
 * @cron 30 7 * * *
*/
const axios = require('axios');
//填写结果推送id，group和user至少填写一个，不填写不推送。
//默认使用tgbot推送
const groupId='';
const userId='';
//星空账号
const xkname='';
//星空密码
const xkpwd = ''
module.exports = async s => {

async function loginAndGetPoints() {
  const url = 'http://www.xkdaili.com/tools/submit_ajax.ashx?action=user_login&site_id=1';
  const headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Content-Length': '50',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'www.xkdaili.com',
    'Origin': 'http://www.xkdaili.com',
    'Proxy-Connection': 'keep-alive',
    'Referer': 'http://www.xkdaili.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  };
  const data = {
    'username': `${xkname}`,
    'password': `${xkpwd}`,
    'remember': 1
  };

  const response = await axios.post(url, data, { headers, validateStatus: () => true });
  const cookie = response.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
  const r = response.data.msg;
  console.log(r);
  await s.reply(r);
  await sysMethod.sleep(1);

  const url_sign = 'http://www.xkdaili.com/tools/submit_ajax.ashx?action=user_receive_point';
  const headers_sign = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Content-Length': '10',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': cookie,
    'Host': 'www.xkdaili.com',
    'Origin': 'http://www.xkdaili.com',
    'Proxy-Connection': 'keep-alive',
    'Referer': 'http://www.xkdaili.com/main/usercenter.aspx',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  };
  const data_sign = {
    'type': 'login'
  };

  const html_sign = await axios.post(url_sign, data_sign, { headers: headers_sign, validateStatus: () => true });
  const result = html_sign.data.msg;
  console.log(result);
  await s.reply(`⏰星空签到结果${result}`);
  if(groupId||userId){
    await sysMethod.push({
        platform: 'tgBot',
        groupId: `${groupId}`,
        userId: `${userId}`,
        msg: `⏰星空签到结果:${xkname}${result}`,
        type: 'text',
    });
  }

}

await loginAndGetPoints();
}
