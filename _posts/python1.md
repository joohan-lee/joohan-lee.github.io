---
layout: post
title:  "[Kaggle] Python course"
date:   2021-08-16 14:25:52 -0500
author: Joohan Lee
categories: Project
tags: Python Kaggle
---

# 파이썬 (Python)

Date: August 4, 2021 → August 13, 2021
Instructor: ColinMorris ( https://www.kaggle.com/colinmorris )
Overview: 5hrs. / 8 Lessons
Tags: TO-DO

# 1. Hello, Python

[Hello, Python](https://www.kaggle.com/colinmorris/hello-python)

# 2. Functions and Getting Help ★★★

[Functions and Getting Help](https://www.kaggle.com/colinmorris/functions-and-getting-help)

**(1) help 함수**

⇒ The help() function is possibly the most important Python function you can learn. If you can remember how to use help(), you hold the key to understanding most other functions.

⇒ `help()` displays two things:

1. the header of that function `round(number, ndigits=None)`. In this case, this tells us that `round()` takes an argument we can describe as `number`. Additionally, we can optionally give a separate argument which could be described as `ndigits`.
2. A brief English description of what the function does.

**(2) Docstrings**

⇒ 함수 헤더 뒤에 적는 함수에 대한 설명과 예시. 사용자 정의 함수에 적을 경우 help로 호출시 docstring이 출력됨. 이는 사용자 정의 함수의 "**__doc__**" 속성에 docstring 내용이 들어가기 때문으로 보임.

```python
def least_difference(a, b, c):
    """Return the smallest difference between any two numbers
    among a, b and c.
    
    >>> least_difference(1, 5, -5)
    4
    """
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    return min(diff1, diff2, diff3)
```

> The docstring is a triple-quoted string (which may span multiple lines) that comes immediately after the header of a function. When we call help() on a function, it shows the docstring.

> Aside: The last two lines of the docstring are an example function call and result. (The >>> is a reference to the command prompt used in Python interactive shells.) Python doesn't run the example call - it's just there for the benefit of the reader. The convention of including 1 or more example calls in a function's docstring is far from universally observed, but it can be very effective at helping someone understand your function. For a real-world example, see this docstring for the numpy function np.eye.

Good programmers use docstrings unless they expect to throw away the code soon after it's used (which is rare). So, you should start writing docstrings, too!

⇒ Docstrings (문서화) 참고

[위키독스](https://wikidocs.net/16050)

**(3) Functions Applied to Functions**

⇒ 아래와 같이 파이썬은 함수를 인수로 줄수도 있고 리턴값으로 반환할 수도 있다.

> Functions that operate on other functions are called "higher-order functions." You probably won't write your own for a little while. But there are higher-order functions built into Python that you might find useful to call.

Here's an interesting example using the max function.
By default, max returns the largest of its arguments. But if we pass in a function using the optional key argument, it returns the argument x that maximizes key(x) (aka the 'argmax').

```python
def mult_by_five(x):
    return 5 * x

def call(fn, arg):
    """Call fn on arg"""
    return fn(arg)

def squared_call(fn, arg):
    """Call fn on the result of calling fn on arg"""
    return fn(fn(arg))

print(
    call(mult_by_five, 1),
    squared_call(mult_by_five, 1), 
    sep='\n', # '\n' is the newline character - it starts a new line
)

##########################################################################
def mod_5(x):
    """Return the remainder of x after dividing by 5"""
    return x % 5

print(
    'Which number is biggest?',
    max(100, 51, 14),
    'Which number is the biggest modulo 5?',
    max(100, 51, 14, key=mod_5),
    sep='\n',
)
```

# 3. Booleans and Conditions

[Booleans and Conditionals](https://www.kaggle.com/colinmorris/booleans-and-conditionals)

**(1) Booleans**

파이썬은 Boolean 타입을 지원한다. 

True / False

**(2) Combining Booleans Values**

Boolean operator : "not", "and" , "or"

위 불리언 연산자의 우선순위는 not > and > or 순이다.

단, 혼란을 야기하므로 parentheses를 사용하자.

**(3) Conditionals**

conditional keywords : "if", "elif", "else"

switch/case문은 파이썬에는 없다.

**(4) Boolean conversion**

**bool() 함수**를 이용해 boolean타입으로 conversion 가능하다.

```python
>>> print(bool(1)) # all numbers are treated as true, except 0
True
>>> print(bool(0))
False
>>> print(bool("asf")) # all strings are treated as true, except the empty string ""
True
>>> print(bool(""))
False

# Generally empty sequences (strings, lists, and other types we've yet to see like lists and tuples)
# are "falsey" and the rest are "truthy"
```

int() 함수를 이용해 boolean을 conversion 할 경우 True는 1을 반환, False는 0을 반환한다.

또, True + False와 같이 boolean끼리 덧셈하면 파이썬이 자동으로 int 변환하여 계산한다.

ex) True + False = 1, False+ False = 0

- **if/else 한줄에 표기하기**

```python
#아래와 같이 한줄에 if/else를 표현할 수 있다.
>>> b = 0 if a==0 else 1 #a==0이면 b=0, 아니면 b=1
>>> print("splitting", b, "candy" if b == 1 else "candies")
		# b==1이면 "splitiing # candy", 아니면 "splitting # candies"

#else안에 조건을 중첩도 가능하지만 가독성 많이 저하됨.
> a=2
> print(0 if a==0 else (
>  	    1 if a==2 else 3
> ))
```

# 4. Lists

[Lists](https://www.kaggle.com/colinmorris/lists)

```python
planets[:3]
['Mercury', 'Venus', 'Earth']
If I leave out the end index, it's assumed to be the length of the list.

planets[3:]
['Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
i.e. the expression above means "give me all the planets from index 3 onward".

We can also use negative indices when slicing:
# All the planets except the first and last
planets[1:-1]
['Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus']
# The last 3 planets
planets[-3:]
['Saturn', 'Uranus', 'Neptune']
```

**(1) List functions**

list를 이용하는 functions

len(list) / sorted (list) - 오름차순 / sum(list) / max(list)

- **막간상식 : Objects**

    파이썬의 모든 것은 객체이고, 객체는 attributes와 method로 나뉜다.

    또, attributes와 method에 접근 방법은 .(dot)을 이용하고 x.imag, x.bit_length() 와 같은 syntax를 갖는다.

**(2) List methods**

1)  list.append() / list.pop()

2) searching lists 

list.index('Pluto') ⇒ Pluto가 list에 없으면 에러발생

⇒  "Pluto" **in** lists 처럼 **in 사용시 True/False 반환**

**(3) Tuples**

파이썬의 Tuple은 list와 아래 두가지를 제외하고는 거의 동일하다.

1) 튜플은 대괄호(square brackets)가 아닌 괄호(parentheses)로 묶어 생성한다.

(괄호 안 묶고 선언해도 동일. ex) t = 1,2,3 은 t = (1,2,3) 과 동치)

2) 튜플은 수정이 불가능하다.(they are *immutable*).

