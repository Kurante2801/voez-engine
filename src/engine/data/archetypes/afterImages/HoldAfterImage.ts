import { judgmentPivot } from '../../constants.js'
import { note } from '../../shared.js'
import { skin } from '../../skin.js'
import { AfterImage } from './AfterImage.js'

export class HoldAfterImage extends AfterImage {
    sprite = skin.sprites.holdStartNote // Not used, but needs to not be abstract

    updateParallel(): void {
        if (time.now >= this.spawnData.end + note.speed || this.trackSharedMemory.animating || this.trackState === EntityState.Despawned) {
            this.despawn = true
            return
        }

        this.draw()
    }

    draw(): void {
        const headT = Math.unlerp(this.spawnData.start - note.speed, this.spawnData.start, time.now)
        const headY = Math.lerp(screen.t, judgmentPivot, headT)

        const x = this.pos

        const head = new Rect({
            l: x - note.radius,
            r: x + note.radius,
            t: headY + note.radius,
            b: headY - note.radius,
        })

        const tailT = Math.unlerp(this.spawnData.end - note.speed, this.spawnData.end, time.now)
        const tailY = Math.lerp(screen.t, judgmentPivot, tailT)

        const tail = new Rect({
            l: head.l,
            r: head.r,
            t: tailY + note.radius,
            b: tailY - note.radius,
        })

        const connector = new Rect({
            l: head.l,
            r: head.r,
            t: tail.t - note.radius,
            b: head.t - note.radius,
        })

        skin.sprites.holdConnector.draw(connector, 800 - this.spawnData.start, 0.35)
        skin.sprites.holdStartNote.draw(head, 900 - this.spawnData.start, 0.35)
        skin.sprites.holdEndNote.draw(tail, 900 - this.spawnData.start, 0.35)
    }
}
