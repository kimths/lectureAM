// node-fetch.js , 유빈 2000, 규태 4000
const fetch = require('node-fetch');
const fs = require('fs').promises;
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";
const filename = "./data/data.txt";

fetch(url)
    .then(function(data) {
        return data.text();
    })
    .then(function(body) {
        let $ = cheerio.load(body); //html을 읽어서 제이쿼리 형식으로 쓸 수 있게 변환해줘
        let value = $(".inner_value").eq(0).text();

        let recordData = `
        전일대비 현황
        소계 : ${value}, 국내발생 : ??, 해외유입 : ??
        격리해제
        누적 : ???, 전일대비 : ???
        격리중 
        누적 : ???, 전일대비 : ???
        사망
        누적 : ???, 전일대비 : ???
    `;
        return fs.writeFile(filename, recordData);
    })
    .then(function() {
        console.log("기록 완료");
    })
    .catch(function(err) {
        console.log(err);
    });
//   가져온 데이터를 data/corona.html 
// 기록된 후, 기록완료라는 메시지도 나오게 정정

// npm install node-fetch
// npm install cheerio