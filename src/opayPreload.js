const { ipcMain, ipcRenderer } = require("electron");
const { fromEvent, interval } = require("rxjs");

fromEvent(window, "load")
    .subscribe(() => {
        interval(1000).subscribe(_ => {
            let table = document.querySelector("#queryResult table");
            if (!table) return;

            let titleRow = table.querySelector("thead tr");
            let rows = table.querySelectorAll("tbody tr");

            if (titleRow.querySelectorAll("th").length !== 7){
                let buttonTitle = document.createElement("th");
                buttonTitle.innerText = "特製顯示";
                titleRow.appendChild(buttonTitle);
            }

            rows.forEach(row => {
                let columns = row.querySelectorAll("td");
                if (columns == 7) return;

                let button = document.createElement("button");
                button.innerText = "特製顯示";
                fromEvent(button, "click")
                    .subscribe(_ => {
                        ipcRenderer.send('openMessageWindow', {
                            author: columns[2].innerText,
                            message: unescape(decodeURI(columns[5].querySelector("a").getAttribute("data-msg")))
                        });
                    });

                let buttonColumn = document.createElement("td");
                buttonColumn.appendChild(button);
                row.appendChild(buttonColumn);
            });
        });
    });