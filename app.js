const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const session = require('express-session');

const app = express();

dotenv.config();

app.set('port', process.env.port || 3000);

// nunjucks 설정
app.set("view engine", "html");
nunjucks.configure("views", {
	express : app,
	watch : true, // 실시간 갱신
});

app.use(morgan('dev'));

// 없는 페이지 처리 미들웨어
app.use(function(req, res, next){
	const error = new Error(`${req.method} ${req.url}은 없는 페이지입니다.`);

	error.status = 404;

	next(error); // 에러 처리 미들웨어로 전달
});

// 에러 처리 미들웨어
app.use(function(err, req, res, next){
	res.locals.error = err;

	res.status(err.status || 500).render('error');
})



app.listen(app.get('port'), function(){
	console.log(app.get('port'), '번 포트에서 대기 중');
});