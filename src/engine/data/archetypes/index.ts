import { HoldTick } from './HoldTick.js'
import { Initialization } from './Initialization.js'
import { Stage } from './Stage.js'
import { Track } from './Track.js'
import { ClickAfterImage } from './afterImages/ClickAfterImage.js'
import { HoldAfterImage } from './afterImages/HoldAfterImage.js'
import { SlideAfterImage } from './afterImages/SlideAfterImage.js'
import { SwipeAfterImage } from './afterImages/SwipeAfterImage.js'
import { ClickNote } from './notes/ClickNote.js'
import { HoldEndNote } from './notes/HoldEndNote.js'
import { HoldStartNote } from './notes/HoldStartNote.js'
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
    HoldStartNote,
    HoldEndNote,

    ClickAfterImage,
    SlideAfterImage,
    SwipeAfterImage,
    HoldAfterImage,

    HoldTick,
})
