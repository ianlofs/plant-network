function MyWebSocketHandler(url, ws) {
    ws.on('open', Meteor.bindEnvironment(function (msg) {
        console.log("Connection!");
    }));
    ws.on('message', Meteor.bindEnvironment(function (msg) {
        console.log(JSON.parse(msg.data));
        var json = JSON.parse(msg.data);
        console.log(json);
        console.log(Date.now());
        if (json.data !== -1) {
            var timestamp = Date.now()
            Meteor.call('addNewMeasurement', timestamp, json.hwid, json.type, json.data);
            var threshold = 2;
            var windowSize = 20;
            Meteor.call('eventDetection', threshold, windowSize, json.hwid, timestamp);
            console.log(Meteor.call('getAllMeasurements'));
            if (json.type == "soil_moisture") {
                if (json.data === -1) {
                    ws.send("That's a bailout!");
                }
            }
        }
        if (Math.random() < .1) {
            if (Math.random() < .5) {
                ws.send("LED:1");
            } else {
                ws.send("LED:0");
            }
        }
    }));
    ws.on('close', Meteor.bindEnvironment(function () {

    }));
    ws.on('error', Meteor.bindEnvironment(function (msg) {

    }));
}
server = new WebSocketServer('/sensorData', Meteor.bindEnvironment(MyWebSocketHandler));


