
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var searchInput = document.getElementById("searchInput");

var addUpdateButton = document.getElementById("addUpdateBtn");

var updateMode = false;
var mainIndex ;

var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");
var productCategoryAlert = document.getElementById("productCategoryAlert");
var productDescAlert = document.getElementById("productDescAlert");


var cancelBtnContainer = document.getElementById("cancelBtnContainer");

// ==========================

var productsArray = JSON.parse(localStorage.getItem ("products")) ?? [];
displayProduct();


function addUpdateProduct () {

    validateProductsData();

    if (isProductDataValid()) {
        if (! updateMode){
            addProduct(getProduct());
        }
    
        else {
           updateProduct(getProduct());
        }

        onDataChange ();
        clearInputs();
    }
}

// get product function :

function getProduct(){
      
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescInput.value
    }

    return (product);
}

// add product function :

function addProduct(product){
    productsArray.push(product);
}

//  function to update product ...

function updateProduct(product){
    // productsArray.splice(mainIndex , 1 , product); // delete and replace

    productsArray[mainIndex] = product; // reasign 

    addUpdateButton.innerHTML = "Add Product";
    updateMode = false;

    cancelBtnContainer.innerHTML = "";

}

// function on change data = store in local storage & dispaly data ...

function onDataChange(){
    localStorage.setItem("products", JSON.stringify(productsArray));
    
    displayProduct();
}

// function to dispaly product in the table ...

function displayProduct() {

    var searchTerm = searchInput.value;

    var box = "";

    for (var i=0; i < productsArray.length; i++){
        if (productsArray[i].name.toLowerCase().includes(searchTerm.toLowerCase()) || productsArray[i].price.includes(searchTerm)){
            box += `
            <tr>
                <td>${i+1}</td>
                <td>${productsArray[i].name}</td>
                <td>${productsArray[i].price}</td>
                <td>${productsArray[i].category}</td>
                <td>${productsArray[i].description}</td>
                <td><button onclick="patchValues(${i})" class="btn btn-outline-info">Update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
             </tr>
            `
        }
    }

    document.getElementById("tableBody").innerHTML = box;
}

// patchValues function : add values of elements to inputs of form

function patchValues (index){

    mainIndex = index;

    updateMode = true;

    productNameInput.value = productsArray[index].name;
    productPriceInput.value = productsArray[index].price;
    productCategoryInput.value = productsArray[index].category;
    productDescInput.value = productsArray[index].description;

    // change add ==to==> update button
    addUpdateButton.innerHTML = "Update Product";

    // add Cancel button -----
    cancelBtnContainer.innerHTML = `<button onclick="cancel()" type="button" id="cancelBtn" class="btn btn-outline-secondary">Cancel</button>`;

}

// Function to cancel ------

function cancel(){

    clearInputs();
    addUpdateButton.innerHTML = "Add Product";
    cancelBtnContainer.innerHTML = "";
    updateMode = false;

}

// function to clear data in inputs after dispalying it :

function clearInputs() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

// function to delete Product :

function deleteProduct(index){

    productsArray.splice(index,1);

    onDataChange();

}

// ======= Validation =======

function isProductDataValid() {

    return (/^[A-Zi][\w ]{2,19}$/.test(productNameInput.value) &&
            /^[1-9][0-9]*$/.test(productPriceInput.value) &&
            /^[A-Z][\w ]{2,19}$/.test(productCategoryInput.value) &&
            /^[A-Z].{2,}$/.test(productDescInput.value));

}

function validateProductsData() {

    if (/^[A-Zi][\w ]{2,19}$/.test(productNameInput.value)){
        productNameAlert.classList.add("d-none");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");

    }
    else{
        productNameAlert.classList.remove("d-none");
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
    }


    if (/^[1-9][0-9]*$/.test(productPriceInput.value)){
        productPriceAlert.classList.add("d-none");
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");

    }
    else{
        productPriceAlert.classList.remove("d-none");
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
    }


    if (/^[A-Z][\w ]{2,19}$/.test(productCategoryInput.value)){
        productCategoryAlert.classList.add("d-none");
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");

    }
    else{
        productCategoryAlert.classList.remove("d-none");
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
    }

    if (/^[A-Z].{2,}$/.test(productDescInput.value)){
        productDescAlert.classList.add("d-none");
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");

    }
    else{
        productDescAlert.classList.remove("d-none");
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
    }
}





