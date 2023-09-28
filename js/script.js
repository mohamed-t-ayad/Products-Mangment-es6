/*
        - MAp for functions 
        = calc totla
        = create product
        = save to localstorage
        = clear inputs
        = read 
        = count
        = delete
        = update 
        = search 
        = clean data
*/


// call variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let adds  = document.getElementById('adds');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create'); // create btn

let mode = 'create';
let tmp;
// calc total
function calcTotal() {
    if(price.value != '') {
        let result = (+price.value + +taxes.value + +adds.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#f00'
    }
}

// Create Product 
let proData;
if(localStorage.product != null ){
    proData = JSON.parse(localStorage.product);
} else {
    proData = [];
}

create.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        adds: adds.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100) {
        if (mode === 'create') {
            if (newPro.count > 1 ) {
                for(let i=0; i < newPro.count; i++) {
                    proData.push(newPro);
                }
            } else {
                proData.push(newPro);
            }
        } else {
            proData[tmp] = newPro;
            // to retuen page to default and creat MOOD
            mode = 'create'; 
            create.innerHTML = 'Create';
            count.style.display ='block';
        }
        clearData();
    }
    
    localStorage.setItem('product', JSON.stringify(proData));
    showData();
}

// clear data after adding
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    adds.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read and Display Function

function showData() {
    calcTotal(); // to handel the total style after update a product
    let table = '';
    for(let i = 0; i < proData.length; i++) {
        table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].adds}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td>
                        <button onclick="updatePro(${i})" class="btn">update</button>
                        <button onclick="deletePro(${i})" class="btn del">delete</button>
                    </td>
                </tr>
            `;
    }

    document.getElementById("tbody").innerHTML = table;
    let delAll = document.getElementById("deleteAll");

    if(proData.length > 0 ) {
        delAll.innerHTML = 
            `
                <button onclick="deleteAll()" class="btn del">Delete All (${proData.length})</button>
            `
    } else {
        delAll.innerHTML = '';
        table.innerHTML = 'There is No data yet !';
    }
}
showData();

// Delete product

function deletePro(i) {
    proData.splice(i,1);
    localStorage.product = JSON.stringify(proData);
    showData();
}

// Delete All Button
function deleteAll() {
    localStorage.clear();
    proData.splice(0);
    showData();
}

// Count function

// Update function 
function updatePro(i) {
    title.value = proData[i].title;
    price.value = proData[i].price;
    taxes.value = proData[i].taxes;
    adds.value = proData[i].adds;
    discount.value = proData[i].discount;
    calcTotal();
    count.style.display = 'none';
    category.value = proData[i].category;

    create.innerHTML = 'Update';
    mode = 'update';
    tmp = i;

    scroll({
        top:0,
        behavior: 'smooth'
    });
}

// search function
let searchMood = 'title';
function search(id){
    let search = document.getElementById('search');
    if (id == "sarch-title") {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+ searchMood;

    search.focus();
    search.value = '';
    showData();
}

function searchProducts(value) {
    let table = '';

    for(let i=0; i < proData.length; i++) {
        if(searchMood == 'title') {
            if(proData[i].title.includes(value.toLowerCase())) {
                table += 
                    `
                        <tr>
                            <td>${i}</td>
                            <td>${proData[i].title}</td>
                            <td>${proData[i].price}</td>
                            <td>${proData[i].taxes}</td>
                            <td>${proData[i].adds}</td>
                            <td>${proData[i].discount}</td>
                            <td>${proData[i].total}</td>
                            <td>${proData[i].category}</td>
                            <td>
                                <button onclick="updatePro(${i})" class="btn">update</button>
                                <button onclick="deletePro(${i})" class="btn del">delete</button>
                            </td>
                        </tr>
                    `;
            }
        } else {
            if(proData[i].category.includes(value.toLowerCase())) {
                table += 
                    `
                        <tr>
                            <td>${i}</td>
                            <td>${proData[i].title}</td>
                            <td>${proData[i].price}</td>
                            <td>${proData[i].taxes}</td>
                            <td>${proData[i].adds}</td>
                            <td>${proData[i].discount}</td>
                            <td>${proData[i].total}</td>
                            <td>${proData[i].category}</td>
                            <td>
                                <button onclick="updatePro(${i})" class="btn">update</button>
                                <button onclick="deletePro(${i})" class="btn del">delete</button>
                            </td>
                        </tr>
                    `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}


