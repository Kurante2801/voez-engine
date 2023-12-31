import { NameText, UnitText } from 'sonolus-core'

export const options = defineOptions({
    autoplay: {
        name: NameText.AutoPlay,
        scope: 'VOEZ',
        standard: true,
        type: 'toggle',
        def: 0,
    },
    speed: {
        name: NameText.LevelSpeed,
        standard: true,
        type: 'slider',
        def: 1,
        min: 0.5,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    hidden: {
        name: NameText.Hidden,
        standard: true,
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    noteSpeed: {
        name: NameText.NoteSpeed,
        scope: 'VOEZ',
        type: 'slider',
        def: 5,
        min: 1,
        max: 10,
        step: 1,
    },
    mirror: {
        name: NameText.MirrorLevel,
        type: 'toggle',
        def: 0,
    },
    sfxEnabled: {
        name: NameText.SFX,
        scope: 'VOEZ',
        type: 'toggle',
        def: 1,
    },
    autoSFX: {
        name: NameText.AutoSFX,
        scope: 'VOEZ',
        type: 'toggle',
        def: 0,
    },
    noteSize: {
        name: NameText.NoteSize,
        scope: 'VOEZ',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    noteEffectEnabled: {
        name: NameText.NoteEffect,
        scope: 'VOEZ',
        type: 'toggle',
        def: 1,
    },
    noteEffectSize: {
        name: NameText.NoteEffectSize,
        scope: 'VOEZ',
        type: 'slider',
        def: 1,
        min: 0.1,
        max: 2,
        step: 0.05,
        unit: UnitText.Percentage,
    },
    laneEffectEnabled: {
        name: NameText.LaneEffect,
        scope: 'VOEZ',
        type: 'toggle',
        def: 1,
    },
    stageCover: {
        name: NameText.VerticalStageCover,
        scope: 'VOEZ',
        type: 'slider',
        def: 0,
        min: 0,
        max: 1,
        step: 0.05,
        unit: UnitText.Percentage,
    },
})
