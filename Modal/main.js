// Get Modal Element
let modal = document.getElementById('simpleModal');
// Get Open Modal Btn
let modalBtn = document.getElementById('modalBtn');
// Get Close Btn
let closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for Open Click
modalBtn.addEventListener('click', openModal);

// Listen for Close Click
closeBtn.addEventListener('click', closeModal);

// Listen for Outside Click
window.addEventListener('click', clickOutside);

// Function to Open Modal
function openModal(){
    modal.style.display = 'block';
}

// Function to Close Modal
function closeModal(){
    modal.style.display = 'none';
}

// Function for outside click
function clickOutside(e){
    if(e.target == modal)
        modal.style.display = 'none';
}