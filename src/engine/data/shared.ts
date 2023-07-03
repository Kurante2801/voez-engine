export const track = levelData({
    width: Number, // Track's width at a size of 1 (halved)
    pad: Number,
    line: Number, // Half width
    glow: Number,
    slot: Number, // Half width
    active: Number, // track width + activeWide
})

export const animationCurves = levelMemory({
    spawnWidthTuple: Tuple(145, Number),
    spawnHeightTuple: Tuple(145, Number),
    despawnWidthTuple: Tuple(145, Number),
    despawnHeightTuple: Tuple(145, Number),
})

export const voezSkin = levelData({
    trackTop: Boolean,
    trackBottom: Boolean,
    trackLineTop: Boolean,
    trackLineBottom: Boolean,
    trackBorderTop: Boolean,
    trackBorderBottom: Boolean,
    trackGlowLeft: Boolean,
    trackGlowRight: Boolean,
    trackActiveLeft: Boolean,
    trackActiveRight: Boolean,
    trackForeground: Boolean,
    trackActive: Boolean,
    swipeNote: Boolean,
})
