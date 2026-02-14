const slots = [
    { id: 1, type: "bike", status: "free" },
    { id: 2, type: "bike", status: "occupied" },
    { id: 3, type: "bike", status: "free" },
    { id: 4, type: "bike", status: "free" },
    { id: 5, type: "car", status: "free" },
    { id: 6, type: "car", status: "occupied" },
    { id: 7, type: "car", status: "free" },
    { id: 8, type: "car", status: "occupied" },
    { id: 9, type: "bike", status: "free" },
    { id: 10, type: "car", status: "free" }
];

let selectedType = "";
let selectedSlotId = null;
let userName = "";
let userRole = "";

// LOGIN
function login() {
    userName = document.getElementById("name").value;
    userRole = document.getElementById("role").value;

    if (userName === "" || userRole === "") {
        document.getElementById("loginMsg").innerText =
            "❌ Please enter name and select role";
        return;
    }

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("selectBox").style.display = "block";
}

// VEHICLE SELECTION
function selectType(type) {
    selectedType = type;

    document.getElementById("selectBox").style.display = "none";
    document.getElementById("parkingPage").style.display = "block";

    document.getElementById("vehicleTitle").innerText =
        type.toUpperCase() + " Parking Slots";

    displaySlots();
}

// DISPLAY SLOTS
function displaySlots() {
    const slotArea = document.getElementById("slotArea");
    const vacantList = document.getElementById("vacantList");
    const occupiedList = document.getElementById("occupiedList");

    slotArea.innerHTML = "";
    vacantList.innerHTML = "";
    occupiedList.innerHTML = "";

    slots.forEach(slot => {
        if (slot.type !== selectedType) return;

        const div = document.createElement("div");
        div.className = "slot " + slot.status;

        if (selectedType === "car") {
            div.innerHTML = "🚗<br>Slot " + slot.id;
        } else {
            div.innerHTML = "🏍️<br>Slot " + slot.id;
        }

        div.onclick = () => toggleSlot(slot);

        slotArea.appendChild(div);

        const li = document.createElement("li");
        li.innerText = selectedType.toUpperCase() + " Slot " + slot.id;

        if (slot.status === "free") {
            vacantList.appendChild(li);
        } else {
            occupiedList.appendChild(li);
        }
    });
}

// TOGGLE SLOT
function toggleSlot(slot) {
    if (slot.status === "free") {
        selectedSlotId = slot.id;

        document.getElementById("parkingPage").style.display = "none";
        document.getElementById("confirmPage").style.display = "block";

        document.getElementById("confirmText").innerText =
            "Do you want to book Slot " + slot.id +
            " for " + selectedType.toUpperCase() + "?";
    } else {
        if (confirm("Do you want to cancel Slot " + slot.id + "?")) {
            slot.status = "free";
            alert("Slot " + slot.id + " is now free.");
            displaySlots();
        }
    }
}

// CONFIRM SLOT
function confirmSlot() {
    slots.forEach(slot => {
        if (slot.id === selectedSlotId) {
            slot.status = "occupied";
        }
    });

    document.getElementById("confirmPage").style.display = "none";
    document.getElementById("successPage").style.display = "block";

    document.getElementById("successText").innerText =
        "Thank you " + userRole + " " + userName +
        ". Your " + selectedType.toUpperCase() +
        " slot number " + selectedSlotId +
        " is successfully confirmed!";
}

// CANCEL CONFIRM
function cancelConfirm() {
    document.getElementById("confirmPage").style.display = "none";
    document.getElementById("parkingPage").style.display = "block";
    displaySlots();
}

// SELECT ANOTHER VEHICLE
function goToVehicleSelect() {
    document.getElementById("successPage").style.display = "none";
    document.getElementById("selectBox").style.display = "block";
}

// LOGOUT
function logout() {
    document.getElementById("successPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";

    document.getElementById("name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("loginMsg").innerText = "";
}
