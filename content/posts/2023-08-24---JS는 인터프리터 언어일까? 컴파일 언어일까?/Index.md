---
title: JS 인터프리터 언어, 컴파일 언어🤔
date: "2023-08-24T21:40:32.169Z"
template: "post"
draft: false
slug: "/posts/javascript/how-javascript-code-execution-works"
category: "JavaScript"
tags:
  - "CS"
  - "JavaScript"
description: "자바스크립트 코드 실행 동작 원리: 엔진, 가상머신, 인터프리터, AST 기초 등에 대해서 배웁니다."
---

- [고급언어와 저급언어](#고급언어와-저급언어)
  - [고급언어](#고급언어)
  - [바이트코드](#바이트코드)
  - [저급언어](#저급언어)
- [자바스크립트 구동 원리](#자바스크립트-구동-원리)
- [자바스크립트 엔진](#자바스크립트-엔진)
- [자바스크립트 컴파일의 등장](#자바스크립트-컴파일의-등장)
- [그렇다면 컴파일 언어의 성능이 인터프리터 언어의 성능보다 좋을까?](#그렇다면-컴파일-언어의-성능이-인터프리터-언어의-성능보다-좋을까)
- [자바스크립트의 컴파일](#자바스크립트의-컴파일)
- [그래서 자바스크립트는 인터프리터 언어일까?](#그래서-자바스크립트는-인터프리터-언어일까)

## 고급언어와 저급언어

#### 고급언어

<img width="702" alt="image" src="https://github.com/boost-library/chan-study/assets/74396128/cccc8092-8864-4af2-9ed3-c793c9298db3">

1.  고급언어: 개발자가 이해하기 쉽게 만든언어
    <img width="680" alt="image" src="https://github.com/boost-library/chan-study/assets/74396128/0a92504f-f9ef-4a1d-8947-5d9ae5a4f462">
2.  컴파일
    <img width="455" alt="image" src="https://github.com/boost-library/chan-study/assets/74396128/0b7ef389-5f0c-422d-8f4d-215ef6c7b04a">

    **1. 전처리기**

    C언어로 예를 들자면, #으로 시작되는 소스코드를 처리하는 단계.

    stdio.h와 같은 **헤더 파일**을 불러와 코드 상으로 필요한 내용으로 채워주고 define으로 먼저 정의된 상수를 symbol table에 저장하는 등 **매크로를 확장**한다.

    **2. 컴파일**

    High Level Language인 소스코드를 기계언어에 가까운 Low Level Launguage인 **어셈블리 언어로 변환**한다.

    **3. 어셈블러**

    결국 컴퓨팅하는 주체는 CPU이므로 소스코드를 아무리 잘 작성했더라도 CPU 입장에서도 그게 잘 작성된 코드인지 들어봐야한다. 어셈블리어는 인간이 이해할 수 있는 기계 언어에 가장 가까운 언어로, 컴퓨터가 연산하는 블랙박스 안을 들여다볼 수 있는 창구의 역할을 한다. 따라서 컴퓨터의 동작 방식을 이해하고 더 가까이서 문제를 해결하기 위해 어셈블리어로 중간 변환 과정을 거친다.

    실제로 어셈블리 언어에는 집합, 배열, 객체와 같은 개념이 없고 모두 정수(int)로 변환된다.

    **4. 링커**

    만약 프로그램이 여러개의 파일로 이루어져있다면 하나의 오브젝트 파일로 이어주고 라이브러리들을 연결하는 링크 단계가 필요하다.

- 컴파일 언어
  <img width="651" alt="image" src="https://github.com/boost-library/chan-study/assets/74396128/a57f0f32-469d-47c5-aef1-707dc5e4a0c6">

  - 컴파일 언어로 작성된 소스 코드는 컴파일러에 의해 저급 언어(어셈블리어)로 변환되고(<Mark>컴파일</Mark>), 컴파일 결과로 저급 언어인 목적(원시) 코드가 생성
  - 컴파일러가 소스코드 <Mark>전체를 훑어보면서</Mark>(한줄씩❌) 오류는 없는지, 사용되지 않는 변수, 최적화 여부 등을 따져본 뒤 목적 코드로 컴파일
  - 소스 코드 컴파일 중 오류가 발생하면 소스 코드 전체가 실행되지 않음

- 인터프리트 언어
  - 인터프리터에 의해 <Mark>한 줄씩</Mark> 실행
  - 소스 코드 전체가 저급 언어로 변환되기까지 기다릴 필요 ❌
  - 소스 코드 인터프리트 중 오류가 발생하면 오류 발생 전까지의 코드는 실행

#### 바이트코드

**바이트코드(Bytecode)**

- 사람이 작성한 고급언어(Javascript등)를 가상머신이 이해할 수 있도록 변환한 코드.
- 가상머신은 바이트코드를 다양한 종류의 CPU에 맞게 기계어로 컴파일 한다.

```js
Add r0, [6] LdaSmi [1]
```

#### 저급언어

저급언어: 컴퓨터가 이해하고 실행하는 언어

- 기계어: 0과 1로 이루어진 명령어로 구성된 저급언어
  <img width="590" alt="image" src="https://github.com/boost-library/chan-study/assets/74396128/46b53e0d-8f56-47de-a08b-f23ea260a863">
- 어셈블리어: 0과 1로 이루어진 기계어를 읽기 편한 형태로 번역한 저급 언어(기계어보다 한단계 위의 저급언어)
  <img width="678" alt="image" src="https://github.com/boost-library/chan-study/assets/74396128/ae576538-3f7f-462a-8bef-3ef083ba1172">

→ 자바는 컴파일 언어와 인터프리터 언어의 경계가 모호. 양분되는 개념이라 생각하지 말고 컴파일 방식과 인터프리터 방식이 있는데 고급언어가 저급언로 변환되는 대표적인 방식 중 하나라는 개념으로 이해하는 것이 좋다.

## 자바스크립트 구동 원리

자바스크립트 뿐만 아니라 모든 고급언어들은 컴퓨터에서 구동되기 위해서 기본적으로 컴퓨터가 이해가능한 기계어로 변환되어질 필요가 있다.
<img width="683" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/674408b1-3b84-4776-ac17-e10effadcb04">
자바스크립트는 컴퓨터에게 전달되기전에 바이트 코드로 변환되고, 이를 받아 가상머신에 의해 기계어로 변환된다. 이러한 일련의 변환 과정은 아래와 같이 진행된다.

**1) 바이트 코드로의 변환**

<Mark>자바스크립트 엔진</Mark>에 의해 바이트코드로 변환된다.

**2) 기계어로 변환**

CPU 종류에 따라(x86-64(<Mark>cpu종류</Mark>) gcc 12.2(<Mark>컴파일러종류</Mark>)) 기계어를 다르게 해석하기에 <Mark>가상 머신</Mark>은 최적화된 기계어를 제작해낸다. 이 가상머신 덕분에 개발자는 따로 CPU별로 최적화된 기계어를 만들어낼 필요는 없다.

**3) CPU 코드 실행**

기계어를 실행하여 데이터 저장 및 연산 작업을 진행한다.

## 자바스크립트 엔진

JS가 자바스크립트 엔진에 의해 어떻게 바이트 코드로 변환되는지 알아보자

이는 엔진 내 인터프리터가 진행한다. 인터프리터에게 전달되기 전에 <Mark>Tokenizer</Mark>, <Mark>Parser</Mark>를 거쳐 <Mark>AST</Mark>가 되는 일련의 과정이 필요하다.
<img width="680" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/ba953273-db5c-4e00-af5c-5db7ac722cbe">

- `Tokenizing` : 주어진 소스코드를 의미있는 단위로 나누는 과정이다. 이렇게 나누어진 것을 Token이라고도 한다.
- `Parser` : `Tokenizer` 로부터 생성된 토큰들의 배열을 바탕으로 이를 자바스크립트 문법에 알맞은 방식으로 `AST(Abstract Syntax Tree)` 로 변화 시킨다.
- 이렇게 생성된 `AST` 는 인터프리터를 거쳐 기계가 알아볼 수 있는 바이트 코드롤 변환되게 되는 것이다.

## 자바스크립트 컴파일의 등장

이러한 자바스크립트는 인터프리터 언어로서 기능을 해왔지만, 점차 웹에서도 다양한 요구사항들이 추가되면서 더 많은 기능들을 갖추어야 했고 이는 자바스크립트가 점차 성능상 무거워지는 계기가 되었다. 한편, 2009년 당시 구글은 웹에서 이용가능한 지도인 구글맵스를 개발하려고 있었는데 지도 어플리케이션은 사용자 상호작용이 많이 필요한 만큼 성능상 개선이 필요했고 이를 개선하고자 내놓은 것이 바로 <Mark>Chrome V8</Mark> 엔진이다. 이를 통해 자바스크립트 언어에서도 컴파일을 진행하게 된 계기가 되었다.

## 그렇다면 컴파일 언어의 성능이 인터프리터 언어의 성능보다 좋을까

컴파일 언어와 인터프리터 언의 가장 큰 차이점은 바로 실행전 미리 기계어로 바꾸어 놓는다는 점이다. 인터프리터처럼 고급언어를 기계어로 번역하는 것이 아니라 미리 변경해놓기에 빠르다.

## 자바스크립트의 컴파일

V8 엔진에 의해서 어떻게 자바스크립트도 컴파일과정을 알아보자
<img width="676" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/16db5fa2-023b-485f-a299-fbd57d910b91">
<img width="680" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/051cc73b-d208-4856-ad52-13e65a50a7f7">

위 그림에서 자바스크립트가 Parser, AST, Interpreter를 거쳐 ByteCode(중간언어)로 변모하는 것은 V8 엔진이 등장하기 전까지의 JS의 모습이다. 이에 추가적으로 `Profiler` 라는게 등장한다. 이 `Profiler` 는 인터프리터를 관찰하며 실행되는 코드를 계속해서 모니터링 한다. 모니터링하는 과정에 코드내에 반복 실행되는 것이 있다면 이를 `JIT(Just-In-Time)` 컴파일러에게 넘겨 실시간으로 컴파일 하도록 한다. 이를 통해 최적화된 바이트 코드를 생성해낸다.

이처럼 필요할때 마다 런타임 내에서 빠르게 컴파일 하는 컴파일러를 `JIT(Just-In-Time)` 컴파일러라고 부른다. 또한 필요할 경우 `Deoptimize` 과정을 진행하는데 프로파일러의 판단(이 코드 컴파일하는게 낫겠네!)이 틀렸을 수도 있기 때문에 컴파일하는 비용을 다시 줄이기 위함이다.

## 그래서 자바스크립트는 인터프리터 언어일까

- 때에 따라 다르다. 현 시점에서의 자바스크립트는 실질적으로 컴파일이 되지만 편의 및 문맥상 인터프리터 언어로 분류된다. 모던 자바스크립트 컴파일러는 거의 런타임 내에서 빠르게 컴파일(`JITC`, `Just-In-Time Compilation`)을 수행한다.
- 기본적으로는 `Interpreter` 언어로서의 성질을 가지지만, 성능상의 최적화를 위해 `Compiler` 언어의 특성도 같이 가진다.

### 참고자료

**[자바스크립트는 Compiler / Interpreter 언어다?](https://velog.io/@seungchan__y/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-Compiler-Interpreter-%EC%96%B8%EC%96%B4%EB%8B%A4#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B5%AC%EB%8F%99%EC%9B%90%EB%A6%AC)**

**[컴파일이란 무엇이며, 자바스크립트는 인터프리터 언어인가?](https://devlog-of-yein.tistory.com/m/6)**
