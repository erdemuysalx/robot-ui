// List all topics
// ----------------------

var topicsClient = new ROSLIB.Service({
    ros : ros,
    name : '/rosapi/topics',
    serviceType : 'rosapi/Topics'
});

var request = new ROSLIB.ServiceRequest();

topicsClient.callService(request, function(result) {
    console.log('Getting topics and their types...');
    //console.log('Topic names: ', result.topics);
    //console.log('Topic Types: ', result.types);
    topicNames = result.topics;
    messageTypes = result.types;

    const obj = {
        accounting: [
            {
                "id"      : 999,
                "topicName": "x",
                "messageType" : "y",
            },
        ],
    };

    for (i=0; i<=topicNames.length; i++) {

        var newEntry = {
            "id" : i,
            "topicName" : topicNames[i],
            "messageType" : messageTypes[i], 
        };

        obj.topics.push(newEntry);
    }


    console.log('object: ', topics);


    document.getElementById("topicnames").innerHTML = 'Topic names: ' + topicNames;
    document.getElementById("messagetypes").innerHTML = 'Message types: ' + messageTypes;

});

// Subscribing to a topic
// ----------------------

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/chatter',
    messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
    //document.write('Received message on ' + listener.name + ': ' + message.data + '</br>');
    document.getElementById("message").innerHTML = 'Received message on ' + listener.name + ': ' + message.data;
});



/*
// Publishing a topic
// ------------------

var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
});

var twist = new ROSLIB.Message({
    linear : {
        x : 0.1,
        y : 0.2,
        z : 0.3
    },
    angular : {
        x : -0.1,
        y : -0.2,
        z : -0.3
    }
});
cmdVel.publish(twist);
*/