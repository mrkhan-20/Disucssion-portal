let data={
    id:"",
    sub:"",
    ques:"",
    upv:0,
    downv:0,
    fav:false,
    time:""
}
let responsearray={
    quesid:"",
    id:"",
     name:"",
     comment:"",
     upv:0,
     downv:0,
     fav:false,
     time:""
}

let quesid,eid;
let subject,question,submit,quesbox,rightside,resolveside,newquesform,clickedques,
resolvebtn,name,comment,responsebtn,node_to_delete,search;

rightside=document.getElementById("rightside");
quesbox=document.getElementById("ques-box");
responsebtn=document.getElementById("responsebtn");
resolvebtn=document.getElementById("resolvebtn");
clickedques=document.getElementById('clicked-ques');
response=document.getElementById("response-parent");
newquesform =document.getElementById('newquesform');
resolveside=document.getElementById("resolveside");
search=document.getElementById("search");

//submit button event listener
submit=document.getElementById("submit");
submit.addEventListener("click",insertQues);


//new response button
responsebtn.addEventListener("click",newResponse);

//newform event listener
newquesform.addEventListener("click",() =>{
    rightside.setAttribute("style","");
    resolveside.setAttribute("style","display:none");
});


//new question
function insertQues(){
     subject=document.getElementById("subject");
     question=document.getElementById("question");
      
    let sflag=0,qflag=0;
    for(let i=0;i<subject.value.length;i++){
        if(subject.value[i]!=" "){
            sflag=1;
            break;
        }
    }
    for(let i=0;i<question.value.length;i++){
        if(question.value[i]!=" "){
            qflag=1;
            break;
        }
    }
    if(qflag==0 || sflag==0 ){
        alert("Both question and subject field must have some value.");
        return;
    }
    let que=JSON.parse(localStorage.getItem("ques"));
    if( que==null || que.length==0  ){
        quesid=0;
    }
    else{
       
        quesid=que[que.length-1].id+1;
    }
    data.id=quesid;
    data.ques=question.value;
    data.sub=subject.value;
    data.time=parseInt(Date.now());
    addlocal(data);
    addrow(data,quesid);
    subject.value="";
    question.value="";
    
}

//new response 
function newResponse(){
    
    name=document.getElementById("name");
    comment=document.getElementById("comment");
     let sflag=0,qflag=0;
    for(let i=0;i<name.value.length;i++){
        if(name.value[i]!=" "){
            sflag=1;
            break;
        }
    }
    for(let i=0;i<comment.value.length;i++){
        if(comment.value[i]!=" "){
            qflag=1;
            break;
        }
    }
    if(qflag==0 || sflag==0 ){
        alert("Both name and comment field must have some value.");
        return;
    }
    let res=JSON.parse(localStorage.getItem("response"));
    if(res==null || res.length==0){
        eid=0;
    }
    else{
        eid=res[res.length-1].id+1;
    }
    let id=clickedques.childNodes[1].id;
    responsearray.quesid=id;
    responsearray.id=eid;
    responsearray.name=name.value;
    responsearray.comment=comment.value;
    responsearray.time=parseInt(Date.now());
    addresp(responsearray,eid);
    addlocalrsp(responsearray);
    name.value="";
    comment.value="";
}


