
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productModel = document.getElementById("productModel");
var productDesc = document.getElementById("productDesc");
var productList;
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById("updateProductBtn");

if (localStorage.getItem("productList") == null){
    productList= [];
}else{
    productList = JSON.parse(localStorage.getItem("productList"));
    display(productList);
}

function addProduct() {

    if (validateProductName()==true){
        var product = {
            name: productName.value,
            price: productPrice.value,
            model: productModel.value,
            desc: productDesc.value
        }
        productList.push(product);
        display(productList);
        localStorage.setItem("productList",JSON.stringify(productList));
        updateFormValues();
    }else {
        
    }

}

function display(list){
    var cartona = ``
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${list[i].newName? list[i].newName : list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].model}</td>
        <td>${list[i].desc}</td>
        <td><button onclick="getUpdatedProduct(${i})" class="btn btn-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = cartona;
}

function deleteProduct(index){
    productList.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productList));
    display(productList);
}

function searchByName(term){
    var foundedItems = []
    for(var i = 0; i < productList.length; i++){
        if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true){
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(),`<span class="bg-warning fs-5 ">${term}</span>`);
            foundedItems.push(productList[i]);
        }
    }
    display(foundedItems);
}

var update = 0;
function getUpdatedProduct(i){
    update = i;
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.replace("d-none", "d-block");
    updateFormValues(productList[i])
    
}

function updateFormValues(flag){

    productName.value = flag ? flag.name : "";
    productPrice.value = flag ? flag.price : "";
    productModel.value = flag ? flag.model : "";
    productDesc.value = flag ? flag.desc : "";
}

function updateProduct(){

    var product = {
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        desc: productDesc.value
    }
    productList.splice(update , 1 , product);
    localStorage.setItem("productList",JSON.stringify(productList));

    addProductBtn.classList.replace("d-none","d-block");
    updateProductBtn.classList.replace("d-block","d-none");
    display(productList);
    updateFormValues();

}

function validateProductName(){
    var regex = /^[A-z|a-z]\w/;
    if(regex.test(productName.value)==true){
        productName.style.border="";
        document.getElementById("wrongName").classList.add("d-none");
        return true
    }else{
        productName.style.border="2px solid red"
        document.getElementById("wrongName").classList.remove("d-none");
        return false
    }
    // return regex.test(productName.value)
}