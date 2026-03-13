import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Image Optimization Script
 * Usage: npx tsx scripts/optimize-images.ts <input_dir> <output_dir> [quality]
 * Example: npx tsx scripts/optimize-images.ts ./raw-frames ./public/scroll/sequence-1 80
 */

const inputDir = process.argv[2];
const outputDir = process.argv[3];
const quality = parseInt(process.argv[4] || '80', 10);

if (!inputDir || !outputDir) {
    console.error('Usage: npx tsx scripts/optimize-images.ts <input_dir> <output_dir> [quality]');
    process.exit(1);
}

async function optimizeImages() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    console.log(`Found ${files.length} images to optimize...`);

    let count = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const fileName = path.parse(file).name;
        const outputPath = path.join(outputDir, `${fileName}.webp`);

        try {
            await sharp(inputPath)
                .webp({ quality, effort: 6 }) // maximal compression effort
                .toFile(outputPath);

            count++;
            if (count % 10 === 0) process.stdout.write('.');
        } catch (err) {
            console.error(`\nError processing ${file}:`, err);
        }
    }

    console.log(`\nSuccessfully optimized ${count} images into ${outputDir}`);
}

optimizeImages().catch(console.error);
