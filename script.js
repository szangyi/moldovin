window.addEventListener('DOMContentLoaded', getData);

const datalink = "http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine?per_page=100&_embed";

function getData() {
    //getNav()
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_product_id = urlParams.get("product_id"); //getting the id from the URL
    console.log(the_product_id);

    //routing in the script
    if (the_product_id) {
        fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine/" + the_product_id + "?per_page=100&_embed")
            .then(res => res.json())
            .then(showProduct) //skipping the forEach loop
    } else if (!the_product_id && window.location.pathname == "/product.html") {
        window.location.replace("wineshop.html");
    } else {
        fetch(datalink)
            .then(res => res.json())
            .then(handleData)
    }

}
function handleData(posts) {
    console.log(posts)
    posts.forEach(showProduct)
}

function showProduct(product) {
    //console.log(product)
    const template = document.querySelector("template#product_template").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".product_title").textContent = product.title.rendered;
    clone.querySelector(".product_winery").textContent = product.winery;
    clone.querySelector(".product_shortdescription").textContent = product.excerpt.rendered;
    clone.querySelector(".product_price").textContent = product.price + " DKK";

    clone.querySelector(".product_image").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    //clone.querySelector(".winery_name").textContent = product.winery;
    //clone.querySelector(".winery_description").textContent = product.winery_description;

    const a = clone.querySelector('a');
    if (a) {
        a.href += product.id;
    }

    document.querySelector("main").appendChild(clone);
}




    /*const divProductShortDescription = copy.querySelector('.product_shortdescription');
    if (divProductShortDescription) {
        divProductShortDescription.innerHTML = product.excerpt.rendered;
    }*/

    /*const divProductLongDescription = copy.querySelector('.product_longdescription');
    if (divProductLongDescription) {
        divProductLongDescription.innerHTML = product.content.rendered;
    }*/




//const a = copy.querySelector('a');
//if (a) {
//    a.href += change.id;
//}









/*clone.querySelector(".productlist_price").textContent = "$" + post.price;*/
/*clone.querySelector(".productlist_image").src = wine._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;*/
//clone.querySelector(".productlist_image").src = product._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

/*copy.querySelector(".content").innerHTML = post.content.rendered;*/


//window.addEventListener('DOMContentLoaded', getData);
//
//const datalink = "http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine?_embed";
//
//function getData() {
//    getNav()
//    const urlParams = new URLSearchParams(window.location.search);
//    console.log("URLSearchParams " + window.location);
//    const the_wine_id = urlParams.get("wine_id"); //getting the id from the URL
//    console.log(the_wine_id);
//
//    //routing in the script
//    if (wine_id) {
//        fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine/" + the_wine_id + "?_embed")
//            .then(res => res.json())
//            .then(showChange) //skipping the forEach loop
//    } else if (!the_wine_id && window.location.pathname == "/product.html") {
//        window.location.replace("index.html");
//    } else {
//        fetch(datalink)
//            .then(res => res.json())
//            .then(handleData)
//    }
//}
//
////-----------------------------
//
//
//function getNav() {
//    fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/categories")
//        .then(res => res.json())
//        .then(data => handleCategoryNavData(data))
//
//}
//
//function handleCategoryNavData(categories) {
//    console.log("in handleCategory", categories)
//    categories.forEach(addNavLink);
//}
//
//function addNavLink(oneCategory) {
//    //create another js just for categories and fetch from the link below
//
//    console.log("cat", oneCategory);
//    fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/categories/" + oneCategory.id)
//        .then(res => res.json())
//        .then((data) =>
//            let categoryData = data)
//    console.log(oneCategory);
//
//    const template = document.querySelector("#filterTemplate").content;
//    const copy = template.cloneNode(true);
//    console.log(copy)
//    copy.querySelector('a').textContent = oneCategory.name;
//    copy.querySelector('a').href = "category.html?cat_id=" + oneCategory.id;
//    document.querySelector("#filtercontainer").appendChild(copy)
//}



//http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine?_embed"

/*
window.addEventListener('DOMContentLoaded', getData);

const datalink = "http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine?_embed";

function getData() {
//    getNav()
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_wine_id = urlParams.get("wine_id"); //getting the id from the URL
    console.log(the_wine_id);

    //routing in the script
    if (the_wine_id) {
        fetch("http://a-day.dk/semester-2-exam/wp-json/wp/v2/wine/" + the_wine_id + "?_embed")
            .then(res => res.json())
            .then(showWine) //skipping the forEach loop
    } else if (!the_wine_id && window.location.pathname == "/product.html") {
        window.location.replace("index.html");
    } else {
        fetch(datalink)
            .then(res => res.json())
            .then(handleData)
    }
}


function handleData(data) {
    //console.log(data);
    data.forEach(showWine);
}


function showWine(wine) {
//    console.log(wine)
    console.log(wine.short_description)
    const template = document.querySelector("#product_template").content;
    const copy = template.cloneNode(true);
    console.log(wine._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url)

    copy.querySelector(".productlist_title").textContent = wine.title.rendered;
    copy.querySelector(".productlist_winery").textContent = wine.title.rendered;
    copy.querySelector(".shortdescription").textContent = wine.short_description;
    copy.querySelector(".product_image").src = wine._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    const a = copy.querySelector('a');
    if (a) {
        a.href += wine.id;
    }


    const divChangeLongDescription = copy.querySelector('.longdescription');
    if (divChangeLongDescription) {
        divChangeLongDescription.innerHTML = wine.content.rendered;
    }

    document.querySelector("main").appendChild(copy);
}
*/
