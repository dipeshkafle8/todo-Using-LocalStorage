let inputTask=document.querySelector('#inputTask');
let addBtn=document.querySelector('#addtask');
let displayTask=document.querySelector('#displayTask');
let i=1;
let taskArr=[];
let isEdit=false;
let spanForEdit;
let idOfEdit;


//to store the value in LocalStorage
function setLocalStorage(){
localStorage.setItem('tasklists',JSON.stringify(taskArr));
}

//on reload get items from the localStorage and create task;
function getLocalStorageItems(){
  taskArr=JSON.parse(localStorage.getItem('tasklists'));
}




//to add task on Ui
function addTask(data){    
    let taskdiv=document.createElement('div');

    let span=document.createElement("span");

    let checkBox=document.createElement('input');
    checkBox.setAttribute("type","checkbox");
    let crossBtn=document.createElement('button'); 
    let editBtn=document.createElement('button');
    crossBtn.innerText="del";
    editBtn.innerText="edit";

    //if task is completed(in case of tasks coming from localStorage)
    if(data.status=="completed"){
     checkBox.checked=true;
     span.style.textDecoration="line-through";
    }
     //on clicking on check box
     checkBox.addEventListener('click',()=>{
      let newStatus="pending"
      if(checkBox.checked==true){        
        span.style.textDecoration="line-through";
        newStatus="completed";
      }
      else{
        span.style.textDecoration="none";
      }

        taskArr=taskArr.map((value)=>{
          if(value.id==data.id){
            value.status=newStatus;
          }
          return value;
        })
        setLocalStorage();      
    });     

    //delete task
    crossBtn.addEventListener('click',(event)=>{
      taskdiv.remove();
      taskArr=taskArr.filter((value)=>{
        return value.id!=data.id;
      })
      setLocalStorage();    
    })

    //edit task
    editBtn.addEventListener('click',()=>{
      inputTask.value=data.name;
      isEdit=true; 
      spanForEdit=span;
      idOfEdit=data.id;   
    })

    span.innerText=data.name;
    taskdiv.append(span,checkBox,crossBtn,editBtn);
    displayTask.append(taskdiv);

}

//handling data display and storing in array on click on edit
function handleDataonEdit(){
  spanForEdit.innerText=inputTask.value;
  taskArr=taskArr.map((value)=>{
    if(idOfEdit==value.id){
      value.name=inputTask.value;
    }
    return value;
  })
  isEdit=false;
  inputTask.value="";
  setLocalStorage();
}

//getting data and storing it
function getData(){
    if(inputTask.value.trim()!=""){
let obj={
    name:inputTask.value,
    status:"pending",
    id:i
}
i++;
taskArr.push(obj);
console.log(taskArr);
setLocalStorage();
addTask(obj);
}
else{
    alert('Enter some task to add');
}
inputTask.value="";
}



//adding event listener for Enter press
inputTask.addEventListener('keypress',(event)=>{   
        if(event.key=="Enter" && isEdit==false){
         getData();
        }
        else if(event.key=="Enter" && isEdit==true){
          handleDataonEdit();
        }    
})

//adding event listener for clicking button
addBtn.addEventListener('click',()=>{
  if(isEdit!=true){
      getData();
  }
  else{
    handleDataonEdit();
  }
})

//on reloading or loading page
function loadTasksIntoPage(){
  getLocalStorageItems();  
  if(taskArr.length!=0){
  taskArr.forEach((value)=>{
    i=value.id;    
    addTask(value);
  })
  i++;
}

}

loadTasksIntoPage();