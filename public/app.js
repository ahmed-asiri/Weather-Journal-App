
const apiKey = "&appid=2baff2098880935b707c44faba28e10b";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

const post = "/addData";
const get = "/allData";

// the Generate Button
const generateButton = document.querySelector("#generate");
//adding the Event listener
generateButton.addEventListener("click", action);


function action() {
    // The Call back function that will be fired when the generate button clicked.
    let zip = document.querySelector("#zip").value; // getting the value from the zip user input
    getDataFromExternalAPI(baseURL, zip, apiKey) // excecute the async function
        .then((tempData) => { // after getting the data from the external API, call the postData() function
            let feelingsValue = document.querySelector("#feelings").value;
            let date = new Date();
            // now simply add the data to our server projectData
            postData(post, {
                temp: tempData,
                date: `${date.getDate()} ${date.getMonth()}, ${date.getFullYear()}`,
                userInput: feelingsValue
            });
        })
        .then(() => { // after posting the data to our server, we now get all the data, and change the UI.
            updateUI();
        })
        .catch(() => {
            console.log(`response failes`);
        });
}

async function getDataFromExternalAPI(baseURL, zip, apiKey){
    // retrieving data from the external API according to the user zip input
    let url = baseURL + zip + apiKey;
    let response = await fetch(url);
    if(response.ok){
        let data = await response.json();
        return data.main.temp;
    }
    return Promise.reject(response);
}



async function postData(path = "/", data = {}) {
    // sending the data, to the server, to save it in the projectData object
    
    await fetch(path, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

}


async function updateUI() {
    // getting the data from the server, and then change the UI according to the last object in the array recieved

    const response = await fetch(get);
    let allData = await response.json();
    let data = allData[allData.length - 1];
    console.log(allData);
    document.querySelector("#date").innerHTML = data.date;
    document.querySelector("#temp").innerHTML = data.temp;
    document.querySelector("#content").innerHTML = data.userInput;
}

