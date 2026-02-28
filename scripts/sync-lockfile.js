import { execSync } from "child_process";

try {
  console.log("Running npm install to regenerate package-lock.json...");
  const output = execSync("npm install --package-lock-only", {
    cwd: "/vercel/share/v0-project",
    encoding: "utf-8",
    stdio: "pipe",
  });
  console.log(output);
  console.log("package-lock.json has been regenerated successfully.");
} catch (error) {
  console.error("npm install failed:", error.stderr || error.message);
  // Try alternative approach - full install
  try {
    console.log("Trying full npm install...");
    const output2 = execSync("npm install", {
      cwd: "/vercel/share/v0-project",
      encoding: "utf-8",
      stdio: "pipe",
    });
    console.log(output2);
    console.log("Full npm install completed successfully.");
  } catch (error2) {
    console.error("Full npm install also failed:", error2.stderr || error2.message);
  }
}
