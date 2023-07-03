import { options } from '../../configuration/options.js'
import { judgmentPivot, Layer } from '../constants.js'
import { skin } from '../skin.js'

export class Stage extends Archetype {
    spawnOrder() {
        return 1
    }

    shouldSpawn() {
        return entityInfos.get(0).state === EntityState.Despawned
    }

    updateParallel() {
        const judgmentLayout = new Rect({
            l: screen.l,
            r: screen.r,
            t: judgmentPivot - 0.04,
            b: judgmentPivot + 0.04,
        })
        // The judgment line is quite thick, but sprite itself has a lot of vertical padding
        // This is so we can support other engine's judgment lines (like PJSekai)
        skin.sprites.judgment.draw(judgmentLayout, Layer.JUDGMENT, 1)

        // Stage cover is a vertical box that cover the screen from top to bottom
        if (options.stageCover <= 0) return

        const coverLayout = new Rect({
            l: screen.l,
            r: screen.r,
            t: screen.t,
            b: Math.lerp(screen.t, screen.b, options.stageCover),
        })

        skin.sprites.cover.draw(coverLayout, Layer.STAGE_COVER, 1)
    }
}
