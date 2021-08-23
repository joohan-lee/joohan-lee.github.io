---
layout: post
title:  "[Python] List Operators, List Methods"
date:   2021-08-20 02:25:52 -0500
author: Joohan Lee
categories: Language
tags: Language Python
---

# [Python] List Operators, List Methods

# 1. 리스트 합치기

## 1) '+' Operator overloading

⇒ '+' 연산자를 이용하여 리스트 연결(합병) 가능.

```python
>>> list1 = [1,2,1]
>>> list2 = [3,4,3]
>>> list = list1 + list2
>>> list
[1,2,1,3,4,3]
```

## 2) '*' Operator overloading

⇒ * 연산자를 이용하여 리스트 반복 가능.

`>>> nums = [1,2,1]
>>> nums = nums * 2
>>> nums
[1,2,1,1,2,1]`

## 3) extend() method

⇒ extend method를 이용하여 list 객체에 list를 더할 수 있다.

`>>> list1 = [1,2,1]
>>> list1
[1,2,1]
>>> list1.extend(list1)
>>> list1
[1,2,1,1,2,1]`

⇒ 단, 이때 list1.extend(list1)와 같이 이용할 경우 list 객체에 바로 extend되고 반환 값은 list1.extend(list1)한 결과가 아니므로 아래와 같이 사용하지 않도록 주의한다.

`>>> list1 = [1,2,1]
>>> list2 = list1.extend(list1)
>>> list2
None`

## 4) map()을 이용하여 병합하기

```python
>>> list1 = [[1,2], [5,6]]
>>> list2 = [[3,4], [7,8]]
>>> merge_list = list(map(list.__add__, list1, list2))
>>> merge_list
[[1,2,3,4], [5,6,7,8]]
```

## 4-1) flatten으로 내부 리스트를 하나의 리스트로 만들기

```python
>>> list1 = [[1,2], [5,6]]
>>> list2 = [[3,4], [7,8]]
>>> merge_list = list(map(list.__add__, list1, list2))
>>> merge_list
[[1,2,3,4], [5,6,7,8]]
>>> flatten_list = list(itertools.chain(*merge_list))
>>> flatten_list
[1,2,3,4,5,6,7,8]
```

## 5) zip() 이용하여 병합하기

⇒ 동일한 위치의 list를 하나의 tuple로 묶어서 merge 함

```python
>>> list1 = [[1,2], [5,6]]
>>> list2 = [[3,4], [7,8]]
>>> list3 = list(zip(list1,list2))
>>> list3
[([1, 2], [3, 4]), ([5, 6], [7, 8])]
```

# 2. 리스트의 길이

## 1) len() method

⇒ 리스트의 길이를 구하여 반환

`>>> list1 = [1,2,1]
>>> len(list1)
3`

# 3. 리스트 요소 추가하기

## 1) append() method

⇒ 리스트의 맨 끝에 새로운 항목을 추가.

`>>> nums = [1,2,1]
>>> nums.append(1)
>>> nums
[1,2,1,1]
>>> letters = ['h','i']
>>> nums.append(letters)
>>> nums
[1,2,1,1,['h','i']]`

# 4. 요소 삽입하기

## 1) insert() method

⇒ 특정위치에 새로운 요소를 추가.

첫번째 인자 : 인덱스(위치) (0부터 시작)

두번째 인자 : 값(요소)

```python
>>> nums = [1,2]
>>> nums.insert(2,3)
>>> nums
[1, 2, 3]
```

# 5. 요소 찾기

## 1) 'in' Operator

⇒ 리스트에 특정 요소가 있는지 찾을 수 있음

```python
>>> fruits = ["사과", "바나나", "포도"]
>>> "바나나" in fruits
True
```

## 2) index() method

⇒ 리스트 안에서 특정 요소의 위치를 찾아야할 경우.

```python
>>> fruits = ["사과", "바나나", "포도"]
>>> if "바나나" in fruits:
			fruits.index("바나나")
1
```

## 3) count() method

⇒ 리스트의 특정 원소 개수 구하기

```python
>>> nums [1,2,2,3,3,3,4]
>>> nums.count(2)
2
>>> nums.count(3)
3
```

# 6. 요소 삭제하기

## 1) pop() method

⇒ 리스트 특정 위치의 항목 삭제. 인덱스를 인수로 주고 **인덱스 항목을 삭제**한 후 **삭제된 값을 반환**함.

```python
>>> fruits = ["사과", "바나나", "포도"]
>>> fruits.pop(1)
'바나나'
```

## 2) remove() method

⇒ **항목의 값**을 인자로 받아 일치하는 항목을 **삭제**

```python
>>> fruits = ["사과", "바나나", "포도"]
>>> fruits.remove("바나나")
>>> fruits
["사과", "포도"]
```

단, 이때 **반환값은 None**.

# 7. 리스트 일치 검사

## 1) '==', '!=', '>', '<' Operator Overloading

⇒ 상기 비교연산자를 이용하여 2개의 리스트를 비교가능.

⇒ 동일한 자료형의 요소를 가지고 있어야 함.

⇒ 네가지 연산자 모두 첫번째 요소부터 조건에 만족할 경우 순서대로 비교하고 중간에 조건에 만족하지 않는 요소가 있으면 False를 반환하고 더 이상 비교를 수행하지 않는다.

```python
>>> nums1 = [1,2,3]
>>> nums2 = [5,6,7]
>>> nums1 < nums2
True
```

# 8. 리스트의 최소값, 최대값 찾기

## 1) max(), min() method

```python
>>> nums = [1,2,3,4,5]
>>> max(nums)
5
>>> min(nums)
1
```

# 9. 리스트 정렬하기

## 1) 리스트 객체의 sort() method

⇒ 리스트를 제자리(in-place)에서 정렬함. 즉 **원본 리스트가 변경 됨.**

```python
>>> nums = [3,5,4,2]
>>> nums.sort()
>>> nums
[2,3,4,5]
```

⇒ **reverse 매개변수**

역순으로 정렬하고자 할때, True로 넘겨준다.

## 2) sorted() 내장 함수

⇒ **원본은 유지하고 새로이 정렬된 리스트를 반환**

```python
>>> nums = [3,5,4,2]
>>> a = sorted(nums)
>>> a
[2,3,4,5]
>>> nums
[3,5,4,2]
```

⇒ **reverse 매개변수**

역순으로 정렬하고자 할때, True로 넘겨준다.

## 2-1) key 매개변수 활용

⇒ 리스트 정렬 시, **key 매개변수를** 활용하여 요소 정렬 전(정렬을 위한 비교 전) 호출되는 함수를 지정할 수 있다.

```python
>>> sorted("Let's think again.".split(), key = str.lower)
['again.', "Let's", 'think']
```

예를들어, 위와 같이 대소문자를 가리지 않고 비교하려면 key 매개변수로 str.lower()함수를 지정할 수 있다. (단, 이때 매개변수로 지정하는 것이므로 괄호를 붙여 호출형태로 적지 않도록 주의)
