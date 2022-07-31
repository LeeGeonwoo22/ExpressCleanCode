## ExpressCleanCode_BoilerPlate

클린코드 아키텍처를 적용한 express server 보일러 플레이트 입니다. 

데이터 관리는 몽고디비를 사용하였습니다. 

가장 기본적인 회원가입 & 로그인 & 로그아웃, 그리고 bcrpyt를 사용하여 비밀번호를 해싱처리 하였습니다. 

----------------------------------------

#### 아키텍처 구조

```
-src
	- config
		- hashing.js
		- winston.js
	- controller
		- users.js
	- entities
		- models
			- User.js
	app.js
```

-------

#### 실행 방법

1. `npm i`를 이용하여 인스톨 한다.
2. `npm start`를 입력