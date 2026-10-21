/**
 * ==============================================================================
 * FitQuest – Your Fitness Adventure
 * Core JavaScript Logic
 * ------------------------------------------------------------------------------
 * Features:
 *  - State management using browser localStorage
 *  - Dynamic XP and Level calculations
 *  - Daily Mission completion and validation (anti-duplication)
 *  - Achievement Badges unlocking logic
 *  - Filterable Workout Explorer with detail modal
 *  - Dynamic Weekly Progress Bar Chart
 *  - Random Health & Fitness Tip Generator
 *  - Responsive Mobile Navigation Drawer
 * ==============================================================================
 */

// --- 1. DEFAULT DATA DEFINITIONS ---

// The 4 Daily Fitness Quests required by the game
const DEFAULT_MISSIONS = [
  {
    id: "mission-squats",
    title: "Complete 10 Squats",
    description: "Strengthen your legs and core. Keep your chest up and push through your heels.",
    icon: "🏋️‍♂️",
    xp: 25,
    completed: false
  },
  {
    id: "mission-walk",
    title: "Walk for 10 Minutes",
    description: "A brisk walk to boost blood circulation, clear mental fog, and burn active energy.",
    icon: "🚶‍♂️",
    xp: 30,
    completed: false
  },
  {
    id: "mission-water",
    title: "Drink 6 Glasses of Water",
    description: "Stay hydrated throughout the day to optimize muscle recovery and energy levels.",
    icon: "💧",
    xp: 15,
    completed: false
  },
  {
    id: "mission-stretch",
    title: "Perform a 5-Minute Stretch",
    description: "Gentle full-body mobility to release muscle tension, improve posture, and prevent injury.",
    icon: "🧘‍♂️",
    xp: 20,
    completed: false
  }
];

// Available Workout Explorer programs
const WORKOUTS_DATA = [
  {
    id: "w-beg-1",
    title: "Full Body Awakening",
    category: "beginner",
    icon: "🌱",
    duration: "12 Mins",
    calories: "90 kcal",
    difficulty: "Beginner",
    description: "A gentle full-body routine designed to awaken dormant muscles and activate joints safely.",
    steps: [
      "Arm Circles & Neck Rolls – 2 minutes warm-up",
      "Bodyweight Wall Squats – 2 sets of 10 reps",
      "Knee Push-ups or Countertop Push-ups – 2 sets of 8 reps",
      "Glute Bridges on the floor – 2 sets of 12 reps",
      "Child's Pose stretch – 2 minutes cool-down"
    ],
    formTip: "Breathe continuously. Never hold your breath during repetitions."
  },
  {
    id: "w-str-1",
    title: "Spartan Strength Surge",
    category: "strength",
    icon: "🔥",
    duration: "25 Mins",
    calories: "220 kcal",
    difficulty: "Intermediate",
    description: "Build upper and lower body stamina with bodyweight resistance fundamentals.",
    steps: [
      "Jumping Jacks warm-up – 2 minutes",
      "Deep Tempo Squats – 3 sets of 15 reps (3 sec descent)",
      "Standard Push-ups – 3 sets of 12 reps",
      "Reverse Lunges – 3 sets of 10 reps per leg",
      "Plank Hold – 3 sets of 45 seconds"
    ],
    formTip: "Keep your abdominal wall tight as if bracing for a punch."
  },
  {
    id: "w-car-1",
    title: "Neon Cardio Blaze",
    category: "cardio",
    icon: "⚡",
    duration: "18 Mins",
    calories: "185 kcal",
    difficulty: "All Levels",
    description: "A high-energy interval blast designed to supercharge your heart rate and stamina.",
    steps: [
      "High Knees in place – 40 seconds on, 20 seconds rest",
      "Shadow Boxing combinations – 40 seconds on, 20 seconds rest",
      "Mountain Climbers – 40 seconds on, 20 seconds rest",
      "Speed Skater Hops – 40 seconds on, 20 seconds rest",
      "Deep diaphragmatic breathing recovery – 2 minutes"
    ],
    formTip: "Pace yourself in early rounds so you have stamina for the final circuit."
  },
  {
    id: "w-str-2",
    title: "Iron Core Fortress",
    category: "strength",
    icon: "🛡️",
    duration: "15 Mins",
    calories: "140 kcal",
    difficulty: "Beginner / Intermediate",
    description: "Lock down your midsection with anti-rotation and spinal stabilization exercises.",
    steps: [
      "Deadbug Exercise – 3 sets of 10 reps per side",
      "Bird-Dog Holds – 3 sets of 10 reps per side",
      "Side Plank Hold – 3 sets of 30 seconds per side",
      "Bicycle Crunches – 3 sets of 20 controlled reps"
    ],
    formTip: "Press your lower back firmly into the floor during Deadbugs."
  },
  {
    id: "w-beg-2",
    title: "Desk Worker Rescue",
    category: "beginner",
    icon: "💻",
    duration: "10 Mins",
    calories: "60 kcal",
    difficulty: "Easy",
    description: "Undo the strain of sitting with shoulder openers, hip flexor stretches, and thoracic mobility.",
    steps: [
      "Doorway Chest Stretch – 60 seconds each side",
      "Seated Figure-Four Hip Stretch – 60 seconds each side",
      "Standing Calf Raises – 2 sets of 15 reps",
      "Chin Tucks and Shoulder Blade Squeezes – 15 reps"
    ],
    formTip: "Relax your shoulders away from your ears throughout the stretches."
  },
  {
    id: "w-car-2",
    title: "HIIT Lightning Circuit",
    category: "cardio",
    icon: "🚀",
    duration: "20 Mins",
    calories: "240 kcal",
    difficulty: "Advanced",
    description: "Maximum caloric expenditure with alternating explosive movements and active recovery.",
    steps: [
      "Burpees without push-up – 30 seconds",
      "Rest – 30 seconds",
      "Jump Squats – 30 seconds",
      "Rest – 30 seconds",
      "Bear Crawl hold – 30 seconds",
      "Repeat circuit 3 total rounds"
    ],
    formTip: "Land softly on the balls of your feet to protect your knee joints."
  }
];

