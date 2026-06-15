// Load tickets from LocalStorage on startup
let tickets = JSON.parse(localStorage.getItem("resolv_tickets")) || [];

// Function to display tickets in the sidebar
function renderQueue() {
    const filter = $("#searchInput").val().toLowerCase();
    $("#queue").empty();
    
    tickets.forEach((t, index) => {
        // Only show tickets that match the search filter
        if(t.title.toLowerCase().includes(filter)) {
            let badgeClass = t.status === "Resolved" ? "bg-success" : "bg-warning";
            $("#queue").append(`
                <div class="card mb-2 p-2 ticket-card" onclick="showDetail(${index})" style="cursor:pointer">
                    <div>${t.title}</div>
                    <span class="badge ${badgeClass} w-25">${t.status}</span>
                </div>
            `);
        }
    });
}

// Function to add a new ticket
function addTicket() {
    let title = $("#newTicket").val();
    if(title) {
        let newTicket = { 
            title: title, 
            desc: "This is a detailed description for: " + title, 
            status: "Open" 
        };
        tickets.push(newTicket);
        saveAndRefresh();
        $("#newTicket").val(""); // Clear the input box
    }
}

// Function to show ticket details in the main area
function showDetail(index) {
    let t = tickets[index];
    $("#detailView").html(`
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
        <p>Status: <strong>${t.status}</strong></p>
        <button class="btn btn-success me-2" onclick="updateStatus(${index}, 'Resolved')">Resolve</button>
        <button class="btn btn-danger" onclick="deleteTicket(${index})">Delete</button>
    `);
}

// Function to change status
function updateStatus(index, newStatus) {
    tickets[index].status = newStatus;
    saveAndRefresh();
    showDetail(index); // Refresh the view
}

// Function to delete a ticket
function deleteTicket(index) {
    tickets.splice(index, 1);
    saveAndRefresh();
    $("#detailView").html('<p class="text-muted">Ticket deleted.</p>');
}

// Helper to save data and refresh the list
function saveAndRefresh() {
    localStorage.setItem("resolv_tickets", JSON.stringify(tickets));
    renderQueue();
}

// Run this when the page loads
renderQueue();