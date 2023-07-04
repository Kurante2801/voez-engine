// Editor here refers to https://github.com/AndrewFM/VoezEditor
// This entire file is for turning note.json and track.json data into Sonolus entities

import { EngineArchetypeDataName, EngineArchetypeName, LevelDataEntity } from 'sonolus-core'
import { Track } from './archetypes/Track.js'
import { ClickNote } from './archetypes/notes/ClickNote.js'
import { HoldEndNote } from './archetypes/notes/HoldEndNote.js'
import { HoldStartNote } from './archetypes/notes/HoldStartNote.js'
import { SlideNote } from './archetypes/notes/SlideNote.js'
import { SwipeNote } from './archetypes/notes/SwipeNote.js'
import { TrackColorCommand } from './archetypes/trackCommands/TrackColorCommand.js'
import { TrackMoveCommand } from './archetypes/trackCommands/TrackMoveCommand.js'
import { TrackScaleCommand } from './archetypes/trackCommands/TrackScaleCommand.js'
import { Ease } from './easing.js'
import { windows } from './windows.js'

export type EditorTrack = {
    Id: number
    EntranceOn: boolean
    X: number
    Size: number
    Start: number
    End: number
    Color: number
    Move: EditorTransition[]
    Scale: EditorTransition[]
    ColorChange: EditorTransition[]
}

export type EditorTransition = {
    To: number
    Ease: string
    Start: number
    End: number
}

export type EditorNote = {
    Id: number
    Type: string
    Track: number
    Time: number
    Hold: number
    Dir: number
}

// Temporal type to hold data
type ParsedTransition = {
    startTime: number
    endTime: number
    startValue: number
    endValue: number
    ease: number
}

const easings = new Map<string, number>([
    ['easelinear', Ease.LINEAR],
    ['easeinquad', Ease.QUAD_IN],
    ['easeoutquad', Ease.QUAD_OUT],
    ['easeinoutquad', Ease.QUAD_INOUT],
    ['easeoutinquad', Ease.QUAD_OUTIN],
    ['easeincirc', Ease.CIRC_IN],
    ['easeoutcirc', Ease.CIRC_OUT],
    ['easeinoutcirc', Ease.CIRC_INOUT],
    ['easeoutincirc', Ease.CIRC_OUTIN],
    ['easeinexpo', Ease.EXP_IN],
    ['easeoutexpo', Ease.EXP_OUT],
    ['easeinoutexpo', Ease.EXP_INOUT],
    ['easeoutinexpo', Ease.EXP_OUTIN],
    ['easeinback', Ease.BACK_IN],
    ['easeoutback', Ease.BACK_OUT],
    ['easeinoutback', Ease.EXIT], // As parsed by editor
    ['easeoutinback', Ease.BACK_OUTIN],
    ['easeintelastic', Ease.ELASTIC_IN], // The 'T' in easeinTelastic is not a typo
    ['easeoutelastic', Ease.ELASTIC_OUT],
    ['easeinoutelastic', Ease.ELASTIC_INOUT],
    ['easeoutinelastic', Ease.ELASTIC_OUTIN],
])

function parseEase(ease: string): number {
    for (const [key, value] of easings) if (key === ease) return value
    return Ease.NONE
}

function parseTransitions(initialValue: number, transitions: EditorTransition[]) {
    const parsed: ParsedTransition[] = []
    if (transitions.length === 0) return parsed

    transitions = transitions.sort((a, b) => a.Start - b.Start)

    // Convert transitions
    for (let i = 0; i < transitions.length; i++) {
        const transition = transitions[i]

        if (parsed.length > 0) initialValue = parsed[parsed.length - 1].endValue

        parsed.push({
            startTime: transition.Start,
            endTime: transition.End,
            startValue: initialValue,
            endValue: transition.To,
            ease: parseEase(transition.Ease),
        })
    }

    return parsed.sort((a, b) => a.startTime - b.startTime)
}

