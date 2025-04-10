module.exports = {
    "postcss-modules": {
        generateScopedName: "[name]__[local]__[hash:base64:5]", // React CSS Modules 스타일
        getJSON: function (cssFileName, json, outputFileName) {
            console.log(json); // JSON 파일로 클래스 매핑 확인 가능
        }
    },
    // plugins: [require("autoprefixer")],
    browserslist: "> 1%, last 2 versions, Firefox ESR, Safari >= 9"
};
