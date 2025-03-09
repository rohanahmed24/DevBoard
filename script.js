function updateCurrentDate() {
  const dateElement = document.getElementById("currentDate");
  const today = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString(undefined, options);

  if (dateElement) {
    dateElement.textContent = formattedDate;
  }
}

document.addEventListener("DOMContentLoaded", updateCurrentDate);

function changeBackgroundColorOnClick() {
  const body = document.getElementById("body");
  if (!body) return;

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "gray",
    "black",
  ];

  const randomColorIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomColorIndex];

  body.style.backgroundColor = randomColor;
}

const discoButton = document.getElementById("disco");
if (discoButton) {
  discoButton.addEventListener("click", changeBackgroundColorOnClick);
}

function disableButton(event) {
  // Get the button that was clicked
  const button = event.currentTarget;
  button.disabled = true;
  button.style.backgroundColor = "gray";
  button.style.cursor = "not-allowed";
  button.textContent = "Completed";
  // Note: Removing the event listener here might not work as expected
  // if disableButton was not added directly (but wrapped in another function).
  button.removeEventListener("click", disableButton);
}

let completedTasksCount = 23;
// This variable will be updated when a task is completed
let latestCompletedTask = "";
// Track how many tasks have been completed
let clickCount = 0;

document.addEventListener("DOMContentLoaded", function () {
  const completedButtons = document.querySelectorAll(
    "#completedButton1, #completedButton2, #completedButton3, #completedButton4, #completedButton5, #completedButton6"
  );

  const addTaskCountElement = document.getElementById("addTaskCount");
  if (addTaskCountElement) {
    addTaskCountElement.textContent = completedTasksCount;
  }
  
  // Initially hide the last two task divs
  const completedTaskText2Div = document.getElementById("completedTaskText2Div");
  const completedTaskText3Div = document.getElementById("completedTaskText3Div");
  
  if (completedTaskText2Div && completedTaskText3Div) {
    completedTaskText2Div.style.display = "none";
    completedTaskText3Div.style.display = "none";
  }

  completedButtons.forEach((button) => {
    button.addEventListener("click", function(event) {
      disableButton(event);
      decreaseTaskCount();
      increaseCompletedTaskCount();
      
      // Get the task name from the clicked button's parent element
      const taskCard = button.closest("div");
      const taskNameElement = taskCard.querySelector("h3");
      const taskName = taskNameElement ? taskNameElement.textContent.trim() : "a task";
      
      // Update the completed task text with current time and task name
      updateCompletedTaskText(taskName);
      
      // Increment click count and show divs if needed
      clickCount++;
      if (clickCount === 1) {
        // First click already shows first div by default
      } else if (clickCount === 2) {
        // Show second div after second click
        if (completedTaskText2Div) {
          completedTaskText2Div.style.display = "block";
        }
      } else if (clickCount >= 3) {
        // Show third div after third click
        if (completedTaskText3Div) {
          completedTaskText3Div.style.display = "block";
        }
      }
    });
  });
});

function decreaseTaskCount() {
  const taskCountElement = document.getElementById("taskAssigned");
  if (!taskCountElement) return;

  const currentTaskCount = parseInt(taskCountElement.textContent, 10);
  if (currentTaskCount > 0) {
    taskCountElement.textContent = currentTaskCount - 1;
  }
}

function increaseCompletedTaskCount() {
  completedTasksCount++;
  const addTaskCountElement = document.getElementById("addTaskCount");
  if (addTaskCountElement) {
    addTaskCountElement.textContent = completedTasksCount;
  }
}

function updateCompletedTaskText(taskName) {
  // Get the current time
  const time = new Date();
  const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  
  // Create the message
  const message = `You have completed the task ${taskName} at ${formattedTime}`;
  
  // Store the latest task completion message
  latestCompletedTask = message;
  
  // Update the task text elements - move recent tasks upward
  const textElement3 = document.getElementById("completedTaskText3");
  const textElement2 = document.getElementById("completedTaskText2");
  const textElement1 = document.getElementById("completedTaskText1");
  
  if (textElement3 && textElement2 && textElement1) {
    textElement3.textContent = textElement2.textContent;
    textElement2.textContent = textElement1.textContent;
    textElement1.textContent = message;
  }
}

function clearHistory() {
  const completedTaskText1 = document.getElementById("completedTaskText1");
  const completedTaskText2 = document.getElementById("completedTaskText2");
  const completedTaskText3 = document.getElementById("completedTaskText3");
  
  if (completedTaskText1 && completedTaskText2 && completedTaskText3) {
    completedTaskText1.textContent = "";
    completedTaskText2.textContent = "";
    completedTaskText3.textContent = "";
  }
  
  const addTaskCountElement = document.getElementById("addTaskCount");
  if (addTaskCountElement) {
    addTaskCountElement.textContent = 0;
  }
  
  completedTasksCount = 0;
  latestCompletedTask = "";
  clickCount = 0;
  
  // Hide the divs again when clearing history
  const completedTaskText2Div = document.getElementById("completedTaskText2Div");
  const completedTaskText3Div = document.getElementById("completedTaskText3Div");
  
  if (completedTaskText2Div && completedTaskText3Div) {
    completedTaskText2Div.style.display = "none";
    completedTaskText3Div.style.display = "none";
  }
}

const clearHistoryButton = document.getElementById("clearHistory");
if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", clearHistory);
}

const boardText = document.getElementById("boardText");
if (boardText) {
  boardText.addEventListener("click", () => {
    window.location.href = "questions.html";
  });
}

const backToDeskButton = document.getElementById("backToDesk");
if (backToDeskButton) {
  backToDeskButton.addEventListener("click", () => {
    window.location.href = "/";
  });
}

