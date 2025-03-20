import ejs from "ejs";
import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "views"); // EJS 파일이 있는 폴더
const distDir = path.join(process.cwd(), "public"); // 변환된 HTML을 저장할 폴더

// 폴더 생성 함수 (재귀적으로 생성)
const ensureDirExists = dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// EJS 파일을 HTML로 변환하는 함수
const renderEJS = (filePath, outputPath, depth) => {
    const basePath = "../".repeat(depth);

    // 파일 내용을 읽어와서 변환
    fs.readFile(filePath, "utf8", (err, fileContent) => {
        if (err) {
            console.error(`❌ Error reading ${filePath}:`, err);
            return;
        }

        // EJS 파일이 main.ejs를 포함하는지 확인 (layout 적용 여부 판단)
        const isLayoutUsed = fileContent.includes("<%- body %>") || fileContent.includes("<%- content %>");

        const renderData = {
            basePath,
            content: isLayoutUsed ? fileContent : "" // 레이아웃이 필요한 경우 content로 전달
        };

        ejs.renderFile(filePath, renderData, { filename: filePath }, (err, str) => {
            if (err) {
                console.error(`❌ Error rendering ${filePath}:`, err);
                return;
            }
            fs.writeFileSync(outputPath, str);
            console.log(`✔ Converted: ${filePath} → ${outputPath}`);
        });
    });
};

// 디렉토리 내부의 모든 EJS 파일을 찾아 변환하는 함수 (재귀적 탐색)
const processEJSFiles = (srcFolder, distFolder) => {
    fs.readdirSync(srcFolder, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(srcFolder, entry.name);
        const distPath = path.join(distFolder, entry.name.replace(".ejs", ".html"));

        if (entry.isDirectory()) {
            // 하위 폴더 처리
            ensureDirExists(distPath);
            processEJSFiles(srcPath, distPath);
        } else if (entry.isFile() && entry.name.endsWith(".ejs")) {
            // EJS 파일 변환
            renderEJS(srcPath, distPath);
        }
    });
};

// 변환 실행
ensureDirExists(distDir);
processEJSFiles(srcDir, distDir);
console.log("✅ All EJS files have been converted to HTML.");
