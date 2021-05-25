const express = require('express');

const router = express.Router();

const member = require("../models/member"); // member Model 파일 불러옴

const { joinValidator } = require('../middlewares/join_validator'); // 회원가입 유효성 검사
const { alert, go } = require("../lib/common");

// 여기도 promise 방식으로 한다
/* 회원가입 S */
router.route("/join")
		.get(function(req, res, next){ // 회원가입 양식 출력
			res.render("member/join");
		})
		.post(joinValidator, async function(req, res, next){ // 회원가입 DB 처리
			try{
				const result = await member.join(req.body.memId, req.body.memPw);

				if(result){ // 성공한 경우
					return go("/member/login", res, 'parent');
				}

			}catch(err){
				console.error(err);
				next(err);
			}

			// 실패한 경우
			return alert('관리자 등록 요청 실패', res);
		});
/* 회원가입 E */

/* 로그인 S */
router.route("/login")
		// 로그인 양식 출력
		.get(function(req, res, next){
			res.render("member/login");
		})
		// 로그인 DB 처리
		.post(joinValidator, async function(req, res, next){
			try{
				const result = await member.login(req.body.memId, req.body.memPw, req);

				if(result){ // 성공한 경우
					return go("/admin", res, "parent");
				}

			}catch(err){
				console.error(err);
				next(err);
			}

			return alert('로그인 실패', res);
		});

/* 로그인 E */

/* 로그아웃 S */

router.get("/logout", function(req, res, next){
	req.session.destroy();
	res.redirect("/member/login");
});

/* 로그아웃 E */

module.exports = router;

