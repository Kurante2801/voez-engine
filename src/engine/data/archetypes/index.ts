import { Initialization } from './Initialization.js'
import { Stage } from './Stage.js'
import { Track } from './Track.js'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.js'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.js'

export const archetypes = defineArchetypes({
    Initialization,
    Stage,

    Track,
    TrackMoveCommand,
    TrackScaleCommand,
})
