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