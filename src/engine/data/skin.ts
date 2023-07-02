import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        judgment: SkinSpriteName.JudgmentLine,

        trackTop: SkinSpriteName.Lane,
        trackSlot: SkinSpriteName.NoteSlot,

        trackBottom: 'VOEZ Track Bottom',
        trackLineTop: 'VOEZ Track Line Top',
        trackLineBottom: 'VOEZ Track Line Bottom',
        trackBorderTop: 'VOEZ Track Border Top',
        trackBorderBottom: 'VOEZ Track Border Bottom',
        trackGlowLeft: 'VOEZ Track Glow Left',
        trackGlowRight: 'VOEZ Track Glow Right',
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
    },
})
