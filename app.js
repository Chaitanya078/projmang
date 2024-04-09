const updateCountdownDisplay = (days, hours, minutes, seconds) => {
  document.querySelector(".day").innerText = days;
  document.querySelector(".hours").innerText = hours;
  document.querySelector(".minutes").innerText = minutes;
  document.querySelector(".seconds").innerText = seconds;
};

const startCountdown = () => {
  clearInterval(countdownInterval); // Clear any existing countdown interval.

  const deadline = new Date(document.getElementById("deadline").value).getTime();
  if (isNaN(deadline)) {
      alert("Please enter a valid date and time for the deadline.");
      updateCountdownDisplay(0, 0, 0, 0); // Reset display if invalid
      return; // Exit if the deadline is not a valid date
  }

  countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const gap = deadline - now;

      if (gap < 0) {
          clearInterval(countdownInterval);
          document.querySelector("h1").innerText = "Project Overdue";
          updateCountdownDisplay(0, 0, 0, 0); // Display all zeros if the project is overdue.
          return;
      }

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const textDay = Math.floor(gap / day);
      const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);

      updateCountdownDisplay(textDay, textHour, textMinute, textSecond);

      const totalDuration = deadline - now;
      const elapsedTime = totalDuration - gap;
      const progressPercentage = (elapsedTime / totalDuration) * 100;
      document.getElementById("progressBar").style.width = `${Math.min(progressPercentage, 100)}%`;
  }, 1000);
};

let countdownInterval; // Define this outside of any function to make it globally accessible