// Available Badges & Criteria
const BADGES_DATA = [
  {
    id: "badge-first",
    title: "First Mission",
    description: "Complete your very first fitness mission.",
    icon: "🌱",
    reward: "+10 XP Bonus",
    unlocked: false
  },
  {
    id: "badge-hydration",
    title: "Hydration Hero",
    description: "Complete the 6 glasses of water daily quest.",
    icon: "🌊",
    reward: "+15 XP Bonus",
    unlocked: false
  },
  {
    id: "badge-3day",
    title: "3-Day Champion",
    description: "Achieve a 3-day active workout streak.",
    icon: "🔥",
    reward: "+25 XP Bonus",
    unlocked: false
  },
  {
    id: "badge-master",
    title: "Mission Master",
    description: "Complete all 4 daily missions in a single day.",
    icon: "👑",
    reward: "+50 XP Bonus",
    unlocked: false
  }
];

// Curated Fitness & Health Habit Tips
const FITNESS_TIPS = [
  {
    category: "Recovery",
    text: "Muscle tissue rebuilds during deep sleep, not during workouts. Aim for 7 to 9 hours of uninterrupted rest."
  },
  {
    category: "Hydration",
    text: "A mere 2% drop in body water can decrease exercise performance and mental focus by up to 20%."
  },
  {
    category: "Consistency",
    text: "A 15-minute workout you do consistently beats a 2-hour workout you only do once every two weeks."
  },
  {
    category: "Nutrition",
    text: "Pair complex carbohydrates with lean protein after exercise to rapidly replenish muscle glycogen stores."
  },
  {
    category: "Mindset",
    text: "Fitness is a marathon of small habits. You do not have to be extreme, just remarkably consistent."
  },
  {
    category: "Posture",
    text: "Every 45 minutes of desk sitting, stand up and perform 10 glute squeezes to reactivate hip stabilizers."
  },
  {
    category: "Warm-Up",
    text: "Dynamic warm-ups (moving stretches) prepare your nervous system and joints far better than static stretching."
  }
];

