// Function to fetch data from JSON and display in HTML
async function fetchAndDisplayData() {
  try {
    // Fetch data from assets/data.json
    const response = await fetch("./assets/data.json");

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON data
    const data = await response.json();

    // Log data to console for debugging
    console.log("Fetched data:", data);

    // Update individual scores, names, and icons in the HTML
    // Map JSON data to existing HTML elements by index
    const categoryIds = ["reaction", "memory", "verbal", "visual"];

    data.forEach((item, index) => {
      if (index < categoryIds.length) {
        const categoryId = categoryIds[index];

        // Update score
        const scoreElement = document.getElementById(`${categoryId}-score`);
        if (scoreElement) {
          scoreElement.textContent = `${item.score}/100`;
          console.log(`Updated ${categoryId} score: ${item.score}/100`);
        }

        // Update category name
        const nameElement = document.getElementById(`${categoryId}-name`);
        if (nameElement) {
          nameElement.textContent = item.category;
          console.log(`Updated ${categoryId} name: ${item.category}`);
        }

        // Update icon
        const iconElement = document.getElementById(`${categoryId}-icon`);
        if (iconElement) {
          iconElement.src = item.icon;
          iconElement.alt = `${item.category} icon`;
          console.log(`Updated ${categoryId} icon: ${item.icon}`);
        }
      }
    });

    // Calculate overall average score
    const totalScore = data.reduce((sum, item) => sum + item.score, 0);
    const averageScore = Math.round(totalScore / data.length);

    // Update the main score in the circle
    const mainScoreElement = document.getElementById("main-score");
    if (mainScoreElement) {
      mainScoreElement.textContent = averageScore;
      console.log(`Updated main score: ${averageScore}`);
    }

    // Optional: Display all data in a readable format
    displayDataSummary(data, averageScore);
  } catch (error) {
    console.error("Error fetching data:", error);

    // Display error message in HTML
    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";
    errorDiv.style.padding = "10px";
    errorDiv.style.margin = "10px";
    errorDiv.style.border = "1px solid red";
    errorDiv.innerHTML = `<strong>Error loading data:</strong> ${error.message}`;
    document.body.appendChild(errorDiv);
  }
}

// Function to create a new category section if it doesn't exist
function createCategorySection(item) {
  const category = item.category.toLowerCase();
  const rightContainer = document.querySelector(".right");

  const categoryDiv = document.createElement("div");
  categoryDiv.className = `${category} sub`;
  categoryDiv.innerHTML = `
    <div class="left-sub">
      <img id="${category}-icon" src="${item.icon}" alt="${item.category} icon" />
      <p id="${category}-name">${item.category}</p>
    </div>
    <div class="right-sub">
      <p id="${category}-score">${item.score}/100</p>
    </div>
  `;

  // Insert before the last element (usually a button or end element)
  const summaryElement = document.getElementById("Summary");
  if (summaryElement && rightContainer) {
    rightContainer.appendChild(categoryDiv);
    console.log(`Created new section for: ${item.category}`);
  }
}

// Function to display data summary (optional)
function displayDataSummary(data, averageScore) {
  console.log("=== DATA SUMMARY ===");
  console.log(`Average Score: ${averageScore}/100`);

  data.forEach((item) => {
    console.log(`${item.category}: ${item.score}/100`);
  });

  console.log("==================");
}

// Function to create and display data table (bonus feature)
function createDataTable(data) {
  const tableContainer = document.createElement("div");
  tableContainer.innerHTML = `
    <h3>JSON Data Preview</h3>
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f0f0f0;">
          <th style="border: 1px solid #ddd; padding: 8px;">Category</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Score</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Icon</th>
        </tr>
      </thead>
      <tbody>
        ${data
          .map(
            (item) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.category}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.score}/100</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.icon}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  // Uncomment the line below if you want to display the table
  // document.body.appendChild(tableContainer);
}

// Wait for the DOM to load, then fetch and display data
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, fetching data...");
  fetchAndDisplayData();
});

// Alternative: You can also call it immediately
// fetchAndDisplayData();
