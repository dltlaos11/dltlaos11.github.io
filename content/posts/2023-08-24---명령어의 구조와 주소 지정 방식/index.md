---
title: 명령어의 구조와 주소 지정 방식
date: "2023-08-24T23:40:32.169Z"
template: "post"
draft: false
slug: "/posts/computer-architecture/instruction-structure-and-addressing-method"
category: "Computer Architecture"
tags:
  - "ComputerArchitecture"
  - "CS"
description: "컴퓨터 구조의 명령어의 구조와 주소 지정 방식에 대해서 배웁니다."
---

- [연산 코드](#연산-코드)
- [오퍼랜드](#오퍼랜드)
  - [명령어 주소 지정 방식](#명령어-주소-지정-방식)

<img width="655" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/97930271-9ee6-4c31-a3b8-678ce9a78ade">

명령어는 연산 코드와 오퍼랜드로 구성된다.

## 연산 코드

1. 연산 코드: 수행할 연산

   대표적인 연산 코드의 종류

   1. 데이터 전송
      CPU마다 연산코드의 종류가 다르므로 유형을 파악
      - MOVE: 데이터 옮겨라(레지스터에서 다른 레지스터의 데이터 이동)
      - STORE: 메모리에 저장
      - LOAD(FETCH): 메모리에서 CPU로 데이터를 가져와라
      - PUSH: 스택에 데이터를 저장하라
      - POP: 스택의 최상단 데이터를 가져와라
   2. 산술/논리 연산
      <img width="630" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/8ed6ff54-8c07-4522-b337-171ad8358c75">
   3. 제어 흐름 변경
      <img width="626" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/a6f47f37-faa7-4364-a373-c067a3e5e9b9">
   4. 입출력 제어
      <img width="629" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/37450662-4e37-4e11-bd4f-67a253bb066a">

   c.f.) 연산 코드의 종류 & 생김새는 <Mark>CPU</Mark> 마다 다르다.

## 오퍼랜드

오퍼랜드: 연산에 사용될 데이터 혹은 <Mark>연산에 사용될 데이터가 저장된 위치</Mark>(주로 저장되는 정보), 오퍼랜드 필드를 <Mark>주소 필드(메모리 주소, 레지스터)</Mark>라고 하기도 한다.

어셈블리어나 기계어는 저급언어들은 <Mark>명령어</Mark>로 이루어져 있다.

<img width="656" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/9777e2f1-87ed-4dff-9d51-aa5a1a43bf6c">
<img width="654" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/c52148c4-bb51-4f96-b5b6-6e86652de234">

붉은색 글자가 연산코드이고, 우측에 있는 글자가 오퍼랜드이다. 오퍼랜드가 없는 경우, 1개 이상인 경우도 존재

#### 명령어 주소 지정 방식

##### 왜 굳이 오퍼랜드에 저장된 위치를 사용할까?

=> 명령어 내에서 표현할 수 있는 데이터의 크기가 제한되기 때문
<img width="657" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/96d41a2c-ea11-4de1-b76a-01fb548863b3">
<img width="657" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/96439245-45ab-4236-a676-ce62d4af6513">

1. 유효 주소(effective address)

- 연산에 사용할 데이터가 저장된 위치

2. 명령어 주소 지정 방식(addressing modes)

- 연산에 사용할 데이터가 저장된 위치를 찾는 방법
- 유효 주소를 찾는 방법
- 다양한 명령어 주소 지정 방식들 존재
  - 즉지 주소 지정 방식(immediate addressing mode)
    - 연산에 사용할 데이터를 오퍼랜드 필드에 직접 명시
    - 가장 간단한 형태의 주소 지정 방식
    - 연산에 사용할 데이터의 크기가 작아질 수 있지만, 빠름
      <img width="599" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/a5770823-f552-4040-9e56-d615eb2fb5b6">
  - 직접 주소 지정 방식(direct addressing mode)
    - 오퍼랜드 필드에 유효 주소 직접적으로 명시
    - 유효 주소를 표현할 수 있는 크기가 연산 코드만큼 줄어듦
      <img width="601" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/0e023bcd-a385-483a-bc9f-3b37c74bb605">
  - 간접 주소 지정 방식(indirect addressing mode)
    - 오퍼랜드 필드에 유효 주소의 주소를 명시
    - 앞선 주소 지정 방식들에 비해 속도가 느림
      <img width="602" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/64f0631e-b2e0-4574-8dd0-7a38fd7635ed">
      <Mark>c.f.) CPU가 메모리를 찾아가는 과정은 속도가 느리다, 메모리 접근을 최소화 해야함.
  - 레지스터 주소 지정 방식(register addressing mode)
    - 연산에 사용할 데이터가 저장된 레지스터 명시
    - <Mark>CPU가 메모리에 접근하는 속도보다 레지스터에 접근하는 것이 빠름🔥 - 레지스터는 CPU안에 존재
      <img width="601" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/61bb3663-00a5-439d-b020-150dda7629ce">
  - 레지스터 간접 주소 지정 방식(register indirect addressing mode)
    - 연산에 사용할 데이터를 메모리에 저장
    - 그 주소를 저장한 레지스터를 오퍼랜드 필드에 명시
      <img width="597" alt="image" src="https://github.com/boost-library/yong-study/assets/74396128/12bdfefa-dfbb-403f-a610-c494d1e1f434">
