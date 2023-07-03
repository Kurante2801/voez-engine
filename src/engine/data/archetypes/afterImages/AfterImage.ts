import { judgmentPivot, noteMissPosition } from '../../constants.js'
import { note } from '../../shared.js'
import { archetypes } from '../index.js'

// Missed note
export abstract class AfterImage extends SpawnableArchetype({
    trackRef: Number,
    start: Number,
    end: Number,
    data: Number,
}) {
    abstract sprite: SkinSprite

    updateParallel(): void {
        if (time.now >= this.spawnData.end || this.trackSharedMemory.animating || this.trackState === EntityState.Despawned) {
            this.despawn = true
            return
        }

        this.draw()
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

        this.sprite.draw(layout, 900 - this.spawnData.start, alpha)
    }

    get trackSharedMemory() {
        return archetypes.Track.shared.get(this.spawnData.trackRef)
    }

    get trackState() {
        return entityInfos.get(this.spawnData.trackRef).state
    }

    get pos() {
        return this.trackSharedMemory.pos
    }
}
