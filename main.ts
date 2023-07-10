const wsUri = "wss://socketsbay.com/wss/v2/1/demo/";
const websocket = new WebSocket(wsUri);
const setStyleOnElement = (styles: object, element: HTMLElement) => {
    return Object.assign(element.style, styles)
}

const onOpen = () => {
    console.log('open', statusBar, statusBar.hasChildNodes())
    if (statusBar.hasChildNodes()) {
        statusBar.removeChild(statusBar.childNodes[0]);
    }
    const status = document.createElement("div");
    status.innerHTML = '<div style="display: flex; align-items: center;column-gap: 6px;">John Doe <div style="width: 8px; height: 8px; background: #00FF00; border-radius: 50%;"></div></div>';
    statusBar.appendChild(status);
}

const onClose = () => {
    if (statusBar.hasChildNodes()) {
        statusBar.removeChild(statusBar.childNodes[0]);
    }
    const status = document.createElement("div");
    status.innerHTML = '<div style="display: flex; align-items: center;column-gap: 6px;">John Doe <div style="width: 8px; height: 8px; background: red; border-radius: 50%;"></div></div>';
    statusBar.appendChild(status);
}

const onMessage = ({data}: {data: string}) => {
    writeLog('<p style="color: #100bb8; background: #fff; border-radius: 4px; padding: 5px; margin-top: 4px; margin-left: 5px; max-width: 180px; height: auto; overflow-wrap: break-word;"> John Doe: ' + data + '</p>');
    chatBox.scrollTop = chatBox.scrollHeight
}

const onError = () => {
    if (statusBar.hasChildNodes()) {
        statusBar.removeChild(statusBar.childNodes[0]);
    }
    const status = document.createElement("div");
    status.innerHTML = '<div style="display: flex; align-items: center;column-gap: 6px;"> John Doe <div style="width: 8px; height: 8px; background: red; border-radius: 50%;"></div></div>';
    statusBar.appendChild(status);
}

function sendMessage() {
    websocket.send(inputEl.value);
    writeLog(`<div style="display: flex; justify-content: end; margin: 10px ${chatBox.scrollHeight > chatBox.clientHeight ? "-10px" : "5px"} 10px 0px;"><div style="color: #000; text-align: right; z-index: 30; max-width: 180px; background: #fff; border-radius: 4px; padding: 5px; overflow-wrap: break-word;"> User: ` + inputEl.value + '</div></div>')
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight
}

const writeLog = (message: string) => {
    const pre = document.createElement("div");
    pre.innerHTML = message;
    chatBox.appendChild(pre);
}

const testWebSocket = () => {
    websocket.onopen = () => onOpen();
    websocket.onclose = () => onClose();
    websocket.onmessage = (event) => onMessage(event);
    websocket.onerror = () => onError();
}

const init = () => {
    testWebSocket();
}

const statusBar = document.createElement("div")
const formBox = document.createElement('div');
const cornerShape = document.createElement("div");
const chatBox = document.createElement("div");
const inputEl = document.createElement("input");
const coverScroll = document.createElement("div");
const btnSwitch = document.createElement("button");

btnSwitch.innerHTML = "Live Chat";
btnSwitch.addEventListener('mouseenter', () => {
    btnSwitch.style.cursor = "pointer"
})

const btnSend = document.createElement("button");
btnSend.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12 3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15" stroke="#100bb8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
btnSend.addEventListener('click', () => {
    inputEl.value ? sendMessage() : '';
});

btnSend.addEventListener('mouseenter', () => btnSend.style.cursor = "pointer")



const btnSwitchStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50% 50% 40px 50%",
    border: "none",
    background: "#0f7beb",
    color: '#fff',
    position: "absolute",
    bottom: "10px",
    right: "3px",
    zIndex: 30001,
    fontFamily: "cursive",

}

const cornerShapeStyle = {
    width: "30px",
    height: "30px",
    border: "none",
    background: "#0f7beb",
    position: "absolute",
    bottom: '12px',
    right: '5px',
    zIndex: 30000,
    transform: "skew(14deg)",
    borderRadius: '0px 0px 3px 0',
}

const chatBoxStyle = {
    width: "260px",
    height: "300px",
    background: "rgba(221, 221, 221, 1)",
    overflowY: "auto",
    padding: "5px 10px",
    marginTop: '50px',
    marginLeft: "10px",
    zIndex: 220
}

const statusBarStyle = {
    width: "280px",
    height: '50px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5px",
    background: "#0f7beb",
    position: "absolute",
    top: "10px",
    right: "20px",
    borderRadius: "4px 4px 0px 0px",
}

const formBoxStyle = {
    width: "280px",
    height: '50px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "5px",
    background: "#0f7beb",
    position: "absolute",
    bottom: "120px",
    right: "20px",
    borderRadius: "0px 0px 4px 4px",

}

const inputElStyle = {
    border: "none",
    borderRadius: "5px",
    padding: "4px",
    height: "22px",
}

const btnSendStyle = {
    border: "none",
    borderRadius: "50%",
    paddingTop: "5px",
    background: "#100bb8",
    color: "#fff",
    fontFamily: "cursive"
}

const coverScrollStyle = {
    width: "18px",
    height: "310px",
    background: "#ddd",
    position: "absolute",
    top: "60px",
    right: "20px",
    zIndex: 20
}

setStyleOnElement(btnSwitchStyle, btnSwitch);
// btnSwitch.style = btnSwitchStyle
setStyleOnElement(cornerShapeStyle, cornerShape)
setStyleOnElement(chatBoxStyle, chatBox)
setStyleOnElement(statusBarStyle, statusBar)
setStyleOnElement(formBoxStyle, formBox)
setStyleOnElement(inputElStyle, inputEl)
setStyleOnElement(btnSendStyle, btnSend)
setStyleOnElement(coverScrollStyle, coverScroll)

window.addEventListener("load", () => {
    const log = document.getElementById("log");
    const logStyle = {
        width: "300px",
        height: "520px",
        padding: "10px",
        position: "fixed",
        right: "20px",
        bottom: "10px",
        zIndex: 300000,
    }
    if (log) {
        setStyleOnElement(logStyle, log);
        btnSwitch.addEventListener('click', () => {
            formBox.appendChild(inputEl)
            formBox.appendChild(btnSend)
            chatBox.appendChild(formBox)
            chatBox.appendChild(statusBar)
            chatBox.appendChild(coverScroll)
            if (log.contains(chatBox)) {
                log.removeChild(chatBox);
                btnSwitch.innerHTML = "Live Chat"
                websocket.close()
            } else {
                log.appendChild(chatBox)
                btnSwitch.innerHTML = '<svg width="50" height="50" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="evenodd" d="M11.293 3.293a1 1 0 1 1 1.414 1.414L9.414 8l3.293 3.293a1 1 0 0 1-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L6.586 8 3.293 4.707a1 1 0 0 1 1.414-1.414L8 6.586l3.293-3.293Z"/></svg>'
                init()
            }
        })
        document.addEventListener('keyup', (evt) => {
            evt.preventDefault()
            if (evt.key === "Enter" && inputEl.value) {
                sendMessage()
            }
        })
        log.appendChild(btnSwitch);
        log.appendChild(cornerShape);
    }
});