import { trackMarginLeft, trackMarginRight } from './constants.js'

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
