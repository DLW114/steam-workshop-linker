# Steam 创意工坊批量订阅提取器 (SteamCMD 格式)

这是一个运行在浏览器控制台的 JavaScript 脚本，用于一键提取你在 Steam 创意工坊中订阅的所有 MOD/物品链接，并自动生成可用于 `steamcmd` 的批量下载脚本。

## ⚠️ 免责声明

**事先说明，此脚本仅供学习交流使用，切勿用于非法用途。请支持正版游戏，尊重每一位游戏开发者的劳动成果。** 使用本脚本所产生的一切后果由使用者自行承担。

## ✨ 功能特点

- 无需安装任何环境，直接在浏览器控制台运行。
- 自动解析当前页面的 APPID。
- 后台静默抓取，无需手动翻页。
- 自动生成包含 `login anonymous` 的标准 SteamCMD 批处理命令。
- 输出纯数字 MOD ID，格式整洁。

## 🛠️ 使用方法

1. 登录 [Steam 网页版](https://steamcommunity.com/)。
2. 进入你的特定游戏订阅页面（例如：`https://steamcommunity.com/profiles/xxx/myworkshopfiles?appid=294100&browsefilter=mysubscriptions&p=1&numperpage=30`）。
3. 按下 `F12` 打开浏览器开发者工具，点击 `Console`（控制台）标签。
4. 将 `extractor.js` 中的代码粘贴到控制台中，并按回车运行。
5. 脚本运行完毕后，浏览器会自动下载一个名为 `steamcmd_app_XXXXX.txt` 的文件。
6. 将下载的 `.txt` 文件重命名为 `.bat`（Windows）或直接作为参数传给 SteamCMD（Linux）。
7. 将该文件放入你的 SteamCMD 根目录，双击运行即可开始批量下载。

## 📄 输出示例

下载得到的文本内容格式如下：

```text
login anonymous
workshop_download_item 294100 1234567890
workshop_download_item 294100 9876543210
...
```
