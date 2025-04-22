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
const renderEJS = (filePath, outputPath, depth = 0) => {
    let basePath = depth > 0 ? "../".repeat(depth) : "./";
    if (basePath === "./") {
        basePath = "";
    }

    const htmlExt = ".html";
    const htmlPagePath = "pages/main" + htmlExt;

    fs.readFile(filePath, "utf8", (err, fileContent) => {
        if (err) {
            console.error(`❌ Error reading ${filePath}:`, err);
            return;
        }

        const isLayoutUsed = fileContent.includes("<%- body %>") || fileContent.includes("<%- content %>");

        const renderData = {
            basePath,
            htmlExt,
            htmlPagePath,
            content: isLayoutUsed ? fileContent : "",
            styleType: ""
        };

        ejs.renderFile(filePath, renderData, { filename: filePath }, (err, str) => {
            if (err) {
                console.error(`❌ EJS Render Error: ${filePath}`);
                console.error(err);
                return;
            }
            fs.writeFileSync(outputPath, str);
            console.log(`✔ Converted: ${filePath} → ${outputPath}`);
        });
    });
};

// 디렉토리 내부의 모든 EJS 파일을 찾아 변환하는 함수 (재귀적 탐색)
const processEJSFiles = (srcFolder, distFolder, depth = 0) => {
    fs.readdirSync(srcFolder, { withFileTypes: true }).forEach(entry => {
        const srcPath = path.join(srcFolder, entry.name);
        const distPath = path.join(distFolder, entry.name.replace(".ejs", ".html"));

        if (entry.isDirectory()) {
            ensureDirExists(distPath);
            processEJSFiles(srcPath, distPath, depth + 1);
        } else if (entry.isFile() && entry.name.endsWith(".ejs")) {
            renderEJS(srcPath, distPath, depth);
        }
    });
};

// ✅ CSS 파일 후처리 함수 (url("/images/..") → url("../images/.."))
const fixCSSPaths = cssDir => {
    if (!fs.existsSync(cssDir)) return;

    fs.readdirSync(cssDir).forEach(file => {
        const filePath = path.join(cssDir, file);
        if (fs.statSync(filePath).isFile() && file.endsWith(".css")) {
            let content = fs.readFileSync(filePath, "utf8");
            // 경로 수정
            content = content.replace(/url\(["']?\/(images|fonts|icons)\/(.*?)["']?\)/g, 'url("../$1/$2")');
            fs.writeFileSync(filePath, content);
            console.log(`🔧 Fixed paths in: ${filePath}`);
        }
    });
};
// 변환 실행
ensureDirExists(distDir);
processEJSFiles(srcDir, distDir);
fixCSSPaths(path.join(distDir, "css"));
console.log("✅ All EJS files have been converted to HTML.");
