---
layout: post
title:  "[Coding Interview] 1.2 Check Permutation"
date:   2021-09-06 02:25:52 -0500
author: Joohan Lee
categories: Algorithm
tags: Language Python
---
# 1.2 Check Permutation

Created: September 5, 2021 11:42 PM
Tags: ascii, sort, string

# 1.2 Check Permutation : Given two strings, write a method to decide if one is a permutation of the other.

- Answer) First off, we should clarify following two questions.

    One is if it is case sensitive, and the other is if whitespace matters. Let's assume that it's case sensitive and whitespace matters.

    Thus, "God" is different from "dog" and "god    " is different from "dog".

    Here are two ways to implement.

    1. Sort the strings

        ```python
        #s : "dog", t : "goa"
        # s : [d, g, o] / t: [a, g, o]
        def checkP(s : str, t : str) -> bool:
            if len(s) != len(t):
                return False
            return sorted(s) == sorted(t)
        ```

        In this case, time complexity would be O(NlogN) since we have to sort the strings.

    2. Check if the two strings have identical character counts.

        In this case, we should clarify if string is ASCII.

        ```python
        def checkP2(s : str, t : str) -> bool:
            if len(s) != len(t):
                return False
            li_s = [0 for i in range(128)]
            for ch in s:
                li_s[ord(ch)] += 1
            for ch in t:
                c = ord(ch)
                li_s[c] -= 1
                if li_s[c] < 0:
                    return False
            return True
        ```

        Time complexity would be O(N) since we iterate the number of the string characters.

        The code below is using dictionary, so it does not matter whether it is ASCII code or not.

        ```python
        # s : "dog", t : "god"
        # dic_s : [d : 0,  o : 0, g : 0]
        def checkP2(s : str, t : str) -> bool:
            if len(s) != len(t):
                return False
            dic_s = {}
            for ch in s:
                if ch not in dic_s:
                    dic_s[ch] = 1
                else:
                    dic_s[ch] += 1
            for ch in t:
                if ch in dic_s:
                    dic_s[ch] -= 1
                else:
                    return False
                if dic_s[ch] < 0:
                    return False
            return True
        ```

- 답변) 먼저 아래 두가지 detail을 clarify하자

    1. is it case sensitive? Yes 2. whitespace matters? Yes

    위 조건에 따라 예를들어, "God" ≠ "dog" 이고, "god    " ≠ "dog" 이다. 각각 대문자와 공백으로 인해 두 문자열은 permutations가 아니다.

    그렇다면 permutations인지 확인하려면 어떻게 할까.

    1. 아래와 같이 **정렬**하여 비교하는 방법이 있을 것이다. 정렬하면 알파벳 순이되고, 두 문자열이 permutations라면 정렬 시 두 문자열이 동일해진다.
    2. 문자열에 존재하는 각 문자를 카운트하는 방법이 있을 수 있다. 예를들어, a가 몇개 b가 몇개인지를 카운트하고 두 문자열간 카운트를 비교한다. 단, 이때 문자열이 아스키코드인지 유니코드인지 clarify하여 배열 크기를 결정해야한다.(아스키코드일 경우 128, 유니코드일 경우에 배열 크기가 너무 커진다. 유니코드의 문자 수는 2의 16승으로 65,536개이다.)

# 참고* ) ASCII, UNICODE, UTF-8 비교

관련하여 좋은 설명이 있다.

[강의노트 06. ASCII, UNICODE, utf8](https://wayhome25.github.io/cs/2017/04/05/cs-06/)
