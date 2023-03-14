let myLeads = [];

// myLeads = JSON.stringify(myLeads);
// myLeads=JSON.parse(myLeads)
//  Code above is to convert array to string
//  When u use JSON method you have to store it in some variable!!!

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let tabBtn = document.getElementById("save-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    let url = tabs[0].url;
  });
});

function render(leads) {
  let listItem = "";
  for (let i = 0; i < leads.length; i++) {
    listItem += `
        <li>
            <a 
            target='_blank' href='${leads[i]}'> 
            ${leads[i]} 
            </a>
        </li>
        `;
  }
  ulEl.innerHTML = listItem;
}

deleteBtn.addEventListener("dblclick", function () {
  // Asagidaki funksiyani cagirmaq evezinemen ulEl.innerHTML='' isletmisdim
  // ola bilerki dogru ya da yanlis idi.
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
