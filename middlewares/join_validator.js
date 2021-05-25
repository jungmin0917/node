const { alert } = require('../lib/common');

/**
*	회원 가입 유효성 검사 미들웨어
*/

module.exports.joinValidator = function(req, res, next){
	// req.body.memId, req.body.memPw 체크하기
	if(!req.body.memId){
		return alert('아이디를 입력해주세요', res);
	}

	if(!req.body.memPw){
		return alert('비밀번호를 입력해주세요', res);
	}

	next(req, res, next); // 다음 미들웨어로 이동 (return $this로 넘기는 것과 비슷)
};
