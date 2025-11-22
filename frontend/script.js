let items = document.querySelector('#items');
let myinput = document.querySelector('#myinput');
let editindex = -1;

let arr = [];
let server_url = "http://localhost:3000/todo-list";

async function fetchTodos() {
    try {
        const res = await fetch(server_url);
        const data = await res.json();
        arr = data; 
        renderitems();  
    } catch(err) {
        console.error(err);
    }
}

async function addTodo(text) {
    try {
        await fetch(server_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ todo: text })
        });
        console.log('cliked')
        fetchTodos(); 
    } catch(err) {
        console.error(err);
    }
}

async function deleteTodo(id) {
    try {
        await fetch(`${server_url}/${id}`, { method: "DELETE" });
        fetchTodos();
    } catch(err) {
        console.error(err);
    }
}

function renderitems() {
  items.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    let item = document.createElement('li');
    let itemtext = document.createElement('span');
    itemtext.innerText = arr[i].todo; 

    let itemimg1 = document.createElement('img');
    let itemimg2 = document.createElement('img');

    itemimg1.setAttribute('src', './cross-small.svg');
    itemimg2.setAttribute('src', './edit.svg');

    itemimg2.onclick = () => onedit(i);
    itemimg1.onclick = () => ondelete(i);

    let imgdiv = document.createElement('div');
    imgdiv.classList.add('icons');
    imgdiv.appendChild(itemimg2);
    imgdiv.appendChild(itemimg1);

    item.appendChild(itemtext);
    item.appendChild(imgdiv);
    items.appendChild(item);
  }
}

function onAdd() {
  if(myinput.value === '') return alert('matnni kiriting');

  if(editindex === -1){
    addTodo(myinput.value); 
  } else {
    const id = arr[editindex]._id;  
    fetch(`${server_url}/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: myinput.value })
    }).then(() => fetchTodos());
    editindex = -1;
  }

  myinput.value = '';
}

function ondelete(index){
    const id = arr[index]._id;  
    deleteTodo(id);
}

function onedit(index){
  editindex = index;
  myinput.value = arr[index].todo;
  myinput.focus();
}

fetchTodos();
