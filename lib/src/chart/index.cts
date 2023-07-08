export type VoezChart = {
    bpms: BPM[]
    tracks: Track[]
}

export enum Ease {
    NONE,
    LINEAR,
    EXP_IN,
    EXP_OUT,
    EXP_INOUT,
    EXP_OUTIN,
    QUAD_IN,
    QUAD_OUT,
    QUAD_INOUT,
    QUAD_OUTIN,
    CIRC_IN,
    CIRC_OUT,
    CIRC_INOUT,
    CIRC_OUTIN,
    BACK_IN,
    BACK_OUT,
    BACK_INOUT,
    BACK_OUTIN,
    ELASTIC_IN,
    ELASTIC_OUT,
    ELASTIC_INOUT,
    ELASTIC_OUTIN,
    EXIT,
}

export type BPM = {
    beat: number
    bpm: number
}

export type Track = {
    startBeat: number
    endBeat: number
    animateSpawn: boolean

    // Starting values
    pos: number // [0 - 1] range
    size: number
    color: number // [0 - 9] int

    moveCommands: Command[]
    scaleCommands: Command[]
    colorCommands: Command[]

    notes: Note[]
}

export type Command = {
    startBeat: number
    endBeat: number
    startValue: number
    endValue: number
    ease: Ease
}

export type BaseNote = { beat: number }
export type ClickNote = BaseNote & { type: 'click' }
export type SlideNote = BaseNote & { type: 'slide' }

export type SwipeNote = BaseNote & {
    type: 'swipe'
    direction: -1 | 1
}

export type HoldNote = BaseNote & {
    type: 'hold'
    endBeat: number
}

export type Note = ClickNote | SlideNote | SwipeNote | HoldNote
