const assert = require('assert');
const print = require('./print');

// 사용법
print('pass 예제', () => {
  assert.deepEqual({ a: 1 }, { a: 1 });
});

print('fail 예제', () => {
  // assert.deepEqual은 테스트에 실패하면 에러를 throw 합니다. print 에서는 catch 하여 console.log로 출력되도록 작성 해 두었습니다.
  // 기본적으로 AssertionError: actual deepEqual expected 를 에러 메시지로 보여줍니다.
  assert.deepEqual({ a: 1 }, { a: 2 });
});

print('fail message사용 예제', () => {
  // message 파라미터를 사용하여 에러 메시지를 변경할 수 있습니다.
  assert.deepEqual({ a: 1 }, { a: 2 }, '실패 시 이 메시지를 출력합니다.');
});

// deepEqual은 enumerable 한 '소유 속성'만 추상비교 하기때문에 의외의 결과가 나오기도 합니다.

print('Paradox', () => {
  const regex = /test/gi;
  const date = new Date();

  const regexProps = Object.getOwnPropertyNames(regex);
  const dateProps = Object.getOwnPropertyNames(date);
  const regexEnumerable = Object.keys(regex);
  const dateEnumerable = Object.keys(date);

  // 간단하게 getOwnPropertyNames을 출력 해 보면 ['lastIndex']와 []로 다름을 알 수있습니다.
  console.log('regexProps:', regexProps, 'dateProps:', dateProps);
  // 이 외에도 regex객체와 date객체는 prototype 으로가지는 함수들까지 많이 다른 객체이지만, enumerable한 속성은 둘 다 []로 나타납니다.
  console.log('regexEnumerable:', regexEnumerable, 'dateEnumerable:', dateEnumerable);
  // 따라서 아래 예제는 pass하게 됩니다.
  assert.deepEqual(regex, date);
});

print('추상비교 예제', () => {
  // 1 !== '1' 이지만, 추상비교 == 를 사용하기 때문에 아래 예제는 pass하게 됩니다.
  assert.deepEqual({ a: 1 }, { a: '1' });
});

const obj1 = {
  a: {
    b: 1
  }
};

print('자신과의 비교', () => {
  // 자신과의 비교는 당연히 pass 합니다.
  assert.deepEqual(obj1, obj1);
});

print('다른 값을 가진 object의 비교', () => {
  const obj2 = {
    a: {
      b: 2
    }
  };
  // obj.a.b의 값이 다르기 때문에 AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } } 가 발생합니다.
  // deepEqual은 이처럼 nested 한 값까지 비교 합니다.
  assert.deepEqual(obj1, obj2);
});

print('따로 생성 된 같은 값을 가진 object의 비교', () => {
  const obj3 = {
    a: {
      b: 1
    }
  };

  // obj1 == obj3 은 false 이지만 모든 property들이 같은 값을 가지기 때문에 pass합니다.
  assert.deepEqual(obj1, obj3);
});

print('prototype의 비교', () => {
  const obj4 = Object.create(obj1);
  // AssertionError: { a: { b: 1 } } deepEqual {}
  // Object.getPrototpeOf(obj4) 는 { a: {b: 1 } }이지만 deepEqual은 prototype을 비교하지는 않기때문에 fail 됩니다.
  assert.deepEqual(obj1, obj4);
});
