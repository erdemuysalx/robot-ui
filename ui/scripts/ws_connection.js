// Connecting to ROS
// -----------------
    
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection', function() {
    document.getElementById('status').innerHTML = 'Connected to websocket server.';
})

ros.on('error', function(error) {
    document.getElementById('status').innerHTML = 'Error connecting to websocket server: ', error;
});

ros.on('close', function() {
    document.getElementById('status').innerHTML = 'Connection to websocket server closed.';
});