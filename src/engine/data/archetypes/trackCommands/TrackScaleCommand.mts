import { Ease } from '../../easing.mjs'
import { TrackCommand } from './TrackCommand.mjs'

export class TrackScaleCommand extends TrackCommand {
    preprocess(): void {
        super.preprocess()
        if (this.data.ease == Ease.EXIT) this.data.ease = Ease.EXIT_SCALE
    }

    update(progress: number): void {
        this.trackSharedMemory.size = Math.lerp(this.data.startValue, this.data.endValue, progress)
    }
}
