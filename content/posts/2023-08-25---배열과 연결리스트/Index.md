---
title: 배열과 연결리스트
date: "2023-08-25T21:40:32.169Z"
template: "post"
draft: false
slug: "/posts/algorithms/array&linked-list"
category: "Algorithms"
tags:
  - "Algorithms"
  - "JavaScript"
description: "자바스크립트에서 사용되는 배열과 연결리스트에 대해서 배웁니다."
---

- [배열](#배열)
  - [정의와 성질](#정의와-성질)
  - [기능과 구현](#기능과-구현)
- [자바스크립트와 배열](#자바스크립트와-배열)
  - [더블링](#더블링)
- [연결리스트](#연결리스트)
  - [정의와 성질](#정의와-성질)
  - [배열 vs 연결 리스트](#배열-vs-연결-리스트)
  - [기능과 구현](#기능과-구현)

## 배열

#### 정의와 성질

<img width="677" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/efe26000-5fe5-405f-b6aa-512812ecf53c">

#### 배열

메모리 상에 원소를 연속해서 배치한 자료구조

**배열의 성질**

**1.** O(1)에 k번째 원소를 확인/변경 가능

**2.** 추가적으로 소모되는 메모리의 양(=overhead)가 거의 없음

**3.** 메모리 상에 데이터들이 붙어있으므로 Cache hit rate가 높음

Cache hit rate

간단히 "적중률"이라고도 하는 Cache hit rate은 원본 데이터 소스에서 데이터를 가져올 필요 없이 요청된 데이터를 제공하는 캐시 시스템의 효율성을 측정하는 지표. 이는 요청된 항목이 캐시에서 얼마나 자주 발견(또는 "적중")되는지를 총 요청의 백분율로 수량화한다.

캐시(Cache)

컴퓨팅에서 <Mark>캐시는</Mark> 주 메모리(RAM) 또는 디스크 저장소와 같이 더 크고 느린 저장 매체에서 자주 액세스하는 데이터의 복사본을 저장하는 더 작고 빠른 저장 메커니즘.

캐시의 목적

- <Mark>자주 사용하는 데이터를 프로세서나 이를 필요로 하는 기타 구성 요소에 더 가깝게 저장하여 자주 사용하는 데이터에 액세스하는 데 걸리는 시간을 줄이는 것<Mark>이다.

  - 프로세서(**Processor**), 프로세스(**Process**)
    - "프로세서"(CPU)는 컴퓨터 프로그램의 명령을 실행하는 하드웨어 구성 요소입니다. 컴퓨터 시스템의 주요 계산 단위이다.
    - "프로세스"는 실행 중인 프로그램의 인스턴스를 나타내는 소프트웨어 개념입니다. 자체 메모리와 리소스가 있으며 여러 프로세스가 단일 프로세서 또는 여러 프로세서에서 동시에 실행될 수 있다.
      멀티태스킹 운영 체제에서는 시간 공유 및 스케줄링 메커니즘 덕분에 여러 프로세스가 단일 프로세서에서 동시에 실행될 수 있습니다. 각 프로세스는 실행할 시간 조각을 가져오므로 프로세서가 한 번에 하나의 명령만 실행할 수 있더라도 동시 실행이 가능한 것처럼 보인다.

  캐시 적중률이 높은경우

  - 요청된 데이터 중 더 많은 부분이 캐시에서 효율적으로 처리되고 있음을 의미하므로 데이터 액세스 시간이 빨라지고 시스템 성능이 향상된다.

  캐시 적중률이 낮은 경우

  - 캐시가 요청된 데이터를 처리하는 데 덜 효과적이라는 것을 의미하며, 이로 인해 느린 데이터 소스에 더 자주 액세스하게 되어 잠재적으로 성능이 저하될 수 있다.

**4.** 메모리 상에 연속한 구간을 잡아야 해서 할당에 제약이 걸림

#### 기능과 구현

- 임의의 위치에 있는 원소를 확인/변경 = O(1)
- 원소를 끝에 추가 = O(1)
- 마지막 원소를 제거 = O(1)
- 임의의 위치에 원소를 추가,제거 = <Mark>O(N)</Mark>

```js
const insert = (idx, num, arr) => {
  arr = [...arr.slice(0, 3), num, ...arr.slice(3)];
  return arr;
};

const erase = (idx, arr) => {
  arr = [...arr.slice(0, 4), ...arr.slice(5)];
  return arr;
};

let arr = [10, 50, 40, 30, 70, 20];
arr = insert(3, 60, arr);
arr = erase(4, arr);
```

```js
let arr = [10, 50, 40, 30, 70, 20];
let len2 = 6;
const insert = (idx, num, arr) => {
  for (let i = len2; i > idx; i--) {
    arr[i] = arr[i - 1];
  }
  arr[idx] = num;
  // 배열의 오른쪽에서부터 왼쪽 항을 오른쪽으로 옮기기
  // i >= idx -> arr[0] = arr[-1] 런타임 에러
  // console.log(arr, len2);
};

const erase = (idx, arr) => {
  for (let i = idx; i < len2; i++) {
    arr[i] = arr[i + 1];
  }
  arr.pop();
  // 왼쪽으로 옮기기
};

insert(3, 60, arr, len2);
erase(4, arr, len2);
```

push, pop ⇒ O(1)의 시간복잡도를 갖는다.

## 자바스크립트와 배열

```js
const myArray = []; // 빈 배열 생성
myArray.push(1); // 요소 추가
myArray.push(2);
```

JavaScript의 배열은 <Mark>동적 배열(dynamic array)</Mark>의 개념을 기반으로 구현되어 있다. 동적 배열은 크기가 동적으로 조정되는 배열로, 고정 크기의 배열과는 달리 요소를 추가하거나 제거할 때 자동으로 크기를 조절한다.

JavaScript 배열의 동적 배열 특징:

1. **크기 조정:** JavaScript 배열은 내부적으로 요소를 저장하는 버퍼와 인덱스를 관리한다. 요소를 추가하거나 삭제할 때, 필요에 따라 자동으로 내부 버퍼의 크기를 조절하여 데이터를 저장한다
2. **편리한 삽입과 삭제:** 배열의 중간에 요소를 삽입하거나 삭제하는 경우, 배열은 이전 요소를 뒤로 옮기거나 삭제된 요소 이후의 요소를 당겨오는 등의 작업을 내부적으로 처리한다.
3. **인덱스를 통한 빠른 접근:** 배열은 각 요소가 인덱스로 접근 가능하므로, 인덱스를 알고 있다면 빠르게 요소에 접근할 수 있다.
4. **메모리 관리:** 동적 배열은 메모리를 효율적으로 사용하기 위해 요소가 실제로 저장되는 버퍼 크기를 조절한다.

하지만 JavaScript 배열의 동적 배열 특성 때문에, 요소를 추가하거나 삭제할 때마다 내부적으로 크기를 조절하거나 버퍼를 재할당하는 작업이 발생할 수 있다. 이는 대부분의 상황에서는 성능에 큰 문제가 없지만, 매우 큰 배열이나 많은 요소를 처리하는 경우에는 성능 상의 고려가 필요할 수 있다.

#### 더블링

동적 배열에서 <Mark>"더블링"(doubling)</Mark>은 배열의 크기를 효율적으로 확장하기 위한 일반적인 전략 중 하나이다. 더블링 전략은 배열이 꽉 찼을 때(즉, 버퍼가 다 찼을 때) 배열의 크기를 두 배로 늘리는 방식

더블링 전략의 장점

1. **효율적인 크기 조정:** 더블링을 사용하면 배열이 계속해서 요소를 추가해도 상대적으로 적은 크기의 재할당 작업이 발생하므로, 성능 향상을 도모할 수 있습니다.
2. **Amortized(<Mark>분할 상환</Mark>) O(1) 삽입 시간:** 더블링을 활용한 동적 배열은 각 삽입 작업에 대해, <Mark>모든 요소를 새로운 크기의 배열로 각 요소를 복사해야 하므로 O(N)의 시간 복잡도를 갖지만</Mark>, 평균적으로 상수 시간(O(1))을 보장합니다. → <Mark>분할 상환 분석</Mark>이라 한다

더블링 전략의 단점

1. **메모리 사용 증가:** 더블링은 배열이 커질 때마다 두 배로 메모리를 할당하므로, 크기가 큰 배열일수록 메모리 사용량도 크게 증가할 수 있다.
2. **미리 할당되는 메모리 양:** 배열 크기를 늘릴 때마다 두 배로 늘리는 것이기 때문에, 작은 크기의 배열에도 비교적 큰 메모리가 미리 할당될 수 있다.

## 연결리스트

#### 정의와 성질

**연결리스트의 성질**

1. k번째 원소를 확인/변경하기 위해 O(k)가 필요함
   - 배열과 다르게 공간에 원소들이 연속해서 위치하고 있지 않음
2. 임의의 위치에 원소를 추가/임의 위치의 원소 제거는 O(1)
3. 원소들이 메모리 상에 연속해있지 않아 Cache hit rate가 낮지만 할당이 다소 쉽다

**연결리스트의 종류**

- 단일 연결 리스트(Singly Linked List)
  <img width="650" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/ec942403-edd9-4e0b-a3c9-41c51aa5bda4">

- 이중 연결 리스트(Doubly Linked List)

  - 단일 연결 리스트에서는 이전 원소를 몰랐지만, 알 수 있다. 다만 원소가 가지고 있어야 하는 정보가 1개 더 추가되니 메모리를 더 쓴다는 단점이 존재
    <img width="651" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/5aae2c15-383d-4ab0-bd85-4d5b2d15a590">

- 원형 연결 리스트(Circular Linked List)
  - 각 원소가 이전과 다음 원소의 주소를 모두 가지고 있어도 상관❌
    <img width="645" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/73d3e1f4-a039-49e9-9109-81bcd75fb697">

#### 배열 vs 연결 리스트

배열과 연결 리스트는 메모리 상에 원소를 놓는 방법이 다르다 해도 원소들 사이의 선후 관계가 일대일로 정의
→ 원소들 사이의 순서가 존재, <Mark>선형 자료구조</Mark>라 한다. c.f.) 트리, 그래프, 해쉬 등은 <Mark>비선형 자료구조</Mark>

<img width="679" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/bd5bdc96-02ec-4ece-aa7d-27cc6ecbe9f1">

- 연결 리스트에서는 각 원소가 다음 원소, 혹은 이전과 다음 원소의 주소값을 가지고 있어야 함. 그래서 32비트 컴퓨터면 주소값이 32비트(=4바이트)단위이니 4N바이트가 추가로 필요, 64비트 컴퓨터면 주소값이 64비트(=8바이트) 8N 바이트가 추가로 필요. 즉 N에 비례하는 만큼의 메모리를 추가로 사용
  - <Mark>32bit Computer Architecture</Mark>
    32비트 컴퓨터 아키텍처에서 "워드"라고 알려진 메모리 저장의 기본 단위는 일반적으로 32비트이며 이는 4바이트에 해당. 각 메모리 주소는 32비트 값을 보유하는 위치를 가리킵니다. 이는 컴퓨터의 메모리가 각각 4바이트의 개별 단위로 나누어져 있음을 의미

#### 기능과 구현

**1.** 임의의 위치에 있는 원소를 확인/변경, O(N)
<img width="649" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/b3cbfce7-3cc8-4c27-9933-32b71c1f97fb">
k번쨰 원소를 보기 위해서는 O(k)의 시간이 필요하고, 전체에 N개의 원소가 있다고 하면 평균적으로 N/2의 시간이 필요할테니 O(N)

**2.** 임의의 위치에 원소를 추가, O(1)
<img width="649" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/5277e0aa-de21-4072-a1ce-3314148a8d27">
21뒤에 84를 추가하는 작업은 배열처럼 그 뒤의 원소들을 모두 옮길 필요가 없고, 21과 84에 다음원소의 주소만 바꾸어 주면 된다. 단, 추가하고 싶은 위치의 주소를 알고 있을 경우에만 O(1). 만약 21의 주소를 주는 것이 아니라 3번쨰 원소 뒤에 84를 추가하는 경우에는 3번쨰 원소까지 찾아가야하는 시간이 걸리므로 O(1)이라 할 수 없음.

**3.** 임의 원소를 제거, O(1)
<img width="644" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/62f8b2fc-637c-4d08-b9fd-e66bddc92e72">
21을 지우고 65의 주소를 17로 변경하면 된다. 단, 21이 들어있는 원소는 메모리 누수를 막기 위해 메모리에서 없애줘야 한다.

임의의 위치에 있는 원소를 확인/변경 = O(N)
임의의 위치에 원소를 추가/임의 위치의 원소 제거 = O(1)

→ 임의의 위치에서 원소를 추가하거나 임의 위치의 원소를 제거하는 연산을 많이 해야하는 경우에는 연결 리스트의 사용을 고려해보는 것이 좋다.

**연결리스트의 구현**
보통 연결리스트의 정석적인 구현은 NODE 구조체나 클래스를 만들어서 원소가 생성될 떄 동적할당을 하는 방식.
<img width="471" alt="image" src="https://github.com/dltlaos11/dltlaos11.github.io/assets/74396128/61083722-f7ce-44b4-934b-2f8917987e87">

```js
const Linkedlist = {
  head: {
    element: 10,
    next: {
      element: 20,
      next: {
        element: 30,
        next: {
          element: 40,
          next: null,
        },
      },
    },
  },
};
```

**1. 노드(Node): 연결리스트에서 하나의 데이터 단위**

- data field와 link field로 구성되어 있음
- vertex(버텍스, 꼭지점의 의미)이라고 부르기도 함

**2. Data Field: 노드의 값이 저장된 곳**

- element라는 변수 사용

**3. Link Field: 다음 노드의 주소가 저장된 곳**

- next 변수 사용

**4. Head: 첫 노드**

**5. Tail: 마지막 노드(null)**

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node("head");
  }

  append(newElement) {
    let newNode = new Node(newElement); //새로운 노드 생성
    let current = this.head; // 시작 노드
    while (current.next != null) {
      // 맨 끝 노드 찾기
      current = current.next;
    }
    current.next = newNode;
  }

  insert(newElement, item) {
    let newNode = new Node(newElement); //새로운 노드 생성
    let current = this.find(item); // 삽입할 위치의 노드 찾기
    newNode.next = current.next; // 찾은 노드가 가리키는 노드를 새로은 노드가 가리키기
    current.next = newNode; // 찾은 노드는 이제부터 새로운 노드를 가리키도록 하기
  }

  remove(item) {
    let preNode = this.findPrevious(item); // 삭제할 노드를 가리키는 노드 찾기
    preNode.next = preNode.next.next; // 삭제할 노드 다음 노드를 가리키도록 하기
  }

  find(item) {
    let currNode = this.head; // Node의 head 부터 탐색
    while (currNode.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  findPrevious(item) {
    let currNode = this.head; // Node의 head 부터 탐색
    while (currNode.next != null && currNode.next.element !== item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  toString() {
    let array = [];
    let currNode = this.head;
    while (currNode.next !== null) {
      array.push(currNode.next.element);
      currNode = currNode.next;
    }
    return array;
  }
}

let linkedList = new LinkedList();
linkedList.insert("A", "head");
linkedList.insert("B", "A");
linkedList.insert("C", "B");
linkedList.remove("B");
linkedList.append("D");

linkedList.append("E");

console.log(linkedList.toString()); // ['A', 'C', 'D', 'E']
```

##### Reference

**[[바킹독의 실전 알고리즘] 0x04강 - 연결 리스트](https://www.youtube.com/watch?v=C6MX5u7r72E&list=PLtqbFd2VIQv4O6D6l9HcD732hdrnYb6CY&index=5)**

**[[2022 JS 알고리즘] 002. 연결리스트](https://www.youtube.com/watch?v=dvKuG3gfLFQ&t=752s)**