// Initial Weekly Activity Data (Missions finished Mon - Sun)
const DEFAULT_WEEKLY_ACTIVITY = [
  { day: "Mon", count: 2 },
  { day: "Tue", count: 3 },
  { day: "Wed", count: 4 },
  { day: "Thu", count: 1 },
  { day: "Fri", count: 3 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 0 }
];

// Storage key in localStorage
const STORAGE_KEY = "fitquest_user_v1";

// --- 2. APPLICATION STATE ---
let state = {
  totalXP: 0,
  streak: 3,
  missions: JSON.parse(JSON.stringify(DEFAULT_MISSIONS)),
  badges: JSON.parse(JSON.stringify(BADGES_DATA)),
  weeklyActivity: JSON.parse(JSON.stringify(DEFAULT_WEEKLY_ACTIVITY)),
  completedWorkouts: []
};

// --- 3. LOCAL STORAGE MANAGEMENT ---

/**
 * Loads saved state from localStorage or initializes default state
 */
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with default schema to protect against missing keys
      state = {
        ...state,
        ...parsed,
        missions: parsed.missions || DEFAULT_MISSIONS,
        badges: parsed.badges || BADGES_DATA,
        weeklyActivity: parsed.weeklyActivity || DEFAULT_WEEKLY_ACTIVITY
      };
    }
  } catch (err) {
    console.error("Error reading from localStorage:", err);
  }
}

/**
 * Saves current state into browser localStorage
 */
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
}

// --- 4. LEVEL & XP SYSTEM CALCULATION ---

/**
 * XP & Level Rules:
 * - Each Level requires 100 XP to level up.
 * - Current Level = Math.floor(totalXP / 100) + 1
 * - Current Level XP Progress = totalXP % 100
 * - XP Remaining = 100 - (totalXP % 100)
 */
function calculateLevelStats(totalXP) {
  const XP_PER_LEVEL = 100;
  const level = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const currentXP = totalXP % XP_PER_LEVEL;
  const remainingXP = XP_PER_LEVEL - currentXP;
  const progressPercent = Math.min(100, Math.round((currentXP / XP_PER_LEVEL) * 100));

  // Determine Title based on level
  let title = "Novice Challenger";
  let tier = "Bronze Recruit";

  if (level >= 5) {
    title = "Apex Legend";
    tier = "Master Champion";
  } else if (level === 4) {
    title = "Titan Athlete";
    tier = "Platinum Vanguard";
  } else if (level === 3) {
    title = "Iron Warrior";
    tier = "Gold Striker";
  } else if (level === 2) {
    title = "Energetic Scout";
    tier = "Silver Explorer";
  }

  return {
    level,
    currentXP,
    remainingXP,
    progressPercent,
    title,
    tier,
    xpPerLevel: XP_PER_LEVEL
  };
}

// --- 5. RENDER FUNCTIONS ---

/**
 * Updates all player stats on the page (Level, XP, progress bars, streaks)
 */
function updateUIStats() {
  const stats = calculateLevelStats(state.totalXP);

  // Update Level Numbers
  document.getElementById("dashboard-level").textContent = stats.level;
  document.getElementById("mobile-level-display").textContent = stats.level;
  document.getElementById("profile-rank-badge").textContent = `Lvl ${stats.level}`;

  // Update Player Titles
  document.getElementById("level-tier-name").textContent = stats.tier;
  document.getElementById("player-title").textContent = stats.title;

  // Update XP Numbers
  document.getElementById("xp-ratio-text").textContent = `${stats.currentXP} / ${stats.xpPerLevel} XP`;
  document.getElementById("xp-remaining-text").textContent = `${stats.remainingXP} XP until Level ${stats.level + 1}`;
  document.getElementById("total-xp-display").textContent = state.totalXP;
  document.getElementById("mobile-xp-display").textContent = state.totalXP;

  // Animate XP Level Bar
  const xpBar = document.getElementById("xp-bar");
  xpBar.style.width = `${stats.progressPercent}%`;

  // Daily Missions Progress
  const completedMissions = state.missions.filter(m => m.completed).length;
  const totalMissions = state.missions.length;
  const dailyPercent = Math.round((completedMissions / totalMissions) * 100);

  document.getElementById("completed-count").textContent = completedMissions;
  document.getElementById("daily-percentage").textContent = `${dailyPercent}%`;

  const dailyBar = document.getElementById("daily-missions-bar");
  dailyBar.style.width = `${dailyPercent}%`;

  const completionPill = document.getElementById("completion-status-pill");
  if (completedMissions === totalMissions) {
    completionPill.textContent = "All Quests Done! 🎉";
    completionPill.classList.add("all-done");
  } else {
    completionPill.textContent = `${completedMissions}/${totalMissions} In Progress`;
    completionPill.classList.remove("all-done");
  }

  // Update Badges Count
  const unlockedBadges = state.badges.filter(b => b.unlocked).length;
  document.getElementById("unlocked-badges-count").textContent = unlockedBadges;

  // Update Streak
  document.getElementById("streak-counter").textContent = state.streak;
}

