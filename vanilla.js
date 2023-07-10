const wsURL = "wss://socketsbay.com/wss/v2/1/demo/";
// const wsURL = "ws://172.16.8.117:5000";

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
btnSwitch.innerHTML = '<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 52 52" xml:space="preserve"><path d="M26 4C12.7 4 2.1 13.8 2.1 25.9c0 3.8 1.1 7.4 2.9 10.6.3.5.4 1.1.2 1.7l-3.1 8.5c-.3.8.5 1.5 1.3 1.3l8.6-3.3c.5-.2 1.1-.1 1.7.2 3.6 2 7.9 3.2 12.5 3.2C39.3 48 50 38.3 50 26.1 49.9 13.8 39.2 4 26 4zM14 30c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm12 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm12 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>';
btnSwitch.type = "text";
btnSwitch.addEventListener('mouseenter', ()=> {
    btnSwitch.style.cursor = "pointer"
})


const btnSend = document.createElement("button");
btnSend.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12 3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15" stroke="#100bb8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
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
    columnGap: "10px",
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
    borderRadius: "50%",
    paddingTop: "5px",
    width: "30px", 
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
    websocket = new WebSocket(wsURL, {"access_token": "eaiYk-B1Er8IUljb"});
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
            btnSwitch.innerHTML = '<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 52 52" xml:space="preserve"><path d="M26 4C12.7 4 2.1 13.8 2.1 25.9c0 3.8 1.1 7.4 2.9 10.6.3.5.4 1.1.2 1.7l-3.1 8.5c-.3.8.5 1.5 1.3 1.3l8.6-3.3c.5-.2 1.1-.1 1.7.2 3.6 2 7.9 3.2 12.5 3.2C39.3 48 50 38.3 50 26.1 49.9 13.8 39.2 4 26 4zM14 30c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm12 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm12 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg>'
            websocket.close()
        } else {
            log.appendChild(chatBox)
            btnSwitch.innerHTML = '<svg width="50" height="50" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" fill-rule="evenodd" d="M11.293 3.293a1 1 0 1 1 1.414 1.414L9.414 8l3.293 3.293a1 1 0 0 1-1.414 1.414L8 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L6.586 8 3.293 4.707a1 1 0 0 1 1.414-1.414L8 6.586l3.293-3.293Z"/></svg>'
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
