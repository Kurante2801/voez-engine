// https://github.com/NonSpicyBurrito/sonolus-voez-engine/blob/6ab6fa91aedc2de57d806ad6a49527bd7e943d9c/src/engine/data/archetypes/windows.mts
type Seconds = number | [min: number, max: number]

function fromSeconds(perfect: Seconds, great: Seconds, good: Seconds) {
    const toWindow = (seconds: Seconds) =>
        typeof seconds === 'number' ? { min: -seconds, max: seconds } : { min: seconds[0], max: seconds[1] }

    return {
        perfect: toWindow(perfect),
        great: toWindow(great),
        good: toWindow(good),
    }
}

export const windows = {
    click: fromSeconds(0.04, 0.12, 0.15),
    slide: fromSeconds([-0.04, 0.04], [-0.12, 0.12], [-0.12, 0.15]),
    swipe: fromSeconds(0.04, 0.12, 0.15),
    holdStart: fromSeconds(0.04, 0.12, 0.15),
    holdEnd: fromSeconds([-0.35, 0], [-0.35, 0], [-0.35, 0]),
}
