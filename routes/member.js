const express = require('express');

const router = express.Router();

// 여기도 promise 방식으로 한다
router.route("/join")
		.get(function(req, res, next){ // 회원가입 양식 출력
			res.render("member/form");
		})
		.post(function(req, res, next){ // 회원가입 DB 처리

		});

module.exports = router;

