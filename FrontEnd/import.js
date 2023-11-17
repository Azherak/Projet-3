// Sélection de gallery dans le DOM
let gallery = document.querySelector('.gallery')
// Sélection du bouton dans le DOM
const validateButton = document.getElementById('valider');
const dialog = document.getElementById('dialog');

// Ajoutez un écouteur d'événements au bouton
validateButton.addEventListener('click', async function() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  if (file) {
    // Créez un FormData pour stocker le fichier
    const formData = new FormData();
    formData.append('image', file);

    // Ajoutez le nom du champ et la catégorie au formData
    const fieldName = document.getElementById('titre').value;
    const category = document.getElementById('categorie').value;
    formData.append('fieldName', fieldName);
    formData.append('category', category);

    // Envoyez une requête POST à votre API avec le fichier
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Image uploaded successfully:', data);

      // Fermez la pop-up
      dialog.style.display = 'none';
      
      // Supprimez les données de votre galerie
      gallery.innerHTML = '';

      // Appelez votre fonction addToHTML
      addToHTML(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else {
    console.log('Aucun fichier sélectionné');
  }
});