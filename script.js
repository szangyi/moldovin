window.addEventListener('DOMContentLoaded', getData);

const datalink = "http://efcreations.es/t9w1/wp-json/wp/v2/change?_embed";

function getData() {
//    getNav()
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URLSearchParams " + window.location);
    const the_change_id = urlParams.get("change_id"); //getting the id from the URL
    console.log(the_change_id);

    //routing in the script
    if (the_change_id) {
        fetch("http://efcreations.es/t9w1/wp-json/wp/v2/change/" + the_change_id + "?_embed")
            .then(res => res.json())
            .then(showChange) //skipping the forEach loop
    } else if (!the_change_id && window.location.pathname == "/singlechange.html") {
        window.location.replace("index.html");
    } else {
        fetch(datalink)
            .then(res => res.json())
            .then(handleData)
    }
}

//function getNav() {
//    fetch("http://efcreations.es/t9w1/wp-json/wp/v2/categories?parent=18&orderby=count&order=desc")
//        .then(res => res.json())
//        .then(data => handleCategoryNavData(data))
//
//}
//
//function handleCategoryNavData(categories) {
//    console.log("in handleCategory", categories)
//    categories.forEach(addNavLink);
//}

//function addNavLink(oneCategory) {
//    /*console.log("cat", oneCategory);
//    fetch("http://efcreations.es/t9w1/wp-json/wp/v2/categories/"+oneCategory.id)
//        .then(res => res.json())
//        .then((data)=>let categoryData=data)*/
//    //console.log(oneCategory);
//
//    const template = document.querySelector("#filterTemplate").content;
//    const copy = template.cloneNode(true);
//    console.log(copy)
//    copy.querySelector('a').textContent = oneCategory.name;
//    copy.querySelector('a').href = "category.html?cat_id=" + oneCategory.id;
//    document.querySelector("#filtercontainer").appendChild(copy);
//}


/*
const template = document.querySelector("#filterTemplate").content;
const copy = template.cloneNode(true);

const li = document.createElement('li');
const a = document.createElement('a');
copy.querySelector('a').textContent = oneCategory.name;
console.log(oneCategory.name)
copy.a.href = "category.html?cat_id=" + oneCategory.id;
console.log(a);
li.appendChild(a);
console.log(document.querySelector('section'))
//document.querySelector(".filterul").appendChild(li);
template.appendChild(li);
*/


//http://lasseclaes.com/20f/2nd_sem_int/wp/wp-json/wp/v2/bikes/?categories=7&_embed


function handleData(data) {
    //console.log(data);
    data.forEach(showChange);
}


function showChange(change) {
//    console.log(change)
    console.log(change.short_description)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    console.log(change._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url)

    copy.querySelector(".title").textContent = change.title.rendered;
    copy.querySelector(".title2").textContent = change.title.rendered;
    copy.querySelector(".shortdescription").textContent = change.short_description;
    copy.querySelector(".product_image").src = change._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

    const a = copy.querySelector('a');
    if (a) {
        a.href += change.id;
    }


    const divChangeLongDescription = copy.querySelector('.longdescription');
    if (divChangeLongDescription) {
        divChangeLongDescription.innerHTML = change.content.rendered;
    }

    document.querySelector("main").appendChild(copy);
}
