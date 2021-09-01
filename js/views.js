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
  },
  render: function() {
    const self = this;
    $.get("templates/to-do.html",function(data){
        const template = _.template(data);
        // var hello = $.parseHTML("<h1>Yesud Ham Ma&amp;#x60;Ala, IL</h1><h2>Yesud Ham Ma&amp;#x60;Ala, IL</h2>");
        // console.log(hello);
        // var hello2 = "Yesud Ham Ma&#x60;Ala, IL";
        // var parsedhello2 = $.parseHTML(hello2);
        // console.log(parsedhello2);



        const parser = new DOMParser();
        const parsedString = parser.parseFromString("Yesud Ham Ma&#x60;Ala, IL","text/html");
        console.log(parsedString.body.innerText);
        self.$el.html(parsedString.body.innerText);
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
