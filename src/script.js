const data = [
    { name: "ann", room: "19", pic: "", teln: "817001", descript: "ann is a manager" },
    { name: "bob", room: "24", pic: "", teln: "", descript: "bob is a cat" },
    { name: "cat", room: "", pic: "jpg/cat.jpg", teln: "817005", descript: "cat is also a cat" },
    { name: "dan", room: "108", pic: "jpg/dan.jpg", teln: "816005", descript: "" },
    { name: "eve", room: "95", pic: "", teln: "0", descript: "eve is a computer" },
    { name: "finn", room: "42", pic: "jpg/finn.jpg", teln: "", descript: "finn is no one important" },
    { name: "gary", room: "", pic: "", teln: "888001", descript: "gary can fly" },
    { name: "hank", room: "80", pic: "", teln: "901901", descript: "hank can not fly" },
    { name: "ima", room: "60", pic: "jpg/ima.jpg", teln: "202020", descript: "" },
    { name: "jan", room: "61", pic: "", teln: "", descript: "president jan is amazing" },
    { name: "ken", room: "", pic: "", teln: "817005", descript: "" },
    { name: "lem", room: "5", pic: "jpg/lem.jpg", teln: "818000", descript: "no way lem can fly" }
];

function lookupRoom() {
    const room = document.getElementById("room").value;
    const result = data.filter(person => person.room === room);
    displayResult(result);
}

function lookupTeln() {
    const teln = document.getElementById("teln").value;
    const result = data.filter(person => person.teln === teln);
    displayResult(result);
}

function lookupTelnRange() {
    const startTeln = document.getElementById("startTeln").value;
    const endTeln = document.getElementById("endTeln").value;
    
    if (startTeln === "" || endTeln === "") {
        document.getElementById("result").innerText = "Please enter both start and end telephone numbers.";
        return;
    }

    const result = data.filter(person => {
        return person.teln >= startTeln && person.teln <= endTeln;
    });

    displayResult(result);
}

function updateDescription() {
    const teln = document.getElementById("telnUpdate").value;
    const newDescript = document.getElementById("newDescript").value;
    const person = data.find(person => person.teln === teln);
    if (person) {
        person.descript = newDescript;
        displayResult([person]);
    } else {
        document.getElementById("result").innerText = "No person found with the given telephone number.";
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
                <p>Room: ${person.room}</p>
                <p>Telephone: ${person.teln}</p>
                <p>Description: ${person.descript}</p>
                ${person.pic ? `<img src="${person.pic}" alt="${person.name}'s picture">` : ""}
            `;
            resultDiv.appendChild(personDiv);
        });
    }
}