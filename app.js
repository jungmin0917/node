/* 기본 모듈 등록부 */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const session = require('express-session');

const { sequelize } = require("./models/index"); // .js, .json은 생략 가능

/* 라우터 모듈 등록부 */
const memberRouter = require('./routes/member');

const app = express();

dotenv.config();

app.set('port', process.env.port || 3000);

// nunjucks 설정
app.set("view engine", "html");
nunjucks.configure("views", {
	express : app,
	watch : true, // 실시간 갱신
});

// DB 연결 (promise 비동기 처리 방식 이용)
sequelize.sync({
	force : false,
})
	.then(function(){
		console.log("데이터베이스 연결 성공");
	})
	.catch(function(err){
		console.error(err);
	});

app.use(morgan('dev'));
app.use(methodOverride("_method"));

// body-parser 설정
app.use(express.json());
app.use(express.urlencoded({
	extended : false,
}));

// 정적 파일 설정
app.use("/", express.static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser(process.env.cookie_secret));

// express-session 설정
app.use(session({
	resave: false,
	saveUninitialized : true, // 세션 값을 지정하지 않아도 초기화됨
	cookie : {
		httpOnly : true, // 오직 서버 내에서만 바꿀 수 있음
		secure : false, // https 쓸지 안 쓸지
	},
	name : 'hjmsession',
}));

/* 라우팅 */
app.use("/member", memberRouter);

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


// 서버 포트 설정
app.listen(app.get('port'), function(){
	console.log(app.get('port'), '번 포트에서 대기 중');
});