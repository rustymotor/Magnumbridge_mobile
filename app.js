import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import postcss from "postcss";
import postcssUrl from "postcss-url";
import autoprefixer from "autoprefixer";
import fs from "fs";
import browserSync from "browser-sync";
import connectBrowserSync from "connect-browser-sync";
import chokidar from "chokidar";
const app = express();
const PORT = 1227;
const bs = browserSync.create();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS 설정
app.set("view engine", "ejs");

// PostCSS 및 Autoprefixer 적용
app.use("/css", (req, res) => {
    const cssFilePath = path.join(__dirname, "public/css", req.url.split("?")[0]);

    fs.readFile(cssFilePath, "utf8", (err, css) => {
        if (err) {
            console.error("파일 읽기 오류:", err);
            return res.status(500).send("Server Error");
        }

        postcss([
            autoprefixer,
            postcssUrl({
                url: "rebase"
            })
        ])
            .process(css, {
                from: cssFilePath, // ✅ 여기서 기준 경로를 명확히
                map: false
            })
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
    res.render("index", { basePath: "./" });
});

app.get("/pages/main", (req, res) => {
    res.render("pages/main", { basePath: "../", htmlExt: "" });
});
app.get("/pages/business", (req, res) => {
    res.render("pages/business", { basePath: "../", htmlExt: "" });
});
app.get("/pages/business_1", (req, res) => {
    res.render("pages/business_1", { basePath: "../", htmlExt: "" });
});
app.get("/pages/business_2", (req, res) => {
    res.render("pages/business_2", { basePath: "../", htmlExt: "" });
});
app.get("/pages/business_3", (req, res) => {
    res.render("pages/business_3", { basePath: "../", htmlExt: "" });
});

app.get("/pages/company_1", (req, res) => {
    res.render("pages/company_1", { basePath: "../", htmlExt: "" });
});
app.get("/pages/company_2", (req, res) => {
    res.render("pages/company_2", { basePath: "../", htmlExt: "" });
});
app.get("/pages/company_3", (req, res) => {
    res.render("pages/company_3", { basePath: "../", htmlExt: "" });
});
app.get("/pages/company_4", (req, res) => {
    res.render("pages/company_4", { basePath: "../", htmlExt: "" });
});
app.get("/pages/company_5", (req, res) => {
    res.render("pages/company_5", { basePath: "../", htmlExt: "" });
});
app.get("/pages/recruit", (req, res) => {
    res.render("pages/recruit", { basePath: "../", htmlExt: "" });
});
app.get("/pages/recruit_1", (req, res) => {
    res.render("pages/recruit_1", { basePath: "../", htmlExt: "" });
});
app.get("/pages/recruit_2", (req, res) => {
    res.render("pages/recruit_2", { basePath: "../", htmlExt: "" });
});
app.get("/pages/recruit_3", (req, res) => {
    res.render("pages/recruit_3", { basePath: "../", htmlExt: "" });
});
app.get("/pages/privacy_policy", (req, res) => {
    res.render("pages/privacy_policy", { basePath: "../", htmlExt: "" });
});

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
    files: ["src/scss/**/*.scss", "views/**/*.ejs"], // EJS 파일 변경 감지 추가
    open: false,
    reloadOnRestart: false,
    notify: false,
    ignore: ["**/*.map", "**/*.woff", "**/*.ttf"]
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
app.use(connectBrowserSync(bs));
