//김규태가 해결함 2000원
console.time("인붕");

for (let i = 2; i < 100; i++) {
    let divideCnt = 0;
    for (j = 2; j < i - 1; j++) {
        if (i % j == 0) {
            divideCnt++;
        }
    }
    if (divideCnt == 0) {
        console.log(i);
    }
}

console.timeEnd("인붕");