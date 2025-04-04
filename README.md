# 프로젝트 설명

-   매그넘브릿지 홈페이지(PC/MO)입니다.
-   npm run build를 통해 정적 소스코드를 추출할수 있습니다.
-   npm run start를 통해 ejs환경으로 템플릿 작업을 할수 있습니다.

## CSS

-   public/css/sample.css

## HTML

-   views/pages/sample.ejs

---

### 작업환경(팀원)

#### SCSS

-   src/scss/sample.scss

#### HTML

-   views/pages/sample.ejs

---

# 화면 개발 규칙

## HTML 주석

-   기본형식

<!— 주석내용 —><!— //주석내용—>

-   수정

<!— 210401 수정내용—><!— //210401 수정내용—>

## CSS 세미콜론

-   마지막 선언된 속성에도 세미콜론(;)을 사용한다.

## CSS 단위

-   모바일과 같이 유동적인 레이아웃 구현 시 상대단위(rem, %)를 사용한다.
-   1px과 text-indent:-9999em, border 단위는 예외로 한다.

-   z-index
    -   z-index값은 최소 10부터 시작하며 최고 9999이며 10 단위로 증감한다. 단, 중간에 변수가 생기면 예외로 1단위 값을 지정할 수 있다.
-   구분 단위 설명
    -   인라인 1 우선순위 1씩 증가, 기본요소 0
    -   그룹 10 우선순위 1씩 증가, 기본요소 10
    -   구조 100 우선순위 1씩 증가, 기본요소 100
    -   팝업 1000 우선순위 1씩 증가, 기본요소 1000

## 속성선언순서

-   밴더속성과 해당 속성은 해당 속성 뒤에 선언한다.
    -   예) .btn {border:1px solid #f60; \*border:2px solid #f60; border-radius:20x; -webkit-border-radius:2px}
-   !important 사용은 지양한다.
-   순서 구분 속성
    1. Layout display, visibility, overflow
    2. 위치 position, float, clear, z-index
    3. 크기/간격 width, height,
       margin, padding
    4. 모양/배경 border
       bakcground
    5. 폰트/정렬 font, color, text-align, vertcal-align
    6. 기타 언급되지 않는 속성들은 후순위로 적용한다.

## 약속어

# CSS 레이아웃 약속어

-   레이아웃(무시해도 됩니다.)

    -   #wrap 페이지 전체영역
    -   #skipNav 바로가기영역
    -   #header 머리글 영역
    -   #contain 본문영역
    -   #content 주요 콘텐츠 영역
    -   #footer 바닥글영역
    -   #popXXX 레이어팝업 페이지별 ID

-   팝업(무시해도 됩니다.)

    -   .pop_wrap 팝업 전체영역
    -   .pop_header 팝업 머리글
    -   .pop_contain 팝업 본문 영역
    -   .pop_content 팝업 콘텐츠 영역
    -   .pop_footer 팝업 바닥글

## CSS 영역

| 구분 | 예약어 | 설명 |

-   컨텐츠 안의 그룹핑 | section | 타이틀이 있는 컨텐츠 영역 |
-   독립적으로 재사용 가능한 영역 | article | 타이틀이 있는 컨텐츠 영역 |
-   사이드 영역 | aside | 타이틀이 있는 컨텐츠 영역 |
-   전체 영역 | \_wrap | 컨텐츠 전체 영역 |
-   바깥 영역 | \_area | UI 영역단위로 그룹화한다. |
-   반복 영역 | \_group | 역속적인 엘리먼트를 그룹화한다. |
-   안쪽 영역 | \_inner | 내부영역 2중 처리 |

## CSS 요소별

-   버튼 btn\_
-   아이콘 ico\_
-   화살표 arr\_
-   블릿 bul\_
-   배경 bg\_
-   비주얼 visual\_
-   썸네일 thumb\_
-   배너 bnn\_
-   검색 sch\_
-   텍스트 txt\_

## CSS 요소별

-   긍정 \_positive
-   부정 \_negative
-   성공 \_success
-   실패 \_fail
-   주의 \_warning
-   위험 \_danger
-   오류 \_error
-   경고 \_alert
-   안내 \_info

## CSS 크기단위

-   더크게 \_xl
-   크게 \_lg
-   보통 \_md
-   작게 \_sm
-   더작게 \_xs

## 네이밍규칙

## 공통규칙

-   naming은 영문 소문자, 숫자, 언더바(\_)로 작성한다.
-   단어조합시, [형태+의미+숫자+상태]의 형태로 작성한다.
-   숫자가 없으면 ‘1’이라는 숫자가 생략된 것으로 간주한다.
-   약속어를 기본으로 작성하나, 없으면 종류와 특성을 나타내도록 naming한다.
-   종류 구분 번호 예시
-   ID selector 카멜표기법
-   (camelCase) 한 자리수
-   (생략가능, 2, 3) errorMesage, controlCenter, controlCenter2
-   Class Selector 스네이크표기법
-   (snake_case) 한 자리수
-   (생략가능, 2, 3) tab_page, tbl_type1, tbl_type2
-   Image 스네이크표기법
-   (snake_case) 두 자리수
-   (01, 02, 03) btn_cancle01_off.gif
-   파일 및 폴더 스네이크표기법
-   (snake_case) cyber_center

## ID 선택자

-   id는 카멜표기법을 사용한다. 예)tabType1
-   최상위, 레이아웃, 폼 요소, 책갈피를 제외하고 id를 사용하지 않는다.
-   동일한 이름의 id는 문서에서 한번만 사용이 가능하다.

## CLASS 선택자

-   class는 언더바(*)방식을 사용한다. 예)tab*type1
-   다중의 클래스 지정을 허용하며 최대 3개 이상 사용하지 않도록 주의한다.

## 이미지 Naming

-   네이밍 공통 규칙에 따른다.
-   분류 파일명 설명
-   버튼 btn\*
-   아이콘 ico\*
-   화살표 arr\*
-   블릿 bul\*
-   배경 bg\*
-   비주얼 visual\*
-   썸네일 thumb\*
-   배너 bnn\*
-   일반 이미지 img\_
-   임시 @ 모든 임시파일은 temp폴더에 넣는다.

## 파일 Naming

-   HTML파일은 화면ID로 작업한다. 예)화면ID.html
