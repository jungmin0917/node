// 구조분해로 DB 연결 모듈 불러오기
const { sequelize, Sequelize : { QueryTypes } } = require("./index");
const bcrypt = require('bcrypt');

/**
*	Member Model 파일
*
*/
const member = {
	/**
	*	관리자 등록 요청 처리
	*
	*	@param String memId 아이디
	*	@param String memPw 비밀번호
	*	
	*	@return Boolean true/false
	*/
	join : async function(memId, memPw){
		try{
			const hashed_pw = await bcrypt.hash(memPw, 10);

			const sql = `INSERT INTO member (memId, memPw) VALUES (:memId, :memPw)`;

			await sequelize.query(sql, {
				replacements : {
					memId,
					memPw : hashed_pw,
				},
				type : QueryTypes.INSERT,
			});

			return true;
		}catch(err){
			console.error(err);
			return false;
		}
	},

	/**
	*	로그인
	*
	*	@param String memId 아이디
	*	@param String memPw 비밀번호
	*	@param Object req // Request 객체 (세션 기록할 때 필요)
	*
	*	@return Boolean
	*/
	login : async function(memId, memPw, req){
		try{
			const sql = `SELECT * FROM member WHERE memId = :memId AND isAdmin = 1`;

			const rows = await sequelize.query(sql, {
				replacements : {
					memId : memId,
				},
				type : QueryTypes.SELECT,
			});

			if(rows.length == 0){ // 해당 아이디 존재하지 않을 경우
				return false;
			}

			const match = await bcrypt.compare(memPw, rows[0].memPw);

			if(match){ // 비밀번호 일치 - 로그인 처리 (세션 처리)
				req.session.memId = rows[0].memId;
				return true;
			}

			// 로그인 실패
			return false;
			
		}catch(err){
			console.error(err);
			return false;
		}
	},
};

module.exports = member;