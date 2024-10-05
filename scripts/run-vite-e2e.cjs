const { spawn } = require('child_process');
const waitOn = require('wait-on');

const viteProcess = spawn('vite', ['preview'], { stdio: 'inherit', shell: true });

viteProcess.on("error", (err) => {
  console.error("Failed to start vite preview:", err);
  process.exit(1);
});

// Wait until vite is ready
waitOn({ resources: ["http://localhost:4173"] }, (err) => {
  if (err) {
    console.error("Failed to wait on vite preview:", err);
    viteProcess.kill();
    process.exit(1);
  }

  console.log("Vite is ready, running Playwright tests...");
  const playwrightProcess = spawn("playwright", ["test"], { stdio: "inherit" , shell: true});

  playwrightProcess.on("close", (code) => {
    viteProcess.kill(); // Kill vite preview after tests are done
    process.exit(code);
  });
});
