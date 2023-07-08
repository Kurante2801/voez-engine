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
    EXIT_MOVE,
    EXIT_SCALE,
    EXIT_COLOR,
}

// https://github.com/AndrewFM/VoezEditor/blob/master/Assets/Scripts/Util.cs
const exitMove = (start: number, end: number, perc: number): number => {
    const x = perc * perc * (2.70158 * (perc * 2) - 1.20158)
    return (end - start) * x + start
}

const exitScale = (start: number, end: number, perc: number): number => {
    const x = perc * perc * (2.70158 * (perc * 4) - 1.20158)
    return (end - start) * x + start
}

const exitColor = (start: number, end: number, perc: number): number => {
    const x = perc * perc * (2.70158 * (perc * 6) - 1.00158)
    return (end - start) * x + start
}

const funcs = new Map<number, { (value: number): number }>([
    [Ease.LINEAR, (value: number) => value],
    [Ease.EXP_IN, (value: number) => Math.ease('In', 'Expo', value)],
    [Ease.EXP_OUT, (value: number) => Math.ease('Out', 'Expo', value)],
    [Ease.EXP_INOUT, (value: number) => Math.ease('InOut', 'Expo', value)],
    [Ease.EXP_OUTIN, (value: number) => Math.ease('OutIn', 'Expo', value)],
    [Ease.QUAD_IN, (value: number) => Math.ease('In', 'Quad', value)],
    [Ease.QUAD_OUT, (value: number) => Math.ease('Out', 'Quad', value)],
    [Ease.QUAD_INOUT, (value: number) => Math.ease('InOut', 'Quad', value)],
    [Ease.QUAD_OUTIN, (value: number) => Math.ease('OutIn', 'Quad', value)],
    [Ease.CIRC_IN, (value: number) => Math.ease('In', 'Circ', value)],
    [Ease.CIRC_OUT, (value: number) => Math.ease('Out', 'Circ', value)],
    [Ease.CIRC_INOUT, (value: number) => Math.ease('InOut', 'Circ', value)],
    [Ease.CIRC_OUTIN, (value: number) => Math.ease('OutIn', 'Circ', value)],
    [Ease.BACK_IN, (value: number) => Math.ease('In', 'Back', value)],
    [Ease.BACK_OUT, (value: number) => Math.ease('Out', 'Back', value)],
    [Ease.BACK_INOUT, (value: number) => Math.ease('InOut', 'Back', value)],
    [Ease.BACK_OUTIN, (value: number) => Math.ease('OutIn', 'Back', value)],
    [Ease.ELASTIC_IN, (value: number) => Math.ease('In', 'Elastic', value)],
    [Ease.ELASTIC_OUT, (value: number) => Math.ease('Out', 'Elastic', value)],
    [Ease.ELASTIC_INOUT, (value: number) => Math.ease('InOut', 'Elastic', value)],
    [Ease.ELASTIC_OUTIN, (value: number) => Math.ease('OutIn', 'Elastic', value)],
    [Ease.EXIT_MOVE, (value: number) => exitMove(0, 1, value)],
    [Ease.EXIT_SCALE, (value: number) => exitScale(0, 1, value)],
    [Ease.EXIT_COLOR, (value: number) => exitColor(0, 1, value)],
])

export function easeFunction(ease: Ease, value: number): number {
    // Due to Sonolus being compiled, we can't do funcs[ease] and we're instead forced to loop through all ease functions
    for (const [key, func] of funcs) if (key == ease) return func(value)
    return 1
}
