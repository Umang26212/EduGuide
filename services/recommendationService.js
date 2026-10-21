const calculateRecommendation = (college, preferences = {}) => {
  const weights = {
    course: 5,
    location: 4,
    hostel: 3,
    collegeType: 2,
    budget: 2,
  };

  let score = 0;
  let maxScore = 0;

  const matches = [];
  const mismatches = [];
  const unverified = [];

  const normalize = (value) =>
    String(value ?? "")
      .trim()
      .toLowerCase();

  const isSpecified = (value) =>
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "" &&
    !/^any(?:\s|$)/i.test(String(value).trim());

  const normalizeCourse = (value) =>
    normalize(value)
      .replace(/[^a-z0-9]/g, "")
      .replace(/^(bacheloroftechnology|btech|bachelorofengineering|be)/, "")
      .replace(/^in/, "");

  const { course, location, collegeType, budget, hostel } = preferences;

  // Course matching
  if (isSpecified(course)) {
    maxScore += weights.course;

    const requestedCourse = normalizeCourse(course);

    const isCSERequest =
      requestedCourse === "cse" ||
      requestedCourse.includes("computerscienceandengineering") ||
      requestedCourse.includes("computerscienceengineering");

    let acceptedNames = [requestedCourse];

    if (isCSERequest) {
      acceptedNames = [
        "cse",
        "computerscienceandengineering",
        "computerscienceengineering",
      ];
    } else if (
      requestedCourse === "it" ||
      requestedCourse === "informationtechnology"
    ) {
      acceptedNames = ["it", "informationtechnology"];
    }

    const courses = Array.isArray(college.courses)
      ? college.courses
      : typeof college.courses === "string"
        ? [college.courses]
        : [];

    // Check for an exact or recognized course-name match first.
    const courseMatches = courses.some((item) => {
      const stored = normalizeCourse(item);

      return acceptedNames.some(
        (name) =>
          stored === name || (name.length >= 5 && stored.includes(name)),
      );
    });

    if (courseMatches) {
      score += weights.course;
      matches.push("Your preferred course is available");
    } else {
      // Related courses receive partial credit for a CSE search.
      const relatedCourse = isCSERequest
        ? courses.find((item) => {
            const stored = normalizeCourse(item);

            return [
              "computerengineering",
              "artificialintelligenceandmachinelearning",
              "aiml",
            ].some((name) => stored.includes(name));
          })
        : null;

      if (relatedCourse) {
        score += 2;

        matches.push(
          `Related course available: ${relatedCourse} (not an exact CSE match)`,
        );
      } else if (courses.length === 0) {
        unverified.push("Course offerings need verification");
      } else {
        mismatches.push("Your preferred course was not found");
      }
    }
  }

  // Location matching
  let locationMatch = null;

  if (isSpecified(location)) {
    maxScore += weights.location;

    if (!college.location) {
      unverified.push("College location needs verification");
    } else {
      const requested = normalize(location);
      const actual = normalize(college.location);

      const normalizeLocation = (value) =>
        normalize(value).replace(/[^a-z0-9]/g, "");

      const actualLocation = normalizeLocation(actual);

      let acceptedLocations = [normalizeLocation(requested)];

      // Treat Delhi and common Delhi-NCR locations as nearby.
      if (requested.includes("delhi")) {
        acceptedLocations = [
          "delhi",
          "newdelhi",
          "gurugram",
          "gurgaon",
          "noida",
          "ghaziabad",
          "faridabad",
        ];
      }

      locationMatch = acceptedLocations.some((place) =>
        actualLocation.includes(place),
      );

      if (locationMatch) {
        score += weights.location;
        matches.push("The college matches your preferred location");
      } else {
        mismatches.push("The college is outside your preferred location");
      }
    }
  }

  // College type matching
  if (isSpecified(collegeType)) {
    const requested = normalize(collegeType);

    if (!["any", "any type", "any college type"].includes(requested)) {
      maxScore += weights.collegeType;

      if (!college.collegeType) {
        unverified.push("College type needs verification");
      } else {
        const actual = normalize(college.collegeType);

        const typeMatches =
          (requested.includes("private") && actual.includes("private")) ||
          ((requested.includes("public") || requested.includes("government")) &&
            (actual.includes("public") || actual.includes("government"))) ||
          actual === requested;

        if (typeMatches) {
          score += weights.collegeType;
          matches.push("The college type matches your preference");
        } else {
          mismatches.push("The college type differs from your preference");
        }
      }
    }
  }

  // Budget matching: zero means no budget limit
  if (budget !== undefined && budget !== null && budget !== "") {
    const studentBudget = Number(budget);

    if (studentBudget !== 0) {
      if (!Number.isFinite(studentBudget) || studentBudget < 0) {
        unverified.push("Please verify the entered budget");
      } else {
        const fees = Number(college.fees);

        if (
          college.fees === undefined ||
          college.fees === null ||
          college.fees === "" ||
          !Number.isFinite(fees) ||
          fees < 0
        ) {
          unverified.push("College fees need verification");
        } else {
          maxScore += weights.budget;

          if (fees <= studentBudget) {
            score += weights.budget;
            matches.push("The fees are within your budget");
          } else {
            mismatches.push("The fees exceed your stated budget");
          }
        }
      }
    }
  }

  // Hostel matching
  if (hostel === "yes" || hostel === "no") {
    maxScore += weights.hostel;

    if (typeof college.hostelAvailable !== "boolean") {
      unverified.push("Hostel availability needs verification");
    } else {
      const wantsHostel = hostel === "yes";

      if (college.hostelAvailable === wantsHostel) {
        score += weights.hostel;
        matches.push(
          wantsHostel
            ? "Hostel accommodation is available"
            : "Hostel availability matches your preference",
        );
      } else {
        mismatches.push(
          wantsHostel
            ? "Hostel accommodation is unavailable"
            : "Hostel accommodation is available, although you prefer not to need it",
        );
      }
    }
  }

  // Calculate match percentage and label
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  let matchLevel = "Low Match";

  if (locationMatch === false) {
    matchLevel = "Outside Preferred Location";
  } else if (percentage >= 80) {
    matchLevel = "Strong Match";
  } else if (percentage >= 60) {
    matchLevel = "Good Match";
  } else if (percentage >= 30) {
    matchLevel = "Partial Match";
  }

  return {
    college,
    score,
    maxScore,
    percentage,
    matchLevel,
    matches,
    mismatches,
    unverified,
    locationMatch,
    meetsRequiredPreferences: true,
  };
};

module.exports = {
  calculateRecommendation,
};
