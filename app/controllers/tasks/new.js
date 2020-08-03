import Ember from 'ember';

export default Ember.Controller.extend({
  isExpanded: false,
  actions: {
    addTask: function () {
      let title = this.get('title');
      let description = this.get('description');
      let date = this.get('date');
      // alert(title)
      // alert(description)
      // alert(date)
      //Create New Task
      const newTask = this.store.createRecord(
        'task', {
          title: title,
          description: description,
          date: new Date(date),
        });
      //  save to Database
      newTask.save();
      //Clear the form
      this.setProperties({
        title: '',
        description: '',
        date: '',
      })
    }
  }
});

