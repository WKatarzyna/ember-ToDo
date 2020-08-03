// Ember ma nowoczesne moduły API ECMAScript 2015 (ES6).
// Każda główna klasa i jej funkcje pomocnicze są umieszczone w dedykowanym module, który można zaimportować w następujący sposób:
import DS from 'ember-data';
const {attr} = DS;
//Tworzenie schematu danych przy uzyciu biblioteki ember-data library
export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  date: attr('date'),
  createdAt: attr('string', {
    defaultValue: function () {
      return new Date()
    }
  })
})
