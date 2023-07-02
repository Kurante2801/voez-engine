import { options } from '../../../configuration/options.js'
import { Ease } from '../../easing.js'
import { voezSpaceToSonolusSpace } from '../../util.js'
import { TrackCommand } from './TrackCommand.js'

export class TrackMoveCommand extends TrackCommand {
    // Will be used to spawn hold ticks later on
    moveData = this.defineData({
        thisRef: { name: 'thisRef', type: Number },
        nextRef: { name: 'nextRef', type: Number },
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
    }

    update(progress: number): void {
        this.trackSharedMemory.pos = Math.lerp(this.data.startValue, this.data.endValue, progress)
    }
}
