---
title: CPU의 내부 구성
date: "2023-08-25T23:40:32.169Z"
template: "post"
draft: false
slug: "/posts/computer-architecture/cpu-internal-structure-of-computer-structure"
category: "CS"
tags:
  - "ComputerArchitecture"
  - "CS"
description: "컴퓨터 구조의 CPU의 내부 구성 - ALU&제어장치&레지스터에 대해서 배웁니다."
---

- [CPU의 내부 구성](#CPU의-내부-구성)
  - [ALU](#ALU)
  - [제어장치](#제어장치)
  - [레지스터](#레지스터)

## CPU의 내부 구성

<img width="303" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/7df1be91-c769-4a5f-98e6-8abb03225dbd">

**ALU: 계산하는 장치**

**제어장치: 제어 신호를 발생시키고 명령어를 해석하는 장치**

**레지스터**

- CPU 내부의 작은 임시저장장치

- 프로그램 속 명령어 & 데이터는 실행 전후로 레지스터에 저장

- CPU 내부에는 다양한 레지스터들이 있고, 각기 다른 역할을 가진다.

### ALU

<img width="583" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/df985fec-ae7c-420a-ad76-76650e4870a9">

**ALU가 받아들이는 정보**

ALU가 레지스터로부터 <Mark>피연산자</Mark>를 받아들이고 제어장치로부터 <Mark>제어신호</Mark>를 받아들인다.

계산을 위해서는 <Mark>피연산자</Mark>와 <Mark>수행할 연산</Mark>이 필요

- 피연산자 - 데이터(from 레지스터)
- 수행할 연산 - 제어 신호(from 제어장치)

**ALU가 내보내는 정보**

게산의 <Mark>결괏 값</Mark>은 레지스터에 저장한다.

- CPU가 레지스터에 접근하는 속도가 메모리 접근하는 속도보다 빠르기 때문

연산 결과에 대한 부가정보인 <Mark>플래그</Mark>를 플래그 레지스터에 저장

- 플래그 종류

<img width="628" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/466474dc-8129-4937-9a45-64fdd9e3bb9a">

</br>

<img width="535" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/e086d1e4-b066-4378-a7b4-142e936e9e20">

### 제어장치

<img width="611" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/22954f3e-c120-44a6-bb67-96521de3dbe4">

**받아들이는(입력) 정보**

1. <Mark>클럭 신호</Mark>

<img width="557" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/8dcf5727-19d0-4a0f-a674-12d94f744bf0">

클럭 주기에 맞춰서 컴퓨터의 모든 부품을 일사불란하게 움직일 수 있게 하는 시간 단위

2. 명령어 레지스터로부터 받아들인 <Mark>해석할 명령어</Mark>, 제어장치는 그 명령어를 해석해서 제어 신호를 내보냄
3. 플래그 레지스터로부터 <Mark>플래그</Mark> 값도 받아들임
4. 외부로부터 받아들인 <Mark>제어신호</Mark>를 받아들임

**내보내는(출력) 정보**

1. CPU 내부에 전달하는 제어신호
   - 레지스터(레지스터 명령어)
   - ALU(수행할 연산을 지시)
2. CPU 외부에 전달하는 제어신호
   - 메모리(메모리 I/O)
   - 입출력장치(입출력 I/O Test)

### 레지스터

**1)** 프로그램 카운터(PC): 메모리에서 가져올 명령어의 주소(메모리에서 읽어 들일 명령어의 주소, Instruction Pointor라고 부르는 CPU도 있음)

**2)** 명령어 레지스터: 해석할 명령어(방금 메모리에서 읽어 들인 명령어 - 제어장치가 해석)

**3)** 메모리 주소 레지스터: 메모리의 주소를 저장(CPU가 읽어 들이고자 하는 주소를 주소 버스로 보낼 떄 거치는 레지스터)

**4)** 메모리 버퍼 레지스터: 메모리와 주고받을 값(데이터와 명령어, CPU가 정보를 데이터 버스로 주고받을 떄 거치는 레지스터)

_메모리에 실행될 프로그램(명령어)이 저장되었을 떄 CPU가 실행할 떄 위 4가지의 레지스터에 담기는 값을 알아보자(<Mark>a~e</Mark>)_

<img width="596" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/7da5a616-42b3-473c-9511-d65e5d20e399">

**_a._** <Mark>프로그램 카운터(PC)</Mark>에 다음으로 실행할 메모리로부터 가져올 명령어의 주소(1000)가 저장된다.

