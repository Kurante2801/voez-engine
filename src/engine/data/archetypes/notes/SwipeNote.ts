import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { judgmentPivot, noteMissDuration } from '../../constants.js'
import { particle } from '../../particle.js'
import { note, voezSkin } from '../../shared.js'
import { skin } from '../../skin.js'
import { scaledX } from '../../util.js'
import { windows } from '../../windows.js'
import { archetypes } from '../index.js'
import { Note, NoteType } from './Note.js'

export class SwipeNote extends Note {
    bucket = buckets.swipe
    sprite = skin.sprites.swipeNote
    type = NoteType.SWIPE
    windows = windows.swipe

    fallbackSprites = {
        note: skin.sprites.swipeNoteFallback,
        marker: skin.sprites.swipeNoteFallbackMarker,
    }

    effect = {
        perfect: particle.effects.perfect,
        great: particle.effects.great,
        good: particle.effects.good,
        fallback: particle.effects.fallbackSwipe,
    }

    globalPreprocess(): void {
        super.globalPreprocess()
        note.swipeThreshold = scaledX(8)
    }

    preprocess(): void {
        super.preprocess()
        if (options.mirror) this.data.extraData *= -1
    }

    get swipeDelta(): number {
        return this.data.extraData
    }

    fallbackLayout = this.entityMemory(Quad)
    activatedTouchId = this.entityMemory(TouchId)

    initialize(): void {
        super.initialize()

        if (voezSkin.swipeNote) return

        // Fallback sprites: https://github.com/NonSpicyBurrito/sonolus-voez-engine/blob/3580c7c6bd8eb4cb53338ef0e8494e769e21bd36/src/engine/data/archetypes/notes/singleNotes/flickNotes/FlickNote.mts#L41
        const w = scaledX(40) * options.noteSize
        const h = w

        if (this.swipeDelta < 0) {
            // prettier-ignore
            new Quad({
                x1: w, y1: h,
                x2: -w, y2: h,
                x3: -w, y3: -h,
                x4: w, y4: -h,
            }).copyTo(this.fallbackLayout)
        } else {
            // prettier-ignore
            new Quad({
                x1: -w, y1: -h,
                x2: w, y2: -h,
                x3: w, y3: h,
                x4: -w, y4: h,
            }).copyTo(this.fallbackLayout)
        }
    }

    touch(): void {
        if (options.autoplay || time.now < this.times.input.min) return

        // Initial touch
        if (!this.activatedTouchId) {
            for (const touch of touches) {
                if (!touch.started || !this.isInTrack(touch.x) || this.isUsed(touch)) continue

                this.markAsUsed(touch)
                this.activatedTouchId = touch.id
                break
            }
        }

        // Swipe
        if (this.activatedTouchId) {
            for (const touch of touches) {
                if (touch.id !== this.activatedTouchId) continue

                const offset = touch.position.x - touch.startPosition.x

                let delta = 0
                if (Math.abs(offset) >= note.swipeThreshold) delta = offset < 0 ? -1 : 1

                if (delta === this.swipeDelta) this.judge(touch)
                else if (touch.ended) this.despawn = true

                break
            }
        }
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

        if (!voezSkin.swipeNote) {
            this.fallbackSprites.note.draw(layout, this.z, 1)
            this.fallbackSprites.marker.draw(this.fallbackLayout.translate(this.pos, this.y), this.z, 1)
        } else {
            if (this.swipeDelta < 0) {
                // LEFT
                this.sprite.draw(layout, this.z, 1)
            } else {
                // RIGHT (flip layout horizontally)
                const l = layout.l
                layout.l = layout.r
                layout.r = l

                this.sprite.draw(layout, this.z, 1)
            }
        }
    }

    afterImage(): void {
        archetypes.SwipeAfterImage.spawn({
            trackRef: this.data.trackRef,
            start: time.now,
            end: time.now + noteMissDuration,
            data: this.data.extraData,
        })
    }
}