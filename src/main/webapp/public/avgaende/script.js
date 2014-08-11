var containers = {};
var avgaendeDepot = $('');

var connection = new WebSocket("ws://localhost:8080/containers");
connection.onmessage = function (event) {
    if (event.data === 'empty') {
        connection.send(JSON.stringify(containers));
    }
    containers = JSON.parse(event.data);
    refreshDepot();
};

function move(fromPort, toPort) {
    var temp = containers[toPort];
    containers[toPort] = containers[fromPort];
    containers[fromPort] = temp;
    refreshDepot();
    connection.send(JSON.stringify(containers));
}

function refreshDepot() {
    avgaendeDepot.remove();
    avgaendeDepot = createDepot('Avgående');
    createPorts(1, 47, avgaendeDepot);
}


function createPorts(startIndex, stopIndex, element) {
    for (var i = startIndex; i < stopIndex + 1; i++) {
        var container = $('<div></div>');
        container.addClass('container');

        var label = $('<div></div>');
        label.addClass('label');
        label.text(i);

        var div = $('<div></div>');
        div.addClass('brikke');
        if (containers['a' + i]) {
            div.text(containers['a' + i]);
        } else {
            div.addClass('empty');
        }

        container.append(label);
        container.append(div);

        if (containers['a' + i]) {
             container.click((function () {
                var index = 'a' + i;
                return function () {
                    var toIndex = prompt("Skriv inn port å flytte til:");
                    if (toIndex) {
                        move(index, toIndex);
                    }
                }
            })());
        }

        element.append(container);
    }
}

function createDepot(name) {
    var lossetorg = $('<div></div>');
    lossetorg.addClass('lossetorg');
    lossetorg.append('<h1>' + name + '</h1>');
    $('body').append(lossetorg);
    return lossetorg;
}

