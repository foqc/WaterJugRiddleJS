const MAX_LARGE = 5
const MAX_SMALL = 3

const fillJug = (jugs, key = 'large', max = MAX_LARGE) => ({ ...jugs, [key]: max })

const emptyJug = (jugs, key = 'large') => ({ ...jugs, [key]: 0 })

const largeToSmall = ({ large, small }) => {
    const quantityNeededToFillSmall = MAX_SMALL - small

    return {
        large: large > quantityNeededToFillSmall
            ? large - quantityNeededToFillSmall : 0,
        small: large > quantityNeededToFillSmall
            ? small + quantityNeededToFillSmall : small + large
    }
}

const smallToLarge = ({ large, small }) => {
    const quantityNeededToFillLarge = MAX_LARGE - large

    return {
        large: small > quantityNeededToFillLarge
            ? small - quantityNeededToFillLarge : 0,
        small: small > quantityNeededToFillLarge
            ? large + quantityNeededToFillLarge : small + large
    }
}

const isRepeated = (path, { small, large }) =>
    !!path.find(x => x.small === small && x.large === large)

function getShortestPath(start, target) {

    const queue = []
    const path = []

    path.push(start)
    queue.push(path)

    while (queue.length) {
        const lastPath = queue.shift()
        const lastState = lastPath[lastPath.length - 1]

        if (target === lastState.large)
            return lastPath

        const states = new Set([fillJug(lastState), fillJug(lastState, 'small', MAX_SMALL),
        largeToSmall(lastState), smallToLarge(lastState), emptyJug(lastState), emptyJug(lastState, 'small')])

        for (let item of states) {
            if (!isRepeated(lastPath, item)) {
                const newPath = [...lastPath]
                newPath.push(item)
                queue.push(newPath)
            }
        }
    }

    return null
}

path = getShortestPath({ large: 0, small: 0 }, 4)

console.log(JSON.stringify(path, null,'\t'))