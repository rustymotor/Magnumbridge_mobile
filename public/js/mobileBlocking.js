function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // 모바일 기기 키워드 확인!
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
// 페이지 로드 완료되면 실행
window.onload = function () {
    if (isMobile()) {
        alert("데스크탑으로 확인하시기바랍니다!");
        document.body.style.display = "none";
    }
};
