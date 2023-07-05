import { options } from '../../configuration/options.js'
import { Layer, judgmentPivot } from '../constants.js'
import { note } from '../shared.js'
import { skin } from '../skin.js'
import { getZ } from '../util.js'

export class HoldTick extends SpawnableArchetype({
    time: Number,
    pos: Number,
}) {
    times = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    z = this.entityMemory(Number)

    initialize(): void {
        this.z = getZ(Layer.HOLD_TICK, this.spawnData.time)
        this.times.max = this.spawnData.time
        this.times.min = this.spawnData.time - note.speed
        if (options.hidden > 0) this.times.hidden = this.times.max - note.speed * options.hidden
    }

    updateParallel(): void {
        if (time.now >= this.spawnData.time) {
            this.despawn = true
            return
        }

        if (options.hidden > 0 && time.now > this.times.hidden) return

        const t = Math.unlerp(this.times.min, this.times.max, time.now)
        const x = this.spawnData.pos
        const y = Math.lerp(screen.t, judgmentPivot, t)

        const layout = new Rect({
            l: x - note.radius,
            r: x + note.radius,
            t: y + note.radius,
            b: y - note.radius,
        })

        skin.sprites.holdTick.draw(layout, this.z, 1)
    }
}
