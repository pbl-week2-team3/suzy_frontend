# community.io

### Technology Stacks
- ReactJS
- Recoil

### Features
- Posts
    - Show posts
    - Create post with image and text
    - Add or cancel post likes
- Users
    - Sign-up, login, logout

### Recoil 사용 후기 (Redux 대비)
1. Redux 사용시 불편했던 점
- Redux의 경우, 관리해야하는 전역 state가 많아지거나 다양한 케이스들의 로직을 구현해야하는 경우 그에 수반되는 액션, 리듀서들에 대한 코드들이 기하급수적으로 증가
-- 개인적으로는 비동기 처리 이후 state를 함께 업데이트 해줘야할 때 dispatch -> middleware -> action generator -> reducer로 연계되는 코드 흐름들이 복잡하게 느껴졌고 여기에 연관된 payload들의 종류가 많아질 수록 관리가 어려웠음

2. Recoil에서 유용하다고 생각했던 점
- atom을 통한 간편한 store 구현 
- 미들웨어 없이 selector와 selectorFamily만으로도 비동기 처리 가능
-- 개인적으로 유용했던 사례들을 추려보자면,
--- 똑같은 API 요청에 대한 응답 값을 다양한 로직으로 처리해서 다양한 state들에 setState하고싶을 때
--- API 통해 데이터를 동시에 주고 받고 하는 로직들을 구현할 때 selectorFamily로 쉽게 구현 가능 
- Redux에서는 store에 대한 상태를 action으로 따로 정의해주어야 했으나(isLoading, error) Recoil에서는 useRecoilValueLoadable() hook을 통해 쉽게 접근 가능
- useRecoilCallback()을 통해 호출 시점에서의 state의 snapshot을 따로 리턴할 수 있음
- 업데이트 중....