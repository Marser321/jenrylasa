import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

function* getFiles(dir) {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

console.log('Starting cleanup of original images...');
let count = 0;

for (const file of getFiles(publicDir)) {
    if (/\.(png|jpg|jpeg)$/i.test(file)) {
        try {
            fs.unlinkSync(file);
            console.log(`Deleted: ${path.relative(publicDir, file)}`);
            count++;
        } catch (err) {
            console.error(`Error deleting ${file}:`, err);
        }
    }
}

console.log(`Cleanup complete. Deleted ${count} files.`);