/**
 * Renders the 4 Daily Fitness Missions in the grid
 */
function renderMissions() {
  const container = document.getElementById("missionsGrid");
  container.innerHTML = "";

  state.missions.forEach(mission => {
    const card = document.createElement("div");
    card.className = `mission-card ${mission.completed ? "completed" : ""}`;

    card.innerHTML = `
      <div>
        <div class="mission-top-row">
          <div class="mission-icon-box">${mission.icon}</div>
          <span class="mission-xp-pill">+${mission.xp} XP</span>
        </div>
        <div class="mission-content">
          <h3 class="mission-title">${mission.title}</h3>
          <p class="mission-desc">${mission.description}</p>
        </div>
      </div>
      <div class="mission-footer">
        <span class="mission-status-text">
          ${mission.completed ? "Completed Today ✓" : "Ready for Action"}
        </span>
        <button 
          class="btn-primary mission-action-btn" 
          data-id="${mission.id}" 
          ${mission.completed ? "disabled" : ""}>
          ${mission.completed ? "Done! ✓" : "Complete (+ " + mission.xp + " XP)"}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event listeners to mission buttons
  const buttons = container.querySelectorAll(".mission-action-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const missionId = btn.getAttribute("data-id");
      completeMission(missionId);
    });
  });
}

/**
 * Handles completing a mission, awarding XP, and checking badges
 */
function completeMission(missionId) {
  // Input validation & safety check
  const mission = state.missions.find(m => m.id === missionId);
  if (!mission || mission.completed) return;

  const previousLevel = calculateLevelStats(state.totalXP).level;

  // Mark mission as completed
  mission.completed = true;
  state.totalXP += mission.xp;

  // Increment today's activity in weekly chart
  incrementTodayWeeklyCount();

  // Show XP Toast
  showToast("⚡ XP Earned!", `You gained +${mission.xp} XP for completing: ${mission.title}`, "xp");

  // Check for Level Up
  const newLevel = calculateLevelStats(state.totalXP).level;
  if (newLevel > previousLevel) {
    showToast("🎉 LEVEL UP!", `Congratulations! You ascended to Level ${newLevel}!`, "levelup");
  }

  // Check achievement criteria
  checkAchievements();

  // Save to localStorage & update UI
  saveState();
  updateUIStats();
  renderMissions();
  renderBadges();
  renderWeeklyChart();
}

/**
 * Updates the weekly activity chart data for today
 */
function incrementTodayWeeklyCount() {
  // Map JS getDay() [0:Sun, 1:Mon, ..., 6:Sat] to our chart array
  const dayIndexMap = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
  const currentDayOfWeek = new Date().getDay();
  const chartIdx = dayIndexMap[currentDayOfWeek];

  if (state.weeklyActivity[chartIdx]) {
    state.weeklyActivity[chartIdx].count = Math.min(4, state.weeklyActivity[chartIdx].count + 1);
  }
}

/**
 * Checks rules for unlocking achievement badges
 */
function checkAchievements() {
  const completedMissionsCount = state.missions.filter(m => m.completed).length;

  state.badges.forEach(badge => {
    // Skip if already unlocked
    if (badge.unlocked) return;

    let shouldUnlock = false;

    // Rule 1: First Mission badge
    if (badge.id === "badge-first" && completedMissionsCount >= 1) {
      shouldUnlock = true;
    }

    // Rule 2: Hydration Hero badge
    const waterMission = state.missions.find(m => m.id === "mission-water");
    if (badge.id === "badge-hydration" && waterMission && waterMission.completed) {
      shouldUnlock = true;
    }

    // Rule 3: 3-Day Champion badge
    if (badge.id === "badge-3day" && state.streak >= 3) {
      shouldUnlock = true;
    }

    // Rule 4: Mission Master badge (all 4 completed)
    if (badge.id === "badge-master" && completedMissionsCount === state.missions.length) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      badge.unlocked = true;
      showToast("🏆 BADGE UNLOCKED!", `You unlocked the "${badge.title}" badge!`, "badge");
    }
  });
}

/**
 * Renders the Achievements and Badges
 */
function renderBadges() {
  const container = document.getElementById("achievementsGrid");
  container.innerHTML = "";

  state.badges.forEach(badge => {
    const card = document.createElement("div");
    card.className = `badge-card ${badge.unlocked ? "unlocked" : "locked"}`;

    card.innerHTML = `
      <span class="badge-status-pill">${badge.unlocked ? "Unlocked" : "Locked"}</span>
      <div class="badge-icon-wrapper">
        <span>${badge.icon}</span>
      </div>
      <h3 class="badge-title">${badge.title}</h3>
      <p class="badge-desc">${badge.description}</p>
      <span class="badge-reward-tag">${badge.unlocked ? "Reward Claimed" : badge.reward}</span>
    `;

    container.appendChild(card);
  });
}

/**
 * Renders the Workout Explorer cards with category filtering
 */
function renderWorkouts(categoryFilter = "all") {
  const container = document.getElementById("workoutGrid");
  container.innerHTML = "";

  const filtered = categoryFilter === "all" 
    ? WORKOUTS_DATA 
    : WORKOUTS_DATA.filter(w => w.category === categoryFilter);

  filtered.forEach(workout => {
    const card = document.createElement("div");
    card.className = "workout-card";

    card.innerHTML = `
      <div class="workout-card-visual">
        <span>${workout.icon}</span>
        <span class="workout-badge-category ${workout.category}">${workout.category}</span>
      </div>
      <div class="workout-card-body">
        <h3 class="workout-card-title">${workout.title}</h3>
        <p class="workout-card-desc">${workout.description}</p>
        <div class="workout-meta-chips">
          <span class="meta-chip">⏱️ ${workout.duration}</span>
          <span class="meta-chip">🔥 ${workout.calories}</span>
          <span class="meta-chip">⭐ ${workout.difficulty}</span>
        </div>
        <button class="btn-secondary view-workout-btn" data-id="${workout.id}">
          View Workout Details
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach modal trigger listeners
  container.querySelectorAll(".view-workout-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const workoutId = btn.getAttribute("data-id");
      openWorkoutModal(workoutId);
    });
  });
}

