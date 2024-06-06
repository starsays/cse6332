const data = [
    { name: "apple", cost: "19", pic: "jpg/apple.jpg", descript: "apples are good" },
    { name: "berry", cost: "20", pic: "", descript: "berries are great" },
    { name: "carl", cost: "", pic: "jpg/carl.jpg", descript: "carl is also a cat" },
    { name: "dave", cost: "0", pic: "jpg/dave.jpg", descript: "who is Dave" },
    { name: "eve", cost: "95", pic: "", descript: "eve is a computer" },
    { name: "fig", cost: "42", pic: "", descript: "figs are cheap" },
    { name: "grape", cost: "", pic: "", descript: "grapes red or green" },
    { name: "helya", cost: "1000", pic: "jpg/helya.jpg", descript: "helya is very smart" },
    { name: "imtiaz", cost: "600", pic: "", descript: "" },
    { name: "sinong", cost: "999", pic: "jpg/sinong.jpg", descript: "sinong is also very smart" }
];

function lookupName() {
    const name = document.getElementById("name").value;
    const result = data.filter(person => person.name === name);
    displayResult(result);
}

function lookupTeln() {
    const teln = document.getElementById("teln").value;
    const result = data.filter(person => person.teln === teln);
    displayResult(result);
}

function lookupCostRange() {
    const startCost = document.getElementById("startCost").value;
    const endCost = document.getElementById("endCost").value;
    
    if (startCost === "" || endCost === "") {
        document.getElementById("result").innerText = "Please enter both start and end Cost.";
        return;
    }

    const result = data.filter(person => {
        return person.cost >= startCost && person.cost <= endCost;
    });

    displayResult(result);
}

function updateDescription() {
    const name = document.getElementById("nameUpdate").value;
    const newDescript = document.getElementById("newDescript").value;
    const person = data.find(person => person.name === name);
    if (person) {
        person.descript = newDescript;
        displayResult([person]);
    } else {
        document.getElementById("result").innerText = "No person found with the given name.";
    }
}

function deleteUser() {
    const name = document.getElementById("nameDelete").value;
    const index = data.findIndex(person => person.name === name);
    if (index !== -1) {
        data.splice(index, 1);
        document.getElementById("result").innerText = `${name} has been deleted.`;
    } else {
        document.getElementById("result").innerText = "No person found with the given name.";
    }
}

function addUser() {
    const newName = document.getElementById("newName").value;
    const newCost = document.getElementById("newCost").value;
    const newPic = document.getElementById("newPic").value;
    const newDescription = document.getElementById("newDescription").value;

    if (newName && newCost && newDescription) {
        const newUser = {
            name: newName,
            cost: newCost,
            pic: newPic,
            descript: newDescription
        };
        data.push(newUser);
        displayResult([newUser]);
    } else {
        document.getElementById("result").innerText = "Please fill in all fields to add a new user.";
    }
}

function displayResult(result) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    if (result.length === 0) {
        resultDiv.innerText = "No matching information found.";
    } else {
        result.forEach(person => {
            const personDiv = document.createElement("div");
            personDiv.classList.add("person");
            personDiv.innerHTML = `
                <h2>${person.name}</h2>
                <p>Name: ${person.name}</p>
                <p>Cost: ${person.cost}</p>
                <p>Description: ${person.descript}</p>
                ${person.pic ? `<img src="${person.pic}" alt="${person.name}'s picture">` : ""}
            `;
            resultDiv.appendChild(personDiv);
        });
    }
}