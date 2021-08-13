// node-fetch.js , 유빈 2000, 규태 6000, 홍식 2000
const fetch = require('node-fetch');
const fs = require('fs').promises;
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";
const filename = "./data/data.txt";

function fetchCorona(callBack) {
    fetch(url)
        .then(function(data) {
            return data.text();
        })
        .then(function(body) {
            let $ = cheerio.load(body); //html을 읽어서 제이쿼리 형식으로 쓸 수 있게 변환해줘
            let value1 = $(".inner_value").eq(0).text().trim();
            let value2 = $(".inner_value").eq(1).text().trim();
            let value3 = $(".inner_value").eq(2).text().trim();

            let value4 = $(".ca_value").eq(2).text().trim();
            let value5 = $(".ca_value").eq(3).text().trim();
            let value6 = $(".ca_value").eq(4).text().trim();
            let value7 = $(".ca_value").eq(5).text().trim();
            let value8 = $(".ca_value").eq(6).text().trim();
            let value9 = $(".ca_value").eq(7).text().trim();

            let recordData = {
                before: [value1, value2, value3],
                out: [value4, value5],
                in: [value6, value7],
                dead: [value8, value9]
            }

            // `
            //     전일대비 현황
            //     소계 : ${value1}, 국내발생 : ${value2}, 해외유입 : ${value3}
            //     격리해제
            //     누적 : ${value4}, 전일대비 : ${value5}
            //     격리중 
            //     누적 : ${value6}, 전일대비 : ${value7}
            //     사망
            //     누적 : ${value8}, 전일대비 : ${value9}`;
            //return fs.writeFile(filename, recordData);

            callBack(recordData);
        })
        .catch(function(err) {
            console.log(err);
            callBack(err);
        });
}

module.exports = {
    fetchCorona
}

//   가져온 데이터를 data/corona.html 
// 기록된 후, 기록완료라는 메시지도 나오게 정정

// npm install node-fetch
// npm install cheerio