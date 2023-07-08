import { HoldTick } from './HoldTick.mjs'
import { Initialization } from './Initialization.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
import { ClickAfterImage } from './afterImages/ClickAfterImage.mjs'
import { HoldAfterImage } from './afterImages/HoldAfterImage.mjs'
import { SlideAfterImage } from './afterImages/SlideAfterImage.mjs'
import { SwipeAfterImage } from './afterImages/SwipeAfterImage.mjs'
import { ClickNote } from './notes/ClickNote.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'
import { HoldStartNote } from './notes/HoldStartNote.mjs'
import { SlideNote } from './notes/SlideNote.mjs'
import { SwipeNote } from './notes/SwipeNote.mjs'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.mjs'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.mjs'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.mjs'

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
