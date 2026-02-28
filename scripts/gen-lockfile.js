import { execFileSync } from "child_process";

const projectDir = "/vercel/share/v0-project";

console.log("Running npm install --package-lock-only...");
console.log("CWD:", projectDir);

try {
  const result = execFileSync("npm", ["install", "--package-lock-only"], {
    cwd: projectDir,
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 120000,
  });
  console.log("stdout:", result);
  console.log("Lock file generated successfully!");
} catch (err) {
  console.error("Exit code:", err.status);
  console.error("stdout:", err.stdout);
  console.error("stderr:", err.stderr);
}
