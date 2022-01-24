# Solidity

---

## Type

    Data Type

- boolean, bytes, address, uint

  Reference type

- string, arrays, struct

  Mapping type

---

### boolean (true/false)

- bool public b = false;

### bytes (1 ~ 32)

- bytes public bt = 0x12345;
- bytes public bts = "STRING";

### address

- address public addr = 0x1232421356425674djsf

### int / uint

- int8 : -2^7 ~ 2^7-1
- uint8 : 0 ~ 2^8-1
- 보통 uint256을 사용함 (음수 쓸 일이 거의 없고, 제일 큼)
- uint256 public uit = 31245;

---

## gas

    각 동작마다 가스비 소모 -> 디도스 공격 방지 가능

- 가스비를 최소화할 수 있는 코드를 짜는 것이 베스트

---

## function

### Parameter X, return X

```js
function change() public {
    a = 5
}
```

### Parameter O, return X

    값을 입력받을 수 있게 됨

```js
function change(uint256 _value) public {
    a = _value
}
```

### Parameter O, return O

    return 값 type 정의

```js
function change(uint256 _value) public return(uint256){
    a = _value
    return a
}
```

---

### public

    모든 곳에서 접근 가능

### external

    모든 곳에서 접근 가능하나, external이 정의된 자기자신 컨트랙 내에서 접근 불가

### private

    오직 private이 정의된 자기 컨트랙에서만 가능 (상속받은 자식도 접근 불가능)
    즉, 배포해도 확인 불가능

### internal

    private에서 상속받은 자식은 접근 가능

---

### view

    function 밖의 변수들을 읽을 수 있으나, 변경 불가능
    배포해도 값은 확인되나 변경이 불가능함을 확인 가능

```js
uint256 public a = 1;

function read_a() public view returns(uint256) {
    return a+2;
}
```

### pure

    function 밖의 변수들을 읽지도 못하고, 변경도 불가능
    배포하면 값 확인도 안되고 변경이 불가능함을 확인 가능

```js
uint256 public a = 1;

function read_a() public pure returns(uint256) {
    return a+2;
}
```

### view X, pure X

    function 밖의 변수들을 읽어서 변경해야 함
    리턴 값을 넣어야 확인 가능

```js
uint256 public a = 1;

function read_a() public returns(uint256) {
    return a+2;
}
```

---

### storage

    대부분의 변수, 함수들이 저장되며, 영속적, 가스비 비쌈

### memory

    파라미터, 리턴값, 레퍼런스 타입이 주로 저장, 함수 내에서만 유효, storage보다 쌈

### Colldata

    주로 external function의 파라미터에서 사용

### stack

    stack data 관리에 쓰는 영역, 1024MB 제한

---

## instance

    하나의 컨트랙에서 타 컨트랙에 접근할 때 instance 이용

```js
contract A {
    uint256 public a = 5;

    function change(uint256 _value) public {
        a = _value;
    }
}

contract B {
    A instance = new A();

    function get_A() public view returns(uint256) {
        return instance.a();
    }
    function change_A(uint256 _value) public {
        instance.change(_value);
    }
}
```

### constructor

```js
contract A {
    string public name;
    uint256 public age

    constructor(string memory _name, uint256 _age) {
        name = _name;
        age = _age;
    }

    function change(string memory _name, uint256 _age) public {
        name = _name;
        age = _age;
    }
}

contract B {
    A instance = new A("Kepler", 2022);

    function change(string memory _name, uint256 _age) public {
        instance.change(_name, _age);
    }

    function get() public view returns(string memory, uint256) { // 리턴값이 여러개 일 때 returns
        return (instance.name(), instance.age());
    }
}
```