//add new ques
function addrow(data,quesid){
    const temp=document.querySelector('#new');
    const clone = temp.content.cloneNode(true);
    let h4=clone.querySelector("h4");
    let p=clone.querySelectorAll("p");
    let a=clone.querySelectorAll("a");

    h4.textContent =data.sub;
    h4.id=quesid;
    p[0].textContent=data.ques;
    p[1].textContent=getdate(data.time);
    a[0].textContent=" "+data.upv;
    a[0].classList.add(quesid);
    a[1].textContent=" "+data.downv;
    a[1].classList.add(quesid);
    a[2].classList.add(quesid);
    if(data.fav==true){
        a[2].setAttribute("style","color:#2585a2");
    }
    else{
        a[2].setAttribute("style","color:white");
    }
    quesbox.appendChild(clone);
}
//add new resp
function addresp(resp,eid){
    const temp=document.querySelector('#newresp');
    const clone = temp.content.cloneNode(true);
    let h4=clone.querySelector("h4");
    let p=clone.querySelectorAll("p");
    let a=clone.querySelectorAll("a");

    h4.textContent =resp.name;
    h4.id=eid;
    p[0].textContent=resp.comment;
    p[1].textContent=getdate(resp.time);
    a[0].textContent=" "+resp.upv;
    a[0].classList.add(eid);
    a[1].textContent=" "+resp.downv;
    a[1].classList.add(eid);
    a[2].classList.add(eid);
    if(resp.fav==true){
        a[2].setAttribute("style","color:#2585a2");
    }
    else{
        a[2].setAttribute("style","color:white");
    }
    response.appendChild(clone);
}
//set time
function getdate(time){
    let curr=parseInt(Date.now());
    
    let sec=parseInt((curr-time)/1000);
    let s=sec%60;
    let min=parseInt(sec/60);
    let m=min%60;
    let hour=parseInt(m/60);
    let h=hour%60;
    if(m==0){
        return s+" seconds ago";
    }
    else if(h==0){
        return m+" minutes ago";
    }
    else
        return h+" hours ago";

}

//ques vote and fav
quesbox.addEventListener("click",vote);
function vote(event){
    let que=JSON.parse(localStorage.getItem("ques"));
    let target=event.target;
   // console.log(target)
    node_to_delete=target.parentNode.parentNode;
    if(target.classList.contains("up")){
        que.forEach(element=>{
            if(target.classList.contains(element.id)){
                element.upv++;
                 target.innerText=" "+element.upv;
            }
        })
    }
    else if(target.classList.contains("down")){
        que.forEach(element=>{
            if(target.classList.contains(element.id)){
                element.downv++;
                 target.innerText=" "+element.downv;
            }
        })
    }
    else if(target.classList.contains("fav")){
        que.forEach(element=>{
            if(target.classList.contains(element.id)){
               element.fav=!element.fav;
               if(element.fav==true){
                    target.setAttribute("style","color:#2585a2");
               }
               else{
                   target.setAttribute("style","color:white");
               }
            }
        })
    }
    else{
        resolve(target);
        let child=response.lastElementChild;
        while(child){
            response.removeChild(child);
            child=response.lastElementChild;
        }
        getlocalrResp();
    }
    localStorage.setItem("ques", JSON.stringify(que));
}

//response vote and fav
response.addEventListener("click",voteRes);
function voteRes(event){
    let res=JSON.parse(localStorage.getItem("response"));
    let target=event.target;
    let id=clickedques.childNodes[1].id;
    if(target.classList.contains("up")){
        res.forEach(element=>{
            if(element.quesid==id){
                if(target.classList.contains(element.id)){
                    element.upv++;
                    target.innerText=" "+element.upv;
                }
            }
        })
    }
    else if(target.classList.contains("down")){
        res.forEach(element=>{
            if(element.quesid==id){
                if(target.classList.contains(element.id)){
                    element.downv++;
                    target.innerText=" "+element.downv;
                }
            }
        })
    }
    else if(target.classList.contains("fav")){
        res.forEach(element=>{
            if(element.quesid==id){
                if(target.classList.contains(element.id)){
                    element.fav=!element.fav;
                    if(element.fav==true){
                         target.setAttribute("style","color:#2585a2");
                    }
                    else{
                        target.setAttribute("style","color:white");
                    }
                 }
            }
        })
    }
    else{
        console.log("Asd");
    }
    localStorage.setItem("response", JSON.stringify(res));
}


//show response and question
function resolve(target){
    
    let parentNode=target.parentNode;
    if(parentNode.classList.contains("col-8"))
    {   
        let h4=parentNode.childNodes[1].innerText;
        let p=parentNode.childNodes[3].innerText;
        clickedques.childNodes[1].innerText=h4;
        clickedques.childNodes[1].id=parentNode.childNodes[1].id;
        clickedques.childNodes[3].innerText=p;
        rightside.setAttribute("style","display:none");
        resolveside.setAttribute("style","");
    }
   
}

