const ToDoList = Backbone.Collection.extend({
  url: "./api/items.json",
  parse: function(response) {
    return response.todo;
  },
  model: ToDo
});
