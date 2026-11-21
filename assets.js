const KEY = "cybernexAssets";
const form = document.getElementById("assetForm");
const table = document.getElementById("assetTable");

function getAssets() {
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

function displayAssets() {
    const data = getAssets();

    document.getElementById("total").textContent = data.length;
    document.getElementById("affected").textContent =
        data.filter(x => x.status === "Affected").length;
    document.getElementById("monitoring").textContent =
        data.filter(x => x.status === "Monitoring").length;
    document.getElementById("recovered").textContent =
        data.filter(x => x.status === "Recovered").length;

    table.innerHTML = data.length ? data.map(x => `
        <tr>
            <td>${safe(x.id)}</td>
            <td>${safe(x.name)}</td>
            <td>${safe(x.type)}</td>
            <td>${safe(x.incident)}</td>
            <td><span class="badge">${safe(x.status)}</span></td>
            <td><button onclick="deleteAsset('${safe(x.id)}')">Delete</button></td>
        </tr>
    `).join("") : '<tr><td colspan="6">No assets registered.</td></tr>';
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const data = getAssets();
    const id = document.getElementById("assetId").value.trim();

    if (data.some(x => x.id === id)) {
        alert("This Asset ID already exists.");
        return;
    }

    data.push({
        id,
        name: document.getElementById("assetName").value,
        type: document.getElementById("assetType").value,
        incident: document.getElementById("incidentId").value,
        status: document.getElementById("assetStatus").value
    });

    localStorage.setItem(KEY, JSON.stringify(data));
    form.reset();
    displayAssets();
});

function deleteAsset(id) {
    if (!confirm("Delete this asset record?")) return;

    localStorage.setItem(KEY, JSON.stringify(
        getAssets().filter(x => x.id !== id)
    ));

    displayAssets();
}

displayAssets();