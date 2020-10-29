'use strict';

const Constants = module.exports;

Constants.directions = {
  NORTH: 'N',
  SOUTH: 'S',
  EAST: 'E',
  WEST: 'W',
  OUTPUT : {
    NORTH: 'Norte',
    SOUTH: 'Sur',
    EAST: 'Este',
    WEST: 'Oeste',
    SEPARATOR: '--------------------------\n',
    HEADER: '== Reporte de entregas ==\n'
  }
}

Constants.movement = {
  FORWARD: 'A',
  RIGHT: 'D',
  LEFT: 'I'
}