import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        judgment: SkinSpriteName.JudgmentLine,

        lane: SkinSpriteName.Lane,
        trackSlot: SkinSpriteName.NoteSlot,

        trackLineTop: 'VOEZ Track Line Top',
        trackLineBottom: 'VOEZ Track Line Bottom',
        trackBorderTop: 'VOEZ Track Border Top',
        trackBorderBottom: 'VOEZ Track Border Bottom',
        trackActiveSides: 'VOEZ Track Active Sides',
        trackActiveTop: 'VOEZ Track Active Top',
        trackForeground: 'VOEZ Track Foreground',

        cover: SkinSpriteName.StageCover,

        clickNote: SkinSpriteName.NoteHeadRed,
        slideNote: SkinSpriteName.NoteTickNeutral,

        swipeNote: 'VOEZ Swipe',
        swipeNoteFallback: SkinSpriteName.NoteHeadCyan,
        swipeNoteFallbackMarker: SkinSpriteName.DirectionalMarkerCyan,

        holdStartNote: SkinSpriteName.NoteHeadRed,
        holdConnector: SkinSpriteName.NoteConnectionRed,
        holdEndNote: SkinSpriteName.NoteTailRed,

        holdTick: SkinSpriteName.SimultaneousMarkerRed,

        // Color sprites
        trackTopRed: 'VOEZ Track Top Red',
        trackTopYellow: 'VOEZ Track Top Yellow',
        trackTopGray: 'VOEZ Track Top Gray',
        trackTopLightBlue: 'VOEZ Track Top Light Blue',
        trackTopGreen: 'VOEZ Track Top Green',
        trackTopOrange: 'VOEZ Track Top Orange',
        trackTopViolet: 'VOEZ Track Top Violet',
        trackTopBlue: 'VOEZ Track Top Blue',
        trackTopCyan: 'VOEZ Track Top Cyan',
        trackTopPurple: 'VOEZ Track Top Purple',

        trackBottomRed: 'VOEZ Track Bottom Red',
        trackBottomYellow: 'VOEZ Track Bottom Yellow',
        trackBottomGray: 'VOEZ Track Bottom Gray',
        trackBottomLightBlue: 'VOEZ Track Bottom Light Blue',
        trackBottomGreen: 'VOEZ Track Bottom Green',
        trackBottomOrange: 'VOEZ Track Bottom Orange',
        trackBottomViolet: 'VOEZ Track Bottom Violet',
        trackBottomBlue: 'VOEZ Track Bottom Blue',
        trackBottomCyan: 'VOEZ Track Bottom Cyan',
        trackBottomPurple: 'VOEZ Track Bottom Purple',

        trackGlowRed: 'VOEZ Track Glow Red',
        trackGlowYellow: 'VOEZ Track Glow Yellow',
        trackGlowGray: 'VOEZ Track Glow Gray',
        trackGlowLightBlue: 'VOEZ Track Glow Light Blue',
        trackGlowGreen: 'VOEZ Track Glow Green',
        trackGlowOrange: 'VOEZ Track Glow Orange',
        trackGlowViolet: 'VOEZ Track Glow Violet',
        trackGlowBlue: 'VOEZ Track Glow Blue',
        trackGlowCyan: 'VOEZ Track Glow Cyan',
        trackGlowPurple: 'VOEZ Track Glow Purple',
    },
})

// Due to engine limitations, we need to use sprites to handle colors instead of RGB
export const trackTopSprites = [
    skin.sprites.trackTopRed,
    skin.sprites.trackTopYellow,
    skin.sprites.trackTopGray,
    skin.sprites.trackTopLightBlue,
    skin.sprites.trackTopGreen,
    skin.sprites.trackTopOrange,
    skin.sprites.trackTopViolet,
    skin.sprites.trackTopBlue,
    skin.sprites.trackTopCyan,
    skin.sprites.trackTopPurple,
]

export const trackBottomSprites = [
    skin.sprites.trackBottomRed,
    skin.sprites.trackBottomYellow,
    skin.sprites.trackBottomGray,
    skin.sprites.trackBottomLightBlue,
    skin.sprites.trackBottomGreen,
    skin.sprites.trackBottomOrange,
    skin.sprites.trackBottomViolet,
    skin.sprites.trackBottomBlue,
    skin.sprites.trackBottomCyan,
    skin.sprites.trackBottomPurple,
]

export const trackGlowSprites = [
    skin.sprites.trackGlowRed,
    skin.sprites.trackGlowYellow,
    skin.sprites.trackGlowGray,
    skin.sprites.trackGlowLightBlue,
    skin.sprites.trackGlowGreen,
    skin.sprites.trackGlowOrange,
    skin.sprites.trackGlowViolet,
    skin.sprites.trackGlowBlue,
    skin.sprites.trackGlowCyan,
    skin.sprites.trackGlowPurple,
]
