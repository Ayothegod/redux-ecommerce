const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'dist');

function updateImports(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      updateImports(fullPath); // Recurse into subdirectories
    } else if (path.extname(fullPath) === '.js') {
      let content = fs.readFileSync(fullPath, 'utf-8');
      content = content.replace(/from\s+["']([^"']+)["']/g, (match, p1) => {
        // Check if the import path doesn't already end with .js and has no extension
        const isLocalFile = !p1.includes('.') || !p1.split('.').pop().match(/^(js|ts)$/);
        const needsJsExtension = !p1.endsWith('.js') && isLocalFile;

        if (needsJsExtension) {
          return match.replace(p1, `${p1}.js`);
        }
        console.log(`Processing import: ${match}, original path: ${p1}`);
        return match; // Return the match unchanged if it already has .js or an extension
      });
      fs.writeFileSync(fullPath, content, 'utf-8');
    }
  });
}

// Run the function to update imports
updateImports(dir);
