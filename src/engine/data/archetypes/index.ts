import { Initialization } from './Initialization.js'
import { Stage } from './Stage.js'
import { Track } from './Track.js'
import { ClickAfterImage } from './afterImages/ClickAfterImage.js'
import { SlideAfterImage } from './afterImages/SlideAfterImage.js'
import { SwipeAfterImage } from './afterImages/SwipeAfterImage.js'
import { ClickNote } from './notes/ClickNote.js'
import { SlideNote } from './notes/SlideNote.js'
import { SwipeNote } from './notes/SwipeNote.js'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.js'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.js'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.js'

export const archetypes = defineArchetypes({
    Initialization,
    Stage,

    Track,
    TrackMoveCommand,
    TrackScaleCommand,
    TrackColorCommand,

    ClickNote,
    SlideNote,
    SwipeNote,

    ClickAfterImage,
    SlideAfterImage,
    SwipeAfterImage,
})
