/**
 * @author Heyboi
 * @name 星空签到
 * @origin Heyboi自用
 * @version 1.0.2
 * @description 星空签到
 * @rule ^(星空设置) ([\s\S]+) ([\s\S]+)$
 * @rule ^(星空签到)$
 * @rule ^(星空清空)$
 * @rule ^(星空删除) ([\s\S]+)$
 * @admin false
 * @public false
 * @priority 0
 * @disable false
 * @cron 30 7 * * *
 更新说明：
 2023.4.23 插件发布

 2023.4.27 使用数据库，支持多账号签到
 配置说明：
      添加账号：      星空设置 账号 密码
      签到:           星空签到（仅管理员）
      清空账号:       星空清空（仅管理员）
      删除指定账号：  星空删除 账号  


*/

const axios = require('axios');
//填写结果推送id，group和user至少填写一个，不填写不推送。
//默认使用tgbot推送
const groupId='-810171650';
const userId='';

module.exports = async s => {
  const waitObj = { wait: 10 }
  const db = new BncrDB("Heyboi");
  let userlist=[]
  if(s.getFrom()=='cron'){
    userlist = await db.get("xkcheck");
    if(!userlist){
      await s.delMsg(s.reply('请检查配置'),waitObj);
      return
    }
    for(let i=0;i<userlist.length;i++){
      await loginAndGetPoints(userlist[i].user,userlist[i].pwd);
    }
  }
  if(s.getMsg()=='星空清空'){
    if(!s.isAdmin()){return};
    await db.del("xkcheck");
    s.delMsg(s.reply('清空完成'),waitObj);
  }else if(s.getMsg()=='星空签到'){
    if(!s.isAdmin()){return};
    userlist = await db.get("xkcheck");
    if(!userlist){
      await s.delMsg(s.reply('请检查配置'),waitObj);
      return
    }
    for(let i=0;i<userlist.length;i++){
      s.reply(`星空签到：正在签到第${i+1}个账号`);
      await loginAndGetPoints(userlist[i].user,userlist[i].pwd);
    }
  }else if(s.param(1)=='星空删除'){
    if(!s.isAdmin()){return};
    let name = s.param(2);
    userlist = await db.get("xkcheck");
    if(db.del("xkcheck",name)){
      await s.delMsg(s.reply("星空通知：删除成功"),waitObj);
    }else{  await s.delMsg(s.reply("星空通知：删除失败"),waitObj)}
  }
  else{
    let username = s.param(2);
    let password = s.param(3);
    userInfo={
      user:username,
      pwd:password
    };
    let tmp =await db.get("xkcheck",[]);
    if(tmp){ 
      tmp.push(userInfo);
    }else{
      tmp=[];
      tmp.push(userlist)
    }
    await db.set("xkcheck",tmp);
    s.delMsg(await s.reply('星空签到：用户设置成功'),waitObj)
    
  }
async function loginAndGetPoints(xkname,xkpwd) {
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
  let phone = xkname.replace(xkname.substring(3,7), "****");
  let log=''
  if(result.gradename) log=`星空签到结果:${result.gradename}已领取！`; else log=`星空签到结果:${result}`;
  s.delMsg(s.reply(log),waitObj);
  log=`⏰${phone}`+log;
  if(groupId||userId){
    await sysMethod.push({
        platform: 'tgBot',
        groupId: `${groupId}`,
        userId: `${userId}`,
        msg: log,
        type: 'text',
    });
  }

}
}
