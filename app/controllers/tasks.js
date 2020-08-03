import Ember from 'ember';

export default Ember.Controller.extend({
  isExpanded: false,
  actions: {
    deleteTask: function (id) {
      //Update Task
      this.store.findRecord('task', id).then(function (task) {
        task.deleteRecord();
        task.save();
      })
    }
  }
});
