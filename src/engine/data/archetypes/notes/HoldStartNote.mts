import { options } from '../../../configuration/options.mjs'
import { buckets } from '../../buckets.mjs'
import { effectRadius, judgmentPivot } from '../../constants.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { windows } from '../../windows.mjs'
import { ClickNote } from './ClickNote.mjs'
import { NoteType } from './Note.mjs'

export class HoldStartNote extends ClickNote {
    bucket = buckets.holdStart
    sprite = skin.sprites.holdStartNote
    type = NoteType.HOLD_START
    windows = windows.holdStart

    effect = {
        perfect: particle.effects.perfect,
        great: particle.effects.great,
        good: particle.effects.good,
        fallback: particle.effects.fallbackHold,
    }

    holdShared = this.defineSharedMemory({
        particleId: ParticleEffectInstanceId,
        judged: Boolean, // Short hold notes may be marked as complete even if they received no input
    })

    afterImage(): void {}

    particleEffect(judgment: Judgment): void {
        if (!options.noteEffectEnabled) return
        super.particleEffect(judgment)

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
            if (this.effect.perfect.exists) this.holdShared.particleId = particle.effects.perfectHold.spawn(layout, 0.5, true)
            else this.holdShared.particleId = particle.effects.fallbackHold.spawn(layout, 0.5, true)
        }

        if (judgment === Judgment.Great) {
            if (this.effect.great.exists) this.holdShared.particleId = particle.effects.greatHold.spawn(layout, 0.5, true)
            else this.holdShared.particleId = particle.effects.fallbackHold.spawn(layout, 0.5, true)
        }

        if (judgment === Judgment.Good) {
            if (this.effect.good.exists) this.holdShared.particleId = particle.effects.goodHold.spawn(layout, 0.5, true)
            else this.holdShared.particleId = particle.effects.fallbackHold.spawn(layout, 0.5, true)
        }
    }

    draw(): void {}

    judge(touch: Touch): void {
        super.judge(touch)
        this.holdShared.judged = true
    }
}
