import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { Layer, effectRadius, judgmentPivot, minSFXDistance } from '../../constants.js'
import { effect } from '../../effect.js'
import { particle } from '../../particle.js'
import { note } from '../../shared.js'
import { skin } from '../../skin.js'
import { getScheduledSFXTime, getZ, spawnHoldTicks, trackMoves } from '../../util.js'
import { windows } from '../../windows.js'
import { archetypes } from '../index.js'
import { Note, NoteType } from './Note.js'

export class HoldEndNote extends Note {
    bucket = buckets.holdEnd
    sprite = skin.sprites.holdEndNote
    type = NoteType.HOLD_END
    windows = windows.holdEnd

    effect = {
        perfect: particle.effects.perfectHold,
        great: particle.effects.greatHold,
        good: particle.effects.goodHold,
        fallback: particle.effects.fallbackHold,
    }

    holdData = this.defineData({
        endBeat: { name: 'endBeat', type: Number },
        headRef: { name: 'headRef', type: Number },
    })

    tailTimes = this.entityMemory({
        target: Number,
        visual: {
            min: Number,
            max: Number,
            hidden: Number,
        },
    })

    layers = this.entityMemory({
        tail: Number,
        connector: Number,
    })

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)
    despawnSequential = this.entityMemory(Boolean)
    isTouched = this.entityMemory(Boolean)

    scheduledLoopSFX = this.entityMemory(Boolean)

    preprocess(): void {
        super.preprocess()

        this.tailTimes.target = bpmChanges.at(this.holdData.endBeat).time
        this.times.scheduledSfx = getScheduledSFXTime(this.tailTimes.target)
        this.times.spawn = Math.min(this.times.visual.min, this.times.scheduledSfx)

        this.layers.connector = getZ(Layer.HOLD_NOTE_CONNECTOR, this.times.target)
        this.layers.tail = getZ(Layer.NOTE, this.tailTimes.target)
    }

    initialize(): void {
        super.initialize()

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect
            this.result.bucket.index = this.bucket.index
        } else this.result.accuracy = this.windows.good.min

        this.times.input.min = this.tailTimes.target + this.windows.good.min + input.offset
        this.times.input.max = this.tailTimes.target + this.windows.good.max + input.offset

        this.tailTimes.visual.max = this.tailTimes.target
        this.tailTimes.visual.min = this.tailTimes.target - note.speed

        if (options.hidden > 0) this.tailTimes.visual.hidden = this.tailTimes.visual.max - note.speed * options.hidden

        if (trackMoves(this.data.trackRef, this.times.target, this.tailTimes.target))
            spawnHoldTicks(this.data.trackRef, this.times.target, this.tailTimes.target)
    }

    updateSequential(): void {
        if (options.autoplay && time.now >= this.tailTimes.target) this.despawn = true

        if (this.despawnSequential) {
            if (this.result.judgment === Judgment.Miss) this.afterImage()
            this.despawn = true
        }

        this.isTouched = false
    }

    updateParallel(): void {
        this.moveEffect()
        this.act()

        if (this.shouldScheduleSFX) this.scheduledEffect()
        if (!this.despawnSequential) this.draw()
    }

    get headInfo() {
        return entityInfos.get(this.holdData.headRef)
    }

    get headSharedData() {
        return archetypes.HoldStartNote.holdShared.get(this.holdData.headRef)
    }

    get particleInstanceId() {
        return this.headSharedData.particleId
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && effect.clips.hold.exists && !options.autoplay && !options.autoSFX
    }

    get shouldScheduleLoopSFX() {
        return (options.autoSFX || options.autoplay) && effect.clips.hold.exists
    }

    act(): void {
        if (this.despawnSequential || options.autoplay || this.headInfo.state !== EntityState.Despawned) return

        // Note is being held (and still has time left)
        if (this.isTouched && time.now < this.times.input.max && this.headSharedData.judged) {
            if (this.shouldPlaySFX && !this.sfxInstanceId) this.loopSoundEffect()
            this.moveEffect()

            return
        }

        // Note ended or was let go
        if (this.sfxInstanceId) effect.clips.stopLoop(this.sfxInstanceId)
        if (this.particleInstanceId) particle.effects.destroy(this.particleInstanceId)
        this.despawnSequential = true

        if (time.now < this.times.input.min || !this.headSharedData.judged) return

        const hitTime = Math.min(time.now - input.offset, this.tailTimes.target)

        this.result.judgment = input.judge(hitTime, this.tailTimes.target, this.windows)
        this.result.accuracy = hitTime - this.tailTimes.target

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.soundEffect(this.result.judgment)
    }

    particleEffect(_: Judgment): void {}

    loopSoundEffect(): void {
        if (!this.shouldPlaySFX) return
        this.sfxInstanceId = effect.clips.hold.loop()
    }

    moveEffect(): void {
        if (!this.particleInstanceId) return

        const x = this.pos
        const y = judgmentPivot
        const radius = effectRadius * options.noteEffectSize

        const layout = new Rect({
            l: x - radius,
            r: x + radius,
            t: y + radius,
            b: y - radius,
        })

        particle.effects.move(this.particleInstanceId, layout)
    }

    terminate(): void {
        if (this.particleInstanceId) particle.effects.destroy(this.particleInstanceId)
    }

    draw(): void {
        if (time.now < this.times.visual.min) return

        const now = options.hidden <= 0 ? time.now : Math.min(time.now, this.times.visual.hidden)
        const t = Math.unlerp(this.times.visual.min, this.times.visual.max, now)
        this.y = Math.max(judgmentPivot, Math.lerp(screen.t, judgmentPivot, t))

        const endT = Math.unlerp(this.tailTimes.visual.min, this.tailTimes.visual.max, time.now)
        const endY = Math.max(judgmentPivot, Math.lerp(screen.t, judgmentPivot, endT))

        // Draw connector
        const connectorLayout = new Rect({
            l: this.pos - note.radius,
            r: this.pos + note.radius,
            t: endY,
            b: this.y,
        })

        if (options.hidden <= 0 || time.now < this.tailTimes.visual.hidden)
            skin.sprites.holdConnector.draw(connectorLayout, this.layers.connector, 1)

        // Draw head
        const layout = new Rect({
            l: this.pos - note.radius,
            r: this.pos + note.radius,
            t: this.y + note.radius,
            b: this.y - note.radius,
        })

        if (options.hidden <= 0 || time.now < this.times.visual.hidden) skin.sprites.holdStartNote.draw(layout, this.z, 1)

        // Draw tail
        const tailLayout = new Rect({
            l: this.pos - note.radius,
            r: this.pos + note.radius,
            t: endY + note.radius,
            b: endY - note.radius,
        })

        if (options.hidden <= 0 || time.now < this.tailTimes.visual.hidden) skin.sprites.holdEndNote.draw(tailLayout, this.layers.tail, 1)
    }

    afterImage(): void {
        archetypes.HoldAfterImage.spawn({
            trackRef: this.data.trackRef,
            start: Math.max(this.times.target, time.now), // Note CAN be missed before it begins (by starting it early and releasing it), so we account for that
            end: this.tailTimes.target,
            data: 0,
        })
    }

    touch(): void {
        if (options.autoplay) return

        this.isTouched = false
        for (const touch of touches) {
            if (this.trackSharedMemory.hitbox.l <= touch.x && touch.x <= this.trackSharedMemory.hitbox.r) {
                this.isTouched = true
                break
            }
        }
    }

    scheduledEffect(): void {
        if (this.sfxScheduled) return

        const id = effect.clips.hold.scheduleLoop(this.times.target)
        effect.clips.scheduleStopLoop(id, this.tailTimes.target)

        this.sfxScheduled = true
        effect.clips.perfect.schedule(this.times.target, minSFXDistance)
        effect.clips.perfect.schedule(this.tailTimes.target, minSFXDistance)
    }
}
