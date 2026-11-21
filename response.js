const form = document.getElementById("responseForm");
const responseList = document.getElementById("responseList");

let responses = JSON.parse(
    localStorage.getItem("cybernexResponses") || "[]"
);

function saveResponses() {
    localStorage.setItem(
        "cybernexResponses",
        JSON.stringify(responses)
    );
}

function displayResponses() {
    responseList.innerHTML = "";

    if (responses.length === 0) {
        responseList.textContent = "No response records added yet.";
        return;
    }

    responses.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "module";

        const title = document.createElement("h3");
        title.textContent = item.incident;

        const details = document.createElement("p");
        details.textContent =
            "Action: " + item.action +
            " | Team: " + item.team +
            " | Status: " + item.status;

        const notes = document.createElement("p");
        notes.textContent = "Notes: " + (item.notes || "None");

        const date = document.createElement("p");
        date.textContent = "Recorded: " + item.date;

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.type = "button";
        remove.addEventListener("click", () => {
            responses.splice(index, 1);
            saveResponses();
            displayResponses();
        });

        card.append(title, details, notes, date, remove);
        responseList.appendChild(card);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    responses.push({
        incident: document.getElementById("incidentName").value,
        action: document.getElementById("action").value,
        team: document.getElementById("team").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value,
        date: new Date().toLocaleString()
    });

    saveResponses();
    displayResponses();
    form.reset();

    alert("Response action saved successfully!");
});

displayResponses();