const compareButtons = document.querySelectorAll(".compare-btn");

compareButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const collegeId = button.dataset.collegeId;

    let selectedColleges =
      JSON.parse(localStorage.getItem("selectedColleges")) || [];

    if (selectedColleges.includes(collegeId)) {
      selectedColleges = selectedColleges.filter((id) => id !== collegeId);
    } else {
      if (selectedColleges.length >= 3) {
        alert("You can compare up to 3 colleges.");
        return;
      }

      selectedColleges.push(collegeId);
    }
    localStorage.setItem("selectedColleges", JSON.stringify(selectedColleges));
    if (selectedColleges.includes(collegeId)) {
      button.textContent = "✓ Added";
    } else {
      button.textContent = "Compare";
    }

    const compareCount = document.querySelector("#compare-count");

    if (compareCount) {
      compareCount.textContent = `${selectedColleges.length} colleges selected`;
    }

    console.log("Selected colleges:", selectedColleges);
  });
});

const compareCount = document.querySelector("#compare-count");

if (compareCount) {
  const selectedColleges =
    JSON.parse(localStorage.getItem("selectedColleges")) || [];

  compareCount.textContent = `${selectedColleges.length} colleges selected`;
}

const compareNow = document.querySelector("#compare-now");

if (compareNow) {
  compareNow.addEventListener("click", () => {
    const selectedColleges =
      JSON.parse(localStorage.getItem("selectedColleges")) || [];

    if (selectedColleges.length < 2) {
      alert("Please select at least 2 colleges to compare.");
      return;
    }

    console.log("Ready to compare:", selectedColleges);
    window.location.href = `/colleges/compare?ids=${selectedColleges.join(",")}`;
  });
}
const savedColleges =
  JSON.parse(localStorage.getItem("selectedColleges")) || [];

compareButtons.forEach(button => {

  const collegeId = button.dataset.collegeId;

  if (savedColleges.includes(collegeId)) {
    button.textContent = "✓ Added";
  }

});


/* My College Shortlist */

const shortlistButtons = document.querySelectorAll(".shortlist-btn");

function getShortlistedColleges() {
  try {
    return JSON.parse(localStorage.getItem("shortlistedColleges")) || [];
  } catch (error) {
    return [];
  }
}

function updateShortlistButton(button) {
  const colleges = getShortlistedColleges();
  const isSaved = colleges.some(
    (college) => college.id === button.dataset.collegeId
  );

  button.textContent = isSaved ? "♥ Saved" : "♡ Save College";
  button.classList.toggle("is-saved", isSaved);
}

shortlistButtons.forEach((button) => {
  updateShortlistButton(button);

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const id = button.dataset.collegeId;
    let colleges = getShortlistedColleges();

    const alreadySaved = colleges.some(
      (college) => college.id === id
    );

    if (alreadySaved) {
      colleges = colleges.filter((college) => college.id !== id);
    } else {
      colleges.push({
        id: id,
        name: button.dataset.collegeName,
        location: button.dataset.collegeLocation,
        url: button.dataset.collegeUrl
      });
    }

    localStorage.setItem("shortlistedColleges", JSON.stringify(colleges));

    updateShortlistButton(button);
    renderShortlist();

    if (document.querySelector("#shortlist-message")) {
      document.querySelector("#shortlist-message").textContent =
        alreadySaved
          ? "College removed from your shortlist."
          : "College saved to your shortlist.";
    }
  });
});

/* Display saved colleges on the dashboard */

function renderShortlist() {
  const container = document.querySelector("#shortlist-container");
  if (!container) return;

  const colleges = getShortlistedColleges();
  container.replaceChildren();

  const count = document.querySelector("#shortlist-total");
  if (count) count.textContent = colleges.length;

  if (colleges.length === 0) {
    const message = document.createElement("p");
    message.className = "shortlist-empty";
    message.textContent =
      "You haven't saved any colleges yet. Explore colleges and save the ones you like.";
    container.appendChild(message);
    return;
  }

  colleges.forEach((college) => {
    const card = document.createElement("div");
    card.className = "shortlist-item";

    const details = document.createElement("div");
    details.className = "shortlist-item-details";

    const name = document.createElement("h3");
    name.textContent = college.name;

    const location = document.createElement("p");
    location.textContent = "📍 " + college.location;

    const link = document.createElement("a");
    link.href = college.url;
    link.textContent = "View college →";

    details.append(name, location, link);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "shortlist-remove";
    remove.textContent = "Remove";

    remove.addEventListener("click", () => {
      const updated = getShortlistedColleges().filter(
        (item) => item.id !== college.id
      );

      localStorage.setItem("shortlistedColleges", JSON.stringify(updated));
      renderShortlist();
    });

    card.append(details, remove);
    container.appendChild(card);
  });
}

renderShortlist();


/* Interactive college planning checklist */

const planningCheckboxes = document.querySelectorAll(
  ".planning-checkbox"
);

const planningStorageKey = "eduguidePlanningProgress";

function loadPlanningProgress() {
  try {
    return JSON.parse(
      localStorage.getItem(planningStorageKey)
    ) || {};
  } catch (error) {
    return {};
  }
}

function updatePlanningProgress() {
  const savedProgress = loadPlanningProgress();
  let completed = 0;

  planningCheckboxes.forEach((checkbox) => {
    const task = checkbox.dataset.planningTask;
    const isComplete = Boolean(savedProgress[task]);

    checkbox.checked = isComplete;

    const item = checkbox.closest(".planning-item");

    if (item) {
      item.classList.toggle("is-complete", isComplete);
    }

    if (isComplete) {
      completed++;
    }
  });

  const total = planningCheckboxes.length;
  const percentage = total === 0
    ? 0
    : (completed / total) * 100;

  const progressText = document.querySelector(
    "#planning-progress-text"
  );

  const progressFill = document.querySelector(
    "#planning-progress-fill"
  );

  const progressBar = document.querySelector(
    "#planning-progress-bar"
  );

  if (progressText) {
    progressText.textContent =
      `${completed} of ${total} completed`;
  }

  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }

  if (progressBar) {
    progressBar.setAttribute("aria-valuenow", completed);
  }
}

planningCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const savedProgress = loadPlanningProgress();

    savedProgress[checkbox.dataset.planningTask] =
      checkbox.checked;

    localStorage.setItem(
      planningStorageKey,
      JSON.stringify(savedProgress)
    );

    updatePlanningProgress();
  });
});

updatePlanningProgress();
