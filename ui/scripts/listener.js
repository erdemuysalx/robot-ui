// List all topics
// ----------------------
var topicName = null;
var messageType = null;
var split = [];

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
    //console.log(topicNames);
    //console.log(messageTypes);
    document.getElementById("topicnames").innerHTML = 'Topic names: ' + topicNames;
    document.getElementById("messagetypes").innerHTML = 'Message types: ' + messageTypes;

    var topicAarray = [];

    for (i=0; i<topicNames.length; i++) {
        
        var topicObject = {
            id: "",
            topicName: "",
            messageType: "",
          }

        topicObject.id = i;
        topicObject.topicName = topicNames[i];
        topicObject.messageType = messageTypes[i];
        topicAarray.push(topicObject);
    }
    //console.log(topicAarray);
        
    topicAarray.forEach(function(item){
        var option = document.createElement('option');
        option.value = item.topicName + ',' + item.messageType;
        option.innerHTML = item.topicName;
        selector.appendChild(option)
    })
    
    selector.onchange = function(){
        split = this.value.split(',');
        topicName = split[0];
        messageType = split[1];
        console.log(split);

        // Subscribing to a topic
        // ----------------------
        var listener = new ROSLIB.Topic({
            ros : ros,
            name : topicName,
            messageType : messageType,
        });

        listener.subscribe(function(message) {
            //document.write('Received message on ' + listener.name + ': ' + message.data + '</br>');
            console.log(split);

            document.getElementById("message").innerHTML = 'Received message on ' + listener.name + ': ' + message.data;
        });
    }
});





