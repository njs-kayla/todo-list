let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click",e => {
    //避免表單被送交=>重新整理
    e.preventDefault();

    //獲得input的值
    let form = e.target.parentElement;//event的目標對象的parentElement也就是button的父層form
    let todoText = form.children[0].value;//from下的第一個物件text
    let todoMorth = form.children[1].value;
    let todoDate = form.children[2].value;

    if(todoText === ""){
        alert("請輸入待辦事項");
        return;
    } else if(todoMorth === ""){
        alert("請輸入月份");
        return;
    } else if(todoDate === ""){
        alert("請輸入日期");
        return;
    }

    //創造todo item
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText; 
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMorth + "/" +todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    //創建勾勾
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    
    //點勾勾劃掉todo
    completeButton.addEventListener("click",e =>{
        let todoItem = todo;
        todoItem.classList.toggle("done");
    })

    //創建垃圾桶
    let trushButton = document.createElement("button");
    trushButton.classList.add('trush')
    trushButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

    //點垃圾桶刪除todo
    trushButton.addEventListener("click", e => {
        let todoItem = todo;
        todoItem.addEventListener("animationend", () => {
          let text = todoItem.children[0].innerText;
          todoItem.remove();
      
          let myListArray = JSON.parse(localStorage.getItem('list'));
          myListArray.forEach((item, index) => {
            if (item.todoText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem('list', JSON.stringify(myListArray));
            }
          });
        });
      
        todoItem.style.animation = "scaleDown 0.3s forwards";
      });
      
    
    let buttonList = document.createElement("div");
    buttonList.classList.add("button-list");
    buttonList.appendChild(completeButton);
    buttonList.appendChild(trushButton);
    
    todo.appendChild(buttonList);

    todo.style.animation = "scaleUp 0.3s forwards"

    //創建物件(使用者輸入的資料)
    let myTodo = {
        todoText:todoText,
        todoMorth:todoMorth,
        todoDate:todoDate
    };
    //在localStorage儲存輸入的資料
    let myList = localStorage.getItem("list");
    if(myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray))
    }

    form.children[0].value = "";
    section.appendChild(todo);

})

let myList = localStorage.getItem("list");
if(myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
        let todo = document.createElement('div');
        todo.classList.add('todo');
        let text = document.createElement('p');
        text.classList.add('todo-text');
        text.innerText = item.todoText;
        let time = document.createElement('p');
        text.classList.add('todo-time');
        time.innerText = item.todoMorth + '/' + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);

        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.addEventListener("click",e =>{
            let todoItem = todo;
            todoItem.classList.toggle("done");
        })
        //創建垃圾桶
        let trushButton = document.createElement("button");
        trushButton.classList.add('trush')
        trushButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

        //點垃圾桶刪除todo
        trushButton.addEventListener("click", e => {
            let todoItem = todo;
            todoItem.addEventListener("animationend", () => {
              let text = todoItem.children[0].innerText;
              todoItem.remove();
          
              let myListArray = JSON.parse(localStorage.getItem('list'));
              myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                  myListArray.splice(index, 1);
                  localStorage.setItem('list', JSON.stringify(myListArray));
                }
              });
            });
          
            todoItem.style.animation = "scaleDown 0.3s forwards";
          });
          
        todo.appendChild(completeButton);
        todo.appendChild(trushButton);

        section.appendChild(todo)
        let buttonList = document.createElement("div");
        buttonList.classList.add("button-list");
        buttonList.appendChild(completeButton);
        buttonList.appendChild(trushButton);
        
        todo.appendChild(buttonList);
    });
}