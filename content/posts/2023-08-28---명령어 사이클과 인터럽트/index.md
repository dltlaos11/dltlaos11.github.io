---
title: 명령어 사이클과 인터럽트
date: "2023-08-28T23:40:32.169Z"
template: "post"
draft: false
slug: "/posts/명령어 사이클과 인터럽트"
category: "CS"
tags:
  - "CS"
description: "명령어 사이클과 인터럽트에 대해서 배웁니다."
---

- [명령어 사이클](#명령어-사이클)
  - [메모리에 저장된 명령어를 실행하려면?](#메모리에-저장된-명령어를-실행하려면)
  - [예외](#예외)
- [인터럽트](#인터럽트)

  - [인터럽트의 종류](#인터럽트의-종류)
  - [하드웨어 인터럽트의 순서](#하드웨어-인터럽트의-순서)
  - [CPU내부에 저장되어 있는 레지스터의 주소 변화 과정](#cpu내부에-저장되어-있는-레지스터의-주소-변화-과정)
  - [인터럽트가 발생한 상황까지 추가한 명령어 사이클](#인터럽트가-발생한-상황까지-추가한-명령어-사이클)

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/1546e876-331e-4d5a-a779-d2139a0fad07)

- CPU는 메모리로부터 명령어나 데이터들을 갖고와서 실행, 필요하다면 값을 저장하기도
- CPU는 메모리 안의 프로그램을 <Mark>정해진 흐름</Mark>대로 처리, 여기서 정해진 흐름이 <Mark>명령어 사이클
- 간혹 그 정해진 흐름을 방해하는 신호가 CPU한테 발생할 수 있는데, 그 신호는 <Mark>인터럽트

## 명령어 사이클

**프로그램 속 명령어들은 일정한 주기가 반복되며 실행, 이 주기가 <Mark>명령어 사이클**

### 메모리에 저장된 명령어를 실행하려면

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/f292c621-d975-41f1-bac3-727386686959)

- 메모리에 저장되어 있는 값을 CPU 내부(레지스터)로 갖고 와야함 → <Mark>인출</Mark>
  - 인출하는 주기: <Mark>인출사이클

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/1b9d4dcb-7730-4e71-87fb-d59d2f09f7e8)

- 인출했다면 저장되어 있는 값(명령어)을 <Mark>실행</Mark>해야
  - 실행하는 주기: <Mark>실행사이클

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/c363469c-c5b1-4209-90f0-2b4f425df23a)

일반적으로 CPU는 인출-실행-인출-실행-… 인출사이클과 실행사이클의 반복되면서 실행 → 명령어 사이클의 일부

### 예외

**[명령어의 구조와 주소 지정 방식](https://dltlaos11.github.io/posts/%EB%AA%85%EB%A0%B9%EC%96%B4%EC%9D%98%20%EA%B5%AC%EC%A1%B0%EC%99%80%20%EC%A3%BC%EC%86%8C%20%EC%A7%80%EC%A0%95%20%EB%B0%A9%EC%8B%9D)** 에서 언급했듯이 <Mark>인출</Mark>을 하면 바로 실행이 가능한 명령어도 있지만, 인출을 하더라도 바로 실행이 <Mark>불가능한</Mark> 경우도 존재, 추가적으로 메모리에 접근해야 하는 경우가 존재 → <Mark>간접주소지정방식</Mark>

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/9de315a6-d1e8-4309-a688-3042fd262fb1)

몇 번더 메모리 접근을 해야하는 경우를 위해서

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/46d0e437-3c57-4a93-9889-2975399188bd)

<Mark>간접 사이클</Mark>이 추가 될 수 있다.

→ 어떤 명령어는 <Mark>인출-실행</Mark> 사이클만으로 실행, 어떤 명령어는 <Mark>인출-간접-실행</Mark> 사이클을 거쳐 실행(<Mark>인터럽트</Mark> 라는 개념이 없다면 CPU는 위 주기를 따름)

## 인터럽트

- CPU가 <Mark>정해진 흐름</Mark>대로 프로그램을 실행하고 있는데, 그 흐름을 끊는 주체를 <Mark>인터럽트</Mark>라고 한다.
- 실제 프로그래밍을 하면서 겪는 키보드 인터럽트

  ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/f5bf20f6-0f90-4eb7-81b8-2e355cbc83a8)

- CPU가 급하게 처리해야 할 다른 작업이 우선시 되었을 떄 발생

### 인터럽트의 종류

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/e0d45a10-f644-47e1-88ee-416bd21f7b74)

- 동기 인터럽트(<Mark>예외</Mark>): CPU가 예기치 못한 상황을 접했을 떄 발생
  - c.f.) CPU가 접근하고자 하는 메모리에 데이터가 없다든지, 디버깅, x/0, …

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/ed4acc25-1d86-4f2a-b4b3-8d4d44282677)

