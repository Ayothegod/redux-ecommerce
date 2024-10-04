const fs = require('fs');
const path = require('path');

// Change 'dist' to the appropriate output directory if needed
const dir = path.join(__dirname, 'dist');

function updateImports(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      updateImports(fullPath); // Recurse into subdirectories
    } else if (path.extname(fullPath) === '.js') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(/from\s+["'](.+?)["']/g, (match, p1) => {
        return match.replace(p1, `${p1}.js`);
      });
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

// Run the function to update imports
updateImports(dir);