- 튜플이용하는 function 예시

    ```python
    #Tuples are often used for functions that have multiple return values.
    #For example, the as_integer_ratio() method of float objects returns a numerator and a denominator in the form of a tuple:

    >>>x = 0.125
    >>>x.as_integer_ratio()
    (1, 8)

    #These multiple return values can be individually assigned as follows:

    >>>numerator, denominator = x.as_integer_ratio()
    >>>print(numerator / denominator)
    0.125

    #Finally we have some insight into the classic Stupid Python Trick™ for swapping two variables!
    >>>a = 1
    >>>b = 0
    >>>a, b = b, a
    >>>print(a, b)
    0 1
    ```

**(4) Exercises**

- Exercise 4번

    **[1,2,3][1:] 은 앞 배열의 1인덱스부터 끝까지의 1차원 배열을 의미한다.**

    ```python
    >>> d = [1,2,3][1:]
    >>> print(d)
    [2,3]
    d: The expression is the same as the list [2, 3], which has length 2.
    ```

# 5. Loops and List Comprehensions

[Loops and List Comprehensions](https://www.kaggle.com/colinmorris/loops-and-list-comprehensions)

**(1)Loops**

- keyword 'in' 이용
- range() is a function that returns a sequence of numbers. It turns out to be very useful for writing loops.
- for문 / while문 있음

**(2) List comprehensions**

List comprehensions are one of Python's most beloved and unique features. The easiest way to understand them is probably to just look at a few examples:

```python
#List comprehension 사용
squares = [n**2 for n in range(10)]
squares

#List comprehension 사용 안한 경우
squares = []
for n in range(10):
    squares.append(n**2)
squares
```

> Out : [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

We can also add an if condition:

(If you're familiar with SQL, you might think of this as being like a "WHERE" clause)

```python
short_planets = [planet for planet in planets if len(planet) < 6]
short_planets
```

> Out : ['Venus', 'Earth', 'Mars']

```python
# str.upper() returns an all-caps version of a string
loud_short_planets = [planet.upper() + '!' for planet in planets if len(planet) < 6]
loud_short_planets

#People usually write these on a single line, but you might find the structure clearer when it's split up over 3 lines:
[
    planet.upper() + '!' 
    for planet in planets 
    if len(planet) < 6
]
#(Continuing the SQL analogy, you could think of these three lines as SELECT, FROM, and WHERE)
```

> ['VENUS!', 'EARTH!', 'MARS!']

List comprehensions combined with functions like min, max, and sum can lead to impressive one-line solutions for problems that would otherwise require several lines of code.

```python
def count_negatives(nums):
    # Reminder: in the "booleans and conditionals" exercises, we learned about a quirk of 
    # Python where it calculates something like True + True + False + True to be equal to 3.
    return sum([num < 0 for num in nums])
```

list comprehension과 sum함수를 이용하여 위처럼 간결하게 작성할 수 있다.

**(4)Exercises**

- 3번문제

Complete the body of the function below according to its docstring.

```python
def menu_is_boring(meals):
    """Given a list of meals served over some period of time, return True if the
    same meal has ever been served two days in a row, and False otherwise.
    """
    
    for i in range(len(meals)-1):
        if meals[i] == meals[i+1]:
            return True
        
    return False
    print(meals)
    print(res)
        

# Check your answer
q3.check()
```

Correct:

```
def menu_is_boring(meals):
    # Iterate over all indices of the list, except the last one
    for i in range(len(meals)-1):
        if meals[i] == meals[i+1]:
            return True
    return False
```

The key to our solution is the call to `range`. `range(len(meals))` would give us all the indices of `meals`. If we had used that range, the last iteration of the loop would be comparing the last element to the element after it, which is... `IndexError`! `range(len(meals)-1)` gives us all the indices except the index of the last element.

But don't we need to check if `meals` is empty? Turns out that `range(0) == range(-1)` - they're both empty. So if `meals` has length 0 or 1, we just won't do any iterations of our for loop.

# 6. Strings and Dictionaries

[Strings and Dictionaries](https://www.kaggle.com/colinmorris/strings-and-dictionaries)

파이썬은 string 조작에 강하다.

Data Science에 많이 사용되는 string 조작 패턴을 알아보자.

(1) Strings in Python can be defined using either single or double quotations. They are functionally equivalent.

단, 문자열 내에 single quotation이 존재한다면 double quotation으로 묶는게 좋고, 역도 동일하다.

아니라면 'Pluto\'s a planet!' 과 같이 backslash로 escape 문자를 이용해야한다.

또, triple quote 사용 시 문자 그대로를 이용한다.

```python
triplequoted_hello = """hello
world"""
hello = 'hello\nworld'
#위 두개는 동일하다.
triplequoted_hello == hello #True
```

(2) string은 sequences of characters로, list에 사용하는 거의 모든 것을 할 수 있다.

- Indexing(planet[0])
- Slicing(planet[-3:])
- len(planet)
- list comprehesnsion ([char + '! ' for char in planet])
- 단, ***list와 차이점은 string은 immutable***하다.

    ```python
    planet[0] = 'B'
    # planet.append doesn't work either

    TypeError: 'str' object does not support item assignment
    ```

(3) string methods

- str.upper(), str.lower(), str.index(), str.startswith(), str.endswith()
- **str.split() ⇒** 기본적으로 공백을 기준으로 split
- **str.join()**
- **str.format()**

    ```python
    "{}, you'll always be the {}th planet to me.".format(planet, position)

    #Out : "Pluto, you'll always be the 9th planet to me."

    ########################################################
    pluto_mass = 1.303 * 10**22
    earth_mass = 5.9722 * 10**24
    population = 52910390
    #         2 decimal points   3 decimal points, format as percent     separate with commas
    "{} weighs about {:.2} kilograms ({:.3%} of Earth's mass). It is home to {:,} Plutonians.".format(
        planet, pluto_mass, pluto_mass / earth_mass, population,
    )
    #Out : "Pluto weighs about 1.3e+22 kilograms (0.218% of Earth's mass). It is home to 52,910,390 Plutonians."

    ########################################################

    # Referring to format() arguments by index, starting from 0
    s = """Pluto's a {0}.
    No, it's a {1}.
    {0}!
    {1}!""".format('planet', 'dwarf planet')
    print(s)

    #Out : 
    Pluto's a planet.
    No, it's a dwarf planet.
    planet!
    dwarf planet!
    ```

    We call .format() on a "format string", where the Python values we want to insert are represented with {} placeholders. Notice how we didn't even have to call str() to convert position from an int. format() takes care of that for us.

(4)Dictionaries

Dictionaries are a built-in Python data structure for mapping keys to values.

1) Dictionaries comprehensions

```python
planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
planet_to_initial = {planet: planet[0] for planet in planets}
planet_to_initial
#Out : 
{'Mercury': 'M',
 'Venus': 'V',
 'Earth': 'E',
 'Mars': 'M',
 'Jupiter': 'J',
 'Saturn': 'S',
 'Uranus': 'U',
 'Neptune': 'N'}
```

The **in operator** tells us whether something is a key in the dictionary

```python
'Saturn' in planet_to_initial # True
```

We can access a collection of all the keys or all the values with **dict.keys()** and **dict.values()**, respectively.

```python
for k in numbers:
    print("{} = {}".format(k, numbers[k]))
#Out:
one = Pluto
two = 2
three = 3
eleven = 11
```

The very useful **dict.items()** method lets us iterate over the keys and values of a dictionary simultaneously. (In Python jargon, an item refers to a key, value pair)

```python
for planet, initial in planet_to_initial.items():
    print("{} begins with \"{}\"".format(planet.rjust(10), initial))
#Out:
Mercury begins with "M"
     Venus begins with "V"
     Earth begins with "E"
      Mars begins with "M"
   Jupiter begins with "J"
    Saturn begins with "S"
    Uranus begins with "U"
   Neptune begins with "N"
```

help(dict)

**(5) Exercises**

- **2번문제(문서에서 내가 원하는 키워드가 있는 문장만 찾기)**

    > A researcher has gathered thousands of news articles. But she wants to focus her attention on articles including a specific word. Complete the function below to help her filter her list of articles.
    Your function should meet the following criteria:
    Do not include documents where the keyword string shows up only as a part of a larger word. For example, if she were looking for the keyword “closed”, you would not include the string “enclosed.”
    She does not want you to distinguish upper case from lower case letters. So the phrase “Closed the case.” would be included when the keyword is “closed”
    Do not let periods or commas affect what is matched. “It is closed.” would be included when the keyword is “closed”. But you can assume there are no other types of punctuation.

    위 문제에 대해 내가 한 답은 아래와 같다. 아래의 경우 테스트케이스에 대해서는 맞지만,

    정확한 답은 아니다. period와 comma가 keyword 왼쪽 및 중간에 있어도 다 지워지는 문제가 있다.

    ```python
    def word_search(doc_list, keyword):
        """
        Takes a list of documents (each document is a string) and a keyword. 
        Returns list of the index values into the original list for all documents 
        containing the keyword.

        Example:
        doc_list = ["The Learn Python Challenge Casino.", "They bought a car", "Casinoville"]
        >>> word_search(doc_list, 'casino')
        >>> [0]
        """
        res = []
        i = 0
        for doc in doc_list:
            clean_doc = doc.lower()
            clean_doc = clean_doc.replace(".","").replace(",","")
            clean_doc = clean_doc.split()
            
            if keyword in clean_doc:
                res.append(i)
            i += 1
        return res
    # Check your answer
    q2.check()
    ```

    이 문제에 대한 솔루션은 아래와 같다. **문제 요구사항에 정확하게 rstrip() 함수를 이용**한 것과 **comprehension을 이용**한 점, **enumerate함수를 이용**한 점이 나와 다르다.

    ```python

    Solution:
    def word_search(documents, keyword):
        # list to hold the indices of matching documents
        indices = [] 
        # Iterate through the indices (i) and elements (doc) of documents
        for i, doc in enumerate(documents):
            # Split the string doc into a list of words (according to whitespace)
            tokens = doc.split()
            # Make a transformed list where we 'normalize' each word to facilitate matching.
            # Periods and commas are removed from the end of each word, and it's set to all lowercase.
            normalized = [token.rstrip('.,').lower() for token in tokens]
            # Is there a match? If so, update the list of matching indices.
            if keyword.lower() in normalized:
                indices.append(i)
        return indices
    ```

# 7. Working with External Libraries

[](https://www.kaggle.com/colinmorris/working-with-external-libraries)

**(1) Imports**

데이터 사이언스를 위해 파이썬을 사용할 때 가장 큰 장점 중 하나가 다양하고 수많은 양질의 custom libraries를 사용할 수 있다는 것이다. "standard library"는 파이썬을 수행할때 언제든 사용할 수 있고, standard library가 아니어도 언제든 추가해서 사용할 수 있다. 어느 방식이든 "**imports"**를 통해 라이브러리에 접근한다.

예를들어 **math** 라이브러리를 살펴보자.

```python
import math

print("It's math! It has type {}".format(type(math)))

#Out : It's math! It has type <class 'module'>
```

math is a module. A module is just a collection of variables (a namespace, if you like) defined by someone else. We can see all the names in math using the built-in function dir().

```python
print(dir(math))
```

> ['__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atan2', 'atanh', 'ceil', 'copysign', 'cos', 'cosh', 'degrees', 'e', 'erf', 'erfc', 'exp', 'expm1', 'fabs', 'factorial', 'floor', 'fmod', 'frexp', 'fsum', 'gamma', 'gcd', 'hypot', 'inf', 'isclose', 'isfinite', 'isinf', 'isnan', 'ldexp', 'lgamma', 'log', 'log10', 'log1p', 'log2', 'modf', 'nan', 'pi', 'pow', 'radians', 'remainder', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'tau', 'trunc']

위의 변수들은 dot syntax 를 이용하여 접근하고 pi는 value, log는 함수이다.

ex) math.pi, math.log(32,2)

**(2) Other import syntax**

1) alias

The "as" renames the imported module.

```python
import math as mt
#위는 아래와 같다.
import math
mt = math
```

2) 바로 refer하기 (from module import *)

```python
from math import *
print(pi, log(32, 2)) #math.pi, math.log가 아니라 바로 refer함
```

import * makes all the module's variables directly accessible to you (without any dotted prefix).

```python
from math import *
from numpy import *
print(pi, log(32, 2))
```

단, 위와 같이 2개이상의 module에서 import 할 경우 log 함수는 두 모듈에 모두 있지만 각자 다른 semantics를 가지고 있다. 따라서, 아래와 같이 각 모듈에서 특정 사용할 것들만 import하는 것이 좋다.

```python
from math import log, pi
from numpy import asarray
```

**(3) Submodules**

We've seen that modules contain variables which can refer to functions or values. Something to be aware of is that they can also have variables referring to other modules.

```python
import numpy
print("numpy.random is a", type(numpy.random))
print("it contains names such as...",
      dir(numpy.random)[-15:]
     )

# Roll 10 dice
rolls = numpy.random.randint(low=1, high=6, size=10)
rolls
#Out: array([4, 4, 3, 1, 5, 1, 5, 2, 1, 2])
```

**(4)Three tools for understanding strange objects**

**1) type()** (what is this thing?)

