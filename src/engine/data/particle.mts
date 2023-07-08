import { ParticleEffectName } from 'sonolus-core'

export const particle = defineParticle({
    effects: {
        // VOEZ spawns different particle effects depending on the judgement
        perfect: 'VOEZ Perfect',
        great: 'VOEZ Great',
        good: 'VOEZ Good',

        perfectHold: 'VOEZ Perfect Hold',
        greatHold: 'VOEZ Great Hold',
        goodHold: 'VOEZ Good Hold',

        fallbackClick: ParticleEffectName.NoteCircularTapRed,
        fallbackSlide: ParticleEffectName.NoteCircularTapNeutral,
        fallbackSwipe: ParticleEffectName.NoteCircularTapCyan,
        fallbackHold: ParticleEffectName.NoteCircularHoldRed,
    },
})
