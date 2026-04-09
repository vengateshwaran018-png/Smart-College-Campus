// ============================================
//  CAMPUS HUB - MAIN APPLICATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setGreeting();
  setDateTime();
  setInterval(setDateTime, 1000);
  initTheme();
  initNavigation();
  initNotifications();
  initSearch();
  renderDashboard();
  renderLearning();
  renderTransit();
  renderDining("lunch");
  renderLibrary();
  renderAttendance();
  renderAnalytics();
  renderEvents();
  initMapTooltips();
  initCountdown();
  renderWeather();
}

// ============================================
//  GREETING & DATE/TIME
// ============================================
function setGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17) greeting = "Good Evening";
  const el = document.getElementById("greeting");
  if (el) el.textContent = `${greeting}, Vengatesh 👋`;

  const dateEl = document.getElementById("dateDisplay");
  if (dateEl) {
    const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    dateEl.textContent = new Date().toLocaleDateString("en-IN", opts);
  }
}

function setDateTime() {
  const el = document.getElementById("liveTime");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ============================================
//  WEATHER (Simulated for Tiruvannamalai)
// ============================================
function renderWeather() {
  const temps = [28, 30, 32, 29, 31, 33, 30];
  const conditions = ["Sunny", "Partly Cloudy", "Hot & Sunny", "Clear Sky", "Hazy"];
  const icons = ["fa-sun", "fa-cloud-sun", "fa-sun", "fa-sun", "fa-smog"];
  const i = new Date().getDay();
  const temp = temps[i];
  const cond = conditions[i % conditions.length];
  const icon = icons[i % icons.length];

  const tempEl = document.getElementById("tempDisplay");
  const descEl = document.getElementById("weatherDesc");
  const iconEl = document.querySelector(".weather-icon");
  if (tempEl) tempEl.textContent = `${temp}°C`;
  if (descEl) descEl.textContent = cond;
  if (iconEl) { iconEl.className = `fa-solid ${icon} weather-icon`; }
}

// ============================================
//  THEME TOGGLE
// ============================================
function initTheme() {
  const savedTheme = localStorage.getItem("ch-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ch-theme", next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.innerHTML = theme === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

// ============================================
//  NAVIGATION
// ============================================
function initNavigation() {
  document.querySelectorAll(".nav-links li[data-page]").forEach(li => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      const page = li.getAttribute("data-page");
      switchPage(page);
    });
  });

  document.getElementById("sidebarToggle")?.addEventListener("click", () => {
    document.getElementById("sidebar")?.classList.toggle("open");
  });
}

