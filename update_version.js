const fs = require('fs');
const readline = require('readline');

const file = 'version.json';
let current = { version: '1.0.0' };

try {
    current = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
    console.log(`No valid ${file} found, starting fresh.`);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`Current version: ${current.version}`);
rl.question('New version (press Enter to keep current): ', (ans) => {
    const version = ans.trim() || current.version;
    const data = {
        version: version,
        timestamp: Date.now()
    };
    
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`Saved ${file} -> v${data.version}`);
    rl.close();
});
