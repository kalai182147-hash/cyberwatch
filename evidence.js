const KEY = "cybernexEvidence";
const form = document.getElementById("evidenceForm");
const table = document.getElementById("evidenceTable");

function getEvidence() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

function safe(value) {
    return String(value).replace(/[&<>"']/g, c => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",
        '"':"&quot;","'":"&#39;"
    }[c]));
}

function displayEvidence() {
    const data = getEvidence();

    table.innerHTML = data.length ? data.map(item => `
        <tr>
            <td>${safe(item.id)}</td>
            <td>${safe(item.incident)}</td>
            <td>${safe(item.type)}</td>
            <td>${safe(item.collector)}</td>
            <td>${safe(item.date)}</td>
            <td><span class="badge">${safe(item.status)}</span></td>
            <td><button onclick="deleteEvidence('${safe(item.id)}')">Delete</button></td>
        </tr>
    `).join("") : '<tr><td colspan="7">No evidence records added.</td></tr>';
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const data = getEvidence();
    const id = document.getElementById("evidenceId").value.trim();

    if (data.some(item => item.id === id)) {
        alert("This Evidence ID already exists.");
        return;
    }

    data.push({
        id,
        incident: document.getElementById("incidentId").value,
        type: document.getElementById("evidenceType").value,
        collector: document.getElementById("collector").value,
        date: document.getElementById("date").value,
        status: document.getElementById("verification").value
    });

    localStorage.setItem(KEY, JSON.stringify(data));
    form.reset();
    displayEvidence();
});

function deleteEvidence(id) {
    if (!confirm("Delete this evidence record?")) return;

    localStorage.setItem(KEY, JSON.stringify(
        getEvidence().filter(item => item.id !== id)
    ));

    displayEvidence();
}

displayEvidence();