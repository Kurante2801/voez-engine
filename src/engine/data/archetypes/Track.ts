import { options } from '../../configuration/options.js'
import { Layer, judgmentPivot, trackDespawnDuration, trackSpawnDuration, trackWidth } from '../constants.js'
import { animationCurves, track, voezSkin } from '../shared.js'
import { skin } from '../skin.js'
import { evaluateCurve, scaledX, voezSpaceToSonolusSpace } from '../util.js'

export class Track extends Archetype {
    data = this.defineData({
        startBeat: { name: 'startBeat', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        animateSpawn: { name: 'animateSpawn', type: Boolean },
        moveRef: { name: 'moveRef', type: Number }, // References the first move transition this track has
        // Initial values, they are overritten by TrackCommands
        pos: { name: 'pos', type: Number }, // Range from [0-1]
        size: { name: 'size', type: Number }, // Multiplier
    })

    shared = this.defineSharedMemory({
        pos: Number,
        size: Number,
    })

    times = this.entityMemory({
        start: Number,
        startAnim: Number,
        end: Number,
        endAnim: Number,
    })

    animating = this.entityMemory(Boolean)
    despawnSequential = this.entityMemory(Boolean)

    globalPreprocess(): void {
        track.width = Math.lerp(0, screen.r, trackWidth)
        track.pad = scaledX(7) // The tracks have a padding of 7px at a screen size of 1280px
        track.line = scaledX(2)
        track.glow = scaledX(12)
        track.slot = scaledX(12)
        track.active = scaledX(96)
    }

    preprocess(): void {
        this.shared.size = this.data.size
        this.times.start = bpmChanges.at(this.data.startBeat).time

        this.shared.pos = voezSpaceToSonolusSpace(this.data.pos)
        if (options.mirror) this.shared.pos *= -1
    }

    initialize(): void {
        this.times.end = bpmChanges.at(this.data.endBeat).time

        if (this.data.animateSpawn) {
            this.times.startAnim = this.times.start + trackSpawnDuration
            // Ensure end isn't lower than start + trackSpawnDuration
            this.times.end = this.times.start + Math.max(this.times.end - this.times.start, trackSpawnDuration)
        }

        this.times.endAnim = this.times.end + trackDespawnDuration
    }

    spawnOrder(): number {
        return 1000 + this.times.start
    }

    shouldSpawn(): boolean {
        return time.now >= this.times.start
    }

    shouldDespawn(): boolean {
        if (time.now > this.times.endAnim) this.despawnSequential = true
        return this.despawnSequential
    }

    updateSequential(): void {
        if (this.despawnSequential) {
            this.despawn = true
            return
        }
    }

    updateParallel(): void {
        if (this.shouldDespawn()) return

        // Draw track itself
        let scaleX = 1
        let scaleY = 1
        let scaleSlot = 1

        this.animating = false

        // Spawn animation
        if (this.data.animateSpawn && time.now <= this.times.startAnim) {
            const t = Math.unlerp(this.times.start, this.times.startAnim, time.now)
            scaleX = evaluateCurve(animationCurves.spawnWidthTuple, t, 100)
            scaleY = evaluateCurve(animationCurves.spawnHeightTuple, t, 100)
            scaleSlot = t
            this.animating = true
        }

        // Despawn animation
        if (time.now >= this.times.end) {
            const t = Math.unlerp(this.times.end, this.times.endAnim, time.now)
            scaleX = evaluateCurve(animationCurves.despawnWidthTuple, t, 100)
            scaleY = evaluateCurve(animationCurves.despawnHeightTuple, t, 100)
            scaleSlot = 1 - t
            this.animating = true
        }

        const x = this.shared.pos
        const w = Math.abs((this.shared.size * track.width - track.pad) * scaleX)

        const topLayout = new Rect({
            l: x - w,
            r: x + w,
            t: Math.lerp(judgmentPivot, 1, scaleY),
            b: judgmentPivot,
        })

        const bottomLayout = new Rect({
            l: topLayout.l,
            r: topLayout.r,
            t: judgmentPivot,
            b: Math.lerp(judgmentPivot, judgmentPivot - 1, scaleY),
        })

        skin.sprites.trackTop.draw(topLayout, Layer.TRACK_BACKGROUND, 1)
        if (voezSkin.trackForeground) skin.sprites.trackForeground.draw(topLayout, Layer.TRACK_FOREGROUND, 1)
        if (voezSkin.trackBottom) skin.sprites.trackBottom.draw(bottomLayout, Layer.TRACK_BACKGROUND, 1)
    }
}
