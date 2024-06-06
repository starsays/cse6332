// Function to fetch and parse CSV data
async function fetchCSVData() {
    try {
        const response = await fetch('q1x.csv'); // 确保路径正确
        const data = await response.text();
        return csvToJSON(data);
    } catch (error) {
        console.error("Error fetching the CSV file:", error);
        return [];
    }
}

// Function to convert CSV data to JSON
function csvToJSON(csv) {
    const lines = csv.split("\n").filter(line => line.trim() !== '');
    const headers = lines[0].split(",");
    const result = lines.slice(1).map(line => {
        const obj = {};
        const currentline = line.split(",");
        headers.forEach((header, index) => {
            obj[header] = currentline[index];
        });
        return obj;
    });
    return result;
}

// Function to convert JSON data to CSV
function jsonToCSV(json) {
    const headers = Object.keys(json[0]).join(",");
    const rows = json.map(row => Object.values(row).join(",")).join("\n");
    return `${headers}\n${rows}`;
}

// Fetch and log CSV data to ensure it's loaded correctly
let data = [];
fetchCSVData().then(csvData => {
    data = csvData;
    console.log("Data loaded:", data); // Debug log to ensure data is loaded
});

// Function to lookup by name
function lookupName() {
    const name = document.getElementById("name").value;
    const result = data.filter(person => person.name === name);
    displayResult(result);
}

// Function to lookup by cost range
function lookupCostRange() {
    const startCost = document.getElementById("startCost").value;
    const endCost = document.getElementById("endCost").value;
    
    if (startCost === "" || endCost === "") {
        document.getElementById("result").innerText = "Please enter both start and end Cost.";
        return;
    }

    const result = data.filter(person => {
        const cost = parseFloat(person.cost);
        return cost >= parseFloat(startCost) && cost <= parseFloat(endCost);
    });

    displayResult(result);
}

// Function to update description
function updateDescription() {
    const name = document.getElementById("nameUpdate").value;
    const newDescript = document.getElementById("newDescript").value;
    const person = data.find(person => person.name === name);
    if (person) {
        person.descript = newDescript;
        displayResult([person]);
        saveData();
    } else {
        document.getElementById("result").innerText = "No person found with the given name.";
    }
}

// Function to delete a user
function deleteUser() {
    const name = document.getElementById("nameDelete").value;
    const index = data.findIndex(person => person.name === name);
    if (index !== -1) {
        data.splice(index, 1);
        document.getElementById("result").innerText = `${name} has been deleted.`;
        saveData();
    } else {
        document.getElementById("result").innerText = "No person found with the given name.";
    }
}

// Function to add a new user
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
        saveData();
    } else {
        document.getElementById("result").innerText = "Please fill in all fields to add a new user.";
    }
}

// Function to display the result
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
                <p>Cost: ${person.cost}</p>
                <p>Description: ${person.descript}</p>
                ${person.pic ? `<img src="${person.pic}" alt="${person.name}'s picture">` : ""}
            `;
            resultDiv.appendChild(personDiv);
        });
    }
}

// Function to save data to CSV
function saveData() {
    const csv = jsonToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'q1x.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}