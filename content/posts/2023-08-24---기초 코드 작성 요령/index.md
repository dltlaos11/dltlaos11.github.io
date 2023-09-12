---
title: 알고리즘 기초 코드 작성 요령
date: "2023-08-24T17:40:32.169Z"
template: "post"
draft: false
slug: "/posts/algorithms"
category: "Algorithms"
tags:
  - "Algorithms"
description: "알고리즘의 기초 코드 작성 요령에 대해서 배웁니다."
---

- [시간복잡도](#시간복잡도)
  - [빅오표기법(Big-O)](#빅오표기법)
  - [공간복잡도](#공간복잡도)
- [정수자료형](#정수-자료형)
- [실수자료형](#실수-자료형)
- [기초 코드 작성요령](#기초-코드-작성요령)

## 시간복잡도

##### 입력의 크기와 문제를 해결하는데 걸리는 시간의 상관관계

다음 코드에서 함수가 몇 번의 연산을 하는지 시간복잡도를 구해보자

```c
int func1(int arr[], int n){
	int cnt = 0; --- 2(초깃값 설정 cnt, i)
	for(int i = 0; i < n; i++){ --- n번(1(대소비교)+1(작을경우++))
		if(arr[i] % 5 == 0) cnt++; ---- n번(1(나머지 연산)+ 1(같다면)+ 1(cnt ++))
	}
	return cnt; --- 1(cnt 반환)
}
=> 1+1+n*(2+2+1)+1: 5n+3 -> n에 비례
```

또 다른 예제를 보자

> 대회장에 N명의 사람들이 일렬로 서있다. 거기서 당신은 이름이 ‘가나다’인 사람을 찾기 위해 사람들에게 이름을 물어볼 것이다. 이 떄 사람들은 이름 순으로 서있다. 이름을 물어보고 대답을 듣는데까지 1초가 걸린다면 얼마만큼의 시간이 필요할까?

<details>
<summary>정답
</summary>
업다운게임을 하듯이 중간 사람에게 계속 물어보면된다. 반씩 줄여나가면서 ‘가나다’의 사람의 위치를 유추. 최선의 경우 1초, 최악의 경우 lg N초, 평균적으로 lg N초가 필요하다. 걸리는 시간은 lg N에 비례한다.

- lg 2= 1, lg 4= 2 ,lg 8 =3
- 반씩 줄여나가면서 찾는 경우 평균적 log N에 비례
</details>

#### 빅오표기법

##### 주어진 식을 값이 가장 큰 대포항만 남겨서 나타내는 방법

- O(N^): 6N^ + 20N+10lgN
- 상수 O(1): 1, 5, ..

대표적인 시간복잡도의 그래프
<img width="704" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/2fef7205-1fc8-41ca-91d7-a2784bb1d63d">
O(1)<O(lgN)-로그시간<O(N)-선형시간<O(NlgN)<<Mark>O(N^) < O(N!) N이 25이하로 작은게 아니면 시간제한 통과하기 힘듦

N의 크기에 따른 허용 시간복잡도
<img width="703" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/6cf7d5e4-1641-43e1-b70d-3544d32959ee">
→ 주어진 문제를 보고 풀이를 떠올린 후에 무턱대고 바로 그걸 짜는게 아니라, 내 풀이가 이 문제를 제한 시간 내로 통과할 수 있는지, 즉 내 알고리즘의 시간복잡도가 올바른지 먼저 생각해봐야 한다.

###### 1

<img width="704" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/fe26d75d-690a-44a2-8c01-9aecca41151d">

```js
const func1 =(n)=>{
    let cnt =0;
    for(let i =0;i<=n;i++){
        if(i%3== 0 || i%5== 0) cnt+=i;
    }
    return cnt;
}
=> O(N)
```

###### 2

<img width="705" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/b3e1bd26-eaf7-44d8-b186-18cd66826abb">

```js
const func2 = (arr, n) => {
    for(let i = 0; i< n; i++){
        for(let j =i+1; j< n; j++){
            if(arr[i] + arr[j] == 100) return 1;
        }
    }
    return 0;
}
=> O(N^2)
```

###### 3

<img width="706" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/c1b9b2e9-da23-4e91-a637-c9103d3b44c9">

```js
const func3 = (n) => {
    for(let i =0; i*i<=n; i++){
        if(i*i===n) return 1;
    }
    return 0;
}
=> O(√N)
```

###### 4

<img width="706" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/ca6b3771-491a-42f0-8437-0583de92b133">

```js
const func4 = (n) => {
let i =1;
while(i*2 <= n) i=i*2;
return i;
}
N이 2^k이상 2^k+1미만이라고 할떄 while문 안에서 i는 최대 k번만 2배로 커짐
val은 2^k, so, O(k) => O(lgN)
```

## 공간복잡도

##### 입력의 크기와 문제를 해결하는데 필요한 공간의 상관관계

메모리 제한이 512MB일떄 int변수(4byte)를 대략 1.2억개 정도 선언할 수 있다.

- 512MB = 1.2억개의 int

→ 떠올린 크기가 5억인 배열을 필요로 한다면 해당 풀이는 메모리제한을 만족하지 못하므로 틀림

## 정수 자료형

- char: -2^7 ~ 2^7-1 (-128 ~ 127)
- unsigend char: 2^8-1 (0~255)
  <img width="703" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/21f83750-da80-4657-b16a-e89a345ef63f">

- short: 2(2^15-1=32767)

- int: 4(2^31-1 = 2.1\*10^9)

- long: 8(2^63-1 = 9.2\*10^18)

### Iteger Overflow

- 127(01111111)+1(00000001) = -128(10000000)

해결법 ⇒ 강제형변환

- char ⇒ int
- int ⇒ long

## 실수 자료형

- float: 4byte(32)

- double: 8byte(64)
  <img width="705" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/9eb4d652-0ddc-4f70-81bc-f472d5eb4c8b">
  <img width="705" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/e5be8aaf-331d-479c-9482-b985b388c81a">

실수를 나타날떄 칸은 sign(음수인지, 양수인지), exponent(지수), fraction field(유효숫자)로 나누어짐

=> IEEE-754 format

_실수 자료형 정리_

1. 실수의 저장/연산 과정에서 반드시 오차가 발생할 수 밖에 없음

```js
const a = () => {
    if(0.1+0.1+0.1 == 0.3) console.log("hi");
    else(console.log("bye"));
}
=> bye
```

→ 유효숫자가 들어가는 fraction field가 유한하기 떄문에 2진수 기준으로 무한소수인걸 저장하려고 할 떄 에는 어쩔 수 없이 float은 앞 23 bit, double은 앞 52bit까지만 잘라서 저장할 수 밖에 없다. 0.1은 이진수로 나타내면 무한소수여서 애초에 오차가 있는 채로 저장, 그걸 3번 더하다보니 오차가 더 커져서 bye가 출력.

fraction filed를 가진 각 자료형의 표현 범위

- float: 유효숫자 6자리(상대오차 10^-6)
- double: 유효숫자 15자리(상대오차 10^-15)

상대 오차의 허용 범위에서 두 자료형끼리 차이가 크므로 float < double 지향  
실수 자료형 필요한 문제면 힌트를 준다. 절대/상대 10^-6까지 허용

2. double에 long long 범위의 정수를 함부로 담으면 안됨
3. 실수를 비교할 떄는 등호를 사용하면 안됨

- 1e-12 = 10^-12
- 10^9 = 1e9

## 기초 코드 작성요령

- vector: 일종의 가변배열로 크기를 마음대로 늘였다 줄였다 가능

BOJ 10871

```js
let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let num = input[0].split(" ").map((x) => Number(x));
let arr = input[1].split(" ").map((x) => Number(x));

const answer = [];

for (let i = 0; i <= num[0]; i++) {
  if (num[1] > arr[i]) {
    answer.push(arr[i]);
  }
}

console.log(answer.join(" "));
```

-> 결국 남이 읽기 좋은 코드보다는 빠른 풀이를 위한 코드를 작성해야 한다.

- 출력 맨 마지막 공백 혹은 줄바꿈이 추가로 있어도 상관이 없다.
- 디버거는 굳이 사용하지 않아도 된다. log 사용 권장
