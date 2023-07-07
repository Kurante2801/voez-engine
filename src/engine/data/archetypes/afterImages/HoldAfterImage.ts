import { Layer, judgmentPivot } from '../../constants.js'
import { note } from '../../shared.js'
import { skin } from '../../skin.js'
import { getInverseZ } from '../../util.js'
import { AfterImage } from './AfterImage.js'

export class HoldAfterImage extends AfterImage {
    sprite = skin.sprites.holdStartNote // Not used, but needs to not be abstract

    layers = this.entityMemory({
        connector: Number,
        tail: Number,
    })

    initialize(): void {
        this.layers.connector = getInverseZ(Layer.HOLD_NOTE_CONNECTOR_AFTERIMAGE, this.spawnData.start)
        this.layers.tail = getInverseZ(Layer.NOTE_AFTERIMAGE, this.spawnData.end)
    }

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

        skin.sprites.holdConnector.draw(connector, this.layers.connector, 0.35)
        skin.sprites.holdStartNote.draw(head, this.z, 0.35)
        skin.sprites.holdEndNote.draw(tail, this.layers.tail, 0.35)
    }
}
