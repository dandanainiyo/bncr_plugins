/**
 * @author Heyboi
 * @name plugins_update
 * @team Heyboi自用
 * @version 1.0.0
 * @description 检测各个插件库并更新
 * @rule ^检测插件更新$
 * @admin true
 * @disable true
 * 
 * 警告：
    1、 本插件更新功能通过比对仓库和本地文件实现。会直接覆盖原文件！！！
        使用前务必做好所有插件备份！！
        使用前务必做好所有插件备份！！
        使用前务必做好所有插件备份！！
    2、 请将spy配置文件等所有配置文件名放进"excludefile"中，不然会更新到仓库的空配置文件！！
    3、 使用本插件造成后果，使用者自行承担！
 * 
 * 说明：
    1、 检测github仓库bncr插件更新
    2、 仅超授可用
    3、 设置是否只更新已有插件（true：只更新已有插件。 false：如果仓库内插件不存在，将直接创建）:set Heyboi pluginsIsSaved true(或者false)
    4、 github api未认证有一定的请求次数限制，使用token可以解除限制（token获取方法自行搜索"github token申请",也可以不使用token）。设置token：set Heyboi githubtoken 你的token
 *  
 */


/* 仓库信息配置 */
const hub_list = [
    {
    url: 'https://github.com/fjwpsyb/Bncr_plugin',//仓库地址
    path: '自用插件'//插件存放文件夹

}, {
    url: 'https://github.com/RedLightsDistrict/Bncr_plugins',
    path: '红灯区'
    }
];
/* 设置不更新的插件|配置文件 */
const excludefile = ['无线店铺签到清理.js', 'SpyHandleMsg.js', 'SpyIsValid.js', 'SpyValueChange.js', 'SpyConfig.js'];
 /* HideStart */
module.exports = async s => {
    // if(!await sysMethod.isDev()){ return }
    await sysMethod.testModule(['@octokit/rest'], { install: true });
    const {Octokit} = require('@octokit/rest');
    const fs = require('fs');
    const path = require('path');
    const url = require('url');
    const db = new BncrDB('Heyboi');
    const token = await db.get('githubtoken', '');
    const octokit = new Octokit({
        auth: token,
    });
    const isSaved = await db.get('pluginsIsSaved', false);


    let log = '';

    function extractOwnerAndRepo(repositoryUrl) {
        const parsedUrl = new URL(repositoryUrl);
        const pathParts = parsedUrl.pathname.split('/').filter(part => part !== '');

        if (pathParts.length >= 2) {
            const repoName = pathParts[pathParts.length - 1];
            const repoNameWithoutGit = repoName.replace('.git', '');
            return {
                owner: pathParts[0],
                repo: repoNameWithoutGit,
            };
        } else {
            return null;
        }
    }
    async function checkForUpdates(owner, repo, localPath, directoryPath = '') {
        try {
            const res = await octokit.repos.getContent({
                owner,
                repo,
                path: directoryPath
            });

            if (Array.isArray(res.data)) {
                for (const item of res.data) {
                    if (item.type === 'file') {
                        if (!excludefile.includes(item.name)) {
                            await compareAndUpdateFile(owner, repo, item.path, localPath);
                        }

                    } else if (item.type === 'dir') {
                        await checkForUpdates(owner, repo, localPath, item.path);
                    }
                }

            }

        } catch (error) {
            s.reply(`获取仓库目录失败:${error.message}`);
            console.log(`获取仓库目录失败:${error.message}`);
        }
    }




    async function compareAndUpdateFile(owner, repo, filePath, localPath) {
        try {
            // 获取远程文件的内容
            const remoteResponse = await octokit.repos.getContent({
                owner,
                repo,
                path: filePath,
            });

            if (remoteResponse.data.type === 'file') {
                const remoteFileContent = Buffer.from(remoteResponse.data.content, 'base64').toString('utf-8');
                const pluginsName = remoteResponse.data.name;
                // 获取本地文件的内容
                const localFilePath = path.join(localPath, filePath);

                if (fs.existsSync(localFilePath)) {
                    const localFileContent = fs.readFileSync(localFilePath, 'utf-8');
                    // 如果本地文件内容与远程文件内容不同，则更新本地文件
                    if (remoteFileContent !== localFileContent) {
                        fs.writeFileSync(localFilePath, remoteFileContent);
                        console.log(`${localFilePath} 更新成功`);
                        log += `✅${pluginsName} 更新成功\n`;
                        // s.reply(log);
                    } else {
                        log += `❎${pluginsName} 未变动\n`;
                        console.log(`${localFilePath} 未变动`);
                        // s.reply(log);
                    }
                } else {
                    // 本地文件不存在，直接保存远程文件内容
                    if (isSaved) {
                        fs.writeFileSync(localFilePath, remoteFileContent);
                        log += `✅${pluginsName} 创建成功\n`;
                        // s.reply(log);
                    }

                }
            }
        } catch (error) {
            console.log(`Error fetching or updating file ${filePath}:${error.message}`);
            log += `Error fetching or updating file ${filePath}:${error.message}`;
        }
    }
    async function main() {
        let repository = {};
        for (const hub of hub_list) {
            try {
                repository = extractOwnerAndRepo(hub.url);
                await checkForUpdates(repository.owner, repository.repo, `BncrData/plugins/${hub.path}`);
                log += `✅${repository.owner}/${repository.repo}更新成功\n`;
            } catch {
                log += `❎${repository.owner}/${repository.repo}更新失败\n`;
            }
        }
        let replyid = await s.reply(log);
        await s.delMsg(replyid, {
            wait: 5
        });
    }

    main()
}
/* HideEnd */
