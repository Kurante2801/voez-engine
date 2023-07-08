import { Ease, VoezChart } from '../chart/index.cjs'
import { VoezSource } from './index.cjs'

const easings: Record<string, Ease | undefined> = {
    easelinear: Ease.LINEAR,
    easeinquad: Ease.QUAD_IN,
    easeoutquad: Ease.QUAD_OUT,
    easeinoutquad: Ease.QUAD_INOUT,
    easeoutinquad: Ease.QUAD_OUTIN,
    easeincirc: Ease.CIRC_IN,
    easeoutcirc: Ease.CIRC_OUT,
    easeinoutcirc: Ease.CIRC_INOUT,
    easeoutincirc: Ease.CIRC_OUTIN,
    easeinexpo: Ease.EXP_IN,
    easeoutexpo: Ease.EXP_OUT,
    easeinoutexpo: Ease.EXP_INOUT,
    easeoutinexpo: Ease.EXP_OUTIN,
    easeinback: Ease.BACK_IN,
    easeoutback: Ease.BACK_OUT,
    easeinoutback: Ease.EXIT, // As parsed by editor
    easeoutinback: Ease.BACK_OUTIN,
    easeintelastic: Ease.ELASTIC_IN, // The 'T' in easeinTelastic is not a typo
    easeoutelastic: Ease.ELASTIC_OUT,
    easeinoutelastic: Ease.ELASTIC_INOUT,
    easeoutinelastic: Ease.ELASTIC_OUTIN,
}

function parseEase(ease: string): number {
    return easings[ease] ?? Ease.NONE
}

export function sourceToChart(source: VoezSource): VoezChart {
    const chart: VoezChart = {
        bpms: [{ beat: 0, bpm: 60 }],
        tracks: [],
    }

    for (const track of source.tracks) {
        let lastPos = track.X
        let lastSize = track.Size
        let lastColor = track.Color

        chart.tracks.push({
            pos: lastPos,
            size: lastSize,
            color: lastColor,

            startBeat: track.Start,
            endBeat: track.End,
            animateSpawn: track.EntranceOn,

            moveCommands: track.Move.map((command) => {
                const start = lastPos
                lastPos = command.To

                return {
                    startBeat: command.Start,
                    endBeat: command.End,
                    startValue: start,
                    endValue: command.To,
                    ease: parseEase(command.Ease),
                }
            }),
            scaleCommands: track.Scale.map((command) => {
                const start = lastSize
                lastSize = command.To

                return {
                    startBeat: command.Start,
                    endBeat: command.End,
                    startValue: start,
                    endValue: command.To,
                    ease: parseEase(command.Ease),
                }
            }),
            colorCommands: track.ColorChange.map((command) => {
                const start = lastColor
                lastColor = command.To

                return {
                    startBeat: command.Start,
                    endBeat: command.End,
                    startValue: start,
                    endValue: command.To,
                    ease: parseEase(command.Ease),
                }
            }),
            notes: source.notes
                .filter((note) => note.Track === track.Id)
                .map((note) => {
                    switch (note.Type) {
                        case 'click':
                            return { type: 'click', beat: note.Time }
                        case 'slide':
                            return { type: 'slide', beat: note.Time }
                        case 'swipe':
                            return {
                                type: 'swipe',
                                beat: note.Time,
                                direction: note.Dir <= 0 ? -1 : 1,
                            }
                        case 'hold':
                            return {
                                type: 'hold',
                                beat: note.Time,
                                endBeat: note.Time + note.Hold,
                            }
                    }
                }),
        })
    }

    return chart
}
