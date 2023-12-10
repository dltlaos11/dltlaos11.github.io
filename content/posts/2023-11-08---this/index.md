---
title: this에 대해서 알아보자
date: "2023-11-08T23:35:32.169Z"
template: "post"
draft: false
slug: "/posts/javascript/what-is-this"
category: "Javascript"
tags:
  - "Javascript"
description: "this의 특성에 대해 알아보자"
---

## this

**정의 : Javascript에서 this의 값은 함수를 호출한 방법에 의해 결정된다.**

- bind로 this 객체 고정 가능

- 화살표 함수에서의 this는 함수가 속해있는 곳의 상위 this를 계승받는다.

- 참고로 화살표 함수는 bind 함수를 제공하지 않는다.

다음 예시를 통해 더 살펴보자

**index.html**

```html
<div id="app"></div>
<button id="button">this는 누굴까?</button>
```

**index.js**

```js
const car = {
  name: "KIA",
  getName: function () {
    console.log(this, "1");
    const ArrowGetName = () => {
      console.log(this, "2");
    };
    ArrowGetName();
    return this; // car 객체
  },
};

const li = document.getElementById("app");
const child = document.createElement("p");
// child.textContent = car.getName().name; // KIA -> car.xxx
// document.getElementById("app").innerHTML = "안녕하세요!";

// const globalCar = car.getName;
// child.textContent = globalCar().window; // [object Window] -> xxx, 밖에서 최상단 window객체가 부른 것

// child.textContent = globalCar.bind(car)(); // {name: "KIA", getName: ƒ}
// bind this

child.textContent = car.getName();
// {name: "KIA", getName: ƒ}
// function일 경우 Window{} 반환
// () =>, 화살표 함수일 경우 {name: "KIA", getName: ƒ}가 나온다.

li.appendChild(child);

const btn = document.getElementById("button");
// btn.addEventListener('click', car.getName);
// HTMLButtonElement{attributes: {…}, innerHTML: "this는 누굴까?", nodeType: 1, tagName: "button"}
btn.addEventListener("click", car.getName.bind(car)); // HTMLButtonElement -> car

const ageTest = {
  unit: "살",
  ageList: [10, 20, 30],
  getAgelist: function () {
    const result = this.ageList.map((age) => {
      return age + this.unit;
    });
    console.log(result);
  },
};

ageTest.getAgelist();
```

> #### 그러면 this를 사용할 때 화살표 함수를 써야할 까 일반 함수를 써야 할까?

1. this를 사용하고 싶다면 일반함수를 작성하자
   - bind()로 원하는 객체를 지정해 줄 수 있기 떄문 → 예측 가능한 this 사용 가능
2. 대신에 함수 안에 존재하는 함수의 this는 상위에 있는 것을 그대로 받아오기 때문에 화살표 함수로 만들어 주는 것이 좋다.
