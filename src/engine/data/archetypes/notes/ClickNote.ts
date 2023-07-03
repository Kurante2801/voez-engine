import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { noteMissDuration } from '../../constants.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { windows } from '../../windows.js'
import { archetypes } from '../index.js'
import { Note, NoteType } from './Note.js'

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
