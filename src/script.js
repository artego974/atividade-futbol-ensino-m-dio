const toggleButton = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function setTheme(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      toggleButton.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      toggleButton.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? "dark" : "light");
  }

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setTheme(isDark ? "light" : "dark");
  });

