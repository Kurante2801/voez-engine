import { easeFunction } from '../../easing.js'
import { archetypes } from '../index.js'

export abstract class TrackCommand extends Archetype {
    data = this.defineData({
        trackRef: { name: 'trackRef', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        startValue: { name: 'startValue', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        endValue: { name: 'endValue', type: Number },
        ease: { name: 'ease', type: Number },
    })

    times = this.entityMemory({
        start: Number,
        end: Number,
    })

    preprocess(): void {
        this.times.start = bpmChanges.at(this.data.startBeat).time
        this.times.end = bpmChanges.at(this.data.endBeat).time
    }

    spawnOrder(): number {
        return 1000 + this.times.start
    }

    shouldSpawn(): boolean {
        return time.now >= this.times.start
    }

    shouldDespawn(): boolean {
        if (time.now >= this.times.end) this.despawn = true
        return this.despawn
    }

    updateSequential(): void {
        if (this.shouldDespawn()) {
            this.update(1)
            return
        }

        const t = Math.unlerp(this.times.start, this.times.end, time.now)
        this.update(easeFunction(this.data.ease, t))
    }

    abstract update(progress: number): void

    get trackSharedMemory() {
        return archetypes.Track.shared.get(this.data.trackRef)
    }
}
