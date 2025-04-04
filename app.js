import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sassMiddleware from "node-sass-middleware";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import fs from "fs";
import browserSync from "browser-sync";

const app = express();
const PORT = 1227;
const bs = browserSync.create(); // Browsersync 인스턴스 생성

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS 설정
app.set("view engine", "ejs");

// SASS 및 PostCSS 미들웨어 설정
app.use(
    sassMiddleware({
        src: path.join(__dirname, "src/scss"),
        dest: path.join(__dirname, "public/css"),
        indentedSyntax: false, // .scss 사용
        sourceMap: true, // 소스맵 활성화
        prefix: "/css",
        debug: false, // 디버깅 활성화
        outputStyle: "compressed", // 압축 형식으로 설정
        force: true, // 매번 컴파일하도록 설정
        response: false // 직접 응답을 하지 않도록 설정
    })
);

// PostCSS 및 Autoprefixer 설정 (크로스 브라우징 처리)
app.use("/css", (req, res) => {
    const cssFilePath = path.join(
        __dirname,
        "public/css",
        req.url.split("?")[0] // 쿼리 파라미터 제거
    );

    fs.readFile(cssFilePath, "utf8", (err, css) => {
        if (err) {
            console.error("파일 읽기 오류:", err);
            return res.status(500).send("Server Error");
        }

        // PostCSS와 Autoprefixer 적용
        postcss([autoprefixer])
            .process(css, { from: undefined })
            .then(result => {
                res.setHeader("Content-Type", "text/css");
                res.send(result.css); // 변환된 CSS 반환
            })
            .catch(error => {
                console.error("PostCSS 처리 오류:", error);
                res.status(500).send("Server Error");
            });
    });
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public"))); // public 폴더 내 모든 파일을 제공

// 루트 경로에서 EJS 렌더링
app.get("/", (req, res) => {
    try {
        res.render("index", { title: "My Page test" });
    } catch (error) {
        res.status(500).send("Server Error");
    }
});
/* 페이지생성 */

app.get("/main", (req, res) => {
    res.render("pages/main", { title: "메인페이지입니다.", htmlExt: "" });
});
/* //페이지생성 */

// 브라우저 싱크 설정
bs.init({
    proxy: `http://localhost:${PORT}`,
    files: ["src/scss/**/*.scss", "views/**/*.ejs"], // 모든 변경 감지
    open: false, // 브라우저 자동 열기 비활성화
    reloadOnRestart: false, // 서버 재시작 시 새로 고침
    notify: false, // 알림 비활성화
    ignore: [
        "**/*.map", // .map 파일 무시
        "**/*.woff", // .woff 파일 무시
        "**/*.ttf" // .ttf 파일 무시
    ]
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