- 비동기 인터럽트(<Mark>하드웨어 인터럽트</Mark>): 주로 입출력장치에 의해 발생

  - 알림과 같은 인터럽트
  - <Mark>입출력 작업 도중에도 효율적으로 명령어를 처리</Mark>하기 위해 하드웨어 인터럽트 사용
  - 입출력장치의 <Mark>I/O작업</Mark>은 CPU에 비해 <Mark>느리다.</Mark>

    - 인터럽트가 <Mark>없다면</Mark> CPU는 프린트 완료 여부를 확인하기 위해 주기적으로 확인해야
      ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/1031762c-9ead-433e-8162-5b3c9943eb55)

    - 인터럽트가 <Mark>있다면</Mark> I/O작업 동안 CPU는 다른 작업이 가능

### 하드웨어 인터럽트의 순서

**인터럽트의 종류를 막론하고 인터럽트 처리 순서는 대동소이**

1. 입출력장치는 CPU에 <Mark>인터럽트 요청 신호</Mark>를 보냄
   - 인터럽트 요청 신호
     - <Mark>CPU의 작업을 방해하는 인터럽트에 대한 요청</Mark>
     - 인터럽트는 CPU의 <Mark>정상적인 흐름</Mark>을 끊는 것이기 때문에 인터럽트를 보내는 주체는 인터럽트 요청 신호를 보낸다.
2. CPU는 실행 사이클이 끝나고 명령어를 인출하기 전 항상 인터럽트 여부를 확인
3. CPU는 인터럽트 요청을 확인하고 <Mark>인터럽트 플래그(플래그 레지스터)</Mark>를 통해 현재 인터럽트를 받아들일 수 있는지 여부를 확인
   - 인터럽트 프래그
     - <Mark>인터럽트 요청 신호를 받아들일지 무시할지를 결정하는 비트</Mark>
     - 모든 인터럽트를 인터럽트 플래그로 막을 수 있지는 않다(ex\_정전..)
4. 인터럽트를 받아들일 수 있다면 CPU는 지금까지의 작업을 백업
5. CPU는 <Mark>인터럽트 벡터</Mark>를 참조하여 <Mark>인터럽트 서비스 루틴</Mark>을 실행
   - 인터럽트 서비스 루틴
     - 인터럽트가 발생했을 때 <Mark>해당 인터럽트를 처리하는 프로그램(메모리에 저장)</Mark>
     - CPU가 인터럽트를 받아들이기로 했다면 <Mark>인터럽트 서비스 루틴</Mark> 실행
       ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/2843fb8e-504e-4e09-8ab5-e3a8b34862e6)
     - 인터럽트 벡터: <Mark>인터럽트 서비스 루틴의 시작 주소를 포함하는 인터럽트 서비스 루틴의 식별 정보</Mark>
       - 인터럽트마다 <Mark>고유한 인터럽트 서비스 루틴의 시작 주소</Mark>를 가지고 있다.
       - c.f.) 인터럽트 벡터 테이블(in 메모리)
     - <Mark>인터럽트 주체가 보내는 신호</Mark> ⇒ 인터럽트 요청 신호 B + 인터럽트 벡터(데이터 버스를 통해서)
6. 인터럽트 서비스 루틴 실행이 끝나면 <Mark>4</Mark>에서 백업해 둔 작업을 복구하여 실행을 재개

> ‘CPU가 인터럽트를 처리’ → ‘인터럽트 서비스 루틴을 실행하고, 본래 수행하던 작업으로 다시 되돌아온다’(+ 그리고 인터럽트의 시작 주소는 인터럽트 벡터를 통해 알 수 있다.)

### cpu내부에 저장되어 있는 레지스터의 주소 변화 과정

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/32bead51-b9af-41d1-9539-76ea919d914a)

인터럽트가 발생하면 기존에 있던 CPU의 내부 정보를 메모리의 <Mark>스택 영역</Mark>에 <Mark>백업</Mark>하고

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/7477fd17-dfd8-47d8-92f6-721833b61223)

해당 인터럽트에 해당하는 인터럽트 서비스 루틴을 CPU로 가지고 와서 실행하며, 프로그램이 끝나면 CPU에서 스택 영역의 데이터를 <Mark>복구</Mark>

### 인터럽트가 발생한 상황까지 추가한 명령어 사이클

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/3ab3ad96-f1a3-455d-889e-b136c0e9d951)

- 실행 사이클이 끝나고 인터럽트 여부를 확인했을 떄 인터럽트가 발생했을 경우
- 결국 CPU는 메모리에 있는 프로그램을 위와 같은 <Mark>정형화된 흐름</Mark>에 따라서 처리
