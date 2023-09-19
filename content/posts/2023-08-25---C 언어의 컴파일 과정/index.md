---
title: C 언어의 컴파일 과정
date: "2023-08-25T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/c/compile-process"
category: "C"
tags:
  - "C"
  - "CS"
  - "ComputerArchitecture"
description: "컴퓨터 구조, C 언어의 컴파일 과정에 대해서 배웁니다."
---

- [전처리 과정](#전처리)
- [컴파일 과정](#컴파일)
- [어셈블 과정](#어셈블)
- [링킹](#링킹)

<img width="674" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/771d17f8-8265-4ebe-9c96-968bd38efa64">

컴파일 언어는 컴파일러에 의해 컴파일 되고 목적코드가 된다

전처리 → 컴파일 → 어셈블 → 링킹의 과정을 거쳐서 실행파일이 된다.

## 전처리

**전처리 과정(preprocessing)**

<img width="662" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/46cca75c-34fe-4aeb-9558-e4f6b52cddce">

- 본격적으로 컴파일하기 전에 처리할 작업들
- 외부에 선언된 다양한 소스 코드, 라이브러리 포함 (e.f. #include)
- 프로그래밍의 편의를 위해 작성된 매크로 변환(e.g. #define)
- 컴파일할 영역 표시

<img width="349" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/a8ab648d-2bf6-4cd0-a534-6ecc52f3cf6f">

</br>
<img width="321" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/8c6530c1-4440-429a-8b7c-982922549f2c">
</br>
<img width="650" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/b4cdec3a-5d7b-4e8f-9cd5-b5df3dc9042a">

c.f.) gcc(컴파일러)

→ 외부에서 사용되는 소스코드를 가져오는 과정은 전처리 과정의 일부이며 컴파일할 준비를 하는 단계

## 컴파일

**컴파일 과정(compiling)**

<img width="661" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/d7e39da7-5770-4168-b207-f08e88e7d523">

- 전처리가 완료 되어도 여전히 소스 코드
- 전처리 완료된 소스 코드를 저급 언어(어셈블리 언어)로 변환

<img width="341" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/a0c18fda-39c3-419c-8db1-d93a1621d25b">
</br>

<img width="676" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/ededd508-c3d5-4d1e-b592-cca280ad8b72">

## 어셈블

**어셈블 과정(assembling)**

<img width="663" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/55b67bcb-9b56-4e32-8ac3-ad981513cc48">

- 어셈블리어를 기계어로 변환
- 목적 코드(object file)를 포함하는 목적 파일이 됨

  - 목적 파일 vs 실행 파일

    - 목적 파일과 실행 파일은 둘 다 기계어로 이루어진 파일
    - 하지만 목적 파일과 실행 파일은 다르다
    - 목적 파일은 링킹(linking)을 거친 후에야 실행 파일이 된다.

      <img width="296" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/36eb5b31-19aa-4622-bf25-33bd9c41952e">

      </br>

      <img width="676" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/ddb0c9d4-8582-48d4-b9c3-4f26072e2f1b">

→ print 하고자 했던 문자들도 0과 1로 표현되어 있음.

## 링킹

**링킹(linking)**

<img width="670" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/8b339d06-ddfa-4823-990f-c68c1a235474">

</br>

<img width="653" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/9ee1e23d-270c-4a3f-b146-ed960efb0959">

</br>

<img width="662" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/d0c535dc-77b9-4ea6-aca3-477bf316c512">

→ main.o와 helper.o의 목적코드를 하나의 실행파일로 연결시켜주는 링킹 작업이 필요
