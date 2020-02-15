const express = require('express');
const axios = require('axios');

const router = express.Router();


// 사용자가 토큰 인증 과정을 테스트해보는 라우터
// 보통 토큰은 HTTP 요청 헤더에 넣어서 보낸다.
router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.jwt) { // 세션에 토큰이 없으면 HTTP요청 본문에 클라이언트 비밀키를 실어 보낸다.
      const tokenResult = await axios.post('http://localhost:3001/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code === 200) { // 토큰 발급 성공
        req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      } else { // 토큰 발급 실패
        return res.json(tokenResult.data); // 발급 실패 사유 응답
      }
    }
    // 발급받은 토큰 테스트
    const result = await axios.get('http://localhost:3001/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response.status === 419) { // 토큰 만료 시
      return res.json(error.response.data);
    }
    return next(error);
  }
});

module.exports = router;

/**
 * axios를 통해 다른 서버로 요청을 보냈다.
 * 프로미스 기반으로 동작하므로 async/await 문법과 함께 사용할 수 있고, 다른 패키지에 비해 직관적으로 요청을 보낼 수 있기 때문에 axios를 사용
 * axios.get(주소, { headers: { 헤더 } })를 하면 해당 주소에 헤더와 함께 GET요청을 보내는 것
 * axios.post(주소, { 데이터 })를 하면 해당 주소에 POST 요청을 보내면서 요청 본문에 데이터를 실어 보내는 것
 */