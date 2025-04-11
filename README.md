# IT-Money 가계부 서비스

<p align="center">
  <img src="./src/icons/pig.png"  width="200" height="200">
</p>
<p align="center" style="font-size:1.5rem">IT's Your Life, IT's Your Money</p>
<p align="center" style="font-size: 2rem; font-weight: bold">IT-Money</p>

<br/>

## 📌 가계부 서비스 소개

사용자의 수입과 지출을 한눈에 파악할 수 있도록 도와주는 웹 기반 가계부

월별 수입/지출을 기록하고, 카테고리별로 소비를 분석할 수 있어 효율적인 자산 관리를 지원

### 📌 주요 기능

#### 📈 월별 총수입, 총지출, 순이익 제공

- 월별로 총수입, 총지출, 순이익을 파악할 수 있습니다.

#### 📈 카테고리별 지출금액 확인

- 월 총 지출 비용 중 각 카테고리별로 몇 프로 차지하는지 파악할 수 있습니다.

#### 📈 상세 내역 확인

- 각 내역을 클릭하면 상세 내역을 확인할 수 있습니다.

#### 📈 내역 추가, 수정, 삭제

- 내역을 추가하고 수정하고 삭제가 가능합니다.

#### 📈 사용자 이름, 이메일, 비밀번호 수정

- 마이페이지에서 사용자 이름과 이메일, 비밀번호 수정이 가능합니다.

### 📌 기술 스택

#### 프론트엔드

- JavaScript
- Vue 3
- vue-router
- axios
- pinia

#### 백엔드

- json-server

<br />

## 📌 시연 영상

![시연 영상](./src/assets/KB_ITMoney-1차스켈레톤.gif)

<br />

## ⚙️ 프로젝트 구동 방법

```sh
# 1. 레포지토리 클론
git clone https://github.com/your-username/project-name.git
cd project-name

# 2. 의존성 설치
npm install

# 3. json-server 실행 (예: 포트 3000)
npx json-server --watch db.json --port 3000

# 4. Vue 앱 실행 (예: 포트 5173)
npm run dev
```

<br />

## 📌 프로젝트 구조

```
── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── icons/
│ ├── router/
│ ├── stores/
│ ├── utils/
│ ├── views/
│ ├── App.vue
│ └── main.js
├── wallet_db.json
├── package.json
```

<br />

## 📌 팀원 소개

| 옥가연                                                              | 김재현                                          | 김호진                                      | 박소정                                                 | 최연아                                                                              | 황혜정                                                                |
| ------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [ockko](https://github.com/ockko)                                   | [kimjaehyeonn](https://github.com/kimjaehyeonn) | [khozan0120](https://github.com/khozan0120) | [sojsnake](https://github.com/sojsnake)                | [camellia785](https://github.com/camellia785)                                       | [yaburi02](https://github.com/yaburi02)                               |
| 프로젝트 총괄, 상세 페이지 및 수정 페이지, 삭제 기능, 헤더 컴포넌트 | 전체 거래 내역, 총지출/총수익                   | 거래 추가 페이지, DB 파일                   | 마이페이지 이름, 이메일, 비밀번호 수정 페이지, DB 파일 | 깃허브 머지 총괄, 순수익 페이지, 소비 카테고리 페이지, 메인 아이콘, 리스트 컴포넌트 | 메인 페이지, 최근 지출 내역, 월별 총수입/총지출/순수익, 푸터 컴포넌트 |

<br />

## 📌 개선 사항

- 선택 가능 영역 커서 포인터로 수정
- 최근 지출 내역 선택 시 오늘 날짜 기준 월로 표시하기
- 총수입, 총지출, 순이익 선택 시 선택한 월 기준으로 표시하기
- 새로 추가한 상세 내역 표시 안 되는 오류
- 새로 추가한 내역의 카테고리가 카테고리 없음으로만 나오는 오류
- 사용자 이름 수정 시 홈 헤더에 반응형으로 적용
- 전체 거래 내역 많아지면 밑으로 나오는 오류 수정

<br />

## 📌 소감

- 옥가연

  - 첫 협업 프로젝트를 해보면서 협업을 할 때 어떻게 진행해야 하는지 배울 수 있었던 시간이었습니다. 팀원들이 서로 소통을 원활히 해야 프로젝트도 원활히 진행될 수 있음을 느꼈습니다. 특히나 컴포넌트 설계의 일관성에 대해 생각해 볼 수 있었습니다.

- 김재현
- 김호진
  - 첫 협업 프로젝트를 진행하면서 협업과정에서 서로 소통을 원활히 해야 진행 가능하다는것을 알 수 있었고, 수업시간에 배웠던것을 최대한 활용을 하려고 했지만 놓친부분도 많고, 이해가 필요한 개념들이 아직도 많이 느껴져서 개발에 대한 이해와 공부를 깊게 파고, 확실히 해야겠다는 생각이 들었습니다.
- 박소정
  - 프로젝트를 진행하면서, 정규 수업 시간에 배웠던 개념들을 활용하는 방법을 알아갈 수 있어서 의미있는 시간이었습니다. 팀원들과 소통하면서 소통의 중요성을 다시 한 번 느끼게 되었습니다. 시간 부족으로 인해 구현하지 못했던 기능들도 더 추가해보고 싶다는 생각이 들었습니다.
- 최연아
  - 팀원들과 협업하면서 협업하며 코드를 구현하는 방식에 대해 많이 배울 수 있었습니다. 특히 초기 세팅의 중요성에 대해서 더 알게 되었습니다. 첫 개발협업 프로젝트였기에 처음부터 지정해야하는 사항에 대해 이해가 부족했던 것이 아쉬움이 남습니다. 다음 협업 프로젝트 때에는 초기 세팅을 더 확실히 해서 더 다양한 기능을 구현해보고 싶습니다.
- 황혜정
