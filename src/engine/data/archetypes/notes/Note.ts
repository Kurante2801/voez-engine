import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.js'
import { Layer, effectRadius, judgmentPivot, minSFXDistance, trackActiveTime } from '../../constants.js'
import { effect } from '../../effect.js'
import { note } from '../../shared.js'
import { getScheduledSFXTime, getZ, scaledX } from '../../util.js'
import { archetypes } from '../index.js'

export enum NoteType {
    CLICK,
    SWIPE,
    SLIDE,
    HOLD_START,
    HOLD_END,
}

export abstract class Note extends Archetype {
    hasInput = true

    abstract bucket: Bucket
    abstract sprite: SkinSprite
    abstract type: NoteType
    abstract windows: JudgmentWindows

    abstract effect: {
        perfect: ParticleEffect
        great: ParticleEffect
        good: ParticleEffect
        fallback: ParticleEffect
    }

    data = this.defineData({
        trackRef: { name: 'trackRef', type: Number },
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        extraData: { name: 'extraData', type: Number },
    })

    times = this.entityMemory({
        spawn: Number,
        target: Number,
        scheduledSfx: Number,
        input: {
            min: Number,
            max: Number,
        },
        visual: {
            min: Number,
            max: Number,
            hidden: Number,
        },
    })

    sfxScheduled = this.entityMemory(Boolean)
    y = this.entityMemory(Number)
    z = this.entityMemory(Number)

    globalPreprocess() {
        const toMs = ({ min, max }: JudgmentWindow) => ({
            min: Math.round(min * 1000),
            max: Math.round(max * 1000),
        })

        this.bucket.set({
            perfect: toMs(this.windows.perfect),
            great: toMs(this.windows.great),
            good: toMs(this.windows.good),
        })

        this.life.miss = -40

        note.radius = scaledX(40) * options.noteSize
        note.tickRadius = scaledX(60) * options.noteSize
    }

    preprocess(): void {
        this.times.target = bpmChanges.at(this.data.beat).time
        this.times.scheduledSfx = getScheduledSFXTime(this.times.target)

        this.times.visual.max = this.times.target
        this.times.visual.min = this.times.target - note.speed

        this.times.spawn = Math.min(this.times.visual.min, this.times.scheduledSfx)
        this.z = getZ(Layer.NOTE, this.times.target)
    }

    initialize(): void {
        this.times.input.min = this.times.target + this.windows.good.min + input.offset
        this.times.input.max = this.times.target + this.windows.good.max + input.offset

        if (options.hidden > 0) this.times.visual.hidden = this.times.visual.max - note.speed * options.hidden

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect
            this.result.bucket.index = this.bucket.index
        } else this.result.accuracy = this.windows.good.max

        this.sfxScheduled = false
    }

    shouldSpawn() {
        return time.now >= this.times.spawn
    }

    spawnOrder(): number {
        return 1000 + this.times.spawn
    }

    get trackSharedMemory() {
        return archetypes.Track.shared.get(this.data.trackRef)
    }

    get pos() {
        return this.trackSharedMemory.pos
    }

    updateSequential(): void {
        if (options.autoplay && time.now >= this.times.target) {
            this.despawn = true
            this.activateTracks()
            this.particleEffect(Judgment.Perfect)
        }

        this.act()
    }

    updateParallel(): void {
        if (this.shouldScheduleSFX) this.scheduledEffect()
        if (time.now < this.times.visual.min) return

        if (this.despawn) return
        if (options.hidden <= 0 || time.now <= this.times.visual.hidden) this.draw()
    }

    act(): void {
        if (options.autoplay && time.now >= this.times.target) return
        if (time.now > this.times.input.max) this.judgeMiss()
    }

    judgeMiss(): void {
        this.result.judgment = Judgment.Miss
        this.despawn = true
        this.afterImage()
    }

    judge(touch: Touch): void {
        this.markAsUsed(touch)

        this.despawn = true

        this.result.judgment = input.judge(touch.startTime, this.times.target, this.windows)
        this.result.accuracy = touch.startTime - this.times.target

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.particleEffect(this.result.judgment)
        this.soundEffect(this.result.judgment)
    }

    draw(): void {
        if (time.now < this.times.visual.min) return

        const t = Math.unlerp(this.times.visual.min, this.times.visual.max, time.now)
        this.y = Math.max(judgmentPivot, Math.lerp(screen.t, judgmentPivot, t))

        const layout = new Rect({
            l: this.pos - note.radius,
            r: this.pos + note.radius,
            t: this.y + note.radius,
            b: this.y - note.radius,
        })

        this.sprite.draw(layout, this.z, 1)
    }

    particleEffect(judgment: Judgment): void {
        if (!options.noteEffectEnabled) return

        const x = this.pos
        const y = judgmentPivot
        const radius = effectRadius * options.noteEffectSize

        const layout = new Rect({
            l: x - radius,
            r: x + radius,
            t: y + radius,
            b: y - radius,
        })

        if (judgment === Judgment.Perfect) {
            if (this.effect.perfect.exists) this.effect.perfect.spawn(layout, 0.5, false)
            else this.effect.fallback.spawn(layout, 0.5, false)
        }

        if (judgment === Judgment.Great) {
            if (this.effect.great.exists) this.effect.great.spawn(layout, 0.5, false)
            else this.effect.fallback.spawn(layout, 0.5, false)
        }

        if (judgment === Judgment.Good) {
            if (this.effect.good.exists) this.effect.good.spawn(layout, 0.5, false)
            else this.effect.fallback.spawn(layout, 0.5, false)
        }
    }

    soundEffect(judgement: Judgment): void {
        if (!this.shouldPlaySFX) return

        if (judgement === Judgment.Perfect) effect.clips.perfect.play(minSFXDistance)
        if (judgement === Judgment.Great) effect.clips.great.play(minSFXDistance)
        if (judgement === Judgment.Good) effect.clips.good.play(minSFXDistance)
    }

    scheduledEffect(): void {
        if (this.sfxScheduled) return

        this.sfxScheduled = true
        effect.clips.perfect.schedule(this.times.target, minSFXDistance)
    }

    // For now it activates only the note's track
    activateTracks(): void {
        this.trackSharedMemory.active.start = time.now
        this.trackSharedMemory.active.end = time.now + trackActiveTime
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    get hitboxL() {
        return this.trackSharedMemory.hitbox.l
    }

    get hitboxR() {
        return this.trackSharedMemory.hitbox.r
    }

    isInTrack(x: number) {
        return this.hitboxL <= x && x <= this.hitboxR
    }

    markAsUsed(touch: Touch): void {
        this.trackSharedMemory.touches.add(touch.id)
    }

    isUsed(touch: Touch): boolean {
        return this.trackSharedMemory.touches.has(touch.id)
    }

    afterImage(): void {}
}
