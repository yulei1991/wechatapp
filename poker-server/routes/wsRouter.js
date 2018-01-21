var express = require('express');
var expressWS = require('express-ws');
var wsRouter = null;

var WSRouter = (function () {
    function WSRouter(server) {
        this.clients = [];
        this.server = server;
        this.app = express();
        this.room = [];

        this.listenClientConnect = function () {
            var me = this;
            this.app.ws('/ws', function (ws, req) {
                console.log("client connect to server successful!");
                
                me.clients.push(ws);
                ws.on('message', function (msg) {
                    console.log("receive client msg :", msg);
                    // me.receiveCmd(msg);
                });
                ws.on("close", function (msg) {
                    console.log("client is closed");
                    for (var index = 0; index < me.clients.length; index++) {
                        if (me.clients[index] == this) {
                            me.clients.splice(index, 1);
                        }
                    }
                });
            });
        };

        expressWS(this.app, this.server);
    }
    
    return WSRouter;
}());

function init(server) {
    if (wsRouter == null && server != null) {
        wsRouter = new WSRouter(server);
    }
    return wsRouter;
}

exports.init = init;