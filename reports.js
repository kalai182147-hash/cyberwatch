const incidents = JSON.parse(
    localStorage.getItem("cybernexIncidents") || "[]"
);

const timeline = JSON.parse(
    localStorage.getItem("cybernexTimeline") || "[]"
);

const evidence = JSON.parse(
    localStorage.getItem("cybernexEvidence") || "[]"
);

const assets = JSON.parse(
    localStorage.getItem("cybernexAssets") || "[]"
);

const responses = JSON.parse(
    localStorage.getItem("cybernexResponses") || "[]"
);

document.getElementById("incidentCount").textContent = incidents.length;
document.getElementById("timelineCount").textContent = timeline.length;
document.getElementById("evidenceCount").textContent = evidence.length;
document.getElementById("assetCount").textContent = assets.length;

const incidentSummary = document.getElementById("incidentSummary");

if (incidents.length === 0) {
    incidentSummary.textContent = "No incident records available.";
} else {
    incidents.forEach(item => {
        const p = document.createElement("p");
        p.textContent =
            (item.title || item.name || "Incident") +
            " — Severity: " + (item.severity || "Not specified") +
            " — Status: " + (item.status || "Not specified");
        incidentSummary.appendChild(p);
    });
}

const recoverySummary = document.getElementById("recoverySummary");

if (responses.length === 0) {
    recoverySummary.textContent = "No response records available.";
} else {
    responses.forEach(item => {
        const p = document.createElement("p");
        p.textContent =
            item.incident + " — " +
            item.action + " — " +
            item.status;
        recoverySummary.appendChild(p);
    });
}