// Parses track.json and note.json from VOEZEditor into Sonolus entities
export function editorEntities(tracks: EditorTrack[], notes: EditorNote[], bpm: number): LevelDataEntity[] {
    const entities: LevelDataEntity[] = [
        {
            archetype: 'Initialization',
            data: [],
        },
        {
            archetype: 'Stage',
            data: [],
        },
    ]

    // https://github.com/NonSpicyBurrito/sonolus-voez-engine/blob/6ab6fa91aedc2de57d806ad6a49527bd7e943d9c/lib/src/vc/convert.cts#LL64C8-L64C8
    const addEntity = (entity: Omit<LevelDataEntity, 'data'> & { data: Record<string, number | string> }) => {
        entities.push({
            ...entity,
            data: Object.entries(entity.data).map(([k, v]) => (typeof v === 'number' ? { name: k, value: v } : { name: k, ref: v })),
        })
    }

    addEntity({
        archetype: EngineArchetypeName.BpmChange,
        data: {
            [EngineArchetypeDataName.Beat]: 0,
            [EngineArchetypeDataName.Bpm]: bpm,
        },
    })

    const secondsToBeat = (seconds: number): number => seconds / (60 / bpm)

    let id = 0
    const nextReference = (): string => {
        id += 1
        return id.toString()
    }

    for (const track of tracks) {
        const trackRef = nextReference()
        // This will ensure the track ends after all of its notes can be played
        let end = track.End

        // We want to make the track reference the first move transition we find,
        // and have every move transition reference the next one
        let moveRef = -1

        const moveTransitions = parseTransitions(track.X, track.Move)
        if (moveTransitions.length > 0) moveRef = id + 1

        let index = 0
        // it is VERY important that move transitions are sorted by time, since that affects util's getPosAtTime
        for (const transition of moveTransitions.sort((a, b) => a.startTime - b.startTime)) {
            const moveRef = nextReference()
            const isLast = index >= moveTransitions.length - 1
            const nextRef = isLast ? -1 : id + 1

            addEntity({
                ref: moveRef,
                archetype: TrackMoveCommand.name,
                data: {
                    trackRef: trackRef,
                    startBeat: secondsToBeat(transition.startTime),
                    endBeat: secondsToBeat(transition.endTime),
                    startValue: transition.startValue,
                    endValue: transition.endValue,
                    ease: transition.ease,
                    nextRef: nextRef.toString(),
                },
            })

            index++
        }

        const scaleTransitions = parseTransitions(track.Size, track.Scale)
        for (const transition of scaleTransitions) {
            addEntity({
                archetype: TrackScaleCommand.name,
                data: {
                    trackRef: trackRef,
                    startBeat: secondsToBeat(transition.startTime),
                    endBeat: secondsToBeat(transition.endTime),
                    startValue: transition.startValue,
                    endValue: transition.endValue,
                    ease: transition.ease,
                },
            })
        }

        const colorTransitions = parseTransitions(track.Color, track.ColorChange)
        for (const transition of colorTransitions) {
            addEntity({
                archetype: TrackColorCommand.name,
                data: {
                    trackRef: trackRef,
                    startBeat: secondsToBeat(transition.startTime),
                    endBeat: secondsToBeat(transition.endTime),
                    startValue: transition.startValue,
                    endValue: transition.endValue,
                    ease: transition.ease,
                },
            })
        }

        for (const note of notes) {
            if (note.Track !== track.Id) continue

            let name = ''
            let extra = 0

            if (note.Type === 'click') name = ClickNote.name
            if (note.Type === 'slide') name = SlideNote.name

            if (note.Type === 'swipe') {
                name = SwipeNote.name
                extra = note.Dir <= 0 ? -1 : 1
            }

            if (note.Type === 'hold') {
                const headRef = nextReference()

                addEntity({
                    ref: headRef,
                    archetype: HoldStartNote.name,
                    data: {
                        trackRef: trackRef,
                        [EngineArchetypeDataName.Beat]: secondsToBeat(note.Time),
                    },
                })

                addEntity({
                    archetype: HoldEndNote.name,
                    data: {
                        trackRef: trackRef,
                        [EngineArchetypeDataName.Beat]: secondsToBeat(note.Time),
                        headRef: headRef,
                        endBeat: secondsToBeat(note.Time + note.Hold),
                    },
                })

                end = Math.max(end, note.Time + note.Hold)

                continue
            } else end = Math.max(end, note.Time + windows.click.good.max)

            if (name === '') continue

            addEntity({
                archetype: name,
                data: {
                    trackRef: trackRef,
                    [EngineArchetypeDataName.Beat]: secondsToBeat(note.Time),
                    extraData: extra,
                },
            })
        }

        addEntity({
            ref: trackRef,
            archetype: Track.name,
            data: {
                startBeat: secondsToBeat(track.Start),
                endBeat: secondsToBeat(end),
                animateSpawn: +track.EntranceOn, // The plus turns the boolean into a number
                pos: track.X,
                size: track.Size,
                color: track.Color,
                moveRef: moveRef.toString(),
                thisRef: trackRef,
            },
        })
    }

    return entities
}
