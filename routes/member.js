const express = require('express');

const router = express.Router();

const member = require("../models/member"); // member Model 파일 불러옴

const { joinValidator } = require('../middlewares/join_validator'); // 회원가입 유효성 검사

// 여기도 promise 방식으로 한다
router.route("/join")
		.get(function(req, res, next){ // 회원가입 양식 출력
			res.render("member/form");
		})
		.post(joinValidator, async function(req, res, next){ // 회원가입 DB 처리
			try{
				const result = await member.join(req.memId, req.memPw);
			}catch(err){
				console.error(err);
				next(err);
			}
		});

module.exports = router;

