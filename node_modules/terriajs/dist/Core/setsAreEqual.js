export function setsAreEqual(left, right) {
    if (Array.isArray(left))
        left = new Set(left);
    if (Array.isArray(right))
        right = new Set(right);
    if (left === right) {
        return true;
    }
    if (left.size !== right.size) {
        return false;
    }
    const union = new Set([...left, ...right]);
    return union.size === left.size && union.size === right.size;
}
//# sourceMappingURL=setsAreEqual.js.map