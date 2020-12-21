let productPage = false;

window.addEventListener('DOMContentLoaded', getData);

const datalink = "http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine?per_page=100&_embed";

function getData() {
    //getFilters();
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_product_id = urlParams.get("product_id");
    const the_cat_id = urlParams.get("cat_id"); //getting the id from the URL
    //console.log(the_product_id);
    console.log("cat: " + the_cat_id);

    //The getFilters function only runs if we're not in the product page
    if (!the_product_id) {
        getFilters();
    }

    //Routing in the script - This will only run in the product page - It adds the id of the products dinamically in the url
    if (the_product_id) {
        productPage = true;
        fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine/" + the_product_id + "?per_page=100&_embed")
            .then(res => res.json())
            .then(showProduct) //skipping the forEach loop

    //Routing in the script - This will only run in the wineshop page - It adds the id of the categories dinamically in the url
    } else if (the_cat_id) {
        fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine?categories=" + the_cat_id + "&per_page=100&_embed")
            .then(res => res.json())
            .then(handleData)
    } else if (!the_product_id && window.location.pathname == "/product.html") {
        window.location.replace("wineshop.html");
    } else {
        fetch(datalink)
            .then(res => res.json())
            .then(handleData)
    }
    //hideProductInfoTabs();
}


/* FETCHING THE FILTERS AND DISPLAYING THEM */

function getFilters() {
    fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/categories?parent=6")
        .then(res => res.json())
        .then(handleCategoryData)
}

function handleCategoryData(categories) {
    //console.log("in handleCategory", categories)
    categories.forEach(addCatLink);
}

function addCatLink(oneCategory) {
    const templateCat = document.querySelector("template#categories_template").content;
    const cloneCat = templateCat.cloneNode(true);
    console.log(oneCategory);
    const a = document.createElement('a');
    a.textContent = oneCategory.name;
    a.href = "wineshopcategory.html?cat_id=" + oneCategory.id;
    console.log(a);
    const li = cloneCat.querySelector('.filterli');
    li.appendChild(a);
    document.querySelector('.filterwrapper').appendChild(li);
}


/* FETCHING THE PRODUCTS AND DISPLAYING THEM */

function handleData(posts) {
    console.log(posts)
    posts.forEach(showProduct)
}

function showProduct(product) {
    //console.log(product)
    const template = document.querySelector("template#product_template").content;
    const clone = template.cloneNode(true);

    /* GETTING DATA FOR WINESHOP PAGE */
    clone.querySelector(".product_title").textContent = product.title.rendered;
    clone.querySelector(".product_winery").textContent = product.winery;
    clone.querySelector(".product_shortdescription").innerHTML = product.excerpt.rendered;
    clone.querySelector(".product_price").textContent = parseInt(product.price) + " DKK";
    //alert(product.price);
    clone.querySelector(".product_image").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    /* GETTING DATA FOR PRODUCT PAGE */
    //Only shows the data if we're on the product page
    if (productPage) {
        clone.querySelector(".product_background").src = product.winebackground.guid;
        clone.querySelector(".volume").textContent = product.volume;
        clone.querySelector(".alcohol").textContent = product.alcohol_percentage;
        clone.querySelector(".tasteprofile_img").src = product.taste_profile.guid;

        clone.querySelector(".winery_logo").src = product.winery_logo.guid;
        clone.querySelector(".winery_name").textContent = product.winery;
        clone.querySelector(".winery_description").textContent = product.winery_description;
        const divProductLongDescription = clone.querySelector('.product_longdescription');
        if (divProductLongDescription) {
            divProductLongDescription.innerHTML = product.content.rendered;
        }
    }

    //Takes the existing value from the ahref attribute and adds the product.id from JSON to it
    const a = clone.querySelector('a');
    if (a) {
        a.href += product.id;
    }

    document.querySelector("main").appendChild(clone);

    //Only calls the function hideProductInfoTabs if we're on the product page
    if (productPage) {
        hideProductInfoTabs();
    }

}


/* FUNCTIONS TO SHOW WINEINFO TABS ON PRODUCT PAGE */

//1 show the wine info--description and profile are hidden
//2 click in description
//3 hide the wine info and taste profile and show the description
//4 click in the taste profile
//5 hide the description and the wine info and show the taste profile
//6 click in the wine info
//7 hide the taste profile and the description and show the wine info

//1
function hideProductInfoTabs() {
    console.log("hideProductInfoTabs");
    document.querySelector(".description_info").classList.add("hide");
    document.querySelector(".tasteprofile_info").classList.add("hide");
    productDescriptionClicked();
    productProfileClicked();
    productWineInfoClicked();
}

//2
function productDescriptionClicked() {
    console.log("productDescriptionClicked");
    document.querySelector(".description").addEventListener("click", showProductDescription);
}

//3
function showProductDescription() {
    console.log("showProductDescription");
    document.querySelector(".thewine_info_wrapper").classList.add("hide");
    document.querySelector(".tasteprofile_info").classList.add("hide");
    document.querySelector(".description_info").classList.remove("hide");
}

//4
function productProfileClicked() {
    console.log("productProfileClicked");
    document.querySelector(".tasteprofile").addEventListener("click", showProductProfile);
}

//5
function showProductProfile() {
    console.log("showProductProfile");
    document.querySelector(".description_info").classList.add("hide");
    document.querySelector(".thewine_info_wrapper").classList.add("hide");
    document.querySelector(".tasteprofile_info").classList.remove("hide");
}

//6
function productWineInfoClicked() {
    console.log("productWineInfoClicked");
    document.querySelector(".thewine").addEventListener("click", showProductWineInfo);
}

//7
function showProductWineInfo() {
    console.log("showProductWineInfo");
    document.querySelector(".description_info").classList.add("hide");
    document.querySelector(".tasteprofile_info").classList.add("hide");
    document.querySelector(".thewine_info_wrapper").classList.remove("hide");
}
