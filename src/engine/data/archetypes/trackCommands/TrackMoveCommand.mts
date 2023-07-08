import { options } from '../../../configuration/options.mjs'
import { Ease } from '../../easing.mjs'
import { voezSpaceToSonolusSpace } from '../../util.mjs'
import { TrackCommand } from './TrackCommand.mjs'

export class TrackMoveCommand extends TrackCommand {
    // Reference the next move command (or -1 if none), used to spawn hold ticks
    moveData = this.defineData({
        nextRef: { name: 'nextRef', type: Number },
    })

    shared = this.defineSharedMemory({
        start: Number,
        end: Number,
    })

    preprocess(): void {
        super.preprocess()
        if (this.data.ease == Ease.EXIT) this.data.ease = Ease.EXIT_MOVE

        this.data.startValue = voezSpaceToSonolusSpace(this.data.startValue)
        this.data.endValue = voezSpaceToSonolusSpace(this.data.endValue)

        if (options.mirror) {
            this.data.startValue *= -1
            this.data.endValue *= -1
        }

        this.shared.start = this.times.start
        this.shared.end = this.times.end
    }

    update(progress: number): void {
        this.trackSharedMemory.pos = Math.lerp(this.data.startValue, this.data.endValue, progress)
    }
}
