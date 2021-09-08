const { fromEvent } = require("rxjs");
const { ipcRenderer } = require("electron");

ipcRenderer.on("fillContent", (event, {author, message}) => {
    let messageElement = document.querySelector(".message");
    let authorElement = document.querySelector(".author");

    messageElement.innerText = message;
    authorElement.innerText = `By ${author}`;
});