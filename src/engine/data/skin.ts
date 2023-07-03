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
        trackActiveLeft: 'VOEZ Track Active Left',
        trackActiveRight: 'VOEZ Track Active Right',
        trackActive: 'VOEZ Track Active',
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

        trackGlowLeftRed: 'VOEZ Track Glow Left Red',
        trackGlowLeftYellow: 'VOEZ Track Glow Left Yellow',
        trackGlowLeftGray: 'VOEZ Track Glow Left Gray',
        trackGlowLeftLightBlue: 'VOEZ Track Glow Left Light Blue',
        trackGlowLeftGreen: 'VOEZ Track Glow Left Green',
        trackGlowLeftOrange: 'VOEZ Track Glow Left Orange',
        trackGlowLeftViolet: 'VOEZ Track Glow Left Violet',
        trackGlowLeftBlue: 'VOEZ Track Glow Left Blue',
        trackGlowLeftCyan: 'VOEZ Track Glow Left Cyan',
        trackGlowLeftPurple: 'VOEZ Track Glow Left Purple',

        trackGlowRightRed: 'VOEZ Track Glow Right Red',
        trackGlowRightYellow: 'VOEZ Track Glow Right Yellow',
        trackGlowRightGray: 'VOEZ Track Glow Right Gray',
        trackGlowRightLightBlue: 'VOEZ Track Glow Right Light Blue',
        trackGlowRightGreen: 'VOEZ Track Glow Right Green',
        trackGlowRightOrange: 'VOEZ Track Glow Right Orange',
        trackGlowRightViolet: 'VOEZ Track Glow Right Violet',
        trackGlowRightBlue: 'VOEZ Track Glow Right Blue',
        trackGlowRightCyan: 'VOEZ Track Glow Right Cyan',
        trackGlowRightPurple: 'VOEZ Track Glow Right Purple',
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

export const trackLeftSprites = [
    skin.sprites.trackGlowLeftRed,
    skin.sprites.trackGlowLeftYellow,
    skin.sprites.trackGlowLeftGray,
    skin.sprites.trackGlowLeftLightBlue,
    skin.sprites.trackGlowLeftGreen,
    skin.sprites.trackGlowLeftOrange,
    skin.sprites.trackGlowLeftViolet,
    skin.sprites.trackGlowLeftBlue,
    skin.sprites.trackGlowLeftCyan,
    skin.sprites.trackGlowLeftPurple,
]

export const trackRightSprites = [
    skin.sprites.trackGlowRightRed,
    skin.sprites.trackGlowRightYellow,
    skin.sprites.trackGlowRightGray,
    skin.sprites.trackGlowRightLightBlue,
    skin.sprites.trackGlowRightGreen,
    skin.sprites.trackGlowRightOrange,
    skin.sprites.trackGlowRightViolet,
    skin.sprites.trackGlowRightBlue,
    skin.sprites.trackGlowRightCyan,
    skin.sprites.trackGlowRightPurple,
]
