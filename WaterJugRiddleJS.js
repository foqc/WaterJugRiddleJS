const MAX_BIG = 5
const MAX_SMALL = 3

const fillJug = (jugs, key = 'big', max = MAX_BIG) => ({ ...jugs, [key]: max })

const emptyJug = (jugs, key = 'big') => ({ ...jugs, [key]: 0 })

const bigToSmall = ({ big, small }) => {
    const quantityNeededToFillSmall = MAX_SMALL - small

    return {
        big: big > quantityNeededToFillSmall ? big - quantityNeededToFillSmall : 0,
        small: big > quantityNeededToFillSmall ? small + quantityNeededToFillSmall : small + big
    }
}

const smallToBig = ({ big, small }) => {
    const quantityNeededToFillBig = MAX_BIG - big

    return {
        big: small > quantityNeededToFillBig ? small - quantityNeededToFillBig : 0,
        small: small > quantityNeededToFillBig ? big + quantityNeededToFillBig : small + big
    }
}

const isRpeated = (path, { small, big }) => !!path.find(x => x.small === small && x.big === big)

function getShortestPath(start, target) {

    const queue = []
    const path = []

    path.push(start)
    queue.push(path)

    while (queue.length) {
        const lastPath = queue.shift()
        const lastState = lastPath[lastPath.length - 1]

        if (target === lastState.big)
            return lastPath

        const states = new Set([fillJug(lastState), fillJug(lastState, 'small', MAX_SMALL),
        bigToSmall(lastState), smallToBig(lastState), emptyJug(lastState), emptyJug(lastState, 'small')])

        for (let item of states) {
            if (!isRpeated(lastPath, item)) {
                const newPath = [...lastPath]
                newPath.push(item)
                queue.push(newPath)
            }
        }
    }

    return null
}

path = getShortestPath({ small: 0, big: 0 }, 4)

console.log(path)