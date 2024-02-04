# ✈️ Toy Project : trip-mate

### ▪️ 프로젝트 소개

![image](https://github.com/minsuhan1/trip-mate/assets/50696567/15c46bbe-618f-4bc0-87c6-b28adc045d25)

> 심플하지만 꼼꼼하게 여행을 계획하고 기록할 수 있는 모바일 웹서비스입니다

### ▪️ 제작 동기

- React를 학습하고 진행한 첫 번째 토이 프로젝트로서, 아래 개념들을 활용하여 유용한 애플리케이션을 제작하기로 계획했습니다.<br><br>
- JSX를 이용한 컴포넌트 단위의 UI 구성
- React에서 제공하는 다양한 Hook과 로직 재사용성을 위한 Custom Hook
- 상태 관리를 위한 Context API와 Redux toolkit
- SPA(Single Page Application) 구현을 위한 react-router
- Redux Middleware를 활용한 비동기 작업 처리
- type 안정성과 유지보수 용이를 위한 Typescript
- redux-persist를 활용한 데이터 캐싱 처리

### ▪️ 프로젝트 기간

- 2023.09.08 ~ 2023.12.03

### ▪️ 프로젝트 개요

- [➡️ trip-mate 바로가기 (모바일 환경에 최적화되어 있습니다)](https://minsuhan1.github.io/trip-mate)
- [📝 프로젝트 구상 기록](https://accurate-bank-c77.notion.site/f4daecd5764c4b11b6692105cf461a15?pvs=4)

### ▪️ 기술 스택
#### FE
<img src="https://img.shields.io/badge/Typescript-000000?style=flat-square&logo=typescript&logoColor=3178C6"/> <img src="https://img.shields.io/badge/React-000000?style=flat-square&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Scss-000000?style=flat-square&logo=sass&logoColor=CC6699"/> <img src="https://img.shields.io/badge/HTML-000000?style=flat-square&logo=html5&logoColor=E34F26"/> <img src="https://img.shields.io/badge/Redux-000000?style=flat-square&logo=redux&logoColor=764ABC"/> <img src="https://img.shields.io/badge/styled&ndash;components-000000?style=flat-square&logo=styled-components&logoColor=DB7093"/> <img src="https://img.shields.io/badge/PWA-000000?style=flat-square&logo=pwa&logoColor=5A0FC8"/>

#### BE
<img src="https://img.shields.io/badge/Firebase Auth-000000?style=flat-square&logo=firebase&logoColor=FFCA28"/> <img src="https://img.shields.io/badge/Cloud Firestore-000000?style=flat-square&logo=firebase&logoColor=FFCA28"/>

#### CI/CD
<img src="https://img.shields.io/badge/Github Actions-000000?style=flat-square&logo=github-actions&logoColor=2088FF"/> <img src="https://img.shields.io/badge/Github Pages-000000?style=flat-square&logo=github-pages&logoColor=ffffff"/>

### ▪️ 디렉터리 구조

<details>
    <summary>펼치기</summary>

```bash
📦 trip-mate
├─ src
│  ├─ App.tsx
│  ├─ assets
│  ├─ components
│  │  ├─ auth
│  │  ├─ branding
│  │  ├─ checklist
│  │  ├─ common
│  │  │  ├─ Button
│  │  │  ├─ DropdownMenu
│  │  │  ├─ FloatingAddButton
│  │  │  ├─ Form
│  │  │  ├─ IconButton
│  │  │  ├─ LargeTitle
│  │  │  ├─ LoadingSpinner
│  │  │  ├─ MapInput
│  │  │  ├─ Modal
│  │  │  ├─ NavBar
│  │  │  ├─ NavBarWithIcons
│  │  │  ├─ Overlay
│  │  │  ├─ Spacing
│  │  │  ├─ TabMenu
│  │  │  └─ TabSelector
│  │  ├─ expenses
│  │  ├─ forms
│  │  │  ├─ expense
│  │  │  ├─ profile
│  │  │  ├─ schedule
│  │  │  └─ trip
│  │  ├─ home
│  │  ├─ modal-contents
│  │  ├─ place-overview
│  │  └─ schedule
│  ├─ constants
│  │  └─ constants.ts
│  ├─ contexts
│  │  ├─ auth-context.tsx
│  │  ├─ form-context.tsx
│  │  ├─ loading-context.tsx
│  │  └─ modal-context.tsx
│  ├─ hooks
│  │  ├─ useApp.ts
│  │  ├─ useClickOutside.tsx
│  │  ├─ useForm.ts
│  │  ├─ usePlaceSelector.tsx
│  │  └─ useTabSelector.tsx
│  ├─ index.tsx
│  ├─ layouts
│  │  └─ bottom-nav
│  ├─ logo.svg
│  ├─ pages
│  │  ├─ ErrorPage.tsx
│  │  ├─ NotFoundPage.tsx
│  │  ├─ PrivateRoutes.tsx
│  │  ├─ RootPage.tsx
│  │  ├─ auth
│  │  ├─ branding
│  │  ├─ checklist
│  │  ├─ expenses
│  │  ├─ home
│  │  ├─ place-overview
│  │  ├─ profile
│  │  ├─ schedule
│  │  └─ trip
│  ├─ react-app-env.d.ts
│  ├─ service-worker.ts
│  ├─ serviceWorkerRegistration.ts
│  ├─ services
│  │  └─ firebase.tsx
│  ├─ store
│  │  ├─ checklistReducer.ts
│  │  ├─ expensesReducer.ts
│  │  ├─ index.ts
│  │  ├─ profileReducer.ts
│  │  ├─ scheduleReducer.ts
│  │  └─ triplistReducer.ts
│  ├─ styles
│  │  ├─ globalStyle.tsx
│  │  └─ page-wrap-padding-15.tsx
│  └─ utils
│     ├─ auth
│     ├─ checklist
│     ├─ common.ts
│     ├─ expenses
│     ├─ profile
│     ├─ schedule
│     └─ trip
└─ tsconfig.json
```

©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

</details>

<br />

### ▪️ 구현 기능 요약

- Google 로그인 (Firebase Auth API, Context API)
- 브랜딩 페이지 (useState, react-slick)
- 프로필 추가 및 수정 기능 (Redux toolkit, redux thunk, Cloud Firestore)
- 여행일정 추가/수정/삭제 기능 (Redux toolkit, redux thunk, Cloud Firestore)
- 여행 스케줄 추가/수정/삭제 기능 (KakaoMap API, Redux toolkit, redux thunk, Cloud Firestore, Custom Hook)
- 여행장소 한눈에보기 기능 (KakaoMap API, Redux toolkit, useEffect)
- 체크리스트, 여행경비 관리 기능 (KakaoMap API, Redux toolkit, redux thunk, Cloud Firestore)
- 모바일 앱으로 설치하여 사용할 수 있도록 PWA 적용

<br />

|                                                    Google 로그인                                                     |                                                    브랜딩 페이지                                                     |                                                 프로필 확인 및 수정                                                  |                                                     여행일정 생성                                                     |
| :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/minsuhan1/geulmadi/assets/50696567/a8f89e81-4929-4601-95e2-37f0c830eee2" width="200" /> | <img src="https://github.com/minsuhan1/geulmadi/assets/50696567/fec4ff87-a8bf-4f85-88b0-c28c90edb692" width="200" /> | <img src="https://github.com/minsuhan1/geulmadi/assets/50696567/aa05cc91-aef1-4f29-945e-0aa613f7a7b8" width="200" /> | <img src="https://github.com/minsuhan1/trip-mate/assets/50696567/b2206d3c-35ec-47f0-b98c-4668b0409096" width="200" /> |

|                                                      스케줄 관리                                                      |                                                 여행장소 한눈에보기                                                  |                                                      체크리스트                                                      |                                                     여행경비 관리                                                     |
| :-------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/minsuhan1/trip-mate/assets/50696567/f129eb71-4d65-487e-93e3-74ab08b4333e" width="200" /> | <img src="https://github.com/minsuhan1/geulmadi/assets/50696567/79291905-e15e-4c9d-86fb-21677e881c3e" width="200" /> | <img src="https://github.com/minsuhan1/geulmadi/assets/50696567/5c244d04-fd99-433a-bd4e-1b0bb0c2c610" width="200" /> | <img src="https://github.com/minsuhan1/trip-mate/assets/50696567/952cc6ba-22e8-41a5-a563-bb46543b9e14" width="200" /> |

```

```
