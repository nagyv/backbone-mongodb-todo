// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){
  var TodoList = todoapp.module('todolist');

  // Create our global collection of **Todos**.
  window.Todos = new TodoList.Collection;

  // Finally, we kick things off by creating the **App**.
  window.App = new TodoList.Views.AppView({collection: Todos});

});
