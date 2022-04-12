const { ipcMain, ipcRenderer } = require("electron");
const { fromEvent, interval, connect } = require("rxjs");

fromEvent(window, "load")
    .subscribe(() => {
        interval(1000).subscribe(_ => {
            let table = document.querySelector("table.ytpdg-transactions-dialog");
            if (!table) return;

            let rows = table.querySelectorAll("tbody tr");
            let titleRow = rows[0];
            let contentRows = [].slice.call(rows, 1); 

            if (titleRow.querySelectorAll("th").length !== 6){
                let buttonTitle = document.createElement("th");
                buttonTitle.innerText = "特製顯示";
                titleRow.appendChild(buttonTitle);
            }

            contentRows.forEach(row => {
                let columns = row.querySelectorAll("td");
                if (columns.length == 6) return;

                let content = columns[2];
                content.querySelectorAll("img").forEach(element => {
                    element.setAttribute("src", element.getAttribute("src").replace("//", "https://"));
                });
                let isSticker = content.querySelectorAll("#sticker").length > 0;
                
                
                let button = document.createElement("button");
                button.innerText = "特製顯示";
                fromEvent(button, "click")
                    .subscribe(_ => {
                        ipcRenderer.send('openMessageWindow', {
                            author: columns[0].innerText,
                            message: isSticker ?
                                content.querySelector("#animated-image").outerHTML :
                                content.innerHTML
                        });
                    });

                let buttonColumn = document.createElement("td");
                buttonColumn.appendChild(button);
                row.appendChild(buttonColumn);
            });
        });
    });