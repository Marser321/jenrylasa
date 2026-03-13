import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Recursively find all images
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

async function optimize() {
    console.log('Starting image optimization...');
    let count = 0;

    for (const file of getFiles(publicDir)) {
        if (/\.(png|jpg|jpeg)$/i.test(file)) {
            const ext = path.extname(file);
            const name = path.basename(file, ext);
            const dir = path.dirname(file);
            const output = path.join(dir, `${name}.webp`);

            try {
                // Skip if webp already exists (optional, but good for re-running)
                // if (fs.existsSync(output)) continue;

                console.log(`Optimizing: ${path.relative(publicDir, file)}`);

                await sharp(file)
                    .webp({ quality: 80, effort: 6 })
                    .toFile(output);

                count++;
            } catch (err) {
                console.error(`Error optimizing ${file}:`, err);
            }
        }
    }

    console.log(`Optimization complete. Converted ${count} images.`);
}

optimize();
