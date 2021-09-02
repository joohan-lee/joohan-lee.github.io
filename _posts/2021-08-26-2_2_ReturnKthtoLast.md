# 2.2 Return Kth to Last

Created: August 26, 2021 8:54 PM
Tags: iterative, linkedlist, recursive
interviewee: 이주한
interviewer: 신*수

# 2.2 Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.

- Answer)

    Solution #1 : If linked list size is known.

    ⇒ We can just iterate through the linked list to find this element. Because this solution is so tirivial, we can almost be sure that this is not what the interviewer intended.

    Solution #2 : Recursive

    ⇒ 

    Solution #3 : Iterative

    ⇒ I can use two pointers, p1 and p2. I place them k nodes apart in the linked list by putting p2 at the beginning and moving p1 k nodes into the list. Then, when I move them at the same pace, p1 will hit the end of the linked list after LENGTH - k steps. At that point, p2 will be LENGTH - k nodes into the list, or k nodes from the end.

    The time complexity of this algorithm is O(n) and the space is O(1).

    (This algorithm takes O(n) time and O(1) space. 라고도 표현가능)

- 답변)

    Solution #3 : Iterative

    ⇒ p1, p2 두개의 포인터를 준비한다. 그리고 p2를 링크드 리스트의 첫 번째에 위치시키고 p1은 k번째에 위치시킨다. 이후 두개를 동시에 같은 속도로 움직이면 p1이 리스트 끝에 도달하는 순간이 있을 것이다. 이떄, p2의 위치가 리스트 끝 노드로부터 k번째 node이다.

    아래 kthToLast 함수의 시간 복잡도는 링크드 리스트를 한번 순회하므로 O(n)이고, 공간 복잡도는 O(1)이다.

    ```python
    #Single Linked List
    class Node(object):
        def __init__(self, data, next = None):
            self.data = data
            self.next = next
    class SList(object):
        def __init__(self):
            self.head = Node(None)
            self.size = 0

        def listSize(self):
            return self.size

        def is_empty(self):
            if self.size != 0:
                return False
            else:
                return True

        def appendleft(value):
            if self.is_empty():
                self.head = Node(value)
            else:
                self.head = Node(value, self.head)
            self.size += 1

        def append(self, value):
            if self.is_empty():
                self.head = Node(value)
                self.size += 1
            else:
                target = self.head
                while target.next != None:
                    target = target.next
                newtail = Node(value)
                target.next = newtail
                self.size += 1

        def kthToLast(head:Node, k:int) -> Node:
            p1 = head
            p2 = head

            #Move p1 k nodes into the list.
            for i in range(k):
                if p1 == None:
                    return None # Out of bounds
                p1 = p1.next

            #Move them at the same pace. When p1 hits the end, p2 will be at the right element.
            while p1 != None:
                p1 = p1.next
                p2 = p2.next
            return p2

    L1 = SList()
    L1.append(1)
    L1.append(2)
    L1.append(3)
    L1.append(4)
    L1.append(5)
    L1.append(6)

    t = L1.head
    i = 0
    while t != None:
        print("i : " + str(i))
        print(t.data)
        t = t.next
        i += 1

    ans = SList.kthToLast(L1.head, 3)
    print("kthToLast : " + str(ans.data))
    ```

# 참고사항

## *재귀함수의 공간 복잡도와 시간복잡도

재귀 함수 같은 경우 매 함수 호출마다 `매개변수`, `지역변수`, `함수의 복귀 주소`를 저장할 공간이 필요하기 때문에 반복적(iterative)으로 작성하는 것보다 공간 효율성이 떨어진다. 기본적으로, n번 재귀 호출된다고 가정할 때 O(n) space가 필요하다.

[참고]

[[자료구조 4강] 공간 복잡도와 시간 복잡도](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=nsj6646&logNo=221504742002)