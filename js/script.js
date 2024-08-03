let inputTask=document.querySelector('#inputTask');
let addBtn=document.querySelector('#addtask');
let displayTask=document.querySelector('#displayTask');
let i=1;
let taskArr=[];


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
      if(checkBox.checked==true){        
        span.style.textDecoration="line-through";
        taskArr=taskArr.map((value)=>{
          if(value.id==data.id){
            value.status="completed";
          }
          return value;
        })
        setLocalStorage();
      }
      else{
        span.style.textDecoration="none";
        taskArr=taskArr.map((value)=>{
          if(value.id==data.id){
            value.status="pending";
          }
          return value;
        })
        setLocalStorage();
      }
      
    });
     

    //delete task
    crossBtn.addEventListener('click',(event)=>{
      taskdiv.remove();
      taskArr=taskArr.filter((value)=>{
        return value.id!=data.id;
      })
      setLocalStorage();    
    })
    span.innerText=data.name;
    taskdiv.append(span,checkBox,crossBtn,editBtn);
    displayTask.append(taskdiv);

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
        if(event.key=="Enter"){
         getData();
        }    
})

//adding event listener for clicking button
addBtn.addEventListener('click',()=>{
      getData();
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