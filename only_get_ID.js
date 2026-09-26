(async function() {
    // 1. 自动从当前URL获取 APPID
    let url = new URL(window.location.href);
    let appid = url.searchParams.get('appid');
    
    if (!appid) {
        console.log("%c错误：当前URL中没有找到 appid 参数！请确保你是在带有 appid=xxx 的页面运行此脚本。", "color: red; font-size: 14px;");
        return;
    }

    url.searchParams.set('numperpage', '30');
    
    let allModIds = new Set();
    let currentPage = 1;
    let hasMore = true;

    console.log(`%c检测到 APPID: ${appid}，开始后台提取 MOD IDs...`, "color: #66c0f4; font-size: 14px;");

    while (hasMore) {
        url.searchParams.set('p', currentPage);
        try {
            let res = await fetch(url.toString());
            let html = await res.text();
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            
            let newIdsCount = 0;
            doc.querySelectorAll('a').forEach(a => {
                if (a.href.includes('filedetails/?id=')) {
                    // 使用正则表达式，只提取 id= 后面的纯数字部分
                    let match = a.href.match(/id=(\d+)/);
                    if (match && match[1]) {
                        let modId = match[1];
                        if (!allModIds.has(modId)) {
                            allModIds.add(modId);
                            newIdsCount++;
                        }
                    }
                }
            });

            console.log(`正在扫描第 ${currentPage} 页：新增 ${newIdsCount} 个 MOD`);

            // 如果这一页没有新增ID，说明到底了
            if (newIdsCount === 0) {
                hasMore = false;
            } else {
                currentPage++;
                await new Promise(r => setTimeout(r, 300)); 
            }
        } catch (e) {
            console.error(`第 ${currentPage} 页抓取出错:`, e);
            hasMore = false; 
        }
    }

    if (allModIds.size === 0) {
        console.log("%c未提取到任何 MOD ID！请检查是否登录。", "color: red; font-size: 14px;");
        return;
    }

    let outputText = "";
    allModIds.forEach(modId => {
        outputText += `${modId},`;
    });
    if (outputText.slice(-1) == ","){
        outputText = outputText.slice(0, -1);
    }

    // 3. 生成并下载文件
    let blob = new Blob([outputText], {type: 'text/plain'});
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `steamcmd_app_${appid}.txt`;
    a.click();
    
    console.log(`%c搞定！共提取 ${allModIds.size} 个 MOD，已生成 SteamCMD 脚本。`, "color: green; font-size: 14px;");
})();
