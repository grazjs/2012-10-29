(function() {

    var chat = document.getElementById('chat');

    var e = new EventSource('/eventsource');
    e.addEventListener('message', function(msg) {
        var div = document.createElement('div');
        var text = document.createTextNode(msg.data);
        div.appendChild(text);
        chat.appendChild(div);
    });

}());