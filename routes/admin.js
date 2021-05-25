/**
*	이력서 관리 페이지
*/

const express = require('express');

const router = express.Router();

router.get("/", function(req, res, next){

	res.send("관리자 페이지");
});

module.exports = router;

