var plottebord =
  (function () {
    var containers = {};
    var containersChangeListeners = [];
    var connection = new WebSocket("ws://localhost:8080/containers");

    connection.onmessage = function (event) {
      if (event.data === 'empty') {
        connection.send(JSON.stringify(createContainers()));
      } else {
        containers = JSON.parse(event.data);
        containersChangeListeners.forEach(function (listener) {
          listener();
        });
      }
    };

    function move(fromPort, spaceIndex, toPort) {
      if (!containers[toPort]) {
        containers[toPort] = [];
      }
      containers[toPort].push(containers[fromPort].splice(spaceIndex, 1));

      connection.send(JSON.stringify(containers));
      containersChangeListeners.forEach(function (listener) {
        listener();
      });
    }

    function createContainers() {
      var containers = {};
      for (var i = 107; i < 163; i++) {
        if (Math.random() > 0.5) {
          containers[i] = [(Math.random() + '').substring(14)];
        }
      }
      console.log(containers);
      return containers;
    }

    function createSpaces(startIndex, stopIndex, prefix, spacesLength, element) {
      for (var i = startIndex; i < stopIndex + 1; i++) {
        var container = $('<div></div>');
        container.addClass('container');

        var label = $('<div></div>');
        label.addClass('label');
        label.text(i);

        container.append(label);

        for (var spaceIndex = 0; spaceIndex < spacesLength; spaceIndex++) {
          var portId = prefix + i;
          var div = $('<div></div>');
          div.addClass('brikke');
          if (containers[portId] && containers[portId][spaceIndex]) {
            div.text(containers[portId][spaceIndex]);
          } else {
            div.addClass('empty');
          }

          container.append(div);

          if (containers[portId] && containers[portId][spaceIndex]) {
            div.click((function () {
              var fromId = portId;
              var index = spaceIndex;
              return function () {
                var toId = prompt("Skriv inn port å flytte til:");
                if (toId) {
                  move(fromId, index, toId);
                }
              }
            })());
          }
        }

        element.append(container);
      }
    }

    function createSection(name) {
      var lossetorg = $('<div></div>');
      lossetorg.addClass('lossetorg');
      lossetorg.append('<h1>' + name + '</h1>');
      $('body').append(lossetorg);
      return lossetorg;
    }

    function addContainersChangeListener(listener) {
      containersChangeListeners.push(listener);
    }

    return {
      createSection: createSection,
      createSpaces: createSpaces,
      addContainersChangeListener: addContainersChangeListener
    };
  })();
