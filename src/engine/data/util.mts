import { archetypes } from './archetypes/index.mjs'
import { tickDistance, trackMarginLeft, trackMarginRight } from './constants.mjs'
import { easeFunction } from './easing.mjs'

// Track spawn and despawn animations use Unity's AnimationCurve (possibly)
// Since we can't use AnimationCurve here, we just precalculate values in Unity
// See https://gist.github.com/Kurante2801/531915a8a6d6d5d9c7ea390cd00ffc73
export function evaluateCurve(values: Tuple<number>, t: number, multiplier: number): number {
    if (values.length < 2) throw Error('Must have at least 2 values')

    const percent = Math.max(0, Math.min(1, t)) * (values.length - 1)
    const rem = percent % 1

    // We have the exact value precalculated
    if (rem == 0) return values.get(percent) / multiplier

    // We're trying to get a value in between two baked values, interpolate between them
    const a = values.get(Math.floor(percent))
    const b = values.get(Math.ceil(percent))

    return (rem * (b - a) + a) / multiplier
}

// VOEZ Editor has a fixed width of 1280px, so we scale everything according to that
export function scaledX(x: number): number {
    return (x / 1280) * (screen.r * 2)
}

// The editor has a position range from [0-1] where 0 is the left of the screen and 1 is the right of it
// however the editor has a margin of 120 px horizontally (with a window width of 1280px) so we have to account for that
// additionally, Sonolus' screen coordinate system goes from -screen.aspectRatio to screen.aspectRatio
export function voezSpaceToSonolusSpace(x: number): number {
    const left = Math.lerp(screen.l, screen.r, trackMarginLeft)
    const right = Math.lerp(screen.l, screen.r, trackMarginRight)
    return Math.lerp(left, right, x)
}

export function getScheduledSFXTime(targetTime: number) {
    return targetTime - 0.5 - Math.max(audio.offset, 0)
}

export function ceilBy(x: number, step: number) {
    return Math.ceil(x / step) * step
}

// Walks through all TrackMoveCommands and returns the position the track should have
// Due to compile limitations, commands MUST be ordered by their start time
export function getPosAtTime(trackRef: number, time: number): number {
    const data = archetypes.Track.data.get(trackRef)

    let pos = data.pos
    let moveRef = data.moveRef

    // moveRef will be -1 when there are no commands left, and 0 when something goes wrong
    while (moveRef > 0) {
        const shared = archetypes.TrackMoveCommand.shared.get(moveRef)

        // A track may have move from it's starting position and not have any move command in effect (since the command ended)
        // So we need to calculate the position even if we may be over the command's end time
        if (shared.start <= time) {
            const t = Math.min(Math.unlerp(shared.start, shared.end, time), 1)
            const move = archetypes.TrackMoveCommand.data.get(moveRef)
            pos = Math.lerp(move.startValue, move.endValue, easeFunction(move.ease, t))
        }

        moveRef = archetypes.TrackMoveCommand.moveData.get(moveRef).nextRef
    }

    return pos
}

export function trackMoves(trackRef: number, from: number, to: number): boolean {
    const start = getPosAtTime(trackRef, from)

    for (let i = from + tickDistance; i <= to; i += tickDistance) {
        if (start !== getPosAtTime(trackRef, i)) return true
    }

    return false
}

export function spawnHoldTicks(trackRef: number, from: number, to: number): void {
    for (let i = ceilBy(from, tickDistance); i <= to; i += tickDistance) {
        const x = getPosAtTime(trackRef, i)
        archetypes.HoldTick.spawn({ time: i, pos: x })
    }
}

export function getZ(layer: number, time: number): number {
    return layer - time / 10000
}

// Used in after images
export function getInverseZ(layer: number, time: number): number {
    return layer + time / 10000
}
