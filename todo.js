/* Tüm elementleri seçme */
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");



/* Tüm  olaylar eventListeners */
eventListeners();

function eventListeners(){ // bütün event'lerimiz
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadlAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){ // Tüm taslakları temizle
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
       while( todoList.firstElementChild != null){
           todoList.removeChild(todoList.firstElementChild);
       }
       localStorage.removeItem("todos");

    }

}

function filterTodos(e){ // Bir Todo arayın
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1 ){
            listItem.setAttribute("style","display : none !important");
        
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });

}

function deleteTodo(e){ // x' todo silme butonu
if(e.target.className === "fa fa-remove"){
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success","Todo başarıyla silindi...");
}

}

function deleteTodoFromStorage(deletetodo){ // Todo local storage'den silme
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }
    });
localStorage.setItem("todos",JSON.stringify(todos));
}
function loadlAllTodosToUI(){ // Storage'deki todoları ekrana yükleme
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){ // todo ekleme
 const newTodo = todoInput.value.trim();
 if(newTodo === "") {
              
    showAlert("danger","Lütfen bir todo girin..");
                 }
else {
     addTodoToUI(newTodo);  
     addTodoToStorage(newTodo);  
     showAlert("success","Todo başarıyla eklendi..");  
     todoInput.value = "";       
 }

 e.preventDefault();
}
function getTodosFromStorage(){ //  Storagedan bütün todoları alıcak.
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo){ // Local Storage todo ekleme
   let todos = getTodosFromStorage();

   todos.push(newTodo);

   localStorage.setItem("todos",JSON.stringify(todos));
    
}

function showAlert(type,message){ // Uyarı mesajı
    const alert =  document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    /* setTimeout */
setTimeout(function(){
alert.remove();
},3000);


}

function addTodoToUI(newTodo){ // UI kısmına Todo ekleme HTML kodu

/* <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */
/* List Item Oluşturma */
const listItem=document.createElement("li");
/* Link Oluşturma */
const  link=document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";
listItem.className="list-group-item d-flex justify-content-between";
/* Text Node Ekleme */
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
/* Todo List'e List Item Ekleme */
todoList.appendChild(listItem);
}
