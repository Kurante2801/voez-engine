import { options } from '../../../configuration/options.js'
import { Ease } from '../../easing.js'
import { voezSpaceToSonolusSpace } from '../../util.js'
import { TrackCommand } from './TrackCommand.js'

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
