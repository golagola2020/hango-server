## 라즈베리파이
> Path : '/rasp/drink/read'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "serialNumber" : VALUE,
    "drink" : {
	"position" : DRINK_POSITION,
	"name" : DRINK_NAME,
	"price" : DRINK_PRICE,
	"count" : DRINK_COUNT
    } 
}
```   

> Path : '/rasp/drink/update'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE,
    serialNumber : VALUE
    drink : {
	name : VALUE,
	price : VALUE,
	soldPosition : VALUE
    }
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

## 모바일
> Path : '/mobile/login'   
> Method : POST
* Request
```javascript
request = {
    user : {
	id : VALUE,
	passwd : VALUE
    }
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/signup'   
> Method : POST
* Request
```javascript
request = {
    user : {
	id : VALUE,
	name : VALUE,
	email : VALUE,
	passwd : VALUE,
	pwCheck : VALUE
    }
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/user/read'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
    "user" : {
	"id" : USER_ID,
	"name" : USER_NAME,
	"email" : USER_EMAIL
    }
}
```

> Path : '/mobile/user/update'   
> Method : POST
* Request
```javascript
request = {
    user : {
	id : VALUE,
	name : VALUE,
	email : VALUE,
	newPasswd : VALUE
    }
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/user/delete'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/notification'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "vending" : {
	"name" : ["VENDING_NAME_1", "VENDING_NAME_2", ...],
	"soldOuts" : {
		"VENDING_NAME_1" : [SOLDOUT_DRINK_1, SOLDOUT_DRINK_2, ...],
		"VENDING_NAME_2" : [SOLDOUT_DRINK_1, SOLDOUT_DRINK_2, ...],
		...
	}
    }
}
```

> Path : '/mobile/vending/read'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시 등록된 자판기가 없는 경우
response  = {
    "success" : true,
    "userName" : USER_NAME,
    "msg" : '등록된 자판기가 존재하지 않습니다.'
}
// 성공시 등록된 자판기가 있는 경우
response  = {
    "success" : true,
    "userName" : USER_NAME,
    "vendings" : [  
		{
			"serialNumber" : SERIAL_NUMBER,
			"name" : NAME,
			"description" : DESCRIPTION,
			"fullSize" : FULLSIZE
	         	},
	         	{
			"serialNumber" : SERIAL_NUMBER,
			"name" : NAME,
			"description" : DESCRIPTION,
			"fullSize" : FULLSIZE
	         	},
	         	...
	        ]
}
```

> Path : '/mobile/vending/update'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE,
    vending : {
	name : VALUE,
	description : VALUE,
	fullSize : VALUE
	}
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/vending/delete'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/drink/read'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
     "drinks" : [  
		{
			"position" : POSITION,
			"name" : NAME,
			"price" : PRICE,
			"count" : COUNT,
			"maxCount" : MAX_COUNT
	         	},
	         	{
			"position" : POSITION,
			"name" : NAME,
			"price" : PRICE,
			"count" : COUNT,
			"maxCount" : MAX_COUNT
	         	},
	         	...
	     ]
}
```

> Path : '/mobile/drink/create'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE,
    drink : {
	position : VALUE,
	name : VALUE,
	price : VALUE,
	maxCount : VALUE
	}	
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/drink/update'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE,
    drink : {
	position : VALUE,
	name : VALUE,
	price : VALUE,
	maxCount : VALUE
	}	
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/drink/refresh'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE	
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/mobile/stats/read'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "users" : {
	"salseDate" : [],
	"price" : []
    }
}
```

> Path : '/mobile/stats/vending/read'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "vendings" : {
	"name" : ["VENDING_NAME_1", "VENDING_NAME_2", ...],
	"VENDING_NAME_1" : {
		"salseDate" : [],
		"price" : []
		},
	"VENDING_NAME_2" :{
		"salseDate" : [],
		"price" : []
		},
	...
    }
}
```

