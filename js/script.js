let inputTask=document.querySelector('#inputTask');
let addBtn=document.querySelector('#addtask');
let displayTask=document.querySelector('#displayTask');
let i=1;

console.log("Hello");
//to add task on Ui
function addTask(data){
    console.log(data);
    let taskdiv=document.createElement('div');

    let span=document.createElement("span");

    let checkBox=document.createElement('input');
    checkBox.setAttribute("type","checkbox");

    checkBox.addEventListener('click',()=>{
      if(checkBox.checked==true){
        data.status="completed";
        span.style.textDecoration="line-through";
      }else{
        span.style.textDecoration="none";
      }
    })


    let crossBtn=document.createElement('button');
    let editBtn=document.createElement('button');
    crossBtn.innerText="del";
    editBtn.innerText="edit";
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