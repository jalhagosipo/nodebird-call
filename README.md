## nodebird-call
- nodebird-api의 API를 통해 데이터를 가져옴

# v0.1
- 서버 파일과 에러를 표시할 app.js 파일 생성
- 사용자가 토큰 인증 과정을 테스트해보는 라우터(/test) 생성
    - 토큰이 없다면 비밀키를 담아 3001(nodebird-api)로 요청해 토큰을 생성하고, 토큰이 있다면 헤더에 토큰을 담아 정보를 요청한다.

```
.env
COOKIE_SECRET=nodebirdcall
CLIENT_SECRET=(xxx)
```

- CLIENT_SECRET에는 nodebird-api에서 도메인을 등록하고 생성한 클라이언트 비밀키를 입력하면된다.


