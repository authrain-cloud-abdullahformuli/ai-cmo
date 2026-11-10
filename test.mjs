import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Assertion failed: ${message}`);
    process.exit(1);
  }
}

console.log('🧪 Starting AiCMO Test Suite...');

// 1. Verify prohibited governance files do NOT exist
const prohibitedFiles = ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md'];
for (const file of prohibitedFiles) {
  const filePath = path.join(__dirname, file);
  assert(!fs.existsSync(filePath), `Prohibited file ${file} must NOT exist`);
}
console.log('✓ No prohibited governance files exist');

// 2. Verify LICENSE
const licensePath = path.join(__dirname, 'LICENSE');
assert(fs.existsSync(licensePath), 'LICENSE file must exist');
const licenseContent = fs.readFileSync(licensePath, 'utf8');
assert(licenseContent.includes('Copyright (c) 2026 Abdullah Formuli'), 'LICENSE must attribute Abdullah Formuli (2026)');
console.log('✓ LICENSE is valid and attributed to Abdullah Formuli');

// 3. Verify MAINTAINERS.md
const maintainersPath = path.join(__dirname, 'MAINTAINERS.md');
assert(fs.existsSync(maintainersPath), 'MAINTAINERS.md must exist');
const maintainersContent = fs.readFileSync(maintainersPath, 'utf8');
assert(maintainersContent.includes('Maintained solely by Abdullah Formuli. No external contributions accepted.'), 'MAINTAINERS.md must specify sole maintainer status');
assert(maintainersContent.includes('authrainmedia@gmail.com'), 'MAINTAINERS.md must contain contact email');
console.log('✓ MAINTAINERS.md is valid with sole maintainer policy');

// 4. Verify CITATION.cff
const citationPath = path.join(__dirname, 'CITATION.cff');
assert(fs.existsSync(citationPath), 'CITATION.cff must exist');
const citationContent = fs.readFileSync(citationPath, 'utf8');
assert(citationContent.includes('Abdullah'), 'CITATION.cff must list Abdullah Formuli');
assert(citationContent.includes('https://github.com/authrain-cloud-abdullahformuli/ai-cmo'), 'CITATION.cff must point to destination repository');
console.log('✓ CITATION.cff is valid');

// 5. Verify root package.json
const packageJsonPath = path.join(__dirname, 'package.json');
assert(fs.existsSync(packageJsonPath), 'package.json must exist');
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
assert(pkg.author === 'Abdullah Formuli <authrainmedia@gmail.com>', 'package.json author must be Abdullah Formuli');
assert(pkg.repository.url.includes('authrain-cloud-abdullahformuli/ai-cmo'), 'package.json repo must match destination');
assert(pkg.license === 'MIT', 'package.json license must be MIT');
console.log('✓ Root package.json is valid');

// 6. Verify directory structure & core files
const requiredDirs = ['backend', 'frontend', 'docs/images'];
for (const dir of requiredDirs) {
  const fullPath = path.join(__dirname, dir);
  assert(fs.existsSync(fullPath), `Required directory ${dir} must exist`);
}
assert(fs.existsSync(path.join(__dirname, 'backend', 'pyproject.toml')), 'backend/pyproject.toml must exist');
assert(fs.existsSync(path.join(__dirname, 'frontend', 'package.json')), 'frontend/package.json must exist');
console.log('✓ Directory structure and project configurations exist');

// 7. Verify screenshots exist
const screenshotFiles = [
  'docs/images/aicmo-geo-dashboard.png',
  'docs/images/aicmo-geo-prompts.png',
  'docs/images/aicmo-geo-prompt-details.png'
];
for (const img of screenshotFiles) {
  const fullPath = path.join(__dirname, img);
  assert(fs.existsSync(fullPath), `Screenshot ${img} must exist`);
  const stat = fs.statSync(fullPath);
  assert(stat.size > 10000, `Screenshot ${img} must be non-empty`);
}
console.log('✓ All platform screenshots verified');

// 8. Verify README.md
const readmePath = path.join(__dirname, 'README.md');
assert(fs.existsSync(readmePath), 'README.md must exist');
const readmeContent = fs.readFileSync(readmePath, 'utf8');
assert(readmeContent.includes('Maintained solely by Abdullah Formuli. No external contributions accepted.'), 'README.md must specify sole maintainer notice');
assert(readmeContent.includes('authrain-cloud-abdullahformuli/ai-cmo'), 'README.md must point to target repository');
assert(!readmeContent.includes('AICMO/ai-cmo'), 'README.md must not contain upstream repo slug');
console.log('✓ README.md is valid');

console.log('🎉 All AiCMO tests passed successfully!');
