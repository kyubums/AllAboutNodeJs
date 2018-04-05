// assertion test 를 진행하고 pass, fail 의 결과를 보여줍니다.
module.exports = (describe, assertion) => {
  try {
    assertion();
    console.log(`${describe} \u001b[32mpass\u001b[0m\n`);
  } catch (error) {
    console.log(`${describe} \u001b[31m`, error.message, '\u001b[0m\n');
  }
}
