const ToDoView = Backbone.View.extend({
  tagName: "div",
  className: "to-do-item",
  events: {
    "click .delete": "delete",
    "click .item input": "checkbox"
  },
  delete: function() {
    toDoList.remove(this.model);
  },
  checkbox: function(event) {
    const selected = $(event.target).is(":checked");
    this.model.trigger("selected", this.model, selected);
    const label = $(event.target).next();
    label.toggleClass("disable-label");
    // if (selected) {
    //   label.addClass("disable-label");
    // } else {
    //   label.removeClass("disable-label");
    // }
  },
  render: function() {
    const self = this;
    $.get("templates/to-do.html",function(data){
        const template = _.template(data);
        self.$el.html(template(self.model.toJSON()));
    });
    return self;
  }
});

const ToDoListView = Backbone.View.extend({
  el: "#to-do-container",
  initialize() {
    this.model.on("add remove reset", this.Add, this);
    this.model.on("selected", this.selectedHandler, this);
  },
  Add: function() {
    this.$el.empty();
    this.render();
  },
  selectedHandler: function(model, selected) {
    model.set("isSelected", selected);
  },
  render: function() {
    this.model.each((item) => {
      const toDoView = new ToDoView({ model: item });
      this.$el.append(toDoView.render().$el);
    });
  }
});
