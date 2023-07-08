import { UnitText } from 'sonolus-core'
import { skin } from './skin.mjs'

export const buckets = defineBuckets({
    click: {
        sprites: [
            {
                id: skin.sprites.clickNote.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    slide: {
        sprites: [
            {
                id: skin.sprites.slideNote.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    swipe: {
        sprites: [
            {
                id: skin.sprites.swipeNote.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    holdStart: {
        sprites: [
            {
                id: skin.sprites.holdConnector.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.holdStartNote.id,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
    holdEnd: {
        sprites: [
            {
                id: skin.sprites.holdConnector.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: skin.sprites.holdEndNote.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: UnitText.Millisecond,
    },
})
