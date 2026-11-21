const form = document.getElementById("eventForm");
const list = document.getElementById("timelineList");
const storageKey = "cybernexTimeline";

function getEvents() {
    try {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
        return [];
    }
}

function saveEvents(events) {
    localStorage.setItem(storageKey, JSON.stringify(events));
}

function displayTimeline() {
    const events = getEvents().sort((a,b) =>
        new Date(a.date) - new Date(b.date)
    );

    list.innerHTML = events.length ? events.map(event => `
        <div class="card blue" style="margin-bottom:15px">
            <h3>${escapeHTML(event.name)}</h3>
            <p>${escapeHTML(event.date)} · ${escapeHTML(event.country)}</p>
            <p>${escapeHTML(event.org)} · ${escapeHTML(event.type)}</p>
            <p>${escapeHTML(event.description)}</p>
        </div>
    `).join("") : "<p>No events added yet. Add your first timeline event above.</p>";
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&":"&amp;", "<":"&lt;", ">":"&gt;",
        '"':"&quot;", "'":"&#39;"
    }[char]));
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const events = getEvents();

    events.push({
        name: document.getElementById("eventName").value,
        country: document.getElementById("eventCountry").value,
        org: document.getElementById("eventOrg").value,
        date: document.getElementById("eventDate").value,
        type: document.getElementById("eventType").value,
        description: document.getElementById("eventDescription").value
    });

    saveEvents(events);
    form.reset();
    displayTimeline();
});

function clearTimeline() {
    if (confirm("Clear all timeline events?")) {
        localStorage.removeItem(storageKey);
        displayTimeline();
    }
}

displayTimeline();