**2) dir()** (what can I do with it?)

**3) help()** (tell me more)

**(5) Operator overloading**

1) numpy에서는 파이썬 operators와 달리 동작하는 operators(+, <, in, == 등)가 있다.

```python
xlist = [[1,2,3],[2,4,6],]
# Create a 2-dimensional array
x = numpy.asarray(xlist)
print("xlist = {}\nx =\n{}".format(xlist, x))

# Get the last element of the second row of our numpy array
x[1,-1]

# Get the last element of the second sublist of our nested list?
xlist[1,-1] #=> error
xlist[1][-1] # correct
```

2) When does 1+1 not equal 2?

```python
import tensorflow as tf
# Create two constants, each with value 1
a = tf.constant(1)
b = tf.constant(1)
# Add them together to get...
a + b

#Out:
<tf.Tensor: shape=(), dtype=int32, numpy=2>
```

3) double-underscores 

When Python programmers want to define how operators behave on their types, they do so by implementing methods with special names beginning and ending with 2 underscores such as `__lt__`, `__setattr__`, or `__contains__`. Generally, names that follow this double-underscore format have a special meaning to Python.

So, for example, the expression `x in [1, 2, 3]` is actually calling the list method `__contains__` behind-the-scenes. It's equivalent to (the much uglier) `[1, 2, 3].__contains__(x)`.

