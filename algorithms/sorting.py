def bubble_sort(arr):
    steps = []
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            steps.append({"type": "array", "data": arr[:]})  # Save current state
    return steps

def quick_sort(arr):
    steps = []

    def quick_sort_recursive(arr, low, high):
        if low < high:
            pi = partition(arr, low, high)
            steps.append({"type": "array", "data": arr[:]})  # Save state after partitioning
            quick_sort_recursive(arr, low, pi - 1)
            quick_sort_recursive(arr, pi + 1, high)

    def partition(arr, low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                steps.append({"type": "array", "data": arr[:]})  # Save state after swap
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        steps.append({"type": "array", "data": arr[:]})  # Save state after final pivot swap
        return i + 1

    quick_sort_recursive(arr, 0, len(arr) - 1)
    return steps
