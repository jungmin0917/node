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
		const hashed_pw = await bcrypt.hash(memPw, 10);

		const sql = `INSERT INTO member (memId, memPw) VALUES (:memId, :memPw)`;

		const result = await sequelize.query(sql, {
			replacements : {
				memId,
				memPw : hashed_pw,
			},
			type : QueryTypes.INSERT,
		});

		await console.log(result);
	},
};

module.exports = member;