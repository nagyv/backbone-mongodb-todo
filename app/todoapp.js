// from http://www.inventpartners.com/content/javascript_is_int
function is_int(value){ 
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return true;
  } else { 
      return false;
  } 
}

todoapp = {
  // Assist with code organization, by breaking up logical components of code
  // into modules.
  module: function() {
    // Internal module cache.
    var modules = {};

    // Create a new module reference scaffold or load an existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return modules[name] = { Views: {} };
    };
  }(),

  // Keep active application instances namespaced under an app object.
  app: _.extend({}, Backbone.Events)
};

if(!_.isUndefined(window.exports)) {
  exports.todoapp = todoapp;
}
