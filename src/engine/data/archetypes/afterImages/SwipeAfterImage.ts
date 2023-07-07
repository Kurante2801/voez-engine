import { judgmentPivot, noteMissPosition } from '../../constants.js'
import { note, voezSkin } from '../../shared.js'
import { skin } from '../../skin.js'
import { AfterImage } from './AfterImage.js'

export class SwipeAfterImage extends AfterImage {
    sprite = skin.sprites.swipeNote
    fallback = skin.sprites.swipeNoteFallback

    get delta() {
        return this.spawnData.data
    }

    draw(): void {
        const t = Math.unlerp(this.spawnData.start, this.spawnData.end, time.now)

        const x = this.pos
        const y = Math.lerp(judgmentPivot, noteMissPosition, t)
        const alpha = (1 - t) * 0.35

        const layout = new Rect({
            l: x - note.radius,
            r: x + note.radius,
            t: y + note.radius,
            b: y - note.radius,
        })

        if (voezSkin.swipeNote) {
            // RIGHT (flip layout horizontally)
            if (this.delta > 0) {
                const l = layout.l
                layout.l = layout.r
                layout.r = l
            }
            this.sprite.draw(layout, this.z, alpha)
        } else this.fallback.draw(layout, this.z, alpha)
    }
}
