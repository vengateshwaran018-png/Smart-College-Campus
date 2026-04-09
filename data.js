// ============================================
//  CAMPUS HUB - DATA STORE
// ============================================

const campusData = {
  student: {
    name: "Vengatesh",
    rollNo: "21CS047",
    department: "Artificial Intelligence And DataScience",
    year: "III Year",
    section: "B",
    cgpa: 8.4,
    attendance: 87,
    credits: 42,
    activeCourses: 6
  },

  schedule: [
    { time: "08:30", subject: "Engineering Mathematics", room: "LH-101", prof: "Dr. Anand S.", status: "done" },
    { time: "10:00", subject: "Data Structures & Algorithms", room: "CSE 401", prof: "Dr. Rajesh Kumar", status: "current" },
    { time: "11:30", subject: "Database Management", room: "CSE 302", prof: "Dr. Priya M.", status: "upcoming" },
    { time: "14:00", subject: "Computer Networks", room: "CSE 401", prof: "Dr. Vikram R.", status: "upcoming" },
    { time: "15:30", subject: "Operating Systems Lab", room: "Lab 2", prof: "Ms. Divya K.", status: "upcoming" }
  ],

  transit: [
    { id: "B1", route: "Route A - Blue Line", destination: "City Center ↔ Campus", nextArrival: 4, delay: "On Time", crowd: "Low", status: "on-time", stops: ["Main Gate", "Library", "CSE Block", "Hostel"] },
    { id: "B2", route: "Route B - Red Line", destination: "Railway Station ↔ Campus", nextArrival: 8, delay: "+3 min", crowd: "Medium", status: "delayed", stops: ["Main Gate", "Canteen", "Mech Block", "Railway Station"] },
    { id: "B3", route: "Route C - Green Line", destination: "North Campus Loop", nextArrival: 12, delay: "On Time", crowd: "High", status: "on-time", stops: ["Admin Block", "Library", "Hostel", "Sports Complex"] },
    { id: "B4", route: "Route D - Orange Line", destination: "Airport ↔ Campus", nextArrival: 25, delay: "On Time", crowd: "Low", status: "on-time", stops: ["Main Gate", "Admin Block", "Airport"] }
  ],

  busSchedule: [
    { route: "Route A", departs: "07:00", arrives: "07:35", driver: "Rajan K.", seats: 42, available: 18, status: "En Route" },
    { route: "Route B", departs: "07:15", arrives: "08:10", driver: "Suresh M.", seats: 40, available: 5, status: "Boarding" },
    { route: "Route A", departs: "08:00", arrives: "08:35", driver: "Rajan K.", seats: 42, available: 32, status: "Scheduled" },
    { route: "Route C", departs: "08:30", arrives: "09:00", driver: "Murugan V.", seats: 38, available: 20, status: "Scheduled" },
    { route: "Route D", departs: "09:00", arrives: "09:45", driver: "Arun P.", seats: 45, available: 40, status: "Scheduled" }
  ],

  dining: {
    breakfast: [
      { name: "Idli & Sambar", icon: "🫕", calories: 280, tags: ["veg"], price: 25 },
      { name: "Masala Dosa", icon: "🥞", calories: 340, tags: ["veg"], price: 35 },
      { name: "Upma", icon: "🍚", calories: 220, tags: ["veg", "vegan"], price: 20 },
      { name: "Pongal", icon: "🍲", calories: 310, tags: ["veg"], price: 30 }
    ],
    lunch: [
      { name: "Veg Meals", icon: "🍱", calories: 650, tags: ["veg"], price: 60 },
      { name: "Chicken Biriyani", icon: "🍛", calories: 780, tags: ["nonveg"], price: 80 },
      { name: "Dal Fry & Rice", icon: "🍚", calories: 520, tags: ["veg", "vegan"], price: 50 },
      { name: "Paneer Butter Masala", icon: "🧆", calories: 600, tags: ["veg"], price: 70 }
    ],
    dinner: [
      { name: "Chapati & Dal", icon: "🫓", calories: 480, tags: ["veg"], price: 45 },
      { name: "Fried Rice", icon: "🍳", calories: 560, tags: ["veg"], price: 55 },
      { name: "Egg Curry", icon: "🍳", calories: 490, tags: ["nonveg"], price: 60 },
      { name: "Curd Rice", icon: "🥛", calories: 380, tags: ["veg"], price: 35 }
    ]
  },

  cafeterias: [
    { name: "Main Canteen", current: 142, capacity: 200, status: "med" },
    { name: "CSE Cafeteria", current: 38, capacity: 80, status: "low" },
    { name: "Hostel Mess", current: 196, capacity: 250, status: "high" },
    { name: "Staff Dining", current: 22, capacity: 60, status: "low" }
  ],

  books: [
    { title: "Introduction to Algorithms", author: "CLRS", available: true, icon: "📘", color: "rgba(99,102,241,0.2)" },
    { title: "Computer Networks", author: "Tanenbaum", available: false, icon: "📗", color: "rgba(16,185,129,0.2)" },
    { title: "Operating Systems", author: "Silberschatz", available: true, icon: "📕", color: "rgba(239,68,68,0.2)" },
    { title: "Database Systems", author: "Ramakrishnan", available: true, icon: "📙", color: "rgba(245,158,11,0.2)" },
    { title: "Artificial Intelligence", author: "Russell & Norvig", available: false, icon: "📓", color: "rgba(167,139,250,0.2)" },
    { title: "Machine Learning", author: "Bishop", available: true, icon: "📒", color: "rgba(6,182,212,0.2)" }
  ],

  borrowedBooks: [
    { title: "Design Patterns", due: "Apr 18, 2026", overdue: false },
    { title: "Clean Code", due: "Apr 05, 2026", overdue: true }
  ],

  studyRooms: [
    { name: "SR-101", capacity: 6, status: "available" },
    { name: "SR-102", capacity: 4, status: "occupied" },
    { name: "SR-103", capacity: 8, status: "available" },
    { name: "SR-104", capacity: 10, status: "available" },
    { name: "SR-201", capacity: 6, status: "occupied" },
    { name: "SR-202", capacity: 4, status: "available" },
    { name: "SR-203", capacity: 8, status: "occupied" },
    { name: "SR-204", capacity: 12, status: "available" }
  ],

  subjectAttendance: [
    { name: "Engineering Mathematics", attended: 22, total: 26, pct: 85 },
    { name: "Data Structures & Algorithms", attended: 24, total: 26, pct: 92 },
    { name: "Database Management Systems", attended: 18, total: 24, pct: 75 },
    { name: "Computer Networks", attended: 20, total: 22, pct: 91 },
    { name: "Operating Systems", attended: 14, total: 20, pct: 70 },
    { name: "Web Technologies", attended: 19, total: 22, pct: 86 }
  ],

  skills: [
    { name: "Python", pct: 82, color: "#6366f1" },
    { name: "Java", pct: 74, color: "#06b6d4" },
    { name: "Data Structures", pct: 88, color: "#10b981" },
    { name: "SQL", pct: 65, color: "#f59e0b" },
    { name: "Machine Learning", pct: 45, color: "#a78bfa" },
    { name: "React.js", pct: 60, color: "#ef4444" }
  ],

  courses: [
    { name: "Deep Learning Fundamentals", provider: "NPTEL", level: "intermediate", match: "94% match", icon: "🧠" },
    { name: "Full Stack Development", provider: "Coursera", level: "intermediate", match: "91% match", icon: "💻" },
    { name: "Cloud Computing AWS", provider: "AWS Educate", level: "beginner", match: "88% match", icon: "☁️" },
    { name: "System Design", provider: "Algoexpert", level: "advanced", match: "85% match", icon: "🏗️" },
    { name: "Data Science with Python", provider: "edX", level: "intermediate", match: "83% match", icon: "📊" },
    { name: "Competitive Programming", provider: "Codeforces", level: "advanced", match: "79% match", icon: "🏆" }
  ],

  studyPlan: [
    { subject: "DSA - Trees & Graphs", time: "9:00 - 10:30 AM", done: true },
    { subject: "DBMS - Normalization", time: "11:00 - 12:00 PM", done: true },
    { subject: "Networks - TCP/IP", time: "2:00 - 3:30 PM", done: false },
    { subject: "OS - Memory Management", time: "4:00 - 5:00 PM", done: false },
    { subject: "Math - Linear Algebra", time: "7:00 - 8:00 PM", done: false }
  ],

  events: [
    { title: "National Level Hackathon 2026", date: { day: "18", month: "APR" }, time: "9:00 AM", venue: "Tech Arena", category: "tech", desc: "48-hour hackathon with ₹1L prize pool" },
    { title: "Cultural Fiesta - Kalai Thiruvizha", date: { day: "22", month: "APR" }, time: "5:00 PM", venue: "Open Auditorium", category: "cultural", desc: "Annual cultural fest with dance, music & drama" },
    { title: "Guest Lecture: AI in Healthcare", date: { day: "15", month: "APR" }, time: "11:00 AM", venue: "Seminar Hall 1", category: "academic", desc: "By Dr. Arun Sharma, IIT Madras" },
    { title: "Cricket Inter-Department Tournament", date: { day: "20", month: "APR" }, time: "8:00 AM", venue: "Sports Ground", category: "sports", desc: "Annual cricket championship" },
    { title: "Resume Building Workshop", date: { day: "16", month: "APR" }, time: "2:00 PM", venue: "CSE Seminar Hall", category: "academic", desc: "Career guidance by alumni panel" },
    { title: "IoT & Embedded Systems Expo", date: { day: "25", month: "APR" }, time: "10:00 AM", venue: "Exhibition Hall", category: "tech", desc: "Showcase your projects to industry experts" }
  ],

  alerts: [
    { type: "warning", title: "Exam Timetable Released", msg: "End semester exams scheduled from May 12. Check your hall ticket.", time: "2 hrs ago" },
    { type: "info", title: "Library Extended Hours", msg: "Library will be open till 11 PM during exam season.", time: "4 hrs ago" },
    { type: "danger", title: "Water Supply Disruption", msg: "Hostel Block C water supply interrupted. Maintenance in progress.", time: "1 hr ago" },
    { type: "success", title: "Scholarship Applications Open", msg: "Merit scholarship applications open till April 30. Apply via Student Portal.", time: "Yesterday" }
  ],

  notifications: [
    { text: "Your attendance in OS dropped below 75%. Attend next class.", time: "10 min ago" },
    { text: "New assignment posted in Computer Networks by Dr. Vikram.", time: "1 hr ago" },
    { text: "Shuttle Route B delayed by 5 minutes due to traffic.", time: "2 hrs ago" },
    { text: "Hackathon registration closes in 2 days. Register now!", time: "3 hrs ago" }
  ],

  analytics: {
    totalStudents: 2847,
    totalFaculty: 148,
    activeBuses: 12,
    avgAttendance: 82,
    energyKwh: 1240,
    depts: [
      { name: "CSE", score: 88 },
      { name: "ECE", score: 84 },
      { name: "MECH", score: 79 },
      { name: "CIVIL", score: 76 },
      { name: "EEE", score: 81 }
    ],
    monthlyAttendance: [78, 82, 79, 85, 83, 87, 84, 88, 85, 82, 86, 87]
  }
};
