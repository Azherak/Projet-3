// --------------- Chargement du contenu -----------//
//test
let submitButton = document.querySelector('input[type=submit]');

let submitButtonStyle = window.getComputedStyle(submitButton);


// Sélection de projet dans le DOM
let projets = document.querySelector('#portfolio h2');
// Sélection de la galerie dans le DOM
let gallery = document.querySelector('.gallery');

// Suppression du contenu HTML existant dans la galerie
gallery.innerHTML = '';

// créations de la div contenant les boutons
let buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';
projets.appendChild(buttonContainer);

// Fonction pour récupérer les données de l'API
async function getData() {
  const response = await fetch('http://localhost:5678/api/works'); // url de l'api
  const data = await response.json();
  return data;
}

// Fonction pour ajouter les images et descriptions à index.html
function addToHTML(data, categorie) {
  // Filtrer les données par catégorie
  let filteredData = data;
  if (categorie) {
    filteredData = data.filter(item => item.category.name === categorie);
  }

  // Ajouter chaque élément filtré au HTML
  filteredData.forEach(item => {

         // Créer un nouvel élément figure
         const figure = document.createElement('figure');

         // Ajouter une image à la figure
         const img = document.createElement('img');
         img.src = item.imageUrl; // 
         figure.appendChild(img);
   
         // Ajouter une description à la figure
         const description = document.createElement('figcaption');
         description.textContent = item.title; // 
         figure.appendChild(description);
   
         // Ajouter la figure au conteneur gallery
         gallery.appendChild(figure);
  });
}

//------------------ boutons filtres ---------------//

// Fonction pour créer les boutons de filtre
function createFilterButtons(data) {
  // Obtenir toutes les catégories uniques
  let categories = [...new Set(data.map(item => item.category.name))];
  // Créer un bouton "Tous"
  let allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  // récupération de certains visuels du submit "Envoyer" //
  for (let property of submitButtonStyle) {
    allButton.style.setProperty(property, submitButtonStyle.getPropertyValue(property));
  }
  // modification style boutons filtrés //
  allButton.style.margin = '51px 0';
  allButton.style.padding = '9px';   

  allButton.addEventListener('click', () => {
    gallery.innerHTML = '';
    addToHTML(data); // Affiche toutes les catégories
});
buttonContainer.appendChild(allButton);
  //modification style container boutons //
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'center';
  buttonContainer.style.gap = '10px';

  // Créer un bouton pour chaque catégorie
  categories.forEach(categorie => {
    
    let button = document.createElement('button');
    button.textContent = categorie;
    // récupération de certains visuels du submit "Envoyer" //
    for (let property of submitButtonStyle) {
      button.style.setProperty(property, submitButtonStyle.getPropertyValue(property));
    }
    // modification style boutons filtrés //
    button.style.margin = '51px 0';
    button.style.padding = '9px';

    button.addEventListener('click', () => {
      gallery.innerHTML = '';
      addToHTML(data, categorie);
    });
    buttonContainer.appendChild(button);
  });
}

// Appeler la fonction getData et utiliser les données reçues pour appeler addToHTML et createFilterButtons
getData().then(data => {
  addToHTML(data);
  createFilterButtons(data);
});