**_b._** 주소 버스를 통해서 읽고자 하는 주소를 메모리로 보내야한다. <Mark>메모리 주소 레지스터</Mark>를 거치므로 PC에 저장되어 있는 주소값(다음으로 실행할 명령어의 주소) 메모리 주소 레지스터로 복사

<img width="546" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/62fedcf1-76c5-4c6c-862f-a6569f0857dc">

**_c._** 제어신호(<Mark>메모리 읽기 신호</Mark>)와 함께 알고싶은 <Mark>메모리 주소</Mark>(1000번지)를 보낸다.
<img width="542" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/bdf1b58a-60b0-43a4-9799-66ec04aa59c1">

**_d._** 메모리는 1000번지에 저장된 값(1101)을 <Mark>데이터 버스</Mark>를 통해서 <Mark>메모리 버퍼 레지스터</Mark>로 보낸다. 그리고 <Mark>프로그램 카운터</Mark>는 1이 증가, 1000번지의 명령어를 수행완료 했으니 그 다음 명령어의 주소인 1001번지로 PC가 바뀜
<img width="503" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/4353e645-926f-430a-883a-c11ae7bb224e">

- 메모리에서 갖고오고자 하는 주소를 CPU(메모리 버퍼 레지스터)로 가져왔다면, PC는 1이 증가

  → 이는 프로그램을 순차적으로 실행할 수 있는 원리가 된다.

  - 순차적인 실행 흐름이 끊기는 경우
    - 특정 메모리 주소로 실행 흐름을 이동하는 명령어 실행 시(e.g. JUMP, CONDITIONAL JUMP, CALL, RET)
    - 인터럽트 발생 시
    - ETC …

<img width="604" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/0bff4676-fcae-4147-a0c2-23477e76f7ad">

**_e._** 메모리 버퍼 레지스터에 저장된 1101명령어를 제어장치가 해석하기 위해서 <Mark>명령어 레지스터(방금 메모리에서 읽어 들인 명령어)</Mark>에 복사하게 된다.

**5)** 플래그 레지스터: 연산 결과 또는 CPU 상태에 대한 부가적인 정보

**6)** 범용 레지스터: 다양하고 일반적인 상황에서 자유롭게(주소, 명령어, 데이터…) 사용

**7)** 스택 포인터: 스택의 꼭대기를 가리킴
스택과 스택 포인터를 이용한 주소 지정 방식(<Mark>스택 주소 지정 방식</Mark>)에서 사용되며, 스택의 꼭대기를 가리키는 레지스터(스택이 어디까지 차 있는지에 대한 표시)

<img width="599" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/1559c7ad-9738-478e-b87b-eac292eea783">

c.f.) 참고로 스택은 메모리 안에 스택 영역이 따로 존재

  <img width="606" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/8e85af34-91bf-493a-9792-a98f758a1238">

**8)** 베이스 레지스터: 기준 주소 저장
오퍼랜드 필드의 값(변위)과 <Mark>특정 레지스터</Mark>의 값을 더하여 유효 주소를 얻는 <Mark>변위 주소 지정 방식</Mark>에서 사용

  <img width="631" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/7b9f6897-d693-4558-99f1-72dc51a83750">

변위 주소 지정 방식을 사용하는 명령어는 다음과 같은 형태를 갖고 있다.

  <img width="638" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/c09ae0f5-5c23-4c73-8076-a6d51d8654bf">

<Mark>특정 레지스터의 종류</Mark>

- 프로그램 카운터

  상대 주소 지정 방식: 오퍼랜드 필드의 값(변위)과 프로그램 카운터의 값을 더하여 유효 주소 얻기

  <img width="585" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/81104484-089c-42b3-86dd-50f7800a3651">

  C에는 CPU가 메모리로부터 읽어올 메모리의 주소가 담기는데 읽어올 메모리로부터 3번지 이전에 명령어를 실행하는 명령어의 구조(<Mark>오퍼랜드 필드의 값</Mark>)와 프로그램 카운터(다음으로 읽어들일 메모리 주소) 값을 더하는 경우

- 베이스 레지스터

  베이스 레지스터 주소 지정 방식: 오퍼랜드 필드의 값(변위)과 베이스 레지스터의 값을 더하여 유효 주소 얻기

  <img width="587" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/179c46d9-a6de-47c0-9664-1a5547cff7ab">

  베이스 레지스터는 <Mark>기준 주소 저장</Mark> 역할

  c.f.) 메모리에 저장되어 있는 주소(200, 250번지)와 CPU가 인식하는 주소는 다르다.
