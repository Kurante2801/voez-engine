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
    trackGlow: Boolean,
    trackForeground: Boolean,
    trackActiveTop: Boolean,
    trackActiveSides: Boolean,
    swipeNote: Boolean,
})

// Color sprites (we need to use tuples since we reach the max limit of sprites if we draw 30 sprites)
export const trackSprites = levelMemory({
    top: Tuple(10, SkinSpriteId),
    bottom: Tuple(10, SkinSpriteId),
    glow: Tuple(10, SkinSpriteId),
})

export const note = levelData({
    speed: Number,
    radius: Number,
    tickRadius: Number,
    swipeThreshold: Number,
    swipeFallbackRadius: Number,
})
