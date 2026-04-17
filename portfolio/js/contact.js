(function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form) return;

  // INPUTS
  const nameInput = form.name;
  const emailInput = form.email;
  const messageInput = form.message;

  // ERROR ELEMENTS
  const nameError = document.createElement("small");
  const emailError = document.createElement("small");
  const msgError = document.createElement("small");

  nameError.style.color = "red";
  emailError.style.color = "red";
  msgError.style.color = "red";

  nameInput.after(nameError);
  emailInput.after(emailError);
  messageInput.after(msgError);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // RESET
    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    msgError.textContent = "";
    status.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const finalMessage = message || "No message provided";

    // NAME VALIDATION
    const nameRegex = /^[A-Za-z ]{3,30}$/;

    if (!name) {
      nameError.textContent = "Name is required";
      isValid = false;
    } else if (!nameRegex.test(name)) {
      nameError.textContent = "Only 3–30 letters allowed";
      isValid = false;
    }

  //  EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|co|in|io|ai|tech)$/i;

    if (!email) {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Enter valid email (example@gmail.com)";
      isValid = false;
    }

    // MESSAGE VALIDATION
    if (message.length > 300) {
      msgError.textContent = "Max 300 characters only";
      isValid = false;
    }

    // STOP HERE IF INVALID
    if (!isValid) {
      let errors = [];
      status.style.color = "#ef4444";

      return;
    }

  // SEND DATA
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message: finalMessage }),
      });

      const data = await res.json();

      if (res.ok) {
        status.textContent = "✓ Message sent successfully!";
        status.style.color = "#22c55e";
        form.reset();
      } else {
        status.textContent = data.message || "Something went wrong";
        status.style.color = "red";
      }
    } catch {
      status.textContent = "Server error. Try again";
      status.style.color = "red";
    }

    btn.textContent = "Send Message →";
    btn.disabled = false;

    setTimeout(() => {
      status.textContent = "";
    }, 4000);
  });
})();
