import { despawnHeightValues, despawnWidthValues, spawnHeightValues, spawnWidthValues } from '../bakedAnimationCurves.js'
import { animationCurves, voezSkin } from '../shared.js'
import { skin } from '../skin.js'
import { archetypes } from './index.js'

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

        // Initialize track animation tuples
        for (const [index, value] of spawnWidthValues.entries()) animationCurves.spawnWidthTuple.set(index, value)
        for (const [index, value] of spawnHeightValues.entries()) animationCurves.spawnHeightTuple.set(index, value)
        for (const [index, value] of despawnWidthValues.entries()) animationCurves.despawnWidthTuple.set(index, value)
        for (const [index, value] of despawnHeightValues.entries()) animationCurves.despawnHeightTuple.set(index, value)

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
        voezSkin.trackActiveLeft = skin.sprites.trackActiveLeft.exists
        voezSkin.trackActiveRight = skin.sprites.trackActiveRight.exists
        voezSkin.trackForeground = skin.sprites.trackForeground.exists
        voezSkin.trackActive = skin.sprites.trackActive.exists
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

        voezSkin.trackGlowLeft = skin.sprites.trackGlowLeftGray.exists
        voezSkin.trackGlowRight = skin.sprites.trackGlowRightGray.exists
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        this.despawn = true
    }
}
