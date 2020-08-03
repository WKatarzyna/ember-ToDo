import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('tasks', function () {
    this.route('new');
    this.route('edit', {path: '/edit/:task_id'}); //obsługa ścieżek
  });
});

















//miejsce na domyślny routing aplikacji, wykorzystuje ember-cli generators,
// Metodę map () routera aplikacji Ember można wywołać w celu zdefiniowania odwzorowań adresów URL.
// Podczas wywoływania map () przekazujemy funkcję, która zostanie wywołana z wartością this, do obiektu, którego możesz użyć do tworzenia tras.
// Teraz, gdy użytkownik odwiedza task/new, Ember wyświetli szablon new.