//ques is resolved
resolvebtn.addEventListener("click",function(){
    rightside.setAttribute("style","");
    resolveside.setAttribute("style","display:none");
    let delete_id=node_to_delete.childNodes[1].childNodes[1].id;
   deleteLocalQues(delete_id);
    deleteLocalresponse(delete_id);
    node_to_delete.remove();

})


//search ques 
let key="";
search.addEventListener("keydown",event=>{
    let que=JSON.parse(localStorage.getItem("ques"));
   if(event.key!="Backspace"){
    key+=event.key;
    
    let child=quesbox.lastElementChild;
    while(child){
        quesbox.removeChild(child);
        child=quesbox.lastElementChild;
    }
    que.sort(cp);
    que.forEach(element=>{
        if(element.sub.toLowerCase().includes(key.toLowerCase()) || element.ques.toLowerCase().includes(key.toLowerCase()) ){
           addrow(element,element.id);
        }
    })
    
   }
    else{
        key=key.substring(0,key.length-1);
        console.log(key);
        let child=quesbox.lastElementChild;
        while(child){
            quesbox.removeChild(child);
            child=quesbox.lastElementChild;
        }
        que.sort(cp);
        que.forEach(element=>{
            if(element.sub.toLowerCase().includes(key.toLowerCase()) || element.ques.toLowerCase().includes(key.toLowerCase())){
               addrow(element,element.id);
            }
        })
    
    }
   
})


//add question to local storage
function addlocal(data){
    let que=[];
    if(localStorage.getItem("ques")==null){
        que.push(data);
        localStorage.setItem("ques",JSON.stringify(que));
    }
    else{
        que=JSON.parse(localStorage.getItem("ques"));
        que.push(data);
        localStorage.setItem("ques", JSON.stringify(que));
    }
}

//get question from local storage
function getlocal(){
    if(localStorage.getItem("ques")!=null){
        let que=JSON.parse(localStorage.getItem("ques"));
        que.sort(cp);
            que.forEach(element => {
                addrow(element,element.id);
            });
        }
}
getlocal();

//add response to local storage
function addlocalrsp(resp){
    let r=[];
    if(localStorage.getItem("response")==null){
        r.push(resp);
        localStorage.setItem("response",JSON.stringify(r));
    }
    else{
        r=JSON.parse(localStorage.getItem("response"));
         r.push(resp);
        localStorage.setItem("response",JSON.stringify(r));
    }
}

//get response from local storage
function getlocalrResp(){
    if(localStorage.getItem("response")!=null){
        let r=JSON.parse(localStorage.getItem("response"));
        r.sort(cp);
        r.forEach(element=>{
            if(element.quesid==clickedques.childNodes[1].id){
                addresp(element,element.id);
            }
        })
    }
}

//delete ques from local storage
function deleteLocalQues(id){
    let que=[];
    if(localStorage.getItem("ques")!=null){
        que=JSON.parse(localStorage.getItem("ques"));
        for(let i=0; i<que.length;i++)
            if(que[i].id==id){
                que.splice(i,1);
                break;
            }
        }
        localStorage.setItem("ques", JSON.stringify(que));
}

setInterval(function(){
    let child=quesbox.lastElementChild;
        while(child){
            quesbox.removeChild(child);
            child=quesbox.lastElementChild;
        }
    getlocal();
},10000)

//delete response from local storage
function deleteLocalresponse(id){
    let res=[];
    if(localStorage.getItem("response")!=null){
        res=JSON.parse(localStorage.getItem("response"));
        let n=res.length;
        let index=[];
        console.log("delete these index");
        for(let i=0; i<n;){
            res.sort(compare);
            if(res[i] && res[i].quesid==id){
                res.splice(i, 1);
                i=0;
            }
            else{
                i++;
            }
        }
     
    }
    localStorage.setItem("response",JSON.stringify(res));
}
function compare(a,b){
    if(a.quesid>b.quesid){
        return 1;
    }
    else if(a.quesid<b.quesid){
        return -1;
    }
    else
        return 0;
}

function cp(a,b){
    if(a.fav==true && b.fav==false){
        return -1;
    }
    else if(a.fav==false && b.fav==true){
        return 1;
    }
    else
        return 0;
}