function switchPage(pageId) {
  // Deactivate all
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-links li").forEach(li => li.classList.remove("active"));

  // Activate target
  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add("active");

  const navItem = document.querySelector(`.nav-links li[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add("active");

  // Close mobile sidebar
  document.getElementById("sidebar")?.classList.remove("open");

  // Lazy-render analytics chart
  if (pageId === "analytics") setTimeout(renderTrendChart, 100);
  if (pageId === "learning") setTimeout(renderPerfChart, 100);
}

// ============================================
//  NOTIFICATIONS
// ============================================
function initNotifications() {
  const btn = document.getElementById("notifBtn");
  const panel = document.getElementById("notifPanel");
  const list = document.getElementById("notifList");

  if (list) {
    campusData.notifications.forEach(n => {
      const div = document.createElement("div");
      div.className = "notif-item";
      div.innerHTML = `<div class="notif-dot"></div><div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>`;
      list.appendChild(div);
    });
  }

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    panel?.classList.toggle("open");
  });

  document.addEventListener("click", () => panel?.classList.remove("open"));
}

function clearNotifs() {
  document.getElementById("notifList").innerHTML = '<div style="padding:16px 18px;color:var(--text-muted);font-size:0.85rem">No new notifications</div>';
  document.getElementById("notifBadge").style.display = "none";
}

// ============================================
//  SEARCH
// ============================================
function initSearch() {
  const input = document.getElementById("globalSearch");
  const results = document.getElementById("searchResults");
  const searchIndex = [
    { label: "Dashboard", page: "dashboard", icon: "fa-house" },
    { label: "AI Learning", page: "learning", icon: "fa-brain" },
    { label: "Transport / Shuttles", page: "transit", icon: "fa-bus" },
    { label: "Dining & Menu", page: "dining", icon: "fa-utensils" },
    { label: "Library & Books", page: "library", icon: "fa-book" },
    { label: "Attendance Tracker", page: "attendance", icon: "fa-clipboard-check" },
    { label: "Analytics Dashboard", page: "analytics", icon: "fa-chart-line" },
    { label: "Campus Events", page: "events", icon: "fa-calendar" },
    { label: "Campus Map", page: "map", icon: "fa-map" }
  ];

  input?.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { results.style.display = "none"; return; }
    const matches = searchIndex.filter(s => s.label.toLowerCase().includes(q));
    if (!matches.length) { results.style.display = "none"; return; }
    results.innerHTML = matches.map(m => `
      <div class="search-result-item" onclick="switchPage('${m.page}');document.getElementById('globalSearch').value='';document.getElementById('searchResults').style.display='none'">
        <i class="fa-solid ${m.icon}" style="margin-right:8px;color:var(--accent-primary)"></i>${m.label}
      </div>`).join("");
    results.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) results.style.display = "none";
  });
}

// ============================================
//  DASHBOARD RENDER
// ============================================
function renderDashboard() {
  renderTodaySchedule();
  renderDashTransit();
  renderDashDining();
  renderDashAlerts();
}

function renderTodaySchedule() {
  const el = document.getElementById("todaySchedule");
  if (!el) return;
  el.innerHTML = campusData.schedule.map(s => `
    <div class="schedule-item ${s.status === "current" ? "current" : s.status === "done" ? "done" : ""}">
      <span class="sched-time">${s.time}</span>
      <span class="sched-name">${s.subject.split(" ").slice(0,2).join(" ")}</span>
    </div>`).join("");

  // Set next class info
  const next = campusData.schedule.find(s => s.status === "current") || campusData.schedule.find(s => s.status === "upcoming");
  if (next) {
    document.getElementById("nextClassName").textContent = next.subject;
    document.getElementById("nextClassRoom").textContent = next.room;
    document.getElementById("nextClassProf").textContent = next.prof;
  }
}

function renderDashTransit() {
  const el = document.getElementById("dashTransit");
  if (!el) return;
  el.innerHTML = campusData.transit.slice(0, 3).map(b => `
    <div class="list-item">
      <div class="item-main">
        <div class="item-icon ${b.status === "on-time" ? "blue" : "orange"}"><i class="fa-solid fa-bus"></i></div>
        <div>
          <div class="item-name">${b.route.split(" - ")[1]}</div>
          <div class="item-sub">${b.destination.split(" ↔ ")[0]}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-family:var(--font-head);font-size:1.2rem;font-weight:800;color:var(--accent-primary)">${b.nextArrival}</div>
        <div style="font-size:0.72rem;color:var(--text-muted)">min</div>
      </div>
    </div>`).join("");
}

function renderDashDining() {
  const el = document.getElementById("dashDining");
  if (!el) return;
  el.innerHTML = campusData.cafeterias.map(c => {
    const pct = Math.round((c.current / c.capacity) * 100);
    return `
      <div class="list-item">
        <div class="item-main">
          <div class="item-icon green"><i class="fa-solid fa-mug-hot"></i></div>
          <div>
            <div class="item-name">${c.name}</div>
            <div class="item-sub">${c.current}/${c.capacity} seats</div>
          </div>
        </div>
        <span class="pill pill-${c.status === "low" ? "low" : c.status === "med" ? "med" : "high"}">
          ${c.status === "low" ? "Low" : c.status === "med" ? "Medium" : "Crowded"}
        </span>
      </div>`;
  }).join("");
}

function renderDashAlerts() {
  const el = document.getElementById("dashAlerts");
  if (!el) return;
  el.innerHTML = campusData.alerts.map(a => `
    <div class="alert-card ${a.type}">
      <h4>${a.title}</h4>
      <p>${a.msg}</p>
      <div class="alert-time">${a.time}</div>
    </div>`).join("");
}

// ============================================
//  CLASS COUNTDOWN
// ============================================
function initCountdown() {
  function updateCountdown() {
    const now = new Date();
    const target = new Date();
    target.setHours(10, 0, 0, 0);
    if (now > target) target.setDate(target.getDate() + 1);
    const diff = target - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const hEl = document.getElementById("cdHours");
    const mEl = document.getElementById("cdMins");
    const sEl = document.getElementById("cdSecs");
    if (hEl) hEl.textContent = String(h).padStart(2, "0");
    if (mEl) mEl.textContent = String(m).padStart(2, "0");
    if (sEl) sEl.textContent = String(s).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============================================
//  LEARNING PAGE
// ============================================
function renderLearning() {
  renderCourses();
  renderSkills();
  renderStudyPlan();
  // Chart deferred to page switch
}

function renderCourses() {
  const el = document.getElementById("courseGrid");
  if (!el) return;
  el.innerHTML = campusData.courses.map(c => `
    <div class="course-card">
      <div class="course-icon">${c.icon}</div>
      <div class="course-name">${c.name}</div>
      <div class="course-provider">${c.provider}</div>
      <span class="course-level level-${c.level}">${c.level.charAt(0).toUpperCase() + c.level.slice(1)}</span>
      <div class="course-match"><i class="fa-solid fa-wand-magic-sparkles"></i> ${c.match}</div>
    </div>`).join("");
}

function renderSkills() {
  const el = document.getElementById("skillsList");
  if (!el) return;
  el.innerHTML = campusData.skills.map(s => `
    <div class="skill-row">
      <span class="skill-name">${s.name}</span>
      <div class="skill-bar-wrap">
        <div class="skill-bar-inner" style="width:${s.pct}%;background:${s.color}"></div>
      </div>
      <span class="skill-pct">${s.pct}%</span>
    </div>`).join("");
}

function renderStudyPlan() {
  const el = document.getElementById("studyPlan");
  if (!el) return;
  el.innerHTML = campusData.studyPlan.map((p, i) => `
    <div class="planner-item ${p.done ? "done" : ""}" id="plan-${i}">
      <div class="planner-check" onclick="togglePlan(${i})">${p.done ? '<i class="fa-solid fa-check"></i>' : ""}</div>
      <span class="planner-subject">${p.subject}</span>
      <span class="planner-time">${p.time}</span>
    </div>`).join("");
}

function togglePlan(i) {
  campusData.studyPlan[i].done = !campusData.studyPlan[i].done;
  renderStudyPlan();
}

function renderPerfChart() {
  const canvas = document.getElementById("perfChart");
  if (!canvas || canvas._initialized) return;
  canvas._initialized = true;
  const ctx = canvas.getContext("2d");
  const labels = ["Math", "DSA", "DBMS", "CN", "OS", "Web"];
  const data = [85, 92, 75, 91, 70, 86];
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";

  // Simple canvas chart
  const W = canvas.offsetWidth || 500;
  canvas.width = W; canvas.height = 200;
  const pad = 40; const chartW = W - pad * 2; const chartH = 140;
  const max = 100; const barW = chartW / labels.length;

  ctx.clearRect(0, 0, W, 200);

  // Grid lines
  for (let g = 0; g <= 4; g++) {
    const y = pad + chartH - (g / 4) * chartH;
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke();
    ctx.fillStyle = textColor; ctx.font = "11px DM Sans"; ctx.textAlign = "right";
    ctx.fillText(`${g * 25}`, pad - 6, y + 4);
  }

  // Bars with gradient
  data.forEach((v, i) => {
    const x = pad + i * barW + barW * 0.15;
    const bh = (v / max) * chartH;
    const y = pad + chartH - bh;
    const grd = ctx.createLinearGradient(0, y, 0, y + bh);
    grd.addColorStop(0, "rgba(99,102,241,0.9)");
    grd.addColorStop(1, "rgba(6,182,212,0.6)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.roundRect(x, y, barW * 0.7, bh, [6, 6, 0, 0]);
    ctx.fill();

    // Value
    ctx.fillStyle = isDark ? "white" : "#1a1f3a";
    ctx.font = "bold 12px Syne"; ctx.textAlign = "center";
    ctx.fillText(`${v}%`, x + barW * 0.35, y - 6);

    // Label
    ctx.fillStyle = textColor; ctx.font = "11px DM Sans";
    ctx.fillText(labels[i], x + barW * 0.35, pad + chartH + 16);
  });
}

// ============================================
//  TRANSIT PAGE
// ============================================
function renderTransit() {
  renderAllRoutes();
  renderBusSchedule();
  animateBusIcons();
}

function renderAllRoutes() {
  const el = document.getElementById("allRoutes");
  if (!el) return;
  el.innerHTML = campusData.transit.map(b => `
    <div class="route-card">
      <div class="route-header">
        <span class="route-name">${b.route}</span>
        <span class="route-status ${b.status === "on-time" ? "pill pill-low" : "pill pill-med"}">${b.delay}</span>
      </div>
      <div class="route-stops">${b.stops.join(" → ")}</div>
      <div style="margin-top:8px;display:flex;align-items:baseline;gap:4px">
        <span class="route-time">${b.nextArrival}</span>
        <span style="font-size:0.78rem;color:var(--text-muted)">min · ${b.crowd} crowd</span>
      </div>
    </div>`).join("");
}

function renderBusSchedule() {
  const el = document.getElementById("busSchedule");
  if (!el) return;
  el.innerHTML = `
    <table class="sch-table">
      <thead><tr><th>Route</th><th>Departs</th><th>Arrives</th><th>Driver</th><th>Available Seats</th><th>Status</th></tr></thead>
      <tbody>${campusData.busSchedule.map(s => `
        <tr>
          <td><strong>${s.route}</strong></td>
          <td>${s.departs}</td>
          <td>${s.arrives}</td>
          <td>${s.driver}</td>
          <td>${s.available} / ${s.seats}</td>
          <td><span class="pill ${s.status === "En Route" ? "pill-low" : s.status === "Boarding" ? "pill-med" : "pill-blue"}">${s.status}</span></td>
        </tr>`).join("")}
      </tbody>
    </table>`;
}

function animateBusIcons() {
  const container = document.getElementById("busIcons");
  if (!container) return;
  const positions = [
    { left: "15%", top: "25%" }, { left: "50%", top: "15%" },
    { left: "65%", top: "55%" }, { left: "25%", top: "60%" }
  ];
  container.innerHTML = ["A", "B", "C", "D"].map((id, i) => `
    <div class="bus-dot" id="busDot${id}" style="left:${positions[i].left};top:${positions[i].top}">${id}</div>`).join("");

  // Animate buses
  setInterval(() => {
    ["A", "B", "C", "D"].forEach(id => {
      const dot = document.getElementById(`busDot${id}`);
      if (!dot) return;
      const left = 10 + Math.random() * 75;
      const top = 15 + Math.random() * 65;
      dot.style.left = left + "%";
      dot.style.top = top + "%";
    });
  }, 4000);
}

// ============================================
//  DINING PAGE
// ============================================
function renderDining(meal) {
  const el = document.getElementById("menuGrid");
  if (!el) return;
  el.innerHTML = campusData.dining[meal].map(item => `
    <div class="menu-item">
      <div class="menu-item-icon">${item.icon}</div>
      <div class="menu-item-name">${item.name}</div>
      <div class="menu-item-cal">${item.calories} kcal · ₹${item.price}</div>
      <div class="menu-item-tags">${item.tags.map(t => `<span class="food-tag ${t}">${t}</span>`).join("")}</div>
    </div>`).join("");
  renderOccupancy();
  renderNutrition();
}

function switchMeal(meal, btn) {
  document.querySelectorAll(".meal-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderDining(meal);
}

function renderOccupancy() {
  const el = document.getElementById("occupancyList");
  if (!el) return;
  el.innerHTML = campusData.cafeterias.map(c => {
    const pct = Math.round((c.current / c.capacity) * 100);
    return `
      <div class="list-item" style="margin-bottom:10px">
        <div class="item-main">
          <div class="item-icon green"><i class="fa-solid fa-mug-hot"></i></div>
          <div><div class="item-name">${c.name}</div><div class="item-sub">${c.current}/${c.capacity} · ${pct}%</div></div>
        </div>
        <span class="pill pill-${c.status === "low" ? "low" : c.status === "med" ? "med" : "high"}">${pct}%</span>
      </div>`;
  }).join("");
}

function renderNutrition() {
  const el = document.getElementById("nutritionBars");
  if (!el) return;
  const items = [
    { name: "Calories", val: 680, max: 800, color: "#6366f1", unit: "kcal" },
    { name: "Protein", val: 28, max: 50, color: "#10b981", unit: "g" },
    { name: "Carbs", val: 95, max: 130, color: "#f59e0b", unit: "g" },
    { name: "Fats", val: 18, max: 35, color: "#ef4444", unit: "g" }
  ];
  el.innerHTML = items.map(n => `
    <div class="nut-bar-row">
      <span class="nut-name">${n.name}</span>
      <div class="nut-bar-wrap"><div class="nut-bar-inner" style="width:${(n.val/n.max)*100}%;background:${n.color}"></div></div>
      <span class="nut-val" style="color:${n.color}">${n.val}${n.unit}</span>
    </div>`).join("");
}

// Star Rating
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll("#starRating i");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.getAttribute("data-val"));
      stars.forEach((s, i) => {
        s.className = i < val ? "fa-solid fa-star" : "fa-regular fa-star";
        s.classList.toggle("active", i < val);
      });
    });
  });
});

function submitFeedback() {
  const text = document.getElementById("feedbackText")?.value;
  const msg = document.getElementById("feedbackMsg");
  if (msg) {
    msg.textContent = text ? "✅ Thank you for your feedback!" : "❌ Please enter your feedback first.";
    msg.style.color = text ? "var(--accent-success)" : "var(--accent-danger)";
    if (text) document.getElementById("feedbackText").value = "";
  }
}

// ============================================
//  LIBRARY PAGE
// ============================================
function renderLibrary() {
  searchBooks(); // render default books
  renderStudyRooms();
  renderBorrowedBooks();
}

function searchBooks() {
  const query = document.getElementById("bookSearch")?.value.toLowerCase() || "";
  const el = document.getElementById("bookResults");
  if (!el) return;
  const filtered = campusData.books.filter(b =>
    !query || b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
  );
  el.innerHTML = filtered.map(b => `
    <div class="book-card">
      <div class="book-spine" style="background:${b.color}">${b.icon}</div>
      <div class="book-info">
        <div class="book-title">${b.title}</div>
        <div class="book-author">${b.author}</div>
        <div class="book-avail ${b.available ? "avail-yes" : "avail-no"}">${b.available ? "✓ Available" : "✗ Checked Out"}</div>
        <button class="reserve-btn" ${!b.available ? "disabled" : ""} onclick="reserveBook('${b.title}')">${b.available ? "Reserve" : "Join Queue"}</button>
      </div>
    </div>`).join("");
}

function reserveBook(title) {
  showToast(`📚 "${title}" reserved successfully!`);
}

function renderBorrowedBooks() {
  const el = document.getElementById("borrowedBooks");
  if (!el) return;
  el.innerHTML = campusData.borrowedBooks.map(b => `
    <div class="borrowed-book">
      <span>📖</span>
      <span class="b-title">${b.title}</span>
      <span class="b-due ${b.overdue ? "" : ""}" style="color:${b.overdue ? "var(--accent-danger)" : "var(--accent-success)"}">${b.overdue ? "⚠️ Overdue" : "Due"}: ${b.due}</span>
    </div>`).join("");
}

function renderStudyRooms() {
  const el = document.getElementById("studyRooms");
  if (!el) return;
  el.innerHTML = campusData.studyRooms.map(r => `
    <div class="room-card ${r.status}" onclick="${r.status === "available" ? `bookRoom('${r.name}')` : ""}">
      <div class="room-icon">${r.status === "available" ? "🟢" : "🔴"}</div>
      <div class="room-name">${r.name}</div>
      <div class="room-cap"><i class="fa-solid fa-users"></i> ${r.capacity} seats</div>
      <div class="room-status">${r.status === "available" ? "Available · Click to Book" : "Occupied"}</div>
    </div>`).join("");
}

function bookRoom(name) {
  showToast(`✅ ${name} booked for 2 hours!`);
  const room = campusData.studyRooms.find(r => r.name === name);
  if (room) { room.status = "occupied"; renderStudyRooms(); }
}

// ============================================
//  ATTENDANCE PAGE
// ============================================
function renderAttendance() {
  renderSubjectAttendance();
  renderCalendar();
}

function renderSubjectAttendance() {
  const el = document.getElementById("subjectAttendance");
  if (!el) return;
  el.innerHTML = campusData.subjectAttendance.map(s => `
    <div class="subj-row">
      <span class="subj-name">${s.name}</span>
      <div class="subj-bar-wrap">
        <div class="subj-bar-inner" style="width:${s.pct}%;background:${s.pct >= 85 ? "var(--accent-success)" : s.pct >= 75 ? "var(--accent-warning)" : "var(--accent-danger)"}"></div>
      </div>
      <span class="subj-pct ${s.pct >= 85 ? "good" : s.pct >= 75 ? "ok" : "low"}">${s.pct}%</span>
    </div>`).join("");
}

function renderCalendar() {
  const el = document.getElementById("attendCalendar");
  if (!el) return;
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let html = days.map(d => `<div class="cal-day-label">${d}</div>`).join("");
  // Generate 35 days of simulated attendance
  const today = new Date().getDate();
  for (let i = 1; i <= 35; i++) {
    let cls = "future";
    if (i < today) {
      const r = Math.random();
      if (r < 0.05) cls = "holiday";
      else if (r < 0.2) cls = "absent";
      else cls = "present";
    } else if (i === today) cls = "today";
    html += `<div class="cal-day ${cls}">${i <= 30 ? i : ""}</div>`;
  }
  el.innerHTML = html;
}

// Face Scan
function startFaceScan() {
  const modal = document.getElementById("faceModal");
  modal?.classList.add("open");
  let progress = 0;
  const bar = document.getElementById("scanProgressBar");
  const status = document.getElementById("faceModalStatus");
  const stages = ["Detecting face...", "Analyzing features...", "Verifying identity...", "✅ Identity Confirmed!"];
  let stage = 0;

  const interval = setInterval(() => {
    progress += 2;
    if (bar) bar.style.width = progress + "%";
    if (progress % 25 === 0 && stage < stages.length) {
      if (status) status.textContent = stages[stage++];
    }
    if (progress >= 100) {
      clearInterval(interval);
      if (status) status.textContent = "✅ Attendance Marked Successfully!";
      setTimeout(() => { closeFaceModal(); showToast("✅ Attendance marked via Face Recognition!"); }, 1500);
    }
  }, 60);
}

function closeFaceModal() {
  document.getElementById("faceModal")?.classList.remove("open");
  document.getElementById("scanProgressBar").style.width = "0%";
  document.getElementById("faceModalStatus").textContent = "Scanning face... Please stay still";
}

function markAttendanceFace() {
  switchPage("attendance");
  setTimeout(() => startFaceScan(), 300);
}

// ============================================
//  ANALYTICS PAGE
// ============================================
function renderAnalytics() {
  renderAdminStats();
  renderDeptPerf();
  renderEnergy();
}

function renderAdminStats() {
  const el = document.getElementById("adminStats");
  if (!el) return;
  const stats = [
    { label: "Total Students", value: campusData.analytics.totalStudents.toLocaleString() },
    { label: "Faculty Members", value: campusData.analytics.totalFaculty },
    { label: "Active Buses", value: campusData.analytics.activeBuses },
    { label: "Avg Attendance", value: campusData.analytics.avgAttendance + "%" }
  ];
  el.innerHTML = stats.map(s => `
    <div class="admin-stat-chip">
      <div class="big-num">${s.value}</div>
      <label>${s.label}</label>
    </div>`).join("");
}

function renderDeptPerf() {
  const el = document.getElementById("deptPerf");
  if (!el) return;
  const colors = ["#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
  el.innerHTML = campusData.analytics.depts.map((d, i) => `
    <div class="dept-row">
      <span class="dept-name">${d.name}</span>
      <div class="dept-bar-wrap"><div class="dept-bar" style="width:${d.score}%;background:${colors[i]}"></div></div>
      <span class="dept-val">${d.score}%</span>
    </div>`).join("");
}

function renderEnergy() {
  const el = document.getElementById("energyStats");
  if (!el) return;
  const items = [
    { label: "Today's Usage", value: "1,240 kWh" },
    { label: "This Month", value: "38,420 kWh" },
    { label: "Solar Generated", value: "520 kWh" },
    { label: "Cost Saved", value: "₹4,200" },
    { label: "Carbon Offset", value: "0.42 tons" }
  ];
  el.innerHTML = items.map(i => `
    <div class="energy-stat">
      <span class="label">${i.label}</span>
      <span class="value">${i.value}</span>
    </div>`).join("");
}

function renderTrendChart() {
  const canvas = document.getElementById("trendChart");
  if (!canvas || canvas._initialized) return;
  canvas._initialized = true;
  const ctx = canvas.getContext("2d");
  const data = campusData.analytics.monthlyAttendance;
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const W = canvas.offsetWidth || 600; canvas.width = W; canvas.height = 220;
  const pad = 45; const chartW = W - pad * 2; const chartH = 150;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";

  ctx.clearRect(0, 0, W, 220);

  // Grid
  for (let g = 0; g <= 4; g++) {
    const y = pad + chartH - (g / 4) * chartH;
    ctx.strokeStyle = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.07)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - pad, y); ctx.stroke();
    ctx.fillStyle = textColor; ctx.font = "10px DM Sans"; ctx.textAlign = "right";
    ctx.fillText(`${60 + g * 10}%`, pad - 6, y + 4);
  }

  const xStep = chartW / (data.length - 1);
  const yMin = 60; const yRange = 40;

  // Area fill
  const grd = ctx.createLinearGradient(0, pad, 0, pad + chartH);
  grd.addColorStop(0, "rgba(99,102,241,0.3)");
  grd.addColorStop(1, "rgba(99,102,241,0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.moveTo(pad, pad + chartH);
  data.forEach((v, i) => {
    const x = pad + i * xStep;
    const y = pad + chartH - ((v - yMin) / yRange) * chartH;
    ctx.lineTo(x, y);
  });
  ctx.lineTo(pad + (data.length - 1) * xStep, pad + chartH);
  ctx.closePath(); ctx.fill();

  // Line
  ctx.strokeStyle = "rgba(99,102,241,0.9)"; ctx.lineWidth = 2.5; ctx.lineJoin = "round";
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad + i * xStep;
    const y = pad + chartH - ((v - yMin) / yRange) * chartH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Dots & labels
  data.forEach((v, i) => {
    const x = pad + i * xStep;
    const y = pad + chartH - ((v - yMin) / yRange) * chartH;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#6366f1"; ctx.fill();
    ctx.strokeStyle = "white"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = textColor; ctx.font = "10px DM Sans"; ctx.textAlign = "center";
    ctx.fillText(labels[i], x, pad + chartH + 16);
  });
}

function generateReport(type) {
  const msg = document.getElementById("reportMsg");
  if (msg) {
    msg.textContent = `⏳ Generating ${type} report...`;
    setTimeout(() => {
      msg.textContent = `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} report generated! Download ready.`;
    }, 1500);
  }
}

// ============================================
//  EVENTS PAGE
// ============================================
function renderEvents(filter = "all") {
  const el = document.getElementById("eventsList");
  const selectEl = document.getElementById("eventSelect");
  if (!el) return;
  const filtered = filter === "all" ? campusData.events : campusData.events.filter(e => e.category === filter);
  el.innerHTML = filtered.map(e => `
    <div class="event-card">
      <div class="event-date-box">
        <span class="day">${e.date.day}</span>
        <span class="month">${e.date.month}</span>
      </div>
      <div class="event-body">
        <div class="event-title">${e.title}</div>
        <div class="event-meta">
          <i class="fa-solid fa-clock"></i>${e.time} &nbsp;
          <i class="fa-solid fa-location-dot"></i>${e.venue}
        </div>
        <span class="event-category cat-${e.category}">${e.category}</span>
        <p style="font-size:0.78rem;color:var(--text-muted);margin-top:6px">${e.desc}</p>
      </div>
      <button class="event-register-btn" onclick="quickRegisterEvent('${e.title}')">Register</button>
    </div>`).join("");

  // Populate select
  if (selectEl) {
    selectEl.innerHTML = '<option>Select Event...</option>' +
      campusData.events.map(e => `<option value="${e.title}">${e.title}</option>`).join("");
  }
}

function filterEvents(val) { renderEvents(val); }

function quickRegisterEvent(title) {
  showToast(`✅ Registered for "${title}" successfully!`);
}

function registerEvent() {
  const name = document.getElementById("evtName")?.value;
  const roll = document.getElementById("evtRoll")?.value;
  const email = document.getElementById("evtEmail")?.value;
  const event = document.getElementById("eventSelect")?.value;
  const msg = document.getElementById("regMsg");

  if (!name || !roll || !email || event === "Select Event...") {
    if (msg) { msg.textContent = "❌ Please fill all fields."; msg.style.color = "var(--accent-danger)"; }
    return;
  }
  if (msg) { msg.textContent = `✅ ${name} registered for "${event}"!`; msg.style.color = "var(--accent-success)"; }
  document.getElementById("evtName").value = "";
  document.getElementById("evtRoll").value = "";
  document.getElementById("evtEmail").value = "";
}

// ============================================
//  MAP TOOLTIPS
// ============================================
function initMapTooltips() {
  const tooltip = document.getElementById("mapTooltip");
  document.querySelectorAll(".building").forEach(b => {
    b.addEventListener("mouseenter", (e) => {
      if (!tooltip) return;
      tooltip.textContent = b.getAttribute("data-name");
      tooltip.style.display = "block";
      tooltip.style.left = (e.offsetX + b.offsetLeft + 10) + "px";
      tooltip.style.top = (b.offsetTop - 30) + "px";
    });
    b.addEventListener("mouseleave", () => { if (tooltip) tooltip.style.display = "none"; });
  });
}

// ============================================
//  AI CHATBOT (with Anthropic API)
// ============================================
function toggleChatbot() {
  const win = document.getElementById("chatbotWindow");
  win?.classList.toggle("open");
}

function openChatbot() {
  document.getElementById("chatbotWindow")?.classList.add("open");
}

function quickAsk(q) {
  document.getElementById("chatInput").value = q;
  sendChat();
}

const chatHistory = [
  {
    role: "user",
    content: `You are CampusAI, the smart assistant for CampusHub College. You help students with:
- Attendance info (student: Vengatesh, Roll: 21CS047, AI&DS III Year, attendance: 87%)
- Bus/shuttle timings (Route A: 4 min, Route B: 8 min delayed, Route C: 12 min)
- Dining menu (today's lunch: Veg Meals ₹60, Chicken Biriyani ₹80, Dal Fry ₹50)
- Library (12,450 books, 234 students present, capacity 400)
- Events (Hackathon on Apr 18, Cultural Fest Apr 22, Guest Lecture Apr 15)
- CGPA: 8.4, Active courses: 6, Credits earned: 42
- Next class: Data Structures & Algorithms at 10:00 AM, Room CSE 401
Be helpful, friendly, and concise. Use emojis. Keep answers brief (2-3 sentences max).`
  },
  { role: "assistant", content: "Understood! I'm ready to help students." }
];

async function sendChat() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  const text = input?.value.trim();
  if (!text || !messages) return;
  input.value = "";

  // User message
  const userDiv = document.createElement("div");
  userDiv.className = "chat-msg user";
  userDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
  messages.appendChild(userDiv);

  // Typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-msg bot typing-indicator";
  typingDiv.innerHTML = `<div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;

  // Add to history
  chatHistory.push({ role: "user", content: text });

  try {
    // Try Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are CampusAI, the smart assistant for CampusHub College. You help students with:
- Attendance info (student: Vengatesh, Roll: 21CS047, AI&DS III Year, attendance: 87%)
- Bus/shuttle timings (Route A: 4 min, Route B: 8 min delayed+3min, Route C: 12 min)
- Dining menu (today's lunch: Veg Meals ₹60, Chicken Biriyani ₹80, Dal Fry ₹50, Paneer Butter Masala ₹70)
- Library (12,450 books, 234 students present now, capacity 400)
- Events (Hackathon Apr 18, Cultural Fest Apr 22, Guest Lecture AI in Healthcare Apr 15)
- Student stats: CGPA 8.4, Active courses 6, Credits 42
- Next class: Data Structures & Algorithms 10:00 AM Room CSE 401 by Dr. Rajesh Kumar
Be helpful, friendly, and concise. Use emojis. Keep answers brief (2-3 sentences max).`,
        messages: chatHistory.filter(m => m.role !== "system").slice(-10)
      })
    });

    typingDiv.remove();

    let botText;
    if (response.ok) {
      const data = await response.json();
      botText = data.content?.[0]?.text || "I couldn't get a response.";
    } else {
      botText = getLocalBotReply(text);
    }

    chatHistory.push({ role: "assistant", content: botText });
    appendBotMessage(botText, messages);

  } catch {
    typingDiv.remove();
    const botText = getLocalBotReply(text);
    chatHistory.push({ role: "assistant", content: botText });
    appendBotMessage(botText, messages);
  }

  messages.scrollTop = messages.scrollHeight;
}

function appendBotMessage(text, container) {
  const div = document.createElement("div");
  div.className = "chat-msg bot";
  div.innerHTML = `<div class="msg-bubble">${text}</div>`;
  container.appendChild(div);
}

// Fallback local responses
function getLocalBotReply(text) {
  const t = text.toLowerCase();
  if (t.includes("attendance")) return "📊 Your attendance is 87% overall. OS has the lowest at 70% — try to attend the next few classes!";
  if (t.includes("bus") || t.includes("shuttle") || t.includes("transport")) return "🚌 Route A arrives in 4 min (on time), Route B in 8 min (delayed +3 min), Route C in 12 min. Check the Transport page for live tracking!";
  if (t.includes("lunch") || t.includes("dinner") || t.includes("breakfast") || t.includes("menu") || t.includes("food") || t.includes("eat") || t.includes("dining")) return "🍽️ Today's lunch: Veg Meals ₹60, Chicken Biriyani ₹80, Dal Fry ₹50, Paneer Butter Masala ₹70. Main Canteen is at medium occupancy!";
  if (t.includes("class") || t.includes("schedule") || t.includes("next")) return "📚 Your next class is Data Structures & Algorithms at 10:00 AM in Room CSE 401 with Dr. Rajesh Kumar!";
  if (t.includes("cgpa") || t.includes("gpa") || t.includes("grade") || t.includes("marks")) return "🎓 Your current CGPA is 8.4. You've earned 42 credits so far across 6 active courses. Keep it up!";
  if (t.includes("library") || t.includes("book")) return "📚 The library currently has 234 students (58% capacity). 8,302 books are available. Study rooms SR-101, SR-103 are free — go grab one!";
  if (t.includes("event") || t.includes("hackathon") || t.includes("fest")) return "🎉 Upcoming: Hackathon on Apr 18 (₹1L prize!), Guest Lecture on AI in Healthcare Apr 15, Cultural Fest Apr 22. Check Events page to register!";
  if (t.includes("weather")) return "🌤️ It's 30°C and sunny in Tiruvannamalai today. Perfect weather for a walk around campus!";
  if (t.includes("hello") || t.includes("hi") || t.includes("hey")) return "👋 Hi Vengatesh! How can I help you today? Ask about your attendance, bus timings, dining menu, or any campus info!";
  return "🤖 I can help with attendance, bus schedules, dining menus, library info, events, and more! Try asking something specific.";
}

// ============================================
//  TOAST NOTIFICATIONS
// ============================================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
    background:var(--sidebar-bg);border:1px solid var(--glass-border);
    padding:12px 24px;border-radius:50px;font-size:0.88rem;font-weight:600;
    box-shadow:0 8px 30px rgba(0,0,0,0.3);z-index:3000;
    animation:toastIn 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
