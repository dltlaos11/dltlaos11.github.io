---
title: 명령어 집합구조, CISC와 RISC
date: "2023-09-01T20:35:32.169Z"
template: "post"
draft: false
slug: "/posts/computer-architecture/instruction-set-architecture-cisc-and-risc"
category: "Computer Architecture"
tags:
  - "ComputerArchitecture"
  - "CS"
description: "명령어 집합구조, CISC와 RISC에 대해서 배웁니다."
---

- [명령어 집합구조, CISC와 RISC](#명령어-집합구조,-CISC와-RISC)
  - [명령어 집합](#명령어-집합)
  - [CISC](#cisc)
  - [RISC](#risc)

## 명령어 집합구조, CISC와 RISC

명령어 파이프라이닝에 유리한 명령어의 구조에 대해서 배워보자

### 명령어 집합

CPU는 명령어를 실행 → 모든 CPU가 똑같은 구조의 명령어를 실행하진 ❌ → 명령어의 세세한 생김새, 연산, 주소 지정 방식 등은 CPU마다 다름

**_명령어 집합(구조)_**

- CPU가 이해할 수 있는 명령어들의 모음
- 각 CPU의 언어라고 봐도 무방
- 인텔 CPU 컴퓨터에서 만든 실행 파일(명령어 들의 모음)을 그대로 아이폰에 옮겨 특별한 설정 없이 바로 실행하면 실행 ❌

  c.f. ) 인텔의 CPU는 일반적으로 “X86(X86-64)” 명령어 집합을, 애플의 CPU는 일반적으로 “ARM” 명령어 집합을 따름

  ![image](https://github.com/boost-library/yong-study/assets/74396128/5b2915a5-311d-4352-847d-913bbdc7f468)
  명령어 집합이 다르기 때문에 같은 소스를 컴파일하더라도 어셈블리어, 기계어의 종류가 다름

- 명령어가 달라지면 명령어 해석 방식, 레지스터의 종류와 개수, 파이프라이닝의 용이성 등이 달라지며 CPU의 구조 나아가서 컴퓨터의 구조까지 달라진다
  - 명령어의 구조\_ISA(Instruction Set Architecture)
    - CPU의 언어이자 하드웨어가 소프트웨어를 어떻게 이해할지에 대한 약속
    - 하드웨어별 용이한 명령어가 있다

→ 명령어 집합의 두 축: <Mark>CISC & RISC</Mark>

### cisc

CISC(Complex Instruction Set Computer)

- 복잡한 명령어 집합을 활용하는 컴퓨터(CPU)
  - x86, x86-64는 CISC 기반 명령어 집합 구조
- 복잡하고 다양한 명령어 활용
  - 명령어의 형태와 크기가 다양한 <Mark>가변 길이 명령어</Mark>를 사용
- 다양하고 강력한 명령어를 활용
  - 상대적으로 적은 수의 명령어로도 프로그램을 실행
  - 소스코드를 컴파일하면 강력하고 적은 수의 가변 길이의 명령어가 나옴

메모리를 최대한 아끼며 개발해야 했던 시절에 인기가 높았으나 <Mark>명령어 파이프라이닝이 불리하다</Mark>는 치명적인 단점이 존재

- 명령어가 워낙 복잡하고 다양한 기능을 제공하는 탓에 <Mark>명령어의 크기와 실행되기까지의 시간</Mark>이 일정하지 않음
- 복잡한 명령어 때문에 <Mark>명령어 하나를 실행하는 데에 여러 클럭 주기</Mark> 필요
- 복잡한 명령어의 사용 빈도가 낮음, 자주 쓰이는 명령어의 빈도수가 높다

### risc

RISC(Reduced Instruction Set Computer)

- 명령어의 종류가 적고, 짧고 규격화된 명령어 사용
- 단순하고 적은 수의 고정 길이 명령어 집합을 활용(<Mark>주로 1클럭 내에</Mark>) → 파이프라이닝에 유리
- 메모리 접근 최소화(load, store), 레지스터 십분 활용 → CISC에 비해서 범용 레지스터의 종류가 더 많은 경우가 많음
- 다만, 명령어의 종류가 CISC보다 적기에 컴파일 했을 때 <Mark>더 많은 명령어로</Mark> 프로그램을 동작 시킴(ex_ARM)

#### Summary

![image](https://github.com/boost-library/yong-study/assets/74396128/f15253b0-64e9-4923-85c8-b3fc803cfd4a)

c.f. ) 현대 CISC의 활용: 마이크로 명령어, 가급적 명령어의 실행을 1 클럭 내로 잘게 쪼개서 실행하므로, 내부적으로는 RISC처럼 실행
