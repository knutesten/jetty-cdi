var containers = createContainers();
var empty = $('');
var storeVaretorg = empty;
var lokalvaretorg = empty;
var nyeVaretorg   = empty;
var nord          = empty;

var connection = new WebSocket("ws://localhost:8080/containers");
connection.onmessage = function (event) {
    if (event.data === 'empty') {
        connection.send(JSON.stringify(containers));
    }
    containers = JSON.parse(event.data);
    refreshLossetorg();
};

function move(fromPort, toPort) {
    var temp = containers[toPort];
    containers[toPort] = containers[fromPort];
    containers[fromPort] = temp;
    refreshLossetorg();
    connection.send(JSON.stringify(containers));
}

function refreshLossetorg() {
    storeVaretorg.remove();
    lokalvaretorg.remove();
    nyeVaretorg.remove();
    nord.remove();

    storeVaretorg = createLossetorg('Store test');
    lokalvaretorg = createLossetorg('Lokalvaretorg');
    nyeVaretorg   = createLossetorg('Nye varetorg');
    nord          = createLossetorg('Nord');

    createPorts(107, 123, storeVaretorg);
    createPorts(124, 130, lokalvaretorg);
    createPorts(131, 147, nyeVaretorg);
    createPorts(148, 163, nord);
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
        if (containers[i]) {
            div.text(containers[i]);
        } else {
            div.addClass('empty');
        }

        container.append(label);
        container.append(div);

        if (containers[i]) {
             container.click((function () {
                var index = i;
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

function createLossetorg(name) {
    var lossetorg = $('<div></div>');
    lossetorg.addClass('lossetorg');
    lossetorg.append('<h1>' + name + '</h1>');
    $('body').append(lossetorg);
    return lossetorg;
}

function createContainers() {
    var containers = {};
    for (var i = 107; i < 163; i++) {
        if (Math.random() > 0.5) {
            containers[i] = (Math.random() + '').substring(14);
        }
    }
    return containers;
}
