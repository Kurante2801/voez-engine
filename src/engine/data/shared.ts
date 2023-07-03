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

// Color sprites (we need to use tuples since we reach the max limit of sprites if we draw 40 sprites)
export const trackSprites = levelMemory({
    top: Tuple(10, SkinSpriteId),
    bottom: Tuple(10, SkinSpriteId),
    left: Tuple(10, SkinSpriteId),
    right: Tuple(10, SkinSpriteId),
})
