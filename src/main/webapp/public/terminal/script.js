(function (plottebord) {
  var empty = $('');
  var storeVaretorg = empty;
  var lokalvaretorg = empty;
  var nyeVaretorg = empty;
  var nord = empty;

  plottebord.addContainersChangeListener(function refreshLossetorg() {
    storeVaretorg.remove();
    lokalvaretorg.remove();
    nyeVaretorg.remove();
    nord.remove();

    storeVaretorg = plottebord.createSection('Store test');
    lokalvaretorg = plottebord.createSection('Lokalvaretorg');
    nyeVaretorg =   plottebord.createSection('Nye varetorg');
    nord =          plottebord.createSection('Nord');

    plottebord.createSpaces(107, 123, '', 1, storeVaretorg);
    plottebord.createSpaces(124, 130, '', 1, lokalvaretorg);
    plottebord.createSpaces(131, 147, '', 1, nyeVaretorg);
    plottebord.createSpaces(148, 163, '', 1, nord);
  });
})(plottebord);

