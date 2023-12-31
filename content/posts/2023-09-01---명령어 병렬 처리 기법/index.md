---
title: 명령어 병렬 처리 기법
date: "2023-09-01T18:35:32.169Z"
template: "post"
draft: false
slug: "/posts/computer-architecture/instruction-parallel-processing-technique"
category: "CS"
tags:
  - "ComputerArchitecture"
  - "CS"
description: "명령어 병렬 처리 기법에 대해서 배웁니다."
---

- [명령어 병렬 처리기법](#명령어-병렬-처리기법)
  - [명령어 파이프라인](#명령어-파이프라인)
    - [파이프라인 위험](#파이프라인-위험)
  - [슈퍼스칼라 기법](#슈퍼스칼라-기법)
  - [비순차적 명령어 처리](#비순차적-명령어-처리)

## 명령어 병렬 처리기법

### 명령어 파이프라인

**여러개의 명령어를 겹처서 실행하는 방법**

**실행을 여러 단계로 나누는 CPU 내의 <Mark>하드웨어</Mark> 메커니즘을 구체적으로 의미**

명령어가 처리되는 과정을 비슷한 시간 간격으로 나눈다면 다음과 같이 나눌 수 있다.

1. 명령어 인출(Instruction Fetch)
2. 명령어 해석(Instruction Decode)
3. 명령어 실행(Execute Instruction)
4. 결과 저장(Write Back)

c.f. ) `인출 → 실행` 혹은 `명령어 해석 → 명령어 실행 → 명령어 접근 → 결과 저장`으로 나누기도
![image](https://github.com/boost-library/yong-study/assets/74396128/adfcc9c2-fc58-4625-8aa3-c538d661816f)

#### 명령어 파이프라이닝

**같은 단계가 겹치지만 않는다면 CPU는 <Mark>‘각 단계를 동시에 실행할 수 있다’**

**명령 실행의 효율성과 성능을 향상시키는 데 사용되는 <Mark>하드웨어 및 소프트웨어 기술</Mark>을 포함하는 보다 포괄적인 개념**

![image](https://github.com/boost-library/yong-study/assets/74396128/5bc5a29d-5582-424e-bb28-30394ede3670)

명령어 파이프라인을 사용하지 않는다면 각 명령어를 하나씩 처리해야 하므로 비효율적

#### 파이프라인 위험

**명령어 파이프라인이 성능 향상에 실패(병렬로 파이프라인이 제대로 동작하지 않는)하는 경우**

![image](https://github.com/boost-library/yong-study/assets/74396128/b0e69632-7be5-4428-864a-2dff706f166c)

1. 데이터 위험

   명령어 간의 의존성에 의해 야기

   - 모든 명령어를 동시에 처리할 수는 없다
   - 이전 명령어를 끝까지 실행해야만 비로소 실행할 수 있는 경우

   ![image](https://github.com/boost-library/yong-study/assets/74396128/c10a674d-1ee9-4dd5-9758-6300b5e128de)

2. 제어 위험

   프로그램 카운터의 갑작스러운 변화

   - PC가 갑작스럽게 특정 메모리 주소로 변화되는 상황에서 파이프라이닝이 성능 향상에 실패하는 경우
   - 기본적으로 명령어는 순차적인 흐름을 가지고 있음, 겹쳐서 실행하고 있던 다음 명령어가 헛수고

   c.f. ) 위 상황을 방지하기 위해서 PC가 어디로 점프할 것인지 미리 예측하는 분기 예측(branch prediction) 기술이 존재

   ![image](https://github.com/boost-library/yong-study/assets/74396128/76215680-bf7c-4c45-bfd0-86e005f0c835)

3. 구조적 위험

   서로 다른 명령어가 같은 CPU 부품(ALU, 레지스터)를 쓰려고 할 떄, 프로세서의 자원 부족

### 슈퍼스칼라 기법

CPU 내부에 여러 개의 명령어 파이프라인을 포함한 구조

- 오늘날의 멀티스레드 프로세서

  - 멀티스레드 프로세서

    - 하드웨어적 스레드(각각의 코어가 동시에 수행할 수 있는 명령어의 단위)가 여러개 있는 스레드
    - 8 Core 16 Threads CPU 한번에 16개의 명령어를 실행

      ![image](https://github.com/boost-library/yong-study/assets/74396128/fd06c96c-6ede-42dd-89f4-5b89d44bda1d)

    - 이론적으로는 파이프라인 개수에 비례하여 처리 속도 증가
    - 하지만, <Mark>파이프라인 위험도</Mark>의 증가로 인해 파이프라인 개수에 비례하여 처리 속도가 증가하진 ❌

### 비순차적 명령어 처리

**파이프라인의 중단을 방지하기 위해 명령어를 순차적으로 처리하지 않는 명령어 병렬 처리 기법**

![image](https://github.com/boost-library/yong-study/assets/74396128/3c720d3b-5ead-48c0-9a07-d5858228603a)

의존성이 없는(전체 프로그램 실행 흐름에 영향❌) 명령어의 순서를 바꿈으로 인해 파이프라이닝의 중단을 방지할 수 있다.

#### Summary

명령어 병렬 처리기법

- 명령어 파이프라이닝: 명령어를 겹처서(병렬) 실행시키는 방식
  - 파이프라인 위험: 파이프라이닝을 해도 성능향상에 실패
    - 데이터 위험
    - 제어 위험
    - 구조 위험
- 슈퍼스칼라 기법: 명령어 파이프라인을 여러개 두는 방식
- 비순차적 명령어 처리: 의존성이 없는 명령어간 순서를 바꿔서 실행하는 방식
