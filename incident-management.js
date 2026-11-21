const KEY = "cybernexIncidents";
const form = document.getElementById("incidentForm");
const records = document.getElementById("records");
const search = document.getElementById("search");

function getData() {
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

function display() {
    const data = getData();
    const term = search.value.toLowerCase();

    document.getElementById("total").textContent = data.length;
    document.getElementById("critical").textContent =
        data.filter(x => x.severity === "Critical").length;
    document.getElementById("open").textContent =
        data.filter(x => x.status === "Open").length;
    document.getElementById("resolved").textContent =
        data.filter(x => x.status === "Resolved").length;

    const filtered = data.filter(x =>
        [x.name,x.country,x.organization,x.type]
        .some(v => v.toLowerCase().includes(term))
    );

    records.innerHTML = filtered.length ? filtered.map(x => `
        <tr>
            <td>${safe(x.id)}</td>
            <td>${safe(x.name)}</td>
            <td>${safe(x.country)}</td>
            <td>${safe(x.type)}</td>
            <td>${safe(x.severity)}</td>
            <td>${safe(x.status)}</td>
            <td>${safe(x.date)}</td>
            <td><button onclick="removeIncident('${safe(x.id)}')">Delete</button></td>
        </tr>
    `).join("") : '<tr><td colspan="8">No incident records found.</td></tr>';
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const data = getData();
    data.push({
        id: "INC" + Date.now(),
        name: document.getElementById("name").value,
        country: document.getElementById("country").value,
        organization: document.getElementById("organization").value,
        type: document.getElementById("type").value,
        severity: document.getElementById("severity").value,
        status: document.getElementById("status").value,
        date: document.getElementById("date").value
    });

    localStorage.setItem(KEY, JSON.stringify(data));
    form.reset();
    display();
});

function removeIncident(id) {
    if (!confirm("Delete this incident record?")) return;
    localStorage.setItem(KEY, JSON.stringify(
        getData().filter(x => x.id !== id)
    ));
    display();
}

search.addEventListener("input", display);
display();