> Path : '/mobile/stats/drink/read'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "drinks" : {
	"name" : ["DRINK_NAME_1", "DRINK_NAME_2", ...],
	"DRINK_NAME_1" : {
		"salseDate" : [],
		"price" : []
		},
	"DRINK_NAME_2" :{
		"salseDate" : [],
		"price" : []
		},
	...
    }
}
```

## 고객 관리 시스템
> Path : 'admin/login'   
> Method : POST
* Request
```javascript
request = {
    id : VALUE,
    passwd : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : 'admin/signup'   
> Method : POST
* Request
```javascript
request = {
    id : VALUE,
    name : VALUE,
    email : VALUE,
    passwd : VALUE,
    pwCheck : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "mailInfo" : info
}
```

> Path : '/admin/user/read'   
> Method : POST
* Request
```javascript
request = {
    //요청 데이터 없음
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "users" : [
	    {
		"id" : USER_ID,
		"name" : USER_NAME,
		"email" : USER_EMAIL,
		"inDate" : DATE
	    },
	    {
		"id" : USER_ID,
		"name" : USER_NAME,
		"email" : USER_EMAIL,
		"inDate" : DATE
	    },
	    ...
	]
}
```

> Path : '/admin/user/search'   
> Method : POST
* Request
```javascript
request = {
    type : VALUE,
    text : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "users" : [
	    {
		"id" : USER_ID,
		"name" : USER_NAME,
		"email" : USER_EMAIL,
		"inDate" : DATE
	    },
	    {
		"id" : USER_ID,
		"name" : USER_NAME,
		"email" : USER_EMAIL,
		"inDate" : DATE
	    },
	    ...
	]
}
```

> Path : '/admin/user/:userId'   
> Method : POST
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "user" : {
	"userId" : USER_ID,
	"name" : USER_NAME,
	"email" : USER_EMAIL,
	"inDtae" : IN_DATE
	}
}
```

> Path : '/admin/user/:userId/update'   
> Method : GET
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response = {
	"user_id" : USER_ID,
	"user_name" : USER_NAME,
	"user_email" : USER_EMAIL
}
```

> Path : '/admin/user/:userId/update'   
> Method : PUT
* Request
```javascript
request = {
    userId : VALUE,
    user : {
	id : VALUE,
	name : VALUE,
	email : VALUE
    }
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/admin/user/:userId'   
> Method : DELETE
* Request
```javascript
request = {
    userId : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/admin/vending/read'   
> Method : POST
* Request
```javascript
request = {
    //요청 데이터 없음
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "vendings" : [
		{
		    "serialNumber" : SERIAL_NUMBER,
		    "userId" : USER_ID,
		    "name" : VENDING_NAME,
		    "inDate" : DATE
		},
		{
		    "serialNumber" : SERIAL_NUMBER,
		    "userId" : USER_ID,
		    "name" : VENDING_NAME,
		    "inDate" : DATE
		},
		...
	]
}
```

> Path : '/admin/vending/search'   
> Method : POST
* Request
```javascript
request = {
    search : {
	type : VALUE,
	text : VALUE
	}
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "vendings" : [
		{
		    "serialNumber" : SERIAL_NUMBER,
		    "userId" : USER_ID,
		    "name" : VENDING_NAME,
		    "inDate" : DATE
		},
		{
		    "serialNumber" : SERIAL_NUMBER,
		    "userId" : USER_ID,
		    "name" : VENDING_NAME,
		    "inDate" : DATE
		},
		...
	]
}
```

> Path : '/admin/vending/create'   
> Method : POST
* Request
```javascript
request = {
    id : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true
}
```

> Path : '/admin/vending/:serialNumber'   
> Method : POST
* Request
```javascript
request = {
    serialNumber : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response  = {
    "success" : true,
    "vending" : {
	"serialNumber" : SERIAL_NUMBER,
	"userId" : USER_ID,
	"name" : VENDING_NAME,
	"description" : VENDING_DESCRIPTION,
	"fullSize" : VENDING_FULL_SIZE,
	"inDate" : IN_DATE,
	"updateDate" : UPDATE_DATE
    }
}
```

> Path : '/admin/vending/:serialNumber/update'   
> Method : GET
* Request
```javascript
request = {
    serialNumber : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response = {
	"serial_number" : SERIAL_NUMBER,
	"vending_name" : VENDING_NAME,
	"vending_description" : VENDING_DESCRIPTION,
	"vending_full_size" : VENDING_FULL_SIZE
}
```

> Path : '/admin/vending/:serialNumber/update'   
> Method : PUT
* Request
```javascript
request = {
    serialNumber : VALUE,
    vending : {
	name : VALUE,
	description : VALUE,
	fullSize : VALUE
    }
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response = {
    "success" : true
}
```

> Path : '/admin/vending/:serialNumber'   
> Method : DELETE
* Request
```javascript
request = {
    serialNumber : VALUE
}
```
* Response
```javascript
// 실패시
response  = {
    "success" : false,
    "msg" : ERROR_MESSAGE
}
// 성공시
response = {
    "success" : true
}
```