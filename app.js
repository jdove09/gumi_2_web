const express = require('express')
const app = express()
var db_config = require(__dirname + '/custom_module/DB_config.js');
var conn = db_config.init();
var bodyParser = require('body-parser');
let test = require(__dirname + '/custom_module/savedata.js');

db_config.connect(conn);


app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function (req, res) {
  var sql = 'SELECT * FROM testtable';    
    conn.query(sql, function (err, rows, fields) {
      console.log("1번째 쿼리(글테이블) .. 작동중....");
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {

          console.log("2번째 쿼리(댓글테이블) .. 작동중....");
          sql = 'SELECT * FROM ttest';
          console.log(sql);
          conn.query(sql, function (err, coment_rows, fields) {
            if(err) console.log('query is not excuted. select fail...\n' + err);
            else {
              console.log(rows);
              console.log(coment_rows);
              test.main_length = rows.length;  //게시글 전체길이
              test.comment_length = coment_rows.length;  //댓글 전체길이
              res.render('index.ejs', {'list' : rows, 'list2' : coment_rows});  //ejs로 쏴줌
              }
        });
      }
    });
    
});


app.get('/write', function (req, res) {
  res.render('write.ejs');
})

app.post('/addcoment', function (req, res) {
  var body = req.body;
  console.log("행 길이"+test.comment_length);
  console.log(body);
  
  //순서를 맞춰야해용
  var sql = 'INSERT INTO ttest VALUES(?, ?, ?, ?)';
  var params= [
    test.comment_length, body.hidden_mother, body.input_user, body.input_kakao
  ];
  console.log(params);
  console.log("첫번째 쿼리 ( 댓글 인설트) 작동중........")
  conn.query(sql, params, function(err) {
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else {
        console.log("두번째 쿼리 ( 메인 현재인원)작동중.........");
        sql = 'UPDATE testtable SET now_people= ? WHERE room_index= ?';
        var params= [
          body.hidden_personal_count, body.hidden_mother
        ];
        console.log("jdove"+params);
        conn.query(sql, params,function (err) {
          if(err) console.log('query is not excuted. Update fail...\n' + err);
          else {
            res.redirect('/');
            }
      });
    }
  });
});

app.post('/writeAf', function (req, res) {

  var body = req.body;
  console.log(body);
  
  //순서를 맞춰야해용
  var sql = 'INSERT INTO testtable VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var params= [
    test.main_length, body.roomname, body.Uname, body.kakaoID, body.hidden_Latitude, body.hidden_Longitude, body.explanation, '1', '1', body.max_people, body.time
  ];
  console.log(params);
  conn.query(sql, params, function(err) {
      if(err) console.log('query is not excuted. insert fail...\n' + err);
      else res.redirect('/');
  });
});





//서버 시작 콘솔
var server = app.listen(9073, () => {
  console.log("서버시작 포트는 9073");
});

 
 