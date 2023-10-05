const Menu = async () => {
  let Products = await fetch("/Cookpal_Menu_Catalogue/Menu-data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => data);
  // *********************************************Global Declaration Area***********************************************************

  const ProductArea = document.getElementById("ProductArea");
  const AllRecipes = document.getElementById("AllRecipes");
  const VegRecipes = document.getElementById("VegRecipes");
  const NonVegRecipes = document.getElementById("NonVegRecipes");
  const InputSearch = document.getElementById("InputSearch");
  const Filter_four_above = document.getElementById("Filter_four_above");
  const Filter_four_below = document.getElementById("Filter_four_below");

  let All = 1;
  let Veg = null;
  let NonVeg = null;
  let FourAbove = null;
  let FourBelow = null;
  let Input = null;

  //   ***********************************************Default Product Shows Area *************************************************

  DecisionMaker();

  // *******************************************Functional Working Area**********************************************************

  // case 1 - veg & four above -> Veg = 1 ,fourAbove = 1 ,fourBelow = null
  // case 2 - veg & four below -> Veg = 1 ,fourBelow = 1 ,fourAbove = null

  // only veg recipe items
  VegRecipes.addEventListener("click", () => {
    Veg = Veg == null ? 1 : null;
    NonVeg = null;
    DecisionMaker();
  });

  //  four and above star rating function
  Filter_four_above.addEventListener("input", () => {
    FourAbove = FourAbove == null ? 1 : null;
    FourBelow = null;
    DecisionMaker();
  });

  //  four and below star rating function
  Filter_four_below.addEventListener("input", (event) => {
    FourBelow = FourBelow == null ? 1 : null;
    FourAbove = null;
    DecisionMaker();
  });

  // case 3 - NonVeg & four above -> NonVeg = 1 ,fourAbove = 1 ,fourBelow = null
  // case 4 - NonVeg & four below -> NonVeg = 1 ,fourBelow = 1 ,fourAbove = null

  //   only Non veg recipes items
  NonVegRecipes.addEventListener("click", () => {
    NonVeg = NonVeg == null ? 1 : null;
    Veg = null;
    DecisionMaker();
  });

  // case 5 - NonVeg & four above -> NonVeg = 1 ,fourAbove = 1 ,fourBelow = null
  // case 6 - NonVeg & four below -> NonVeg = 1 ,fourBelow = 1 ,fourAbove = null

  // all recipes
  AllRecipes.addEventListener("click", () => {
    Veg = null;
    NonVeg = null;
    DecisionMaker();
  });

  // case 7 - Search then four above -> Search = 1 ,fourAbove = 1 ,fourBelow = null
  // case 8 - Search then four below -> Search = 1 ,fourBelow = 1 ,fourAbove = null

  // search for product
  InputSearch.addEventListener("input", () => {
    let search_text = InputSearch.value;
    ProductArea.innerHTML = `<tr></tr>`;
    for (let i = 0; i < Products.length; i++) {
      let name = Products[i].name.toLowerCase();
      if (
        name.includes(search_text) &&
        FourBelow == null &&
        FourAbove == null
      ) {
        AllProductShow(i, Products);
      } else if (name.includes(search_text) && FourAbove == 1) {
        if (Number(Products[i].rating) >= 4) {
          AllProductShow(i, Products);
        }
      } else if (name.includes(search_text) && FourBelow == 1) {
        if (Number(Products[i].rating) <= 4) {
          AllProductShow(i, Products);
        }
      }
    }
  });

  // ************************************************DecisionMaker() function Area*******************************************

  function DecisionMaker() {
    ProductArea.innerHTML = `<tr></tr>`;
    if (Veg == 1 && FourBelow == null && FourAbove == null) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].type === "veg") {
          AllProductShow(i, Products);
        }
      }
    } else if (Veg == 1 && FourAbove == 1) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].type === "veg" && Number(Products[i].rating) >= 4) {
          AllProductShow(i, Products);
        }
      }
    } else if (Veg == 1 && FourBelow == 1) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].type === "veg" && Number(Products[i].rating) <= 4) {
          AllProductShow(i, Products);
        }
      }
    } else if (NonVeg == 1 && FourBelow == null && FourAbove == null) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].type === "non-veg") {
          AllProductShow(i, Products);
        }
      }
    } else if (NonVeg == 1 && FourAbove == 1) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].type === "non-veg" && Number(Products[i].rating) >= 4) {
          AllProductShow(i, Products);
        }
      }
    } else if (NonVeg == 1 && FourBelow == 1) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].type === "non-veg" && Number(Products[i].rating) <= 4) {
          AllProductShow(i, Products);
        }
      }
    } else if (All == 1 && FourBelow == null && FourAbove == null) {
      for (let i = 0; i < Products.length; i++) {
        AllProductShow(i, Products);
      }
    } else if (All == 1 && FourAbove == 1) {
      for (let i = 0; i < Products.length; i++) {
        if (Number(Products[i].rating) >= 4) {
          AllProductShow(i, Products);
        }
      }
    } else if (All == 1 && FourBelow == 1) {
      for (let i = 0; i < Products.length; i++) {
        if (Number(Products[i].rating) <= 4) {
          AllProductShow(i, Products);
        }
      }
    }
  }

  // ***********************************************Product Showcasing Area ********************************************

  function AllProductShow(i, Arr) {
    const newProduct = document.createElement("div");
    newProduct.className = "card";
    newProduct.innerHTML = ` <img src="${Arr[i].imageSrc}" alt="product_image" class="card-img-top" />
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
    ProductArea.appendChild(newProduct);
  }

  //   ********************************************* Old Working Code ********************************************************************
  //  four and above star rating function
  //   Filter_four_above.addEventListener("input", (event) => {
  //     ProductArea.innerHTML = `<tr></tr>`;
  //     let valid = Number(event.target.getAttribute("data-valid"));
  //     console.log(typeof valid, valid);
  //     if (valid) {
  //       for (let i = 0; i < Products.length; i++) {
  //         let rating = Number(Products[i].rating);
  //         if (Number(Products[i].rating) >= 4) {
  //           AllProductShow(i, Products);
  //         }
  //       }
  //       event.target.setAttribute("data-valid", 0);
  //       console.log(event.target.getAttribute("data-valid"));
  //     } else {
  //       ProductArea.innerHTML = `<tr></tr>`;
  //       printAll();
  //       event.target.setAttribute("data-valid", 1);
  //     }
  //   });

  //  four and below star rating function
  //   Filter_four_below.addEventListener("input", (event) => {
  //     ProductArea.innerHTML = `<tr></tr>`;
  //     let valid = Number(event.target.getAttribute("data-valid"));
  //     console.log(typeof valid, valid);
  //     if (valid) {
  //       for (let i = 0; i < Products.length; i++) {
  //         let rating = Number(Products[i].rating);
  //         if (Number(Products[i].rating) <= 4) {
  //           AllProductShow(i, Products);
  //         }
  //       }
  //       event.target.setAttribute("data-valid", 0);
  //       console.log(event.target.getAttribute("data-valid"));
  //     } else {
  //       ProductArea.innerHTML = `<tr></tr>`;
  //       printAll();
  //       event.target.setAttribute("data-valid", 1);
  //     }
  //   });

  // search for product
  //   InputSearch.addEventListener("input", () => {
  //     let search_text = search.value;
  //     ProductArea.innerHTML = `<tr></tr>`;
  //     for (let i = 0; i < Products.length; i++) {
  //       let name = Products[i].name.toLowerCase();
  //       if (name.includes(search_text)) {
  //         AllProductShow(i, Products);
  //       }
  //     }
  //   });

  // all recipes
  //   AllRecipes.addEventListener("click", () => {
  //     ProductArea.innerHTML = `<tr></tr>`;
  //     for (let i = 0; i < Products.length; i++) {
  //       AllProductShow(i, Products);
  //     }
  //   });

  // only veg recipe items
  //   VegRecipes.addEventListener("click", () => {
  //     ProductArea.innerHTML = `<tr></tr>`;
  //     for (let i = 0; i < Products.length; i++) {
  //       if (Products[i].type === "veg") {
  //         AllProductShow(i, Products);
  //       }
  //     }
  //   });

  // only Non veg recipes items
  //   NonVegRecipes.addEventListener("click", () => {
  //     ProductArea.innerHTML = `<tr></tr>`;
  //     for (let i = 0; i < Products.length; i++) {
  //       if (Products[i].type === "non-veg") {
  //         AllProductShow(i, Products);
  //       }
  //     }
  //   });
};
Menu();