If you're curious to learn more, you can check out [Python's official documentation](https://docs.python.org/3.4/reference/datamodel.html#special-method-names), which describes many, many more of these special "underscores" methods.

**(6) Exercises**

- 3번문제 - blackjack_hand_greater_than

---

## 여기까지 Kaggle Python 코스였고, 다음 추천 코스는 아래와 같다.

You can also check out some of our other **[Kaggle Courses](https://www.kaggle.com/learn/overview)**. Some good next steps are:

1. [Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning)
2. [Pandas for data manipulation](https://www.kaggle.com/learn/pandas)
3. [Data Visualization](https://www.kaggle.com/learn/data-visualization)

![%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8A%E1%85%A5%E1%86%AB%20(Python)%2039a47a879ae047b081d9ac245d9ab9b0/joohan224_-_Python.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8A%E1%85%A5%E1%86%AB%20(Python)%2039a47a879ae047b081d9ac245d9ab9b0/joohan224_-_Python.png)

Kaggle Python Certificate

# Titanic Tutorial(첫 competition)

## Part 1: Get started

1. Join the competition

    Competition Overview 탭에서 **"Join Competition" 버튼**을 누른다.

    "Submit Predictions" 버튼으로 바뀌었다면 완료!

2. The data
    1. Data 탭에서 확인할 수 있다.
    2. train.csv

        "**Survived**" 컬럼을 포함하여 총 12개 컬럼이 있다.

        - if it's a "1", the passenger survived.
        - if it's a "0", the passenger died.
    3. test.csv

        train.csv에 있던 컬럼들 중 Survived 를 제외한 11개 컬림이 있고,

        Survived를 예측하여 competition score를 얻는다.

    4. gender_submission.csv

        예측을 보여주는 예시 파일로 test.csv에 있는 "**PassengerId**" 컬럼과 "**Survived**" 컬럼은 필수로 있어야한다. 이때 Survived 컬럼은 내가 예측을 통해 만들어야 할 컬럼이다.

## Part 2: Your coding environment

1. The Notebook
    1. Code 탭에서 "**New Notebook**" 을 눌러 코드를 작성하고 실행할 Kaggle Notebook을 생성할 수 있다. (Deep learning이 필요하다면 무료로 GPU도 제공한다.)
    2.
