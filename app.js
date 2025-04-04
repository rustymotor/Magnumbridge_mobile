import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sassMiddleware from "node-sass-middleware";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import fs from "fs";
import browserSync from "browser-sync";
import chokidar from "chokidar"; // ✅ 추가

const app = express();
const PORT = 1227;
const bs = browserSync.create();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS 설정
app.set("view engine", "ejs");

// SASS 및 PostCSS 미들웨어 설정
app.use(
    sassMiddleware({
        src: path.join(__dirname, "src/scss"),
        dest: path.join(__dirname, "public/css"),
        indentedSyntax: false,
        sourceMap: true,
        prefix: "/css",
        debug: false,
        outputStyle: "compressed",
        force: true,
        response: false
    })
);

// PostCSS 및 Autoprefixer 적용
app.use("/css", (req, res) => {
    const cssFilePath = path.join(__dirname, "public/css", req.url.split("?")[0]);

    fs.readFile(cssFilePath, "utf8", (err, css) => {
        if (err) {
            console.error("파일 읽기 오류:", err);
            return res.status(500).send("Server Error");
        }

        postcss([autoprefixer])
            .process(css, { from: undefined })
            .then(result => {
                res.setHeader("Content-Type", "text/css");
                res.send(result.css);
            })
            .catch(error => {
                console.error("PostCSS 처리 오류:", error);
                res.status(500).send("Server Error");
            });
    });
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// 라우팅
app.get("/", (req, res) => {
    res.render("index", { title: "My Page test" });
});

app.get("/main", (req, res) => {
    res.render("pages/main", { title: "메인페이지입니다.", htmlExt: "" });
});

// ✅ EJS 변경 감지 후 새로고침 (핵심 추가)
const watcher = chokidar.watch("views/**/*.ejs", {
    ignoreInitial: true
});

watcher.on("change", path => {
    console.log(`🔁 EJS 파일 변경 감지: ${path}`);
    bs.reload(); // 브라우저 자동 새로고침
});

// 브라우저 싱크
bs.init({
    proxy: `http://localhost:${PORT}`,
    files: ["src/scss/**/*.scss"], // SCSS만 파일 감지, EJS는 chokidar가 따로 처리
    open: false,
    reloadOnRestart: false,
    notify: false,
    ignore: ["**/*.map", "**/*.woff", "**/*.ttf"]
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
