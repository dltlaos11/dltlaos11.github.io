---
title: 운영체제의 큰 그림
date: "2023-09-09T20:35:32.169Z"
template: "post"
draft: false
slug: "/posts/os/purpose"
category: "OS"
tags:
  - "OS"
  - "CS"
description: "운영체제를 알아야 하는 이유에 대해서 배웁니다"
---

- [운영체제를 알아야 하는 이유](#운영체제를-알아야-하는-이유)
- [운영체제의 큰 그림](#운영체제의-큰-그림)
  - [커널](#커널)
  - [이중모드와 시스템 호출](#이중모드와-시스템-호출)
  - [운영체제의 핵심 서비스](#운영체제의-핵심-서비스)
- [시스템 호출(system call)직접 관찰하기](#시스템-호출-직접-관찰하기)
- [프로세스](#프로세스)
    - [프로세스 직접 확인하기](#프로세스-직접-확인하기)
    - [프로세스 제어 블록](#프로세스-제어-블록)
    - [문맥 교환(context switch)](#문맥-교환)
    - [프로세스의 메모리 영역](#프로세스의-메모리-영역)

## 운영체제를 알아야 하는 이유

모든 프로그램은 실행을 위해 자원을 필요로 한다 

##### 자원/시스템 자원

- 프로그램 실행에 있어 마땅히 필요한 요소
- 컴퓨터의 네 가지 핵심 부품 포함

**운영체제는**
- 실행할 프로그램에 <Mark>필요한 자원을 할당</Mark>하고
- 프로그램이 올바르게 실행되도록 돕는
- 특별한 프로그램
- 프로그램이다 보니 메모리에 저장되어있어야 하니 운영체제는 특별한 프로그램이라
- <Mark>커널영역</Mark>이라는 특별한 영역에 적재되는 프로그램
- 일반 응용 프로그램은 <Mark>사용자 영역</Mark>에 적재
- 운영체제는 하드웨어와 응용프로그램 사이에 위치
- 운영체제의 메모리 관리
    - 메모리에 적당한 공간에 응용 프로그램 적재 및 삭제
- 운영체제의 CPU관리
- 운영체제의 입출력장치 관리
- 운영체제는 컴퓨터의 자원을 cpu,프로세스,파일시스템,메모리 관리를 통해 효율적으로 컴퓨터를 관리
- 운영체제 덕분에 개발자는 하드웨어를 조작하는 코드를 직접 작성할 필요 ❌
- 운영체제는 프로그램을 위한 프로그램, 프로그램을 만드는 개발자는 운영체제를 잘 알아야 한다.

## 운영체제의 큰 그림

운영체제는 현존하는 프로그램 중 규모가 가장 큰 프로그램 중 하나

### 커널

운영체제의 핵심 서비스를 담당하는 부분을 커널(kernal)이라고 한다.

- 운영체제에는 속하지만 커널에는 속하지 않는 기능
    - 유저 인터페이스(UI)
    - 사용자와 컴퓨터간의<Mark>통로</Mark>일 뿐 운영체제의 핵심 기능(커널)은 아님

### 이중모드와 시스템 호출

사용자가 실행하는 프로그램은 자원에 직접 접근하면 ❌ → 자원에 직접 접근은 위험

오직 운영체제를 통해서만 접근하도록 하여 자원 보호

응용 프로그램이 자원에 접근하려면 운영체제의 도움을 요청(=운영체제의 코드를 실행)해야

응용 프로그램이 하드 디스크에 접근 → 운영체제(HDD 저장 코드 실행) → 하드웨어 저장

이중 모드

- CPU가 명령어를 실행하는 모드를 크게 사용자 모드와 커널 모드로 구분하는 방식
    - 사용자 모드
        - 운영체제 서비스를 제공받을 수 없는 실행 모드
        - 커널 영역의 코드를 실행할 수 없는 실행 모드
        - 자원 접근 불가
    - 커널 모드
        - 운영체제의 서비스를 제공받을 수 있는 실행 모드
        - 자원 접근을 비롯한 모든 명령어 실행 가능
- 플래그 레지스터 속 <Mark>슈퍼바이저 플래그</Mark> 존재
    - 커널 모드로 실행 중인지, 사용자 모드로 실행 중인지를 나타냄

시스템 호출

- 커널 모드로 전환하여 실행하기 위해 호출
- 일종의 소프트웨어 인터럽트
    - 시스템 호출이 처리되는 방식은 인터럽트 처리 방식과 유사
        1. 시스템 호출
        2. 운영체제(운영체제 코드(⇒ 인터럽트 서비스 루틴) 실행)
        3. 시스템 호출 복귀(사용자 모드로 복귀)
            <img width="612" alt="image" src="https://github.com/dltlaos11/CodeSolving/assets/74396128/066cacb7-d98e-42d9-9c06-71b19488c722">

            시스템 호출은 운영체제 서비스를 제공받기 위해 커널 모드로 전환하는 방법
        
        시스템 호출 예시
            <img width="626" alt="image" src="https://github.com/dltlaos11/CodeSolving/assets/74396128/1bf37051-1db9-41ba-bdd3-9983c1d7cca3">

### 운영체제의 핵심 서비스

- 프로세스 == 실행 중인 프로그램
- 수 많은 프로세스들이 동시에 실행

c.f. ) 모든 프로세스들은 메모리에 올라있어야 하는데 페이징, 스와핑을 통해서 메모리에 모든 프로세스들이 올라오진 ❌

프로세스 관리

- 동시다발적으로 생성/실행/삭제되는 다양한 프로세스를 일목요연하게 관리
    - 프로세스와 스레드, 프로세스 동기화, 교착상태 해결

자원 접근 및 할당

- CPU(CPU 스케줄링: 어떤 프로세스를 먼저, 얼마나 오래 실행할지)
- 메모리(페이징, 스와핑, …)
- 입출력장치(하드웨어 인터럽트 서비스 루틴을 제공하는 운영체제)

파일 시스템 관리

- 관련된 정보를 파일이라는 단위로 저장 장치에 보관
- 파일들을 묶어 폴더(디렉터리) 단위로 저장 장치에 보관

## 시스템 호출 직접 관찰하기

시스템 콜 → 소프트웨어 인터럽트 발생 → 운영체제(커널 영역에 적재되어 있는 운영체제 코드를 실행)

```c
ls == /bin/ls
ls -> 어떤 프로그램을 실행하는 것, strace(linux에서)
strace /bin/ls -> ls 하면서 실행되는 시스템 콜을 불러옴,  

vi hello.c
#include <stdio.h>
int main()
{
	printf("hello\n");
	return 0;
}
gcc hello.c
./a.out

sudo dtruss ./a.out

복구 모드로 macOS 재부팅 후 터미널에서 아래와 같이 명령어를 입력한 뒤 재부팅
$ csrutil disable
그럼 정상적으로 dtruss 명령어가 동작하는 것을 볼 수 있다

참고로 아래의 메세지는 보안상의 이유로 dtrace(dtruss)실행이 의도적으로 안되게 보안 기능이 설정되어 있는 의미이고

dtrace: system integrity protection is on, some features will not be available
dtrace: failed to initialize dtrace: DTrace requires additional privileges

아래의 명령어는 해당 기능을 끄겠다는 의미

$ csrutil disable

그렇기에 다시 복구 모드에서 아래 명령어로 해당 기능을 켜주는 것을 권장

$ csrutil enable
```

## 프로세스

### 프로세스 직접 확인하기

리눅스 → ps 명령어

- 포그라운드 프로세스(foreground process)
    - 사용자가 볼 수 있는 공간에서 실행되는 프로세스
- 백그라운드 프로세스(background process)
    - 사용자와 직접 상호작용이 가능한 백그라운드 프로세스
    - 사용자와 상호작용하지 않고 그저 정해진 일만 수행하는 프로세스→데몬,서비스

### 프로세스 제어 블록

- 모든 프로세스는 실행을 위해 CPU가 필요, 하지만 CPU 자원은 한정적
- 프로세스들은 돌아가며 한정된 시간 만큼만 CPU 이용
    - 자신의 차례에 정해진 시간만큼 CPU 이용
    - 타이머(=타임아웃) 인터럽트가 발생하면 차례 양보
- 빠르게 번갈아 수행되는 프로세스들을 관리해야
- 이를 위해 사용하는 자료구조가 프로세스 제어 블록(이하 PCB)
    - 프로세스 관련 정보를 저장하는 자료 구조
    - 마치 상품에 달린 태그와 같은 정보
    - 프로세스 생성 시 커널 영역에 생성, 종료 시 폐기
- PCB에 담기는 대표적인 정보
    - 프로세스 ID(=PID)
        - 특정 프로세스를 식별하기 위해 부여하는 고유한 번호(학교의 학번, 회사의 사번)
    - 레지스터 값
        - 프로세스는 자신의 실행 차례가 오면 이전까지 사용한 레지스터 중간 값을 모두 복원 → 실행 재게
        - 프로그램 카운터, 스택 포인터 …
    - 프로세스 상태
        - 입출력 장치를 사용하기 위해 기다리는 상태, CPU를 사용하기 위해 기다리는 상태, CPU 이용 중인 상태…
    - CPU 스케줄링 정보
        - 프로세스가 언제, 어떤 순서로 CPU를 할당받을지에 대한 정보
    - 메모리 정보
        - 프로세스가 어느 주소에 저장되어 있는지에 대한 정보
        - 페이지 테이블 정보(’메모리 주소를 알 수 있는 정보가 담긴다’)
    - 사용한 파일과 입출력장치 정보
        - 할당된 입출력장치, 사용 중인(열린) 파일 정보
- 운영체제는 <Mark>커널 영역에 적재된</Mark> PCB를 보고 프로세스를 관리

### 문맥 교환

- 한 프로세스(e.g. 프로세스 A)에서 다른 프로세스(e.g. 프로세스 B)로 실행 순서가 바뀌면
- 기존에 실행되던 프로세스 A는 지금까지의 <Mark>중간 정보</Mark>를 백업
    - 프로그램 카운터 등 각종 레지스터 값, 메모리 정보, 열었던 파일, 사용한 입출력장치 등
    - 이러한 중간 정보 == <Mark>문맥(context)
    - 다음 차례가 왔을 떄 실행을 재개하기 위한 정보
    - <Mark>“실행 문맥을 백업해두면 언제든 해당 프로세스의 실행을 재개할 수 있다”
- 뒤이어 실행할 프로세스 B의 문맥을 복구
    - 자연스럽게 실행 중인 프로세스가 바뀜
- 이처럼 기존의 실행 중인 프로세스 문맥을 백업하고
- 새로운 프로세스 실행을 위해 문맥을 복구하는 과정을
- <Mark>문맥  교환(context switching)</Mark>이라 한다
    - 여러 프로세스가 끊임없이 빠르게 번갈아 가며 실행되는 원리
        <img width="617" alt="image" src="https://github.com/dltlaos11/CodeSolving/assets/74396128/d77c2f16-43f4-41ba-80a4-83d343173b59">

### 프로세스의 메모리 영역

- 크게 코드 영역(=텍스트 영역), 데이터 영역, 힙 영역, 스택영역으로 프로세스는 사용자 영역에 저장
    - 코드 영역
        - 실행할 수 있는 코드, 기계어로 이루어진 명령어 저장
        - 데이터가 아닌 CPU가 실행할 명령어가 담기기에 쓰기가 금지된 영역(read-only)
    - 데이터 영역
        - 잠깐 썼다가 없앨 데이터가 아닌 프로그램이 실행되는 동안 유지할 데이터가 저장
        - e.g. 전역 변수
        - 코드 영역과 데이터 영역의 크기는 고정적, <Mark>정적 할당 영역</Mark>이라고도 한다
    - 힙 영역
        - 프로그램을 만드는 사용자, 즉 프로그래머가 직접 할당할 수 있는 저장공간
        - 힙 영역에 메모리 공간을 할당했다면 반환해줘야 하는데 프로그래밍 언어가 알아서 반환해주는 언어가 있는데 <Mark>가비지 컬렉션</Mark>이라 함, 일부 프로그래밍 언어(C, ..)는 가비지 컬렉션 기능이 없기에 일일이 메모리 반환과정을 거쳐야 하는데 그렇지 않으면 힙 영역에 공간은 계속해서 메모리 공간을 차지하면서 메모리 낭비를 초래 → <Mark>메모리 누수(Memeory Leak)
    - 스택 영역
        - 데이터가 일시적으로 저장되는 공간
        - (데이터 영역에 담기는 값과는 달리) 잠깐 쓰다가 말 값들이 저장되는 공간
        - e.g. 매개변수, 지역변수
        - 힙, 스택영역의 크기는 실행과정에서 가변적, <Mark>동적 할당 영역</Mark>이라고 한다
            - 일반적으로 힙 영역은 낮은 주소에서 높은 주소로 할당
            - 일반적으로 스택 영역은 높은 주소에 낮은 주소로 할당
            - 힙영역은 스택 영역과 반대되는 방향으로 주소 할당
                - 메모리간 충돌 방지를 위함(거의 반대방향으로 할당)
                    <img width="439" alt="image" src="https://github.com/dltlaos11/CodeSolving/assets/74396128/40bba153-2b55-4b99-bcec-777b702f2f6b">
- 커널영역은 따로 존재, 메모리 안에서