// API BASE URL (LIVE)
const API_URL = "https://portfolio-backend-rokz.onrender.com/api/contact";

// AUTH CHECK
(function () {
  if (sessionStorage.getItem("auth") !== "true") {
    window.location.replace("../login.html");
  }
})();

let editId = null;

// LOAD DATA
async function loadData() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const table = document.getElementById("data");
    table.innerHTML = "";

    data.forEach((item) => {
      table.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td title="${item.message}">${item.message}</td>
          <td>
            <button onclick="viewMessage(\`${item.message}\`)">Message</button>

            <button onclick="editData('${item._id}', '${item.name}', '${item.email}', \`${item.message}\`)">
              Edit
            </button>

            <button onclick="deleteData('${item._id}')">
              Delete
            </button>
          </td>
        </tr>
      `;
    });

    // SUMMARY
    let totalUsers = data.length;
    let totalMessages = 0;
    let emptyMessages = 0;

    data.forEach((item) => {
      if (item.message && item.message !== "No message provided") {
        totalMessages++;
      } else {
        emptyMessages++;
      }
    });

    document.getElementById("summary").textContent =
      `Total Users: ${totalUsers} | Messages: ${totalMessages} | Empty Messages: ${emptyMessages}`;

  } catch (err) {
    console.log("Error loading data:", err);
  }
}

// DELETE DATA
async function deleteData(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    loadData();
  } catch (err) {
    console.log("Delete error:", err);
  }
}

// OPEN EDIT MODAL
function editData(id, name, email, message) {
  editId = id;

  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = email;
  document.getElementById("editMessage").value = message;

  document.getElementById("editModal").style.display = "flex";
}

// CLOSE MODAL
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// SAVE UPDATED DATA
async function saveUpdate() {
  try {
    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;
    const message = document.getElementById("editMessage").value;

    if (!name || !email || !message) return;

    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    closeModal();
    loadData();
  } catch (err) {
    console.log("Update error:", err);
  }
}
// LOGOUT
function logout() {
  sessionStorage.removeItem("auth");
  window.location.replace("../login.html");
}

// VIEW FULL MESSAGE
function viewMessage(msg) {
  document.getElementById("fullMessage").innerText = msg;
  document.getElementById("viewModal").style.display = "flex";
}

// CLOSE VIEW MODAL
function closeView() {
  document.getElementById("viewModal").style.display = "none";
}

// INIT
loadData();