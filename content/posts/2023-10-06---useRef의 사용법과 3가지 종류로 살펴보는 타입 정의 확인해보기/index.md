---
title: useRef의 사용법과 3가지 종류로 살펴보는 타입 정의 확인해보기
date: "2023-10-06T23:35:32.169Z"
template: "post"
draft: false
slug: "/posts/typescript/how-to-use-useRef-and-its-three-types-of-type-definitions"
category: "Typescript"
tags:
  - "Typescript"  
description: "useRef의 사용법과 3가지 종류로 살펴보는 타입 정의에 대해서 배웁니다"
---
### useRef

`useRef`는 인자로 넘어온 초깃값을 `useRef` 객체의 `.current` 프로퍼티에 저장한다.

`useRef`의 사용법은 크게 2가지인데,

1. 특정 DOM 객체를 직접 조작해야하는 경우
    - e.f. ) `focus()` 메소드를 사용하는 경우
2. 값이 바뀌어도 화면이 리렌더링 되지 않게 사용하는 경우
    - 공유되는 외부 변수와 달리 각 컴포넌트의 복사본에 대한 지역 변수로 값의 변화에 따른 리렌더링을 트리거하지 않음
    - js에서는 함수도 값처럼 취급하므로 변수가 될 수 있음을 기억하자_`일급 객체`

[Type definitions for React](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d3a21b5b49cd03353ad056dcc834a690d0f06f73/types/react/index.d.ts#L1081C2-L1081C2)을 살펴보면 `useRef` 에는 3가지 종류가 있음을 알 수 있는데, 제네릭 타입에 따라 다른 것을 사용하도록 `overload`된 것을 알 수 있다.

### ::값이 바뀌어도 화면이 리렌더링 되지 않게 사용하는 경우

```tsx
function useRef<T>(initialValue: T): MutableRefObject<T>;
// convenience overload for refs given as a ref prop as they typically start with a null value
/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * Usage note: if you need the result of useRef to be directly mutable, include `| null` in the type
 * of the generic argument.
 *
 * @version 16.8.0
 * @see https://react.dev/reference/react/useRef
 */
```

```tsx
interface MutableRefObject<T> {
      current: T;
}
```

<T> 제네릭으로 넘겨준 타입(값)을 current 프로퍼티에 그대로 넘겨준다.

> 예시 코드
> 

```tsx
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef<number>(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

💡 렌더링 중에는 `ref.current` 쓰거나 읽으면 안된다

React는 컴포넌트의 본문(body of your component)이 순수함수 처럼 동작할 것을 기대하기 떄문이다
순수함수: 동일한 입력값(인자)을 주면 항상 동일한 결과값을 반환하는 함수

- 입력(props, state 및 context)이 동일하다면 동일한 JSX를 리턴해야 한다.
- 다른 순서나 다른 인수로 호출해도 다른 호출의 결과에 영향을 주어서는 안된다.

**렌더링 중에 참조(ref)를 읽거나 쓰면 이러한 기대가 깨지게 된다.**

```tsx
function MyComponent() {
  // ...

  // 🚩 Don't write a ref during rendering

  myRef.current = 123;

  // ...

  // 🚩 Don't read a ref during rendering

  return <h1>{myOtherRef.current}</h1>;
}
```

**대신 이벤트 헨들러나 useEffect()에서 참조를 읽거나 쓸 수 있다.**

```tsx
function MyComponent() {
  // ...

  useEffect(() => {

    // ✅ You can read or write refs in effects

    myRef.current = 123;

  });

  // ...

  function handleClick() {

    // ✅ You can read or write refs in event handlers

    doSomething(myOtherRef.current);

  }

  // ...
}
```
**렌더린 중에 무엇인거를 읽거나 써야한다면 ref대신 state를 사용할 것**


다시 예시 코드로 돌아가본다면

`useRef`를 지역변수로 사용하는 경우이다. 버튼을 클릭할 경우 `ref.current`의 값이 1씩 증가한다.

위에서 사용되는 `useRef` 는 제네릭 타입과 매개변수가 일치하는 `useRef` 이며 예시 코드에서 선언된 `ref`는 `MutableRefObject<number>` 타입이므로, `.current` 를 직접 수정가능 할 수 있다.

### ::특정 DOM 객체를 직접 조작해야하는 경우

```tsx
function useRef<T>(initialValue: T | null): RefObject<T>;
// convenience overload for potentially undefined initialValue / call with 0 arguments
// has a default to stop it from defaulting to {} instead
/**
 * `useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * Note that `useRef()` is useful for more than the `ref` attribute. It’s handy for keeping any mutable
 * value around similar to how you’d use instance fields in classes.
 *
 * @version 16.8.0
 * @see https://react.dev/reference/react/useRef
 */
```

초깃값을 `null`로 지정해주면 `RefObject`를 반환하는데

```tsx
interface RefObject<T> {
      readonly current: T | null;
}
```

`readonly` 때문에 직접 `current`의 값은 수정이 안되지만 `current`의 하위 프로퍼티는 수정이 가능하다는 점을 알아두자.

> 예시 코드
> 

```tsx
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

`input DOM element`를 `ref`로 받아서, 버튼을 클릭하면 입력에 초점이 맞춰지는 예제다.

### 마지막 세번째, useRef(`undefined`) useRef()

```tsx
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
/**
 * The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations.
 * Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside
 * `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.
 *
 * Prefer the standard `useEffect` when possible to avoid blocking visual updates.
 *
 * If you’re migrating code from a class component, `useLayoutEffect` fires in the same phase as
 * `componentDidMount` and `componentDidUpdate`.
 *
 * @version 16.8.0
 * @see https://react.dev/reference/react/useLayoutEffect
 */
```

매개변수(제네릭)에 `undefined`를 넣는 경우 MutableRefObject를 리턴한다.

### 요약

```tsx
const ref = useRef<number>(0);
const ref = useRef<HTMLInputElement>(null);
```

- ref에 지역 변수를 담는 경우 - 리렌더링 ❌
    
    ```tsx
    interface MutableRefObject<T> {
        current: T;
    }
    ```
    
- DOM을 직접 다루는 경우 초깃값은 `null`로 설정
    
    ```tsx
    interface RefObject<T> {
        readonly current: T | null;
    }
    ```
    

### Reference

https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts

https://react.dev/reference/react/useRef