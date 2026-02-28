import { execSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectDir = dirname(__dirname);

console.log("Running npm install to regenerate package-lock.json...");
console.log("Project dir:", projectDir);

try {
  const result = execSync("npm install --package-lock-only", {
    cwd: projectDir,
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 120000,
  });
  console.log("npm install output:", result);
  console.log("Successfully regenerated package-lock.json!");
} catch (error) {
  console.error("npm install stderr:", error.stderr);
  console.error("npm install stdout:", error.stdout);
  console.error("Error:", error.message);
  process.exit(1);
}
