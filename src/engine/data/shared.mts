export const track = levelData({
    width: Number, // Track's width at a size of 1 (halved)
    pad: Number,
    line: Number, // Half width
    glow: Number,
    slot: Number, // Half width
    active: Number, // track width + activeWide
    hitbox: Number, // hitbox margin (half)
})

// Cache whether sprites exist or not, may not be necessary
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

// Color sprites (we need to use tuples since sprites break if we draw 30 sprites per track)
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
