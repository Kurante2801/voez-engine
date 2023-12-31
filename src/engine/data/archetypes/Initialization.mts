import { options } from '../../configuration/options.mjs'
import { scrollDurations } from '../constants.mjs'
import { note, trackSprites, voezSkin } from '../shared.mjs'
import { skin, trackBottomSprites, trackGlowSprites, trackTopSprites } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class Initialization extends Archetype {
    preprocess() {
        // https://github.com/NonSpicyBurrito/sonolus-voez-engine/blob/6ab6fa91aedc2de57d806ad6a49527bd7e943d9c/src/engine/data/archetypes/Initialization.mts#L34
        const gap = 0.05
        const uiRect = new Rect({
            l: screen.l + gap,
            r: screen.r - gap,
            b: screen.b + gap,
            t: screen.t - gap,
        })

        ui.menu.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.lt.add(new Vec(gap, 0)).add(new Vec(0.15, 0).mul(ui.configuration.menu.scale)),
            pivot: { x: 0, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.lt
                .add(new Vec(gap, 0))
                .add(new Vec(0.15, 0).mul(ui.configuration.menu.scale))
                .add(new Vec(0.715, -0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 0, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.rt.sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.primary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: 0, y: uiRect.t },
            pivot: { x: 0.5, y: 1 },
            size: new Vec(0, 0.15).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: 0, y: uiRect.t },
            pivot: {
                x: 0.5,
                y: (2.5 * ui.configuration.combo.scale) / ui.configuration.judgment.scale + 1.5,
            },
            size: new Vec(0, 0.06).mul(ui.configuration.judgment.scale),
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        // Call globalPreprocess on archetypes that define it
        for (const archetype of Object.values(archetypes)) {
            if ('globalPreprocess' in archetype) archetype.globalPreprocess()
        }

        // Initialize sprite tuples
        for (const [index, value] of trackTopSprites.entries()) trackSprites.top.set(index, value.id)
        for (const [index, value] of trackBottomSprites.entries()) trackSprites.bottom.set(index, value.id)
        for (const [index, value] of trackGlowSprites.entries()) trackSprites.glow.set(index, value.id)

        // Note speed
        for (const [index, value] of scrollDurations.entries()) {
            if (index === options.noteSpeed - 1) {
                note.speed = value
                break
            }
        }

        score.base.set({
            perfect: 1,
            great: 0.8,
            good: 0.5,
        })

        // Cache existence booleans
        voezSkin.trackLineTop = skin.sprites.trackLineTop.exists
        voezSkin.trackLineBottom = skin.sprites.trackLineBottom.exists
        voezSkin.trackBorderTop = skin.sprites.trackBorderTop.exists
        voezSkin.trackBorderBottom = skin.sprites.trackBorderBottom.exists
        voezSkin.trackForeground = skin.sprites.trackForeground.exists
        voezSkin.trackActiveTop = skin.sprites.trackActiveTop.exists
        voezSkin.trackActiveSides = skin.sprites.trackActiveSides.exists
        voezSkin.swipeNote = skin.sprites.swipeNote.exists

        voezSkin.trackTop =
            skin.sprites.trackTopRed.exists &&
            skin.sprites.trackTopYellow.exists &&
            skin.sprites.trackTopGray.exists &&
            skin.sprites.trackTopLightBlue.exists &&
            skin.sprites.trackTopGreen.exists &&
            skin.sprites.trackTopOrange.exists &&
            skin.sprites.trackTopViolet.exists &&
            skin.sprites.trackTopBlue.exists &&
            skin.sprites.trackTopCyan.exists &&
            skin.sprites.trackTopPurple.exists

        voezSkin.trackBottom =
            skin.sprites.trackBottomRed.exists &&
            skin.sprites.trackBottomYellow.exists &&
            skin.sprites.trackBottomGray.exists &&
            skin.sprites.trackBottomLightBlue.exists &&
            skin.sprites.trackBottomGreen.exists &&
            skin.sprites.trackBottomOrange.exists &&
            skin.sprites.trackBottomViolet.exists &&
            skin.sprites.trackBottomBlue.exists &&
            skin.sprites.trackBottomCyan.exists &&
            skin.sprites.trackBottomPurple.exists

        voezSkin.trackGlow =
            skin.sprites.trackGlowRed.exists &&
            skin.sprites.trackGlowYellow.exists &&
            skin.sprites.trackGlowGray.exists &&
            skin.sprites.trackGlowLightBlue.exists &&
            skin.sprites.trackGlowGreen.exists &&
            skin.sprites.trackGlowOrange.exists &&
            skin.sprites.trackGlowViolet.exists &&
            skin.sprites.trackGlowBlue.exists &&
            skin.sprites.trackGlowCyan.exists &&
            skin.sprites.trackGlowPurple.exists
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        this.despawn = true
    }
}
