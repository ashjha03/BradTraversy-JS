// Add in List
let input = document.querySelector('input');
let add = document.querySelector('button');
let ul = document.querySelector('ul');
add.onclick =  function addItem(e){
    e.preventDefault();
    let li = document.createElement('li');
    let i = document.createElement('i');
    li.classList.add('list-group-item');
    let text = document.createTextNode(input.value);
    li.appendChild(text);
    i.classList.add('fas', 'fa-backspace', 'fa-2x');
    let rem = document.createElement('button');
    rem.classList.add('remove');
    rem.appendChild(i);
    li.appendChild(rem);
    ul.appendChild(li);
    input.value = '';
}

ul.addEventListener('click', removeItem);
// Remove from list
function removeItem(e){
    if(e.target.classList.contains('fas') || e.target.classList.contains('remove')){
        let li;
        if(e.target.classList.contains('remove')){
            li = e.target.parentElement;
            console.log(li);
        }
        if(e.target.classList.contains('fas')){
            li = e.target.parentElement.parentElement;
            console.log(li);
        }
        ul.removeChild(li);
    }
}