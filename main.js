var wsUri = "wss://socketsbay.com/wss/v2/1/demo/";

const setStylesOnElement = function(styles, element){
    Object.assign(element.style, styles);
}
let statusBar = document.createElement("div")
let formBox = document.createElement('div');
let cornerShape = document.createElement("div");
let chatBox = document.createElement("div");
let inputEl = document.createElement("input");
// chatBox.style["-webkit-scrollbar"].display = "none";


let btnSwitch = document.createElement("button");
btnSwitch.innerHTML = "Live Chat";
btnSwitch.type = "text";
btnSwitch.addEventListener('mouseenter', ()=> {
    btnSwitch.style.cursor = "pointer"
})


let btnSend = document.createElement("button");
btnSend.innerHTML = "Send";
btnSend.type = "text";
btnSend.addEventListener('click', sendMessage);
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

setStylesOnElement(btnSwitchStyle, btnSwitch);
setStylesOnElement(cornerShapeStyle, cornerShape)
setStylesOnElement(chatBoxStyle, chatBox)
setStylesOnElement(statusBarStyle, statusBar)
setStylesOnElement(formBoxStyle, formBox)
setStylesOnElement(inputElStyle, inputEl)
setStylesOnElement(btnSendStyle, btnSend)

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
    writeLog('<p style="color: #100bb8; background: #fff; border-radius: 4px; padding: 5px; margin-top: 4px; max-width: 180px; height: auto; overflow-wrap: break-word;"> John Doe: ' + evt.data + '</p>');
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
    writeLog('<div style="display: flex; justify-content: end; margin-top: 10px; margin-bottom: 10px;"><div style="color: #000; text-align: right; max-width: 180px;background: #fff; border-radius: 4px; padding: 5px; overflow-wrap: break-word;"> User: ' + inputEl.value + '</div></div>');
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

    setStylesOnElement(logStyle, log)
    
    btnSwitch.addEventListener('click', () => {
        formBox.appendChild(inputEl)
        formBox.appendChild(btnSend)
        chatBox.appendChild(formBox)
        chatBox.appendChild(statusBar)

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
    log.appendChild(btnSwitch);
    log.appendChild(cornerShape);
    
}, false);
