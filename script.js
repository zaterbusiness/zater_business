/* ===== SLIDER ===== */
const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".card");

let index = 0;
const visibleCards = 2;

function getCardWidth() {
  return cards.length > 0 ? cards[0].offsetWidth + 20 : 0;
}

function updateSlider() {
  if (track) track.style.transform = `translateX(-${index * getCardWidth()}px)`;
}

function moveRight() {
  if (index < cards.length - visibleCards) { index++; } else { index = 0; }
  updateSlider();
}

function moveLeft() {
  if (index > 0) { index--; } else { index = cards.length - visibleCards; }
  updateSlider();
}

/* ===== COUNTER ===== */
document.addEventListener("DOMContentLoaded", function () {
  const counter = document.getElementById("counter");
  if (!counter) return;
  let count = 0;
  const interval = setInterval(() => {
    if (count < 100) { count++; counter.innerText = count; }
    else { clearInterval(interval); }
  }, 20);
});

/* ===== EMAILJS SEND =====
   This function is used by index.html only (old simple form).
   enquiry.html has its own inline sendEmail() function.
   If you only use enquiry.html, you can ignore this.
=============================== */
function sendEmail(e) {
  e.preventDefault();

  const btn    = document.getElementById("submit-btn");
  const status = document.getElementById("form-status");

  /* ---------- read values (matches enquiry.html input IDs) ---------- */
  const name        = document.getElementById("inp-name")        ? document.getElementById("inp-name").value.trim()        : "";
  const email       = document.getElementById("inp-email")       ? document.getElementById("inp-email").value.trim()       : "";
  const phone       = document.getElementById("inp-phone")       ? document.getElementById("inp-phone").value.trim()       : "";
  const service     = document.getElementById("inp-service")     ? document.getElementById("inp-service").value            : "";
  const requirement = document.getElementById("inp-requirement") ? document.getElementById("inp-requirement").value.trim() : "";
  const budget      = document.getElementById("inp-budget")      ? (document.getElementById("inp-budget").value.trim()  || "Not specified") : "Not specified";
  const deadline    = document.getElementById("inp-deadline")    ? (document.getElementById("inp-deadline").value.trim() || "Not specified") : "Not specified";
  const notes       = document.getElementById("inp-notes")       ? (document.getElementById("inp-notes").value.trim()    || "None")          : "None";

  /* ---------- validation ---------- */
  if (!name || !email || !phone || !service || !requirement) {
    status.className = "error";
    status.textContent = "⚠️ Please fill all required fields marked with *.";
    return;
  }

  btn.textContent = "⏳ Sending...";
  btn.disabled    = true;
  status.className = "";
  status.style.display = "none";

  const templateParams = {
    from_name:   name,
    from_email:  email,
    phone:       phone,
    service:     service,
    requirement: requirement,
    budget:      budget,
    deadline:    deadline,
    notes:       notes
  };

  /*
   * =====================================================
   *  REPLACE THE TWO VALUES BELOW WITH YOUR REAL IDs
   *
   *  SERVICE_ID  → emailjs.com → Email Services   → copy the ID (service_xxxxxxx)
   *  TEMPLATE_ID → emailjs.com → Email Templates  → copy the ID (template_xxxxxxx)
   * =====================================================
   */
  emailjs.send("service_0bxshju", "template_rkqt9ns", templateParams)

    .then(function () {
      status.className    = "success";
      status.textContent  = "✅ Enquiry sent! We will contact you within 24 hours.";
      document.getElementById("zater-form").reset();
      btn.textContent = "Send Enquiry →";
      btn.disabled    = false;
      status.scrollIntoView({ behavior: "smooth", block: "center" });
    })

    .catch(function (error) {
      console.error("EmailJS error:", error);
      status.className   = "error";
      status.textContent = "❌ Failed to send. Check console for error or contact us on Instagram.";
      btn.textContent = "Send Enquiry →";
      btn.disabled    = false;
    });
}
