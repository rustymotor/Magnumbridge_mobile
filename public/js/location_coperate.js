function initTmap() {
    const map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.51183, 127.0482),
        width: "1280px",
        height: "550px",
        zoom: 15
    });

    new Tmapv2.Marker({
        position: new Tmapv2.LatLng(37.51183, 127.0482),
        map: map
    });
}

window.onload = function () {
    initTmap();
};

// 두 개의 버튼 모두에 이벤트 연결
["toggleMap", "toggleMapBtn"].forEach(id => {
    document.getElementById(id).addEventListener("click", function (event) {
        event.preventDefault();

        const mapContainer = document.getElementById("mapContainer");

        if (mapContainer.style.display === "none" || mapContainer.style.display === "") {
            mapContainer.style.display = "block";
            initTmap(); // 항상 새로 초기화 (선택적으로 생략 가능)
        } else {
            mapContainer.style.display = "none";
        }
    });
});

// 외부 클릭 시 닫기
document.addEventListener("click", function (event) {
    const mapContainer = document.getElementById("mapContainer");
    const toggleA = document.getElementById("toggleMap");
    const toggleBtn = document.getElementById("toggleMapBtn");

    if (!mapContainer.contains(event.target) && event.target !== toggleA && event.target !== toggleBtn) {
        mapContainer.style.display = "none";
    }
});

// 내부 클릭 이벤트 전파 방지
document.getElementById("mapContainer").addEventListener("click", function (event) {
    event.stopPropagation();
});

function closeMap() {
    document.getElementById("mapContainer").style.display = "none";
}
