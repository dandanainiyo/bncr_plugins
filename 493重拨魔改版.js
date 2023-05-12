/**作者
 * @author 薛定谔的大灰机,Heyboi
 * @name 493重拨魔改版
 * @origin 大灰机
 * @version 1.0.0
 * @description 控制493重新拨号
 * @rule IP 493|ip已被限制|IP 403
 * @rule ^(493重拨)(开|关)$
 * @admin false
 * @disable false
 * @priority 9999
 */
/**
 * 
 * Heyboi魔改说明
 * 改成指定监听用户id或者群组id，支持设置插件开关，方便家宽党和女朋友打游戏不掉线
 * 设置插件开关方式二选一：
 * 方式1：管理员发送set Heyboi 493Switch on/off 设置开关（on为启动插件off为关）
 * 方式2：管理员发送493重拨开/关
 *  
 */

//userId和groupId建议二选一即可
const userId = '1870891676';
const groupId = '';
//key为你的重拨触发词
const key = '重拨'
module.exports = async s => {
    const db = new BncrDB('Heyboi');
    if(await s.param(1)=='493重拨'){
        if(!await s.isAdmin()){return}
        const name = s.param(2);
        if(name=='开'){
            if(await db.set('493Switch','on')){
                await s.delMsg(s.reply('设置成功，493重拨已开启'),5);
            }else{await s.delMsg(s.reply('设置失败'),5)}  
        }else{
            if(await db.set('493Switch','off')){
                await s.delMsg(s.reply('设置成功，493重拨已关闭'),5);
            }else{await s.delMsg(s.reply('设置失败'),5)}  
        }
        return
    }
    
    const status = await db.get('493Switch')
    if(status=='on'){
        if(userId){
            if(!await s.getUserId()==userId){
                console.log('id不匹配')
                return
            }
        }
        else if (groupId){
            if(!await s.getGroupId==groupId){
            console.log('id不匹配')
            return
            }
        } 
        sysMethod.inline(`${key}`);
    }

}
