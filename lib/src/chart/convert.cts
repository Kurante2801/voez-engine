import { EngineArchetypeDataName, EngineArchetypeName, LevelData, LevelDataEntity } from 'sonolus-core'
import { VoezChart } from './index.cjs'

export function chartToLevelData(chart: VoezChart, offset = 0): LevelData {
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

    for (const bpm of chart.bpms) {
        addEntity({
            archetype: EngineArchetypeName.BpmChange,
            data: {
                [EngineArchetypeDataName.Beat]: bpm.beat,
                [EngineArchetypeDataName.Bpm]: bpm.bpm,
            },
        })
    }

    let id = 0
    const nextReference = (): string => {
        id += 1
        return id.toString()
    }

    for (const track of chart.tracks) {
        const trackRef = nextReference()

        // This will ensure the track ends after all of its notes can be played
        let end = track.endBeat

        // We want to make the track reference the first move command we can find
        // and have every move command reference the next one
        const moveRef = track.moveCommands.length > 0 ? id + 1 : -1

        let index = 0
        // It is VERY important that move commands are sorted by time, since that affects getPosAtTime
        for (const command of track.moveCommands.sort((a, b) => a.startBeat - b.startBeat)) {
            const ref = nextReference()
            const nextRef = index >= track.moveCommands.length - 1 ? -1 : id + 1

            addEntity({
                ref: ref,
                archetype: 'TrackMoveCommand',
                data: {
                    trackRef: trackRef,
                    startBeat: command.startBeat,
                    endBeat: command.endBeat,
                    startValue: command.startValue,
                    endValue: command.endValue,
                    ease: command.ease,
                    nextRef: nextRef.toString(),
                },
            })

            index++
        }

        for (const command of track.scaleCommands) {
            addEntity({
                archetype: 'TrackScaleCommand',
                data: {
                    trackRef: trackRef,
                    startBeat: command.startBeat,
                    endBeat: command.endBeat,
                    startValue: command.startValue,
                    endValue: command.endValue,
                    ease: command.ease,
                },
            })
        }

        for (const command of track.colorCommands) {
            addEntity({
                archetype: 'TrackColorCommand',
                data: {
                    trackRef: trackRef,
                    startBeat: command.startBeat,
                    endBeat: command.endBeat,
                    startValue: command.startValue,
                    endValue: command.endValue,
                    ease: command.ease,
                },
            })
        }

        for (const note of track.notes) {
            switch (note.type) {
                case 'click':
                    addEntity({
                        archetype: 'ClickNote',
                        data: {
                            trackRef: trackRef,
                            [EngineArchetypeDataName.Beat]: note.beat,
                        },
                    })
                    end = Math.max(end, note.beat)
                    break
                case 'slide':
                    addEntity({
                        archetype: 'SlideNote',
                        data: {
                            trackRef: trackRef,
                            [EngineArchetypeDataName.Beat]: note.beat,
                        },
                    })
                    end = Math.max(end, note.beat)
                    break
                case 'swipe':
                    addEntity({
                        archetype: 'SwipeNote',
                        data: {
                            trackRef: trackRef,
                            [EngineArchetypeDataName.Beat]: note.beat,
                            direction: note.direction,
                        },
                    })
                    end = Math.max(end, note.beat)
                    break
                case 'hold': {
                    const headRef = nextReference()

                    addEntity({
                        ref: headRef,
                        archetype: 'HoldStartNote',
                        data: {
                            trackRef: trackRef,
                            [EngineArchetypeDataName.Beat]: note.beat,
                        },
                    })

                    addEntity({
                        archetype: 'HoldEndNote',
                        data: {
                            trackRef: trackRef,
                            [EngineArchetypeDataName.Beat]: note.beat,
                            headRef: headRef,
                            endBeat: note.endBeat,
                        },
                    })
                    end = Math.max(end, note.endBeat)
                    break
                }
            }
        }

        addEntity({
            ref: trackRef,
            archetype: 'Track',
            data: {
                startBeat: track.startBeat,
                endBeat: track.endBeat,
                animateSpawn: +track.animateSpawn, // The plus turns the boolean into a number
                pos: track.pos,
                size: track.size,
                color: track.color,
                moveRef: moveRef.toString(),
                thisRef: trackRef,
            },
        })
    }

    return {
        bgmOffset: offset,
        entities: entities,
    }
}
