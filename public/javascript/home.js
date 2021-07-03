const pets = document.querySelector('.pets');

function loadSomePets() {
  fetch('/pets?page=1&limit=5')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(pet => {
        const img = document.createElement('img');
        img.src = `images/${pet.picture}`;
        
        const name = document.createElement('p');
        name.textContent = pet.name;

        const description = document.createElement('p');
        description.textContent = pet.description;

        const hr = document.createElement('hr');

        pets.appendChild(img);
        pets.appendChild(name);
        pets.appendChild(description);
        pets.appendChild(hr);
      });
    });
}

loadSomePets();
