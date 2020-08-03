import Ember from 'ember';

export default Ember.Controller.extend({
  isExpanded: false,
  actions: {
    editTask: function (id) {
      let self = this;
      let title = this.get('model.title');
      let description = this.get('model.description');
      let date = this.get('model.date');

      //Update Task
      this.store.findRecord('task', id).then(function (task) {
        task.set('title', title);
        task.set('description', description);
        task.set('date', new Date(date));
        task.save();
        self.transitionToRoute('tasks')
      })
    }
  }

});
