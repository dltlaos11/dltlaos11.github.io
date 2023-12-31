---
title: 다양한 메모리의 특성
date: "2023-09-04T20:35:32.169Z"
template: "post"
draft: false
slug: "/posts/computer-architecture/characteristics-of-various-memories"
category: "Computer Architecture"
tags:
  - "ComputerArchitecture"
  - "CS"
description: "다양한 메모리의 특성에 대해서 배웁니다."
---

- [RAM의 특성과 종류](#ram의-특성과-종류)
  - [RAM의 특징](#ram의-특징)
  - [RAM의 종류](#ram의-종류)
- [메모리의 주소 공간](#메모리의-주소-공간)
  - [물리 주소와 논리 주소](#물리-주소와-논리-주소)
  - [물리 주소](#물리-주소)
  - [논리 주소](#논리-주소)
  - [물리 주소와 논리 주소의 변환](#물리-주소와-논리-주소의-변환)
  - [메모리 보호](#메모리-보호)
- [캐시 메모리](#캐시-메모리)
  - [저장 장치 계층 구조](#저장-장치-계층-구조)
  - [캐시 메모리](#캐시-메모리)
  - [참조 지역성의(Locality of Reference) 원리](#참조-지역성의-원리)
- [다양한 보조기억장치(하드디스크와 플래시 메모리)](#다양한-보조-기억장치)
  - [하드 디스크](#하드-디스크)
  - [하드 디스크의 데이터 접근 과정](#하드-디스크의-데이터-접근-과정)
  - [플래시 메모리](#플래시-메모리)
  - [플래시 메모리의 종류](#플래시-메모리의-종류)
  - [플래시 메모리의 저장 단위](#플래시-메모리의-저장-단위)

## ram의 특성과 종류

주기억장치의 종류에는 크게 RAM과 ROM 두 가지가 있고, ‘메모리’라는 용어는 그 중 RAM을 지칭하는 경우가 많다. 

### ram의 특징

CPU ↔ RAM(실행할 대상(ex_명령어, 프로그램) → 휘발성 저장 장치) ↔ 보조기억장치(보관할 대상 → 비회발성 저장 장치)

- RAM이 클수록 많은 프로그램들을 동시에 실행하는 데에 유리(ROM에서 많이 가져올 수 있으므로)

### ram의 종류

- DRAM
    - Dynamic(=동적의) RAM
        - 저장된 데이터가 <Mark>동적으로 사라지는</Mark> RAM
        - 데이터 소멸을 막기 위해 주기적으로 재활성화 해야
        - 일반적으로 메모리로 사용되는 RAM
            - 상대적으로 소비전력이 낮고 저렴하고 <Mark>집적도(=compact)</Mark>가 높아 <Mark>대용량</Mark>으로 설계하기 용이하기 때문
- SRAM
    - Static(=정적의) RAM
    - 저장된 데이터가 정적인(사라지지 않는) RAM
    - DRAM보다 일반적으로 I/O가 더 빠름
    - 일반적으로 <Mark>캐시 메모리</Mark>에서 사용되는 RAM
        - 상대적으로 소비 전력이 높고 가격이 높고 집적도가 낮아 “<Mark>대용량으로 설계할 필요가 없으나</Mark> 빨라야 하는 장치”에 사용
![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/4314c8be-11bb-4323-9793-002d65235ad1)

- SDRAM
    - Synchronous(=동기화) DRAM
        - 특별한(발전된 형태의) DRAM
        - <Mark>클럭 신호와 동기화된 DRAM
        - SDR(Signle Data Rate) SDRAM
- DDR SDRAM
    - Double Data Rate SDRAM
        - 특별한 (발전된 형태의)SDRAM
        - 최근 가장 대중적으로 사용하는 RAM
        - 대역폭(데이터를 주고받는 길의 너비, 2배)을 넓혀 속도를 빠르게 만든 SDRAM
        - DDR2 SDRAM(4배), DDR3 SDRAM(8배), <Mark>DDR4 SDRAM(16배) 가장 대중적

## 메모리의 주소 공간

논리 주소와 물리 주소로 주소 공간을 나눈 이유와 논리 주소 → 물리 주소로 변환하는 방법에 대해 알아보자

### 물리 주소와 논리 주소

CPU와 프로세스는 메모리 몇 번지에 무엇이 저장되어 있는지 다 알지 못함

→ 메모리에 저장된 값들은 시시각각 변하기 떄문

- 새롭게 실행되는 프로그램은 새롭게 메모리에 적재
- 실행이 끝난 프로그램은 메모리에서 삭제
- 같은 프로그램을 실행하더라도 실행할 때마다 적재되는 주소는 달라짐

🔥 <Mark>물리주소와 논리주소의 등장

### 물리 주소

- 메모리 입장에서 바라본 주소
- 말 그대로 정보가 실제로 저장된 하드웨어상의 주소

### 논리 주소

- CPU와 실행중인 프로그램 입장에서 바라본 주소
- 실행 중인 프로그램 각각에게 부여된 0번지부터 시작하는 주소

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/4ff0c4b1-0f20-4881-9686-ae100844ed80)

### 물리 주소와 논리 주소의 변환

<Mark>MMU(메모리 관리 장치)</Mark>라는 하드웨어에 의해 변환

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/e2f02887-927c-452e-8c00-9eb399b9ffd8)

MMU는 <Mark>논리 주소</Mark>와 <Mark>베이스 레지스터 값(프로그램의 기준 주소</Mark>을 <Mark>더하여</Mark> 논리 주소를 물리 주소로 변환

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/19568e7b-6331-45b0-b4ac-5b8bc8b1edd6)

베이스 레지스터: 프로그램의 <Mark>가장 작은 물리 주소(프로그램의 첫 물리 주소)</Mark>를 저장하는 셈

논리 주소: 프로그램의 시작점(<Mark>기준 주소</Mark>)으로부터 <Mark>떨어진 거리

c.f. ) 페이징: 주소변환방법

### 메모리 보호

**한계 레지스터(=Init Register)**

- 프로그램의 영역을 침범할 수 있는 명령어의 실행을 막음
- 베이스 레지스터가 실행 중인 프로그램의 가장 작은 물리 주소를 저장한다면, 한계 레지스터는 논리 주소의 최대 크기를 저장
- 베이스 레지스터 값 ≤ 프로그램의 물리 주소 범위 < 베이스 레지스터 + 한계 레지스터 값

 → <Mark>CPU가 접근하려는 논리 주소는 한계 레지스터가 저장한 값보다 커서는 안됨

 이처럼 CPU는 메모리에 접근하기 전 접근하고자 하는 논리 주소가 한계 레지스터보다 작은지를 항상 검사

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/4d7e8c91-a7f6-4b85-82bf-3ec0818fa18b)
실행 중인 프로그램의 독립적인 실행 공간을 확보 & 하나의 프로그램이 다른 프로그램을 침범하지 못하게 메모리 보호

## 캐시 메모리

CPU가 메모리에 접근하는 시간은 CPU 연산 속도보다 느리다  → CPU(ALU포함), 메모리는 외부

### 저장 장치 계층 구조

**memory hierarchy=메모리 계층 구조**

1. <Mark>CPU와 가까운 저장 장치</Mark>는 빠르고, 멀리 있는 저장 장치는 느리다.
2. 속도가 빠른 저장 장치는 저장 용량이 적고, 가격이 비싸다.

→ 낮은 가격대의 대용량 저장 장치를 원한다면 느린 속도는 감수해야 하고(<Mark>USB</Mark>), 빠른 속도의 저장 장치를 원한다면 작은 용량과 비싼 가격은 감수해야(<Mark>레지스터, RAM</Mark>)

### 캐시 메모리

- <Mark>CPU와 메모리 사이에 위치한</Mark>, 레지스터보다 용량이 크고 메모리보다 빠른 SRAM 기반의 저장 장치
- <Mark>CPU의 연산 속도와 메모리 접근 속도의 차이를 조금이나마 줄이기 위한 저장 장치
- “CPU가 매번 메모리에 왔다 갔다 하는 건 시간이 오래 걸리니, 메모리에서 CPU가 사용할 일부 데이터를 미리 캐시 메모리로 가지고 와서 쓴다”
- 캐시 메모리까지 반영한 저장 장치 계층 구조
    - 레지스터 - 캐시 메모리 - 메모리(RAM) - 보조기억장치(USB)
    - c.f. ) CPU 내부에 캐시 메모리가 있는 경우도 있지만 <Mark>레지스터가 더 빠름
- SRAM 기반

1. 계층적 캐시 메모리(L1-L2-L3 캐시)
  ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/27ce3eee-c0b8-4931-998b-59d35f23ca4e)
    
    용량 비교

    레지스터 < L1 < L2 < L3 < 메모리

    - 일반적으로 L1 캐시와 L2 캐시는 코어 내부에, L3 캐시는 코어 외부에 존재

2. 멀티코어 프로세서의 캐시 메모리

  ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/2c4a2723-e58c-4304-be1e-d7a16081d810)
  
    - 코어별 캐시 메모리가 동일한 메모리를 갖게끔 sync를 맞춰주는 것이 중요
    - L3는 공유하는 캐시 메모리로서 존재
3. 분리형 캐시

  ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/1391f38d-a946-4727-bcf2-943b8f38ecef)
  
    L1D: 데이터만 담기 위한 캐시 메모리

    L1I: 명령어만 담기 위한 캐시 메모리

### 참조 지역성의 원리

캐시 메모리는 메모리보다 용량이 작으므로 메모리의 모든 내용을 저장 ❌

→ <Mark>캐시 메모리는 CPU가 자주 사용할 법한 내용을 예측해서 저장

- 예측이 들어맞을 경우(CPU가 캐시 메모리에 저장된 값을 활용할 경우)
    
    ⇒ <Mark>캐시 히트
    
- 예측이 틀렸을 경우(CPU가 메모리에 접근해야 하는 경우)
    
    ⇒ <Mark>캐시 미스(성능 하락)

캐시 적중률: 캐시 히트 횟수 / (캐시 히트 횟수 + 캐시 미스 횟수)

→ CPU가 사용할 법한 데이터를 잘 예측해야 캐시 적중률을 높아진다.

캐시 메모리는 참조 지역성의 원리를 바탕으로 CPU가 자주 사용할 법한 대상을 예측하여 캐시 적중률을 높인다.
- 참조 지역성의 원리
    - CPU가 메모리에 접근할 떄의 주된 경향을 바탕으로 만들어진 원리
        1. CPU는 최근에 접근했던 메모리 공간에 다시 접근하려는 경향
        ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/ef199f0f-b7d3-41bb-9742-61164a9a2b20)
        2. CPU는 접근한 메모리 공간 근처를 접근하려는 경향
        ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/7dece4e5-4530-424b-8d9c-e1552b6575dc)

## 다양한 보조 기억장치

하드 디스크, 플래시 메모리(SSD) → ROM(비휘발성)

### 하드 디스크

자기적인(N극과 S극) 방식으로 데이터 저장

구성

- 플래터: 일반적으로 플래터 양면 모두 사용(겹겹이 존재)
- 스핀들 : 플래터를 회전
- RPM: 분당 회전수
- 헤드: 플래터를 읽고 쓰는 역할, 플레터는 겹겹이 존재하므로 헤드 또한 겹겹이 존재
- 디스크 암: 일반적으로 모든 헤드가 디스크 암에 부착되어 <Mark>함께</Mark> 이동

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/a3f63c69-8c06-490a-96d2-22bada14a5ed)

- 기본적으로 트랙과 섹터단위로 데이터 저장
    - 섹터의 크기: 512 바이트 ~ 4096 바이트
    - 하나 이상의 섹터를 묶어 블록이라고 표현하기도

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/72c5ce4b-b050-4970-b396-41762a2b6fc8)

- 플래터는 트랙과 섹터로 나뉘고, 같은 트랙이 모여 <Mark>실린더</Mark>를 이룬다
    - 실린더(cylinder)
        - 여러 겁의 플래터 상에서 <Mark>같은 트랙이 위치 한 곳</Mark>을 모아 연결한 논리적 단위
        - 연속된 정보는 한 실린더(플래터의 앞,뒤)에 기록(디스크 암에 의해 헤드가 함께 이동하므로)

### 하드 디스크의 데이터 접근 과정

**하드 디스크가 저장된 데이터에 접근하는 시간**

- 탐색 시간(seek time)
    - 접근하려는 데이터가 저장된 트랙까지 헤드를 이동시키는 시간
      ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/74e45571-0bf1-41d1-992e-9ca7dcccfed2)
- 회전 지연(rotational latency)
    - 헤드가 있는 곳으로 플래터를 회전시키는 시간
      ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/2960cb8b-3b6c-4975-8e0f-9c8bf3c4e9d8)
- 전송 시간(transfer time)
    - 하드 디스크와 컴퓨터 간에 데이터를 전송하는 시간
      ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/0ec7e8f9-8b81-4804-b303-3f9e993dc2bb)

**Jeff Dean - Numbers Every Programmer Should Know**

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/e44f8cf5-5e83-49a4-867c-b468f6e9d373)

- ns(나노초)는 10^-9초
- 패킷(packet)이란 네트워크의 기본적인 전송 단위

### 플래시 메모리

**전기적으로 데이터를 읽고 쓰는 반도체 기반 저장 장치(SSD, SD CARD, USB)**

- 범용성이 넓기에 보조기억장치에’만’ 속한다고 보기는 어려움

### 플래시 메모리의 종류

- <Mark>NAND 플래시 메모리(대부분)
- NOR 플래시 메모리

### 플래시 메모리의 저장 단위

#### 셀(cell)
- 플래시 메모리에서 데이터를 저장하는 가장 작은 단위
- 이 셀이 모이고 모여 수 MB, GB, TB 저장 장치가 된다

한 셀에

- <Mark>1 비트를 저장할 수 있는 플래시 메모리: SLC
- <Mark>2 비트를 저장할 수 있는 플래시 메모리: MLC
- <Mark>3 비트를 저장할 수 있는 플래시 메모리: TLC
- 4 비트를 저장할 수 있는 플래시 메모리: QLC

1. SLC
    - 한 셀로 두 개의 정보 표현
    - 비트의 빠른 입출력
    - 긴 <Mark>수명
    - 플래시 메모리(USB, SSD, SD CARD), 하드디스크에는 수명이 있다
    - 용량 대비 고가격
2. MLC
    - 한 셀로 네 개의 정보 표현(대용량화 유리)
    - SLC보다 느린 입출력
    - SLC보다 짧은 수명
    - SLC보다 저렴
    - 시중에서 많이 사용(MLC, TLC, QLC)
3. TLC
    - 한 셀로 8개의 정보 표현(대용량화 유리)
    - MLC보다 느린 입출력
    - MLC보다 짧은 수명
    - MLC보다 저렵
    - 시중에서 많이 사용

→ <Mark>같은 플래시 메모리라도 수명, 가격, 성능이 다르다
    ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/36848c42-a58e-4988-b2e4-730fe5977700)

![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/23b21cbf-8625-467e-a5e1-2d210a5adf39)
- 셀들이 모여 페이지(page)
    - 페이지의 상태
        - Free 상태
            - 어떠한 데이터도 저장하고 있지 않아 새로운 데이터를 저장할 수 있는 상태
        - Valid 상태
            - 이미 유효한 데이터를 저장하고 있는 상태
        - Invalid 상태
            - 유효하지 않은 데이터(쓰레기값)를 저장하고 있는 상태
            - c.f. ) <Mark>플레시 메모리는 하드 디스크와 달리 덮어쓰기가 불가능 🔥
            - <Mark>가비지 컬렉션</Mark>(삭제는 블록단위 읽/쓰는 페이지 단위)
                - A를 A`로 수정시
                - 유효한 페이지들만을 새로운 블록으로 복사
                - 기존의 블록(<Mark>Invalid</Mark>)을 삭제하여 공간을 정리 
                  ![image](https://github.com/dltlaos11/CodeSolving/assets/74396128/f8328c62-f6e6-429b-a2f0-c351b7158b28)
- 페이지들이 블록(block)
- 블록이 모여 플레인(plane)
- 플레인이 모여 다이(die)

읽기/쓰기 단위와 삭제 단위는 다르다

- <Mark>읽기와 쓰기</Mark>는 <Mark>페이지 단위</Mark>로 이루어짐
- <Mark>삭제</Mark>는 <Mark>블록(페이지보다 큰) 단위</Mark>로 이루어짐