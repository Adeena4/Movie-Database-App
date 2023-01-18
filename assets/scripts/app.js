const startAddMoviBtn = document.querySelector('header button');
const addMoviModal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const cancelBtn = document.querySelector('.btn--passive');
const addMoviBtn = document.querySelector('.btn--success');
const userInputs = document.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const moviList = document.getElementById('movie-list');
const deletMoviModal = document.getElementById('delete-modal');

const movies = [];

let num = 0;
let autoInc = () => {
    num = num * 1;
    return num++;
    
}



const updateUI = () => {
    if(movies.length === 0){
        entryText.style.display = 'block';
    } else {
        entryText.style.display = 'none';
    }
}

const togglebackDrop = () => {
    backDrop.classList.toggle('visible');
}

const closeMoviModal = () => {
    addMoviModal.classList.remove('visible');
}

const showMoviModal = () =>{
    addMoviModal.classList.add('visible');
    togglebackDrop();
}

function cancelButton(){
    closeMoviModal();
    clearMoviInput();
    togglebackDrop();
}

const clearMoviInput = () => {
    for(const userInput of userInputs){
        userInput.value = '';
    }
}

const deleteMovi = moviId => {
    // let idx = 0;
    // for(const movie of movies){
    //     if(movie.id === moviId){ 
    //         break;
    //     }
    //     idx++; 
    // }
   
    // movies.splice(idx,1);

    // moviList.children[idx].remove();
    function findIndex(fIndex){
        return fIndex.id == moviId;
    }

   let a = movies.findIndex(findIndex);
   
    movies.splice(a,1);

    moviList.children[a].remove();

    deletMoviModal.classList.remove('visible');
    togglebackDrop();
    updateUI();
}

const cancelMoviDeletion = () => {
    deletMoviModal.classList.remove('visible');
    togglebackDrop();
}

const deleteMoviHandler = (moviId) => { 
    
    deletMoviModal.classList.add('visible');
    togglebackDrop();

   const cancelDeletionBtn = deletMoviModal.querySelector('.btn--passive');
   let confirmDeletionBtn = deletMoviModal.querySelector('.btn--danger');

   confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
   
   confirmDeletionBtn = deletMoviModal.querySelector('.btn--danger');

   cancelDeletionBtn.removeEventListener('click', cancelMoviDeletion);

   cancelDeletionBtn.addEventListener('click', cancelMoviDeletion);

   confirmDeletionBtn.addEventListener('click', deleteMovi.bind(null, moviId));

}

const renderNewMovi = (id, title, imgUrl, rating) => {
    
    const newMoviElement = document.createElement('li');
    newMoviElement.className = 'movie-element';
    newMoviElement.innerHTML = `

    <div class="movie-element__image">
        <img src="${imgUrl}">

    </div>
    <div class="movie-element__info">
        <h2>${title}</h2> 
        <p>${rating} / 5 🌟</p>
    </div>

    `;

    newMoviElement.addEventListener('click',deleteMoviHandler.bind(null, id));

    

    moviList.appendChild(newMoviElement);
}

const addMovi = () => {
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(titleValue.trim() === '' || imgUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5){
        alert("It seems like you have left inputs empty or you rate below 1 or above 5!");
        return;
    } 

        const newMovi = {
            id: autoInc().toString(),
            title: titleValue,
            img: imgUrlValue,
            rating: ratingValue
        };

        movies.push(newMovi);
        closeMoviModal();
        clearMoviInput();
        renderNewMovi(newMovi.id, newMovi.title, newMovi.img, newMovi.rating);
        updateUI();
        togglebackDrop();
        console.log(movies);
}

const backDropClickHandler = () => {
    closeMoviModal();
    cancelMoviDeletion();
    clearMoviInput();
}

startAddMoviBtn.addEventListener('click', showMoviModal);
cancelBtn.addEventListener('click', cancelButton);
backDrop.addEventListener('click', backDropClickHandler);
addMoviBtn.addEventListener('click', addMovi);