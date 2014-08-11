(function (plottebord) {
  var avgaendeDepot = $('');

  plottebord.addContainersChangeListener(function refreshDepot() {
    avgaendeDepot.remove();
    avgaendeDepot = plottebord.createSection('Avgående');
    plottebord.createSpaces(1, 47, 'a', 2, avgaendeDepot);
  });
})(plottebord);
