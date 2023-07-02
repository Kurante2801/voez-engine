import { Ease } from '../../easing.js'
import { TrackCommand } from './TrackCommand.js'

export class TrackColorCommand extends TrackCommand {
    preprocess(): void {
        super.preprocess()
        if (this.data.ease == Ease.EXIT) this.data.ease = Ease.EXIT_COLOR
    }

    update(progress: number): void {
        this.trackSharedMemory.colorProgress = progress
        this.trackSharedMemory.colorStart = this.data.startValue
        this.trackSharedMemory.colorEnd = this.data.endValue
    }
}
