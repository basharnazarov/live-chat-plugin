var wsUri = "wss://socketsbay.com/wss/v2/1/demo/";

const setStylesOnElement = function(styles, element){
    Object.assign(element.style, styles);
}
const statusBar = document.createElement("div")
const formBox = document.createElement('div');
const cornerShape = document.createElement("div");
const chatBox = document.createElement("div");
const inputEl = document.createElement("input");
const coverScroll = document.createElement("div");




const btnSwitch = document.createElement("button");
btnSwitch.innerHTML = "Live Chat";
btnSwitch.type = "text";
btnSwitch.addEventListener('mouseenter', ()=> {
    btnSwitch.style.cursor = "pointer"
})


const btnSend = document.createElement("button");
btnSend.innerHTML = "Send";
btnSend.type = "text";
btnSend.addEventListener('click', ()=>{
    inputEl.value ? sendMessage() : '';
});
btnSend.addEventListener('mouseenter', ()=> btnSend.style.cursor = "pointer")


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
    height: "22px"
}

const btnSendStyle = {
    border: "none",
    borderRadius: "5px",
    padding: "0px 10px",
    height: "30px",
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

setStylesOnElement(btnSwitchStyle, btnSwitch);
setStylesOnElement(cornerShapeStyle, cornerShape)
setStylesOnElement(chatBoxStyle, chatBox)
setStylesOnElement(statusBarStyle, statusBar)
setStylesOnElement(formBoxStyle, formBox)
setStylesOnElement(inputElStyle, inputEl)
setStylesOnElement(btnSendStyle, btnSend)
setStylesOnElement(coverScrollStyle, coverScroll)

function init() {
    testWebSocket();
}

function testWebSocket() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) { onOpen(evt) };
    websocket.onclose = function (evt) { onClose(evt) };
    websocket.onmessage = function (evt) { onMessage(evt) };
    websocket.onerror = function (evt) { onError(evt) };
}

function onOpen(evt) {
    // writeLog("CONNECTED");
    if (statusBar.hasChildNodes()) {
        statusBar.removeChild(statusBar.childNodes[0]);
    }
    const status = document.createElement("div");
    status.innerHTML = '<div style="display: flex; align-items: center;column-gap: 6px;">John Doe <div style="width: 8px; height: 8px; background: #00FF00; border-radius: 50%;"></div></div>';
   
    statusBar.appendChild(status);
}

function onClose(evt) {
    // writeLog("Websocket DISCONNECTED");
    // testWebSocket();
    if (statusBar.hasChildNodes()) {
        statusBar.removeChild(statusBar.childNodes[0]);
    }
    const status = document.createElement("div");
    status.innerHTML = '<div style="display: flex; align-items: center;column-gap: 6px;">John Doe <div style="width: 8px; height: 8px; background: red; border-radius: 50%;"></div></div>';
    statusBar.appendChild(status);
}

function onMessage(evt) {
    writeLog('<p style="color: #100bb8; background: #fff; border-radius: 4px; padding: 5px; margin-top: 4px; margin-left: 5px; max-width: 180px; height: auto; overflow-wrap: break-word;"> John Doe: ' + evt.data + '</p>');
    chatBox.scrollTop = chatBox.scrollHeight
    // websocket.close();
}

function onError(evt) {
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
    inputEl.value ='';
    chatBox.scrollTop = chatBox.scrollHeight
}

function writeLog(message) {
    var pre = document.createElement("div");
    pre.innerHTML = message;
    chatBox.appendChild(pre);
}

window.addEventListener("load", () => {
    var log = document.getElementById("log");

    const logStyle = {
        width: "300px",
        height: "520px",
        padding: "10px",
        position: "fixed",
        right: "20px",
        bottom: "10px",
        zIndex: 300000,
    }

    setStylesOnElement(logStyle, log);
    
    btnSwitch.addEventListener('click', () => {
        formBox.appendChild(inputEl)
        formBox.appendChild(btnSend)
        chatBox.appendChild(formBox)
        chatBox.appendChild(statusBar)
        chatBox.appendChild(coverScroll)

        if(log.contains(chatBox)) {
            log.removeChild(chatBox);
            btnSwitch.innerHTML = "Live Chat"
            websocket.close()
        } else {
            log.appendChild(chatBox)
            btnSwitch.innerHTML = "Close"
            init()
        }
    })

    document.addEventListener('keyup', (evt) => {
        evt.preventDefault()
        if(evt.key === "Enter" && inputEl.value) {
            sendMessage()
        }
    })


    log.appendChild(btnSwitch);
    log.appendChild(cornerShape);
    
}, false);
