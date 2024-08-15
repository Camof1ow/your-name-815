<h1 style="text-align: center;"> 당신의 이름은 8.15 </h1>
<p style="text-align: center;">
   <img src="img1.png" alt="이미지1" style=": center; max-width: 100%; height: auto;" />
</p>

# Table of Contents

- [[1] About the Project](#1-about-the-project)
    - [Features](#features)
    - [Technologies](#technologies)
- [[2] Getting Started](#2-getting-started)
- [[3] Contribution](#4-contribution)
- [[4] Acknowledgement](#5-acknowledgement)
- [[5] Contact](#6-contact)
- [[6] License](#7-license)

# [1] About the Project

### 프로젝트의 비전

- [내가춘자라니](https://chunja.vercel.app/) 프로젝트에 감명을 받아 제작하였습니다.
- 광복이라는 주제로 우리가 우리이름이 아닌 일본식 성과 이름을 사용할 수밖에 없었을 비극적 역사에서 <br />광복의 의미를 되새기고 싶었습니다.
- 또한 잊혀진 광복의 독립투사들을 자신의 이름에서 찾아내고 기릴 수 있는 시간이 되었으면 했습니다.

## Features

![video1.webp](video1.webp) ![video2.webp](video2.webp)

### 이름 입력 및 변환

- 사용자가 이름을 입력하면, `useEffect`를 사용하여 한자 데이터를 필터링하고, 입력된 이름에 해당하는 한자 옵션을 제공합니다.

### 좋아요 기능

- 좋아요 버튼은 `fetch`를 사용하여 API 서버와 통신하여 좋아요 수를 업데이트하고, 사용자에게 현재 좋아요 수를 표시합니다.

### 모달 팝업

- 입력 검증 후 사용자에게 오류 메시지를 표시하기 위해 모달 창이 사용됩니다. 모달은 `useState`로 상태를 관리하여 열리고 닫힙니다.

## Technologies

### 1. Frontend

| 기술         | 이미지                                                                                                                      | 버전     |
|------------|--------------------------------------------------------------------------------------------------------------------------|--------|
| React.js   | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)            | 18.3.1 |
| TypeScript | ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) | 4.0.0  |
| Next.js    | ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)                     | 12.0.0 |

### 2. Styling

| 기술           | 이미지                                                                                                                          | 버전    |
|--------------|------------------------------------------------------------------------------------------------------------------------------|-------|
| Tailwind CSS | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | 3.0.0 |

### 3. Icons

| 기술          | 이미지                                                                                                                          | 버전    |
|-------------|------------------------------------------------------------------------------------------------------------------------------|-------|
| React Icons | ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | 4.0.0 |

### 4. Backend API

| 기술         | 이미지                                                                                                               | 버전    |
|------------|-------------------------------------------------------------------------------------------------------------------|-------|
| API Server | ![SpringBoot](https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white) | 3.3.2 |

### 5. Data Processing

| 기술    | 이미지                                                                                                                          | 버전    |
|-------|------------------------------------------------------------------------------------------------------------------------------|-------|
| d3.js | ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | 7.0.0 |

# [2] Getting Started

<details>
  <summary>프로젝트 실행하기.</summary>

1. **프로젝트 클론**: 이 레포지토리를 클론합니다.
    ```bash
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. **의존성 설치**: 다음 명령어로 프로젝트에 필요한 패키지를 설치합니다.
    ```bash
    npm install
    ```
   또는
    ```bash
    yarn install
    ```

3. **환경 변수 설정**: 프로젝트의 루트 디렉토리에 `.env.local` 파일을 생성하고 다음과 같이 환경 변수를 설정합니다.
    ```plaintext
    BE_API_URL=http://your-api-url/api/v1
    BE_BASE_URL=http://your-api-url
    ```

4. **프로덕션 빌드**: 프로덕션 빌드를 생성합니다.
    ```bash
    npm run build
    ```
   또는
    ```bash
    yarn build
    ```

5. **프로덕션 서버 실행**:
    ```bash
    npm start
    ```
   또는
    ```bash
    yarn start
    ```

</details>

# [3] Contribution

- ✨[Camof1ow](https://github.com/Camof1ow) : 프론트엔드 작업 및 [내이름은?](https://yourname815.vercel.app/myname) 파트 담당.
- ✨[dlo](https://github.com/Kang-YongHo) : [독립운동가 찾기](https://yourname815.vercel.app/activist) 기능 개발.

# [4] Acknowledgement

- [내가 춘자라니](https://chunja.vercel.app/)
- [Vercel](https://vercel.com/)
- [CHAT GPT](https://chatgpt.com/)

# [5] Contact

- 📧 g_10000@kakao.com
- 📋 [contact](https://camof1ow.github.io/#three)

# [6] License

[![License: CC BY-ND 4.0](https://licensebuttons.net/l/by-nd/4.0/80x15.png)](https://creativecommons.org/licenses/by-nd/4.0/)

