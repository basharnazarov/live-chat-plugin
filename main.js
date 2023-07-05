var wsUri = "wss://socketsbay.com/wss/v2/1/demo/";

const setStylesOnElement = function(styles, element){
    Object.assign(element.style, styles);
}

let cornerShape = document.createElement("div");
let chatBox = document.createElement("div");
let inputEl = document.createElement("input");

let btnSwitch = document.createElement("button");
btnSwitch.innerHTML = "Live Chat";
btnSwitch.type = "text";

let btn = document.createElement("button");
btn.innerHTML = "Send";
btn.type = "text";
btn.addEventListener('click', sendMessage);

const btnSwitchStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50% 50% 40px 50%",
    border: "none", 
    borderColor:'transparent',
    background: "linear-gradient(130deg, rgba(4,0,68,1) 0%, rgba(13,59,164,1) 0%, rgba(0,255,252,1) 100%)",
    boxShadow: "-15px -17px 40px -12px rgba(0,0,0,0.45)",
    color: '#fff',
    position: "absolute",
    bottom: "0px",
    right: "3px",
    zIndex: 30001,
   
}

const cornerShapeStyle = {
    width: "30px",
    height: "30px",
    border: "none", 
    background: "#03DDED",
    position: "absolute",
    bottom: '2px',
    right: '5px',
    zIndex: 30000,
    transform: "skew(14deg)",
    borderRadius: '0px 0px 3px 0',
}

const chatBoxStyle = {
    width: "250px",
    margin: "auto",
    height: "300px",
    background: "#fff",
    borderRadius: "5px",
    overflowY: "auto",
    padding: "5px",
}

setStylesOnElement(btnSwitchStyle, btnSwitch);
setStylesOnElement(cornerShapeStyle, cornerShape)
setStylesOnElement(chatBoxStyle, chatBox)





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
    writeLog("CONNECTED");
}

function onClose(evt) {

    writeLog("Websocket DISCONNECTED");
    // testWebSocket();
}

function onMessage(evt) {
    writeLog('<p style="color: purple;">RESPONSE: ' + evt.data + '</p>');
    // websocket.close();
}

function onError(evt) {
    writeLog('<p style="color: red;">ERROR:</p> ' + evt.data);
}

function sendMessage() {
    websocket.send(inputEl.value);
    writeLog('<p style="color: green; text-align: right;">MY MESSAGE: ' + inputEl.value + '</p>');
}

function writeLog(message) {
    var pre = document.createElement("div");
    pre.innerHTML = message;
    chatBox.prepend(pre);
}

window.addEventListener("load", () => {
    var log = document.getElementById("log");

    const logStyle = {
        background: "#ddd",
        width: "300px",
        height: "400px",
        padding: "10px",
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 300000,
        overflowY: "auto"
    }

    setStylesOnElement(logStyle, log)
   
    
    
    btnSwitch.addEventListener('click', () => {
        chatBox.appendChild(inputEl)
        chatBox.appendChild(btn)
        if(log.contains(chatBox)) {
            log.removeChild(chatBox);
            btnSwitch.innerHTML = "Live Chat"
            websocket.close()
        } else {
            log.appendChild(chatBox)
            btnSwitch.innerHTML = "close"
            init()
        }
  
    })
    log.appendChild(btnSwitch);
    log.appendChild(cornerShape);

    
}, false);
