const ToDo = Backbone.Model.extend({
    defaults:{
        "deleteButton":"<i class='fa fa-trash-o delete'></i>",
        isSelected:false
    },
    getDiv:function(className,value){
        return "<div class=' "+ className + " '> "+ value +" </div>"
    },
    getCheckBox:function(isSelected,value){
        if(isSelected){
            return "<input type='checkbox' name='to-do' checked><label class='disable-label'> "+ value +" </label>";
        }else{
            return "<input type='checkbox' name='to-do'><label> "+ value +" </label>";
        }
    }
});

const ToDoList = Backbone.Collection.extend({
    url:"./api/items.json",
    parse:function(response){
        return response.todo;
    },
    model : ToDo
});

const ToDoView = Backbone.View.extend({
    tagName:"div",
    className:"to-do-item",
    events:{
        "click .delete":"delete",
        "click .item input":"checkbox"
    },
    delete:function(){
        toDoList.remove(this.model);
    },
    checkbox:function(event){
        console.log(this.model);
        const selected = $(event.target).is(':checked');
        this.model.trigger('selected', this.model,selected);
        const label = $(event.target).next();
        if(selected){
            label.addClass("disable-label");
        }else{
            label.removeClass("disable-label");
        }
    },
    render:function(){
        this.$el.html(this.model.getDiv("item",this.model.getCheckBox(this.model.get('isSelected'),this.model.get('name'))) + this.model.getDiv("item",this.model.get('deleteButton')));
        return this;
    }
})

const ToDoListView = Backbone.View.extend({
    el:"#to-do-container",
    initialize(){
        this.model.on('add remove reset',this.Add,this);
        this.model.on('selected', this.selectedHandler, this); 
    },
    Add:function(){
        this.$el.empty();
        this.render();
    },
    selectedHandler:function(model,selected){
        model.set('isSelected',selected);
    },
    render:function(){
        this.model.each(item =>{
            const toDoView = new ToDoView({model:item});
            this.$el.append(toDoView.render().$el);
        })
    }
});

const toDoList = new ToDoList([]);
toDoList.fetch();


const toDoListView = new ToDoListView({model:toDoList});
toDoListView.render();

$("#add-to-do-button").click(function(){
    var inputValue = $("#add-to-do-input").val();
    if(inputValue != ''){
        toDoList.add(new ToDo({name:inputValue}));
        $("#add-to-do-input").val('');
        $("#add-to-do-input").focus();
    }
});

$("#delete-all-to-do").click(function(){
    toDoList.reset();
});

$("#delete-selected-to-do").click(function(){
    toDoList.reset(toDoList.where({isSelected:false}));
});