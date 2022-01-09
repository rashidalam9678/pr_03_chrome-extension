let inputBtn = document.querySelector("#input-btn");
let myLeads = [];
let deleteBtn = document.getElementById("delete-btn")
let saveTabBtn = document.getElementById("savetab-btn")
let inputEl = document.getElementById("input-el");
let unEl = document.getElementById("ul-el");





// myLeads=JSON.stringify(myLeads);;
// console.log(typeof myLeads);;
// myLeads=JSON.parse(myLeads);;
// console.log(typeof myLeads);;

//  best way for inter conversion btw string and array beacuse local storeage can only read the string
// parsin leads which i have saved below in input btn
let leadsfromlocalStorage = JSON.parse(localStorage.getItem("MraLeads"))
//let savedTabsFromLocalStorage=JSON.parse(localStorage.getItem("savedTabs"))


// best use of falsy and truthy >>> we can not put it before unEl

if (leadsfromlocalStorage) {
    myLeads = leadsfromlocalStorage
    render(myLeads)
}

//  console.log(leadsfromlocalStorage)
// best use of truthy and falsy values

// if (leadsfromlocalStorage){
//      myLeads=leadsfromlocalStorage
//     renderleads()
//  }
saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("MraLeads", JSON.stringify(myLeads))

        render(myLeads);
    })

})




inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";// we have to set a blank string to make that work

    localStorage.setItem("MraLeads", JSON.stringify(myLeads))
    // localStorage.getItem("myLeads",JSON.parse(myLeads))


    render(myLeads);
})
// for(let i=0; i<myLeads.length; i++){
//     unEl.innerHTML+= "<li>" + "<a>" + myLeads[i] + "</a>" + "</li>"
// }

// more efficient method becauae their dom manuplation is sdone only once

//dynamic function using parameter and leads

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // listItems+= "<li> <a target='_blank' href='" + myLeads[i] + "'>"+ myLeads[i] + " </a></li>";
        // here is more efficient way known as template string
        listItems += `<li> 
                        <a target='_blank' href='${leads[i]}'>
                            ${leads[i]}
                        </a>
                    </li>`
    }
    unEl.innerHTML = listItems;
}



deleteBtn.addEventListener("click", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})





