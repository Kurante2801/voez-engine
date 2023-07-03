import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { noteMissDuration } from '../../constants.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { windows } from '../../windows.js'
import { archetypes } from '../index.js'
import { Note, NoteType } from './Note.js'

export class SlideNote extends Note {
    bucket = buckets.slide
    sprite = skin.sprites.slideNote
    type = NoteType.SLIDE
    windows = windows.slide

    effect = {
        perfect: particle.effects.perfect,
        great: particle.effects.great,
        good: particle.effects.good,
        fallback: particle.effects.fallbackSlide,
    }

    globalPreprocess(): void {
        super.globalPreprocess()
        this.life.miss = -10
    }

    judge(_: Touch): void {
        this.despawn = true

        // This note is always perfect when hit
        this.result.judgment = Judgment.Perfect
        this.result.accuracy = 0

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = 0

        this.particleEffect(Judgment.Perfect)
        this.soundEffect(Judgment.Perfect)
    }

    touch(): void {
        if (options.autoplay || time.now < this.times.input.min) return

        for (const touch of touches) {
            if (this.isInTrack(touch.x)) {
                this.judge(touch)
                break
            }
        }
    }

    afterImage(): void {
        archetypes.SlideAfterImage.spawn({
            trackRef: this.data.trackRef,
            start: time.now,
            end: time.now + noteMissDuration,
            data: 0,
        })
    }
}
