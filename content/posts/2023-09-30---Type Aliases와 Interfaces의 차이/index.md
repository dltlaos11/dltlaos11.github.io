---
title: Type Aliases와 Interfaces의 차이
date: "2023-09-30T20:35:32.169Z"
template: "post"
draft: false
slug: "/posts/typescript/Differences-between-TypeAliases-and-Interfaces"
category: "Typescript"
tags:
  - "Typescript"  
description: "Type Aliases와 Interfaces의 차이에 대해서 배웁니다"
---


`Type aliases`와 `Interfaces`는 굉장히 비슷하고, 많은 경우에 자유롭게 선택해서 사용할 수 있다.

`interface`가 가지는 대부분의 기능은 `type`에서도 동일하게 사용 가능하다. 이 둘의 가장 핵심적인 차이는, **`type`은 새 프로퍼티를 추가하기 위해 재선언할 수 없지만 `interface`는 항상 확장 가능하다는 점이다.**

## **1) Interface**

> Extending an interface
> 

```tsx
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

> Adding new fields to an existing interface
> 

```jsx
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

## **2) Type**

> Extending a type via intersections
> 

```tsx
type Animal = {
  name: string;
}

type Bear = Animal & { 
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

> A type cannot be changed after being created
> 

```tsx
type Window = {
  title: string;
}

type Window = {
  ts: TypeScriptAPI;
}

 // Error: Duplicate identifier 'Window'.
```

`Interface`는 `Object type`(extend named types and classes)만을 확장 가능하다. 

💡 Interfaces may only be used to [declare the shapes of objects, not rename primitives](https://www.typescriptlang.org/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).

인터페이스는 [오직 객체의 모양을 선언하는 데에만 사용되며, 기존의 원시 타입에 별칭을 부여하는 데에는 사용할 수는 없습니다](https://www.typescriptlang.org/play?#code/PTAEAkFMCdIcgM6gC4HcD2pIA8CGBbABwBtIl0AzUAKBFAFcEBLAOwHMUBPQs0XFgCahWyGBVwBjMrTDJMAshOhMARpD4tQ6FQCtIE5DWoixk9QEEWAeV37kARlABvaqDegAbrmL1IALlAEZGV2agBfampkbgtrWwMAJlAAXmdXdy8ff0Dg1jZwyLoAVWZ2Lh5QVHUJflAlSFxROsY5fFAWAmk6CnRoLGwmILzQQmV8JmQmDzI-SOiKgGV+CaYAL0gBBdyy1KCQ-Pn1AFFplgA5enw1PtSWS+vCsAAVAAtB4QQWOEMKBuYVUiVCYvYQsUTQcRSBDGMGmKSgAAa-VEgiQe2GLgKQA).

> `Object type` 을 확장한 경우 
> 

```jsx
type Window2 = {
  ts: number
};
interface Animal {
  name: string
};
interface X extends Animal {

}
interface X extends Window2 {

}
```

> An interface cannot extend a primitive type like 'number’;
> an interface can only extend named types and classes ❌
> 

```tsx
interface X extends number {

}
```

대부분의 경우 개인적 선호에 따라 인터페이스와 타입 중에서 선택할 수 있으며, 필요하다면 TypeScript가 다른 선택을 제안할 것이다. 잘 모르겠다면, 우선 `interface`를 사용하고 이후 문제가 발생하였을 때 `type`을 사용하면 된다.

### Reference

[Documentation - Everyday Types](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)