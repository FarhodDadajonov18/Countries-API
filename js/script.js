let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");

let elList = document.querySelector(".list");
 let elLoader = document.querySelector(".loader") 


function RemoveLoader() {
    elLoader.classList.add("d-none")
}

function addLoader () {
  elLoader.classList.remove("d-none")

}


fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => renderItem(data))
  .catch(e => console.log(e.message))
  .finally(RemoveLoader)


  elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    let countryInput = elInput.value.trim().toLowerCase();

    elList.innerHTML =  null;
    addLoader()

    fetch(`https://restcountries.com/v3.1/name/${countryInput}`)
    .then(res => res.json())
    .then(data => renderItem(data))
    .catch(e => console.log(e.mesage))
    .finally(RemoveLoader)
})






function renderItem (arr){
elList.innerHTML= null;

  arr.forEach(element => {
    console.log(element);

    let elItem = document.createElement("li");
        elItem.setAttribute("class", " item col-md-4 col-sm-6");
        
    let elDiv = document.createElement("div");
        elDiv.setAttribute("class", "elDiv card rounded m-2");
   
    let elImg = document.createElement("img");
        elImg.setAttribute("src", `${element.flags.png}`);
        elImg.setAttribute("class","card-img-top rounded");

        elImg.style.width = "100%";
        elImg.style.height = "200px";
   
   let elHeading = document.createElement("h5");
       elHeading.setAttribute("class", "heading");
       elHeading.textContent = element.name.official;  

  let elPopulation = document.createElement("strong");
      elPopulation.setAttribute("class", "Population text-warning");
      elPopulation.textContent = "Population : ";
      
 let population = document.createElement("p");
      population.setAttribute("class", "population fw-bold");
      population.textContent = element.population;
      population.prepend(elPopulation);

      let elContinent = document.createElement("strong");
     elContinent.setAttribute("class", "continent");
      elContinent.textContent = element.subregion;

   elDiv.append(elImg, elHeading, population,elContinent);
   elItem.appendChild(elDiv);
  elList.appendChild(elItem);

  })
 


}

