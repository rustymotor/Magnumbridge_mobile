function initTmap() {
    const map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.51183, 127.0482), // 지도 초기 좌표
        width: "1280px",
        height: "550px",
        zoom: 15
    });

    // 마커 추가
    const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(37.51183, 127.0482), // 마커 위치도 같은 좌표로 설정
        map: map
    });
}

// 페이지가 로드되면 initTmap 함수 호출
window.onload = function () {
    initTmap();
};

// 클릭 시 지도 표시/숨기기
document.getElementById("toggleMap").addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지 (링크 클릭시 페이지 이동 방지)

    const mapContainer = document.getElementById("mapContainer");

    // 현재 상태에 따라 표시/숨기기 토글
    if (mapContainer.style.display === "none" || mapContainer.style.display === "") {
        mapContainer.style.display = "block";
        initTmap(); // 지도 초기화
    } else {
        mapContainer.style.display = "none";
    }
});

// 맵 외부 클릭 시 맵 닫기
document.addEventListener("click", function (event) {
    const mapContainer = document.getElementById("mapContainer");
    const toggleButton = document.getElementById("toggleMap");

    // 클릭한 곳이 mapContainer 내부가 아니면 숨기기
    if (!mapContainer.contains(event.target) && event.target !== toggleButton) {
        mapContainer.style.display = "none";
    }
});

// mapContainer 내부에서 클릭이 발생하면 이벤트 전파를 막습니다.
document.getElementById("mapContainer").addEventListener("click", function (event) {
    event.stopPropagation(); // 이벤트 전파를 막음
});
function closeMap() {
    document.getElementById("mapContainer").style.display = "none";
}
