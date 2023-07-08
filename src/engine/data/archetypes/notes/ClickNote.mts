import { options } from '../../../configuration/options.mjs'
import { buckets } from '../../buckets.mjs'
import { noteMissDuration } from '../../constants.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { windows } from '../../windows.mjs'
import { archetypes } from '../index.mjs'
import { Note, NoteType } from './Note.mjs'

export class ClickNote extends Note {
    bucket = buckets.click
    sprite = skin.sprites.clickNote
    type = NoteType.CLICK
    windows = windows.click

    effect = {
        perfect: particle.effects.perfect,
        great: particle.effects.great,
        good: particle.effects.good,
        fallback: particle.effects.fallbackClick,
    }

    touch(): void {
        if (options.autoplay || time.now < this.times.input.min) return

        for (const touch of touches) {
            if (touch.started && this.isInTrack(touch.x) && !this.isUsed(touch)) {
                this.judge(touch)
                break
            }
        }
    }

    afterImage(): void {
        archetypes.ClickAfterImage.spawn({
            trackRef: this.data.trackRef,
            start: time.now,
            end: time.now + noteMissDuration,
            data: 0,
        })
    }
}
