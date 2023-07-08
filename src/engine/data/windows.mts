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

const perfect = 0.04
const great = 0.1
const good = 0.15

const slide = 0.1
const holdRelease = 0.2

export const windows = {
    click: fromSeconds(perfect, great, good),
    slide: fromSeconds([-slide, good], [-slide, good], [-slide, good]),
    swipe: fromSeconds(perfect, great, good),
    holdStart: fromSeconds(perfect, great, good),
    holdEnd: fromSeconds([-holdRelease, 0], [-holdRelease, 0], [-holdRelease, 0]),
}
