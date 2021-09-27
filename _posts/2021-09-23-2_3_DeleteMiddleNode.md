# 2.3 Delete Middle Node

Created: September 23, 2021 1:52 AM
Tags: deletion, linkedlist

# 2.3 Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but 
the first and last node, not necessarily the exact middle) of a singly linked list, given only access to 
that node.

**EXAMPLE 
lnput:the node c from the linked list a->b->c->d->e->f 
Result: nothing is returned, but the new linked list looks like a ->b->d->e->f**

- Answer) In this problem, I cannot access to the head of the linked list. I only have access to that node. Thus, I will just copy the data from the next node over to the current node, and then to delete the next node.
- 답변)

    ```python
    def deleteNode(n : LinkedListNode) -> bool:
        if n == None:
    				#노드가 없는 경우 False
            return False
    		if n != None and n.next == None:
    			# 마지막 노드를 삭제하려는 경우 그냥 False 반환
    			return False
        LinkedListNode next = n.next
        n.data = next.data
        n.next = next.next
        return True
    ```

    # 참고* Python에서 메모리 관리(Garbage Collection in Python)

    Python, C#, JS 등 현대 언어에서는 개발자의 생산성 향상을 위해 기본적으로 GC(Garbage Collection)을 제공한다. C, C++과 같은 언어에서 malloc(), free()와 같은 저수준 메모리 관리 함수만을 제공하는 것과는 다르다.(C, C++에서도 libgc라는 라이브러리 이용 시 사용은 가능).

    자세한 사항은 아래를 참고하자.

    [Garbage Collection in Python](https://medium.com/dmsfordsm/garbage-collection-in-python-777916fd3189)