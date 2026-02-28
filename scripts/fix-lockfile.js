const { execSync } = require('child_process');

try {
  console.log('Running npm install --package-lock-only to regenerate lock file...');
  const output = execSync('npm install --package-lock-only', {
    cwd: '/vercel/share/v0-project',
    stdio: 'pipe',
    encoding: 'utf-8'
  });
  console.log(output);
  console.log('Lock file regenerated successfully.');
} catch (error) {
  console.error('Error:', error.message);
  if (error.stdout) console.log('stdout:', error.stdout);
  if (error.stderr) console.log('stderr:', error.stderr);
  process.exit(1);
}
