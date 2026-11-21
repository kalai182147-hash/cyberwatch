const fields = ["workspace", "admin", "organization"];

function loadSettings() {
    const saved = JSON.parse(
        localStorage.getItem("cybernexSettings") || "{}"
    );

    fields.forEach(id => {
        document.getElementById(id).value = saved[id] || "";
    });

    const notificationSetting =
        localStorage.getItem("cybernexNotifications");

    document.getElementById("notifications").checked =
        notificationSetting === "true";
}

document.getElementById("saveSettings").addEventListener("click", () => {
    const settings = {};

    fields.forEach(id => {
        settings[id] = document.getElementById(id).value.trim();
    });

    localStorage.setItem("cybernexSettings", JSON.stringify(settings));

    document.getElementById("message").textContent =
        "Settings saved successfully!";
});

document.getElementById("saveNotifications").addEventListener("click", () => {
    const enabled = document.getElementById("notifications").checked;

    localStorage.setItem("cybernexNotifications", enabled);

    document.getElementById("message").textContent =
        "Notification preference saved!";
});

document.getElementById("clearData").addEventListener("click", () => {
    const confirmed = confirm(
        "Are you sure? This will delete all CYBERNEX records saved in this browser."
    );

    if (confirmed) {
        const keys = [
            "cybernexTimeline",
            "cybernexIncidents",
            "cybernexEvidence",
            "cybernexAssets",
            "cybernexResponses",
            "cybernexSettings",
            "cybernexNotifications"
        ];

        keys.forEach(key => localStorage.removeItem(key));

        document.getElementById("message").textContent =
            "CYBERNEX demo data cleared. Refresh the page.";
    }
});

loadSettings();