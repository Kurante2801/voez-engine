import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { effectRadius, judgmentPivot } from '../../constants.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { windows } from '../../windows.js'
import { ClickNote } from './ClickNote.js'
import { NoteType } from './Note.js'

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
