# 綠界訊息實況小工具

![demo.gif](demo.gif)

一個可以用於實況中顯示綠界訊息的小工具。

## 下載頁面

可至[Release](https://github.com/YuutaTsubasa/ecpay-message-tool/releases/)頁面根據自身的作業系統下載最新版本。

檔名 | 作業系統
--- | --- 
ecpay-message-tool-win32-x64-{version}.zip | Windows (64-bit)
ecpay-message-tool-{version}-1.x86_64.rpm | Linux (64-bit) .rpm
ecpay-message-tool_{version}_amd64.deb | Linux (64-bit) .deb
ecpay-message-tool-darwin-x64-{version}.zip | macOS (64-bit)

## 使用說明

### 基本使用方法
1. 打開程式(ecpay-message-tool.exe)，會打開兩個視窗：「網頁視窗」和「訊息視窗」。
2. 利用「網頁視窗」登入綠界。
3. 來到「實況主收款明細」頁面。
4. 查詢你要的訊息。
5. 等待一下，表格後面每一條會多一個「特製顯示」的按鈕。
6. 按下去。
7. 於 OBS 介面擷取「訊息視窗」即可。（可利用濾鏡中的色度鍵去背景）

## 使用技術
- [npm](https://www.electronjs.org/)
- [Electron](https://www.electronjs.org/)
- [Electron Forge](https://www.electronforge.io/)
- [RxJS](https://rxjs.dev/)

## 作者
- [悠太翼 @YuutaTsubasa](http://yutaii.run/twitter)
- 歡迎訂閱我的 [Youtube 頻道](http://yutaii.run/youtube)！
- 有任何想要修改的部分歡迎發 Pull Request、發 Issue 或是私訊唷！
