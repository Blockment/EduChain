let items = [];

function getItemById(id) {
    let item = null;
    Array.prototype.forEach.call(items, eachItem => {
        if (eachItem.id + "" === id) item = eachItem;
    });
    return item;
}

function renderFirstIcon(item) {
    let center = document.createElement("center");
    let shareI = document.createElement("i");
    shareI.setAttribute("class", "fa fa-download");
    shareI.setAttribute("aria-hidden", "true");
    shareI.style.textAlign = "center";
    center.style.textAlign = "center";
    center.appendChild(shareI);
    return center;
}

function renderSecondIcon(item) {
    let center = document.createElement("center");
    let shareI = document.createElement("i");
    shareI.setAttribute("class", "fa fa-plus");
    shareI.setAttribute("aria-hidden", "true");
    shareI.style.textAlign = "center";
    center.style.textAlign = "center";
    center.appendChild(shareI);
    return center;
}

function renderFirstButton(item) {
    let button = document.createElement("button");
    button.setAttribute("class", "first-button-on-cell");
    button.style.height = "4rem";
    button.style.width = "4rem";
    button.appendChild(renderFirstIcon(item));
    button.onclick = () => { window.location = item.file_address; };
    return button;
}

async function addGradeForAssignment(item) {
    let grade = parseInt(prompt("لطفا نمره‌ای که به این تمرین می‌دهید را وارد کنید. حداکثر نمره‌ی ممکن برای این تمرین، "
        + item.max_score + " است."));
    if (grade == null) {
        alert("لطفا یک عدد معتبر وارد نمایید");
        return;
    }
    if (grade < 0 || grade > item.max_score) {
        alert("لطفا عدد را از ۰ تا حداکثر نمره که " + item.max_score + " است، وارد نمایید");
        return;
    }
    let response = await fetch('https://ROOT/dassess/assessment/create/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({assignment_id: item.id, score: grade})
    });
    if (response.ok) {
        alert("نمره با موفقیت ثبت شد");
    } else {
        alert("در ثبت نمره، خطایی رخ داد؛ لطفا مجددا تلاش نمایید");
    }
}

function renderSecondButton(item) {
    let button = document.createElement("button");
    button.setAttribute("class", "first-button-on-cell");
    button.style.height = "4rem";
    button.style.width = "4rem";
    button.appendChild(renderSecondIcon(item));
    button.onclick = () => {
        addGradeForAssignment(item);
    };
    return button;
}

function renderControls() {
    let span = document.createElement("span");
    span.setAttribute("class", "controls");
    return span;
}

function renderItemControls(item) {
    let span = renderControls();
    let button = renderFirstButton(item);
    let button2 = renderSecondButton(item);
    span.appendChild(button);
    span.appendChild(button2);
    return span;
}

function renderTopLink(span, item) {
    let link = document.createElement("a");
    link.setAttribute("class", "top-links");
    link.onclick = () => {};
    link.appendChild(span)
    return link;
}

function renderFirstText(item) {
    let span = document.createElement("span");
    span.setAttribute("class", "first-text");
    span.innerHTML = item.name;
    return span;
}

function renderSecondText(item) {
    let span = document.createElement("span");
    span.setAttribute("class", "second-text");
    span.innerHTML = item.description;
    return span;
}

function renderThirdText(item) {
    let span = document.createElement("span");
    span.setAttribute("class", "second-text");
    span.innerHTML = item.date;
    return span;
}

function renderItemCellHeader() {
    let span = document.createElement("span");
    span.setAttribute("class", "cell-header");
    return span;
}

function renderTopTextsSpan() {
    let span = document.createElement("span");
    span.setAttribute("class", "top-texts");
    return span;
}

function renderTopTexts(item) {
    let span = renderTopTextsSpan();
    span.appendChild(renderFirstText(item));
    span.appendChild(renderSecondText(item));
    span.appendChild(renderThirdText(item));
    return span;
}

function renderMainListItemSpan(item) {
    let span = renderItemCellHeader();
    let top = renderTopLink(renderTopTexts(item), item);
    span.appendChild(top);
    return span;
}

function renderListItem(item) {
    let li = document.createElement("li");
    li.setAttribute("class", "mdc-elevation--z1");
    let span = renderMainListItemSpan(item);
    li.appendChild(span);
    li.appendChild(renderItemControls(item));
    return li;
}

function renderItem(ul, item) {
    ul.appendChild(renderListItem(item));
}

function renderList(items, predicate = "") {
    let ul = document.getElementsByClassName("items-list")[0];
    ul.innerHTML = "";
    let selectedItems = items;
    if (predicate == null || predicate === "") {
        selectedItems
            .forEach((item) => renderItem(ul, item));
    } else {
        selectedItems
            .filter((item) => item.name.toLowerCase().includes(predicate.toLowerCase()) || item.description.toLowerCase().includes(predicate.toLowerCase()))
            .forEach((item) => renderItem(ul, item));
    }
}

async function loadAllItems() {
    let response = await fetch('http://ROOT/dassess/assignment/');
    if (response.ok) {
        items = await response.json();
        renderList(items, searchBox.value);
    } else {
        console.log("Error!");
    }
}

let searchBox = document.getElementById("search-input");
if (searchBox != null) searchBox.oninput = () => renderList(items, searchBox.value);

loadAllItems();
// renderList(items, searchBox.value);