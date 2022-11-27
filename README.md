## ExpressCleanCode_BoilerPlate

클린코드 아키텍처를 적용한 express server 개인 연습 보일러 플레이트 입니다. 

데이터 관리는 몽고디비를 사용하였습니다. 

async/await을 이용한 USER CRUD를 구현하였습니다.

----------------------------------------

#### 아키텍처 구조

```
-src
	- config
		- hashing.js
		- winston.js
	- controller
		- userController
			- user.js
		- routes
			- user.js
		- app.js
	- entities
		- models
			- User.js
	- server.js
```

-------

#### 실행 방법

1. `npm i`를 이용하여 인스톨 한다.
2. `npm start`를 입력