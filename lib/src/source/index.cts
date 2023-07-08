export type VoezSource = {
    tracks: VSTrack[]
    notes: VSNote[]
}

export type VSTrack = {
    Id: number
    Start: number
    End: number
    EntranceOn: boolean
    X: number
    Size: number
    Color: number
    Move: VSCommand[]
    Scale: VSCommand[]
    ColorChange: VSCommand[]
}

export type VSCommand = {
    Start: number
    End: number
    To: number
    Ease: string
}

export type VSNote = {
    Type: 'click' | 'hold' | 'slide' | 'swipe'
    Track: number
    Time: number
    Hold: number
    Dir: number
}
