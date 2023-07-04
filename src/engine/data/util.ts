import { archetypes } from './archetypes/index.js'
import { trackMarginLeft, trackMarginRight } from './constants.js'
import { easeFunction } from './easing.js'

// Even though we're on Unity, Sonolus doesn't give us access to AnimationCurve, so we use precalculated values instead
export function evaluateCurve(values: Tuple<number>, t: number, multiplier: number): number {
    if (values.length < 2) throw Error('Must have at least 2 values')

    const percent = Math.max(0, Math.min(1, t)) * (values.length - 1)
    const rem = percent % 1

    if (rem == 0) return values.get(percent) / multiplier

    // We're trying to get a value in between two baked values, interpolate between them
    const a = values.get(Math.floor(percent))
    const b = values.get(Math.ceil(percent))

    return (rem * (b - a) + a) / multiplier
}

// Editor has a fixed width of 1280px, so we scale everything according to that
export function scaledX(x: number): number {
    return (x / 1280) * (screen.r * 2)
}

// The editor has a position range from [0-1] where 0 is the left of the screen and 1 is the right of it
// however the editor has a margin of 120 px horizontally (with a window width of 1280px) so we have to account for that
// additionally, Sonolus' screen coordinate goes from -screen.aspectRatio to screen.aspectRatio
export function voezSpaceToSonolusSpace(x: number): number {
    const left = Math.lerp(screen.l, screen.r, trackMarginLeft)
    const right = Math.lerp(screen.l, screen.r, trackMarginRight)
    return Math.lerp(left, right, x)
}

export function getScheduledSFXTime(targetTime: number) {
    return targetTime - 0.5 - Math.max(audio.offset, 0)
}

export function roundArbitrary(x: number, round: number) {
    return Math.round(x / round) * round
}

export function getPosAtTime(trackRef: number, time: number): number {
    const data = archetypes.Track.data.get(trackRef)

    let pos = data.pos
    let moveRef = data.moveRef

    while (moveRef > 0) {
        const shared = archetypes.TrackMoveCommand.shared.get(moveRef)

        if (shared.start <= time) {
            const t = Math.clamp(Math.unlerp(shared.start, shared.end, time), 0, 1)
            const move = archetypes.TrackMoveCommand.data.get(moveRef)
            pos = Math.lerp(move.startValue, move.endValue, easeFunction(move.ease, t))
        }

        moveRef = archetypes.TrackMoveCommand.moveData.get(moveRef).nextRef
    }

    return pos
}

export function spawnHoldTicks(trackRef: number, from: number, to: number) {
    for (let i = roundArbitrary(from, 0.1); i <= to; i += 0.1) {
        const x = getPosAtTime(trackRef, i)
        archetypes.HoldTick.spawn({ time: i, pos: x })
    }
}
