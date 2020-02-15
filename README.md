# nodebird-call
- nodebird-api의 API를 통해 데이터를 가져옴

## v0.1
- 서버 파일과 에러를 표시할 app.js 파일 생성
- 사용자가 토큰 인증 과정을 테스트해보는 라우터(/test) 생성
    - 토큰이 없다면 비밀키를 담아 3001(nodebird-api)로 요청해 토큰을 생성하고, 토큰이 있다면 헤더에 토큰을 담아 정보를 요청한다.

```
.env
COOKIE_SECRET=nodebirdcall
CLIENT_SECRET=(xxx)
```

- CLIENT_SECRET에는 nodebird-api에서 도메인을 등록하고 생성한 클라이언트 비밀키를 입력하면된다.

## v0.2
- post, hashtag api를 가져오기위한 /mypost, /search/:hashtag 추가

## v0.3
- const URL = 'http://localhost:3001/v2'로 변경하지않고 v1을 사용하면 deprecated된 nodebird-api를 호출해 에러가 난다.
- nodebird-api의 v0.4와 실행하면 된다.

## v1.0
- 앞서 call서버에서 api서버로 api를 호출했다. call프론트에서 api서버를 호출해보자
    - 클라이언트에서 바로 3001(nodebird-api)로 요청하면, 클라이언트와 서버의 도메인이 일치하지않아 요청이 차단된다. = CORS(cross-origin resource sharing) 문제
    - 이 문제를 해결하려면 응답헤더에 Access-Control-Allow-Origin이라는 헤더를 넣어줘야한다. 이 헤더는 클라이언트 도메인의 요청을 허락하겠다는 뜻을 갖고 있다. 따라서 nodebird-api에 cors모듈을 설치해야 한다.
