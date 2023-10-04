const Menu = async ()=>{
    let Products = await fetch('./Menu-Data.json')
    .then(response => {
    return response.json();
    }).then (data => data);  
    // console.log(Products[0]);

    // {
    //     "name": "Veggie Delight",
    //     "imageSrc": "https://source.unsplash.com/random?veggies",
    //     "time": "30 min",
    //     "type": "veg",
    //     "isLiked": false,
    //     "rating": 4.2
    // },

const productArea = document.getElementById('product_area');
const allRecipes = document.getElementById('All');
const onlyVegRecipes = document.getElementById('Veg');
const onlyNonVegRecipes = document.getElementById('NVeg');
const search = document.getElementById('input-search');
const Four_n_more = document.getElementById('4&Above');
const Four = document.getElementById('Four');

Four_n_more.addEventListener("input",(event)=>{
    productArea.innerHTML =`<tr></tr>`;
    let valid = Number(event.target.getAttribute("data-valid"));
    console.log(typeof valid,valid);
    if(valid){
        for (let i = 0; i < Products.length ;i++) {
            let rating = Number(Products[i].rating);    
            if(Number(Products[i].rating) >= 4){
            allProductShow(i,Products);
            }
        }
        event.target.setAttribute("data-valid",0);
        console.log(event.target.getAttribute("data-valid"));
    }
    else{
        productArea.innerHTML =`<tr></tr>`;
        printAll();
        event.target.setAttribute("data-valid",1)
    }

});

Four.addEventListener("input",(event)=>{
    productArea.innerHTML =`<tr></tr>`;
    let valid = Number(event.target.getAttribute("data-valid"));
    console.log(typeof valid,valid);
    if(valid){
        for (let i = 0; i < Products.length ;i++) {
            let rating = Number(Products[i].rating);    
            if(Number(Products[i].rating) === 4){
            allProductShow(i,Products);
            }
        }
        event.target.setAttribute("data-valid",0);
        console.log(event.target.getAttribute("data-valid"));
    }
    else{
        productArea.innerHTML =`<tr></tr>`;
        printAll();
        event.target.setAttribute("data-valid",1)
    }

});

search.addEventListener("input",()=>{
    let search_text = search.value;
    productArea.innerHTML =`<tr></tr>`;
    for (let i = 0; i < Products.length ;i++) {
        let name = Products[i].name.toLowerCase();
        if(name.includes(search_text)){
        allProductShow(i,Products);
        }
    }
});

allRecipes.addEventListener("click",()=>{
    productArea.innerHTML =`<tr></tr>`;
    for (let i = 0; i < Products.length ;i++) {
        allProductShow(i,Products);
    }
});

onlyVegRecipes.addEventListener("click",()=>{
    productArea.innerHTML =`<tr></tr>`;
    for (let i = 0; i < Products.length ;i++) {
        if(Products[i].type === "veg"){
        allProductShow(i,Products);
        }
    }
});

onlyNonVegRecipes.addEventListener("click",()=>{
    productArea.innerHTML =`<tr></tr>`;
    for (let i = 0; i < Products.length ;i++) {
        if(Products[i].type === "non-veg"){
        allProductShow(i,Products);
        }
    }
});

function printAll(){
    for (let i = 0; i < Products.length ;i++) {
        allProductShow(i,Products);
    }
}
    

function allProductShow(i,Arr){
const newProduct = document.createElement("div");
    newProduct.className = "card";
    newProduct.innerHTML =` <img src="${Arr[i].imageSrc}" alt="product_image" class="card-img-top" />
    <div class="card-body">
      <p class="card-subtitle">${Arr[i].type}</p>
      <div class="card-text-container">
        <h4 class="card-text">${Arr[i].name}</h4>
        <div class="icon-rating">
          <i class="fa-solid fa-star fa-2xs" style="color: #f5db38;"></i>
         <span class="rating-text">${Arr[i].rating}</span>
      </div>
      </div>
      <div class="subtitle-rating">
        <p class="card-text-orange">${Arr[i].time}</p>
        <div>
          <i class="fa-regular fa-heart" style="color: #787878;"></i>
          <i class="fa-regular fa-comment" style="color: #737373;"></i>
        </div>
      </div>
    </div>
    
    `;
    productArea.appendChild(newProduct);
}

// printing the product
printAll();
}
Menu();