/**
 * Renders the Weekly Progress HTML & CSS Chart
 */
function renderWeeklyChart() {
  const container = document.getElementById("weeklyChart");
  container.innerHTML = "";

  // Identify today's day abbreviation
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayName = dayNames[new Date().getDay()];

  let totalWeeklyMissions = 0;
  let maxDay = { day: "Mon", count: 0 };

  state.weeklyActivity.forEach(item => {
    totalWeeklyMissions += item.count;
    if (item.count > maxDay.count) {
      maxDay = item;
    }

    // Max 4 daily missions = 100% height (or scale accordingly)
    const heightPercent = Math.min(100, Math.round((item.count / 4) * 100));
    const isToday = item.day === todayName;

    const col = document.createElement("div");
    col.className = `chart-day-column ${isToday ? "today" : ""}`;

    col.innerHTML = `
      <div class="chart-bar-slot">
        <div class="chart-bar-fill ${isToday ? "active-day" : ""}" style="height: ${Math.max(8, heightPercent)}%;">
          <span class="chart-value-tooltip">${item.count}</span>
        </div>
      </div>
      <span class="chart-day-label">${item.day}</span>
    `;

    container.appendChild(col);
  });

  // Update chart summary stats
  document.getElementById("weekly-total-missions").textContent = `${totalWeeklyMissions} Missions`;
  document.getElementById("weekly-best-day").textContent = `${maxDay.day} (${maxDay.count})`;
  
  const consistencyEl = document.getElementById("weekly-consistency");
  if (totalWeeklyMissions >= 15) {
    consistencyEl.textContent = "Elite (Top 5%)";
  } else if (totalWeeklyMissions >= 8) {
    consistencyEl.textContent = "Strong Habit";
  } else {
    consistencyEl.textContent = "Building";
  }
}

/**
 * Displays a random fitness tip from the collection
 */
function displayRandomTip() {
  const randomIndex = Math.floor(Math.random() * FITNESS_TIPS.length);
  const tip = FITNESS_TIPS[randomIndex];

  const quoteEl = document.getElementById("tip-text");
  const catEl = document.getElementById("tip-category");

  // Subtle fade animation
  quoteEl.style.opacity = "0.2";

  setTimeout(() => {
    catEl.textContent = tip.category;
    quoteEl.textContent = `"${tip.text}"`;
    quoteEl.style.opacity = "1";
  }, 180);
}

// --- 6. WORKOUT DETAILS MODAL ---

let activeModalWorkoutId = null;

function openWorkoutModal(workoutId) {
  const workout = WORKOUTS_DATA.find(w => w.id === workoutId);
  if (!workout) return;

  activeModalWorkoutId = workoutId;

  document.getElementById("modalCategory").textContent = workout.category;
  document.getElementById("modalTitle").textContent = workout.title;
  document.getElementById("modalDuration").textContent = workout.duration;
  document.getElementById("modalCalories").textContent = workout.calories;
  document.getElementById("modalDifficulty").textContent = workout.difficulty;
  document.getElementById("modalDescription").textContent = workout.description;
  document.getElementById("modalFormTip").textContent = workout.formTip;

  // Render Exercise Steps
  const stepsList = document.getElementById("modalStepsList");
  stepsList.innerHTML = "";
  workout.steps.forEach((step, idx) => {
    const li = document.createElement("li");
    li.className = "step-item";
    li.innerHTML = `
      <span class="step-number">${idx + 1}</span>
      <span>${step}</span>
    `;
    stepsList.appendChild(li);
  });

  // Modal completed button state check
  const startBtn = document.getElementById("modalStartBtn");
  const alreadyDone = state.completedWorkouts && state.completedWorkouts.includes(workoutId);
  
  if (alreadyDone) {
    startBtn.textContent = "Workout Already Completed Today ✓";
    startBtn.disabled = true;
  } else {
    startBtn.textContent = "Mark Workout Completed (+50 XP)";
    startBtn.disabled = false;
  }

  // Open modal
  const modal = document.getElementById("workoutModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeWorkoutModal() {
  const modal = document.getElementById("workoutModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  activeModalWorkoutId = null;
}

// Complete Workout from Modal
function completeWorkoutFromModal() {
  if (!activeModalWorkoutId) return;

  if (!state.completedWorkouts) {
    state.completedWorkouts = [];
  }

  if (state.completedWorkouts.includes(activeModalWorkoutId)) return;

  state.completedWorkouts.push(activeModalWorkoutId);
  const workoutXP = 50;
  state.totalXP += workoutXP;

  showToast("🏋️ Workout Mastered!", `You conquered this workout and earned +${workoutXP} XP!`, "xp");

  // Check level up
  const stats = calculateLevelStats(state.totalXP);
  if (stats.currentXP < workoutXP) {
    showToast("🎉 LEVEL UP!", `You ascended to Level ${stats.level}!`, "levelup");
  }

  saveState();
  updateUIStats();
  closeWorkoutModal();
}

// --- 7. TOAST NOTIFICATION SYSTEM ---

function showToast(title, message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  let typeClass = "";
  let icon = "🔔";

  if (type === "badge") {
    typeClass = "toast-badge";
    icon = "🏆";
  } else if (type === "levelup") {
    typeClass = "toast-levelup";
    icon = "⚡";
  } else if (type === "xp") {
    icon = "✨";
  }

  toast.className = `toast ${typeClass}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <h4 class="toast-title">${title}</h4>
      <p class="toast-desc">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px) scale(0.9)";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// --- 8. RESET DEMO DATA ---

function resetAllData() {
  if (confirm("Reset all FitQuest progress back to default demo state?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = {
      totalXP: 0,
      streak: 3,
      missions: JSON.parse(JSON.stringify(DEFAULT_MISSIONS)),
      badges: JSON.parse(JSON.stringify(BADGES_DATA)),
      weeklyActivity: JSON.parse(JSON.stringify(DEFAULT_WEEKLY_ACTIVITY)),
      completedWorkouts: []
    };
    saveState();
    updateUIStats();
    renderMissions();
    renderBadges();
    renderWeeklyChart();
    showToast("🔄 Data Reset", "Your FitQuest progress has been refreshed.", "info");
  }
}

// --- 9. EVENT LISTENERS & INITIALIZATION ---

function setupAuthListeners() {
  const signInForm = document.getElementById("signInForm");
  const signUpForm = document.getElementById("signUpForm");
  const signInTab = document.getElementById("showSignIn");
  const signUpTab = document.getElementById("showSignUp");
  const authStatus = document.getElementById("authStatus");
  const authScreen = document.getElementById("authScreen");
  const appLayout = document.getElementById("appLayout");
  const mobileHeader = document.getElementById("mobileHeader");
  const signOutButton = document.getElementById("signOutBtn");
  const profileName = document.querySelector(".profile-name");
  const securityNote = document.querySelector(".auth-security-note");
  const config = window.FITQUEST_SUPABASE_CONFIG;
  let authClient = null;

  function showApp(session = null) {
    authScreen.hidden = true;
    appLayout.hidden = false;
    mobileHeader.hidden = false;
    signOutButton.hidden = !session;
    profileName.textContent = session?.user?.email || "Fit Explorer";
    document.querySelector(".main-content").focus();
  }

  function showAuth() {
    authScreen.hidden = false;
    appLayout.hidden = true;
    mobileHeader.hidden = true;
    signOutButton.hidden = true;
  }

  const hasConfig = config
    && /^https:\/\/[^/]+$/.test(config.url)
    && config.anonKey
    && !config.anonKey.includes("YOUR_SUPABASE");
  if (hasConfig && window.supabase?.createClient) {
    authClient = window.supabase.createClient(config.url, config.anonKey);
  } else if (hasConfig) {
    authStatus.textContent = "Supabase's client library could not load. Check your internet connection and reload.";
    securityNote.textContent = "Supabase's client library must load before account sign-in can work.";
  } else {
    authStatus.textContent = "Add your Supabase project URL and public anon/publishable key to supabase-config.js to enable accounts.";
    securityNote.textContent = "Authentication requires a Supabase project. Set its URL and public anon/publishable key in supabase-config.js.";
  }

  function showForm(mode) {
    const isSignUp = mode === "sign-up";
    signInForm.hidden = isSignUp;
    signUpForm.hidden = !isSignUp;
    signInTab.classList.toggle("active", !isSignUp);
    signUpTab.classList.toggle("active", isSignUp);
    signInTab.setAttribute("aria-pressed", String(!isSignUp));
    signUpTab.setAttribute("aria-pressed", String(isSignUp));
    authStatus.textContent = "";
  }

  signInTab.addEventListener("click", () => showForm("sign-in"));
  signUpTab.addEventListener("click", () => showForm("sign-up"));

  [
    { mode: "sign-in", form: signInForm, button: document.getElementById("signInSubmit") },
    { mode: "sign-up", form: signUpForm, button: document.getElementById("signUpSubmit") }
  ].forEach(({ mode, form, button }) => {
    button.addEventListener("click", () => {
      const inputs = Array.from(form.querySelectorAll("input"));
      const firstInvalidInput = inputs.find((input) => !input.checkValidity());
      if (firstInvalidInput) {
        firstInvalidInput.reportValidity();
        return;
      }
      if (!authClient) {
        authStatus.textContent = "Supabase isn't configured. Add your project URL and public key to supabase-config.js, then reload.";
        return;
      }
      if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
        authStatus.textContent = "For secure authentication, open FitQuest on localhost or an HTTPS website, not as a file.";
        return;
      }

      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelector('input[type="password"]').value;
      button.disabled = true;
      authStatus.textContent = mode === "sign-in" ? "Signing in..." : "Creating your account...";
      const request = mode === "sign-in"
        ? authClient.auth.signInWithPassword({ email, password })
        : authClient.auth.signUp({ email, password });

      request.then(({ data, error }) => {
        if (error) {
          throw error;
        }
        form.querySelectorAll('input[type="password"]').forEach((input) => {
          input.value = "";
        });
        if (mode === "sign-up" && !data.session) {
          authStatus.textContent = "Account created. Check your email for the confirmation link, then sign in.";
          return;
        }
        authStatus.textContent = "";
        showApp(data.session);
      }).catch((error) => {
        console.error("Supabase authentication failed:", error);
        authStatus.textContent = error.message || "Authentication failed. Please try again.";
      }).finally(() => {
        button.disabled = false;
      });
    });
  });

  document.querySelectorAll("[data-password-toggle]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const passwordInput = document.getElementById(toggle.dataset.passwordToggle);
      const showPassword = passwordInput.type === "password";
      passwordInput.type = showPassword ? "text" : "password";
      toggle.textContent = showPassword ? "Hide" : "Show";
      toggle.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
    });
  });

  document.getElementById("continueAsGuest").addEventListener("click", () => {
    showApp();
  });

  signOutButton.addEventListener("click", async () => {
    if (!authClient) {
      return;
    }
    try {
      const { error } = await authClient.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Supabase sign-out failed:", error);
      showToast("Sign Out Failed", error.message || "Please try again.");
    }
  });

  return { authClient, showApp, showAuth };
}

function setupEventListeners() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      sidebar.classList.toggle("mobile-open");
    });

    // Close menu when clicking navigation link on mobile
    const navLinks = sidebar.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        sidebar.classList.remove("mobile-open");

        // Set active link class
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // Workout Filter Tabs
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderWorkouts(filter);
    });
  });

  // Modal Close Listeners
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modal = document.getElementById("workoutModal");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeWorkoutModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeWorkoutModal();
      }
    });
  }

  // Complete workout from modal button
  const modalStartBtn = document.getElementById("modalStartBtn");
  if (modalStartBtn) {
    modalStartBtn.addEventListener("click", completeWorkoutFromModal);
  }

  // Fitness Tip Generator Button
  const newTipBtn = document.getElementById("newTipBtn");
  if (newTipBtn) {
    newTipBtn.addEventListener("click", displayRandomTip);
  }

  // Reset Data Button
  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllData);
  }

  // Keyboard shortcut: Escape closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeWorkoutModal();
    }
  });
}

// --- 10. APP BOOTSTRAP ---
document.addEventListener("DOMContentLoaded", () => {
  const auth = setupAuthListeners();
  loadState();
  setupEventListeners();
  updateUIStats();
  renderMissions();
  renderWorkouts("all");
  renderBadges();
  renderWeeklyChart();

  if (auth.authClient) {
    auth.authClient.auth.onAuthStateChange((event, session) => {
      if (session) {
        auth.showApp(session);
      } else if (event === "SIGNED_OUT") {
        auth.showAuth();
      }
    });
    auth.authClient.auth.getSession().then(({ data, error }) => {
      if (error) {
        throw error;
      }
      if (data.session) {
        auth.showApp(data.session);
      }
    }).catch((error) => {
      console.error("Could not restore the Supabase session:", error);
      document.getElementById("authStatus").textContent = "Could not restore your sign-in. Please try signing in again.";
    });
  }
});
