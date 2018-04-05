# Assert

## API 소개

Assert module 은 불변값 테스트에 사용할 수 있는 가장 간단한 assertion(주. 번역상 표명, 확인 등의 뜻으로 번역 가능하나, IT용어상 대체할만한 한글 표현이 없는것으로 보임. [#참조_클리앙 토론](https://www.clien.net/service/board/kin/3025362)) 테스트 셋을 제공합니다.

node.js 9.x 버전에서 기존 api 는 `legacy mode` 로 변경되고, `strict mode`가 추가되는 것으로 보입니다.
해당 내용에 대해서는 Latest LTS 버전이 변경될 때 수정하도록 하겠습니다.

테스트의 편의를 위하여 print.js 를 사용한 예제를 작성하였습니다.

## features

### assert(value[, message])

- assert.ok()의 alias 입니다.

### assert.deepEqual(actual, expected[, message])

- `actual`과 `expected` 파라미터의 deep equality를 테스트합니다. 값들은 [추상비교](https://tc39.github.io/ecma262/#sec-abstract-equality-comparison)(==)로 비교됩니다.
- [enumerable 한 소유 속성](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) 만 고려됩니다. `assert.deepEqual()`은 object 의 `[[Prototype]]`, attached symbols, non-enumerable property들은 테스트하지 않습니다. - 위 사항들을 테스트하기 위해서는 `assert.deepStrictEqual()`을 사용하여야 합니다.
- `deepEqual.js` 참고
