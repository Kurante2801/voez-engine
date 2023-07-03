import { options } from '../../configuration/options.js'
import { Layer, judgmentPivot, trackActiveTime, trackDespawnDuration, trackSpawnDuration, trackWidth } from '../constants.js'
import { easeFunction } from '../easing.js'
import { animationCurves, track, trackSprites, voezSkin } from '../shared.js'
import { skin } from '../skin.js'
import { evaluateCurve, scaledX, voezSpaceToSonolusSpace } from '../util.js'
import { archetypes } from './index.js'

export class Track extends Archetype {
    data = this.defineData({
        startBeat: { name: 'startBeat', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        animateSpawn: { name: 'animateSpawn', type: Boolean },
        moveRef: { name: 'moveRef', type: Number }, // References the first move transition this track has
        // Initial values, they are overritten by TrackCommands
        pos: { name: 'pos', type: Number }, // Range from [0-1]
        size: { name: 'size', type: Number }, // Multiplier
        color: { name: 'color', type: Number }, // Int from [0-9]
    })

    shared = this.defineSharedMemory({
        pos: Number,
        size: Number,
        colorProgress: Number,
        colorStart: Number,
        colorEnd: Number,
        hitbox: { l: Number, r: Number },
        animating: Boolean,
        active: { start: Number, end: Number },
        touches: Collection(16, TouchId),
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

        this.shared.colorProgress = 0
        this.shared.colorStart = this.data.color
        this.shared.colorEnd = this.data.color
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

        // Update hitbox
        const x = this.shared.pos
        const w = Math.abs(this.shared.size * track.width) // Hitbox doesn't have padding

        this.shared.hitbox.l = x - w
        this.shared.hitbox.r = x + w

        // We can't update shared stuff in UpdateParallel, that's why we do it here
        this.shared.animating = this.animating
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

        // Color elements
        if (voezSkin.trackTop) this.drawColorSprites(trackSprites.top, topLayout, this.getZ(Layer.TRACK_BACKGROUND, this.times.start))
        else skin.sprites.lane.draw(topLayout, this.getZ(Layer.TRACK_BACKGROUND, this.times.start), 1)
        if (voezSkin.trackBottom)
            this.drawColorSprites(trackSprites.bottom, bottomLayout, this.getZ(Layer.TRACK_BACKGROUND, this.times.start))

        if (voezSkin.trackBottom)
            if (voezSkin.trackForeground)
                // Foreground (white gradient)
                skin.sprites.trackForeground.draw(topLayout, Layer.TRACK_FOREGROUND, 1)

        // Center lines
        if (voezSkin.trackLineTop) {
            const layout = new Rect({
                l: x - track.line * 0.5,
                r: x + track.line * 0.5,
                t: topLayout.t,
                b: topLayout.b,
            })

            skin.sprites.trackLineTop.draw(layout, this.animating ? Layer.TRACK_CENTER_ANIMATING : Layer.TRACK_CENTER, 1)
        }

        if (voezSkin.trackLineBottom) {
            const layout = new Rect({
                l: x - track.line * 0.5,
                r: x + track.line * 0.5,
                t: bottomLayout.t,
                b: bottomLayout.b,
            })

            skin.sprites.trackLineBottom.draw(layout, this.animating ? Layer.TRACK_CENTER_ANIMATING : Layer.TRACK_CENTER, 1)
        }

        // Border lines
        if (voezSkin.trackLineTop) {
            const left = new Rect({
                l: x - w,
                r: x - w + track.line,
                t: topLayout.t,
                b: topLayout.b,
            })

            const right = new Rect({
                l: x + w - track.line,
                r: x + w,
                t: topLayout.t,
                b: topLayout.b,
            })

            skin.sprites.trackBorderTop.draw(left, Layer.TRACK_BORDER, 1)
            skin.sprites.trackBorderTop.draw(right, Layer.TRACK_BORDER, 1)
        }

        if (voezSkin.trackLineBottom) {
            const left = new Rect({
                l: x - w,
                r: x - w + track.line,
                t: bottomLayout.t,
                b: bottomLayout.b,
            })

            const right = new Rect({
                l: x + w - track.line,
                r: x + w,
                t: bottomLayout.t,
                b: bottomLayout.b,
            })

            skin.sprites.trackBorderBottom.draw(left, Layer.TRACK_BORDER, 1)
            skin.sprites.trackBorderBottom.draw(right, Layer.TRACK_BORDER, 1)
        }

        // Glows
        if (voezSkin.trackGlow) {
            const left = new Rect({
                l: x - w - track.glow,
                r: x - w,
                t: topLayout.t,
                b: topLayout.b,
            })

            this.drawColorSprites(trackSprites.glow, left, this.getZ(Layer.TRACK_GLOW, this.times.start))

            const right = new Rect({
                r: x + w,
                l: x + w + track.glow,
                t: topLayout.t,
                b: topLayout.b,
            })

            this.drawColorSprites(trackSprites.glow, right, this.getZ(Layer.TRACK_GLOW, this.times.start))
        }

        // Shape (slot)
        const radius = track.slot * scaleSlot
        const slot = new Rect({
            l: x - radius,
            r: x + radius,
            t: judgmentPivot + radius,
            b: judgmentPivot - radius,
        })

        skin.sprites.trackSlot.draw(slot, Layer.TRACK_SLOT, 1)

        // Active animation
        if (this.animating || !options.laneEffectEnabled || time.now >= this.shared.active.end) return

        const alpha = 1 - Math.unlerp(this.shared.active.start, this.shared.active.end, time.now)

        if (voezSkin.trackActiveSides) {
            const left = new Rect({
                l: x - w - track.pad,
                r: x - w,
                t: 1,
                b: judgmentPivot,
            })

            skin.sprites.trackActiveSides.draw(left, Layer.TRACK_ACTIVE, alpha)

            const right = new Rect({
                l: x + w + track.pad,
                r: x + w,
                t: 1,
                b: judgmentPivot,
            })

            skin.sprites.trackActiveSides.draw(right, Layer.TRACK_ACTIVE, alpha)
        }

        if (voezSkin.trackActiveTop) skin.sprites.trackActiveTop.draw(topLayout, Layer.TRACK_ACTIVE, alpha)
    }

    drawColorSprites(sprites: Tuple<SkinSpriteId>, layout: Rect, layer: number): void {
        const t = this.shared.colorProgress
        if (t < 1) skin.sprites.draw(sprites.get(this.shared.colorStart), layout, layer, 1 - t)
        if (t > 0) skin.sprites.draw(sprites.get(this.shared.colorEnd), layout, layer, t)
    }

    getZ = (layer: number, time: number) => layer - time / 1000

    activate(): void {
        this.shared.active.start = time.now
        this.shared.active.end = time.now + trackActiveTime
    }

    touchOrder = 0
    touch(): void {
        if (options.autoplay) return

        this.shared.touches.clear()
        if (this.animating || this.despawnSequential || this.despawn) return

        for (const touch of touches) {
            if (this.shared.hitbox.l <= touch.x && touch.x <= this.shared.hitbox.r) {
                this.activate()
                break
            }
        }
    }

    static getPosAtTime(trackRef: number, time: number): number {
        const data = archetypes.Track.data.get(trackRef)

        let pos = data.pos
        let moveRef = data.moveRef

        while (moveRef !== -1) {
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
}
