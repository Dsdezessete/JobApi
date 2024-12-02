// Path: mobile/scripts/reset-project.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CACHE_DIRS = [
  './node_modules',
  './.expo',
  './android/build',
  './ios/Pods',
  './ios/build',
];

const CONFIG_FILES = [
  './.env',
  './app.json',
];

function deleteDirectory(directory) {
  if (fs.existsSync(directory)) {
    console.log(`Deleting directory: ${directory}`);
    fs.rmSync(directory, { recursive: true, force: true });
  } else {
    console.log(`Directory not found: ${directory}`);
  }
}

function resetConfigFiles(files) {
  files.forEach(file => {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
      console.log(`Resetting file: ${file}`);
      fs.writeFileSync(filePath, '', 'utf8');
    } else {
      console.log(`File not found: ${file}`);
    }
  });
}

function reinstallDependencies() {
  console.log('Reinstalling dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error reinstalling dependencies:', error.message);
    process.exit(1);
  }
}

function resetProject() {
  console.log('Starting project reset...');
  CACHE_DIRS.forEach(deleteDirectory);
  resetConfigFiles(CONFIG_FILES);
  reinstallDependencies();
  console.log('Project reset complete.');
}

resetProject();
