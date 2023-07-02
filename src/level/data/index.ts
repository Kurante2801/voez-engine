import { LevelData } from 'sonolus-core'
import { editorEntities } from '../../engine/data/editor.js'
import note from '../note.json'
import track from '../track.json'

const bpm = 60
export const data: LevelData = {
    bgmOffset: 0,
    entities: editorEntities(track, note, bpm),
}
