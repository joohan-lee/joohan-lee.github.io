# 4.2 Minimal Tree

Created: September 15, 2021 11:18 PM
Tags: BST, Tree
interviewee: 이주한

# 4.2 Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an
algorithm to create a binary search tree with minimal height.

- Answer) BST is a sorted binary tree. So, if I am given a already sorted array, I can set a median of array to a root node of the tree and insert the left subarray elements into the left subtree and do same thing on right subarray.

    Moreover, when I make left subtree using left subarray elements, it is same process.

- 답변) 이진탐색트리(BST, Binary Search Tree)는 정렬된 이진트리이다. 따라서, 이미 정렬된 배열이 주어진다면 해당 배열의 중앙값(median)을 root 노드로 하고 그 노드를 기준으로 좌측 값들은 좌측 subtree, 우측 값들은 우측 subtree로 생성하면 될것이다. 이때 좌측 값들을 좌측 subtree로 만드는 것은 최초에 배열을 BST로 만드는 것과 동일하게 좌측 값들 중 중앙값을 root 노드로 하여 tree를 만든다. 따라서 재귀적으로 BST를 만들어간다면 최소 높이를 갖는 binary search tree가 만들어질 것이다.

    즉, 아래의 순서대로 알고리즘이 진행될 것이고

    1. Insert into the tree the middle element of the array.
    2. Insert (into the left subtree) the left subarray elements.
    3. Insert (into the right subtree) the right subarray elements.
    4. Recurse.

    구현하면 아래와 같다.

    ```python
    [3,4,6,8,9]
             6
            3 8
             4 9
    # 1. Insert into the tree the middle element of the array.
    # 2. Insert (into the left subtree) the left subarray elements.
    # 3. Insert (into the right subtree) the right subarray elements.
    # 4. Recurse.
    def createMinBST(arr, start, end) -> TreeNode:
        if end < start:
            return None

        mid = (start + end) // 2
        n = TreeNode(arr[mid])
        n.left = createMinBST(arr, start, mid - 1)
        n.right = createMinBST(arr, mid+1, end)

        return n

    int mid = left + (right - l) / 2
    #C, CPP 등 다른 언어에서 오버플로우 방지
    ```

    **이 알고리즘의 Time complexity는 N번 재귀적으로 Tree를 탐색해야하므로 O(N*logN)이다. 또, Space complexity는 해당 BST는 항상 minimal height를 가지므로 O(logN)이다.(Tree가 일렬로 만들어진다면 O(N)이 될수도 있다.)**