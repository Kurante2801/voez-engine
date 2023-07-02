import { error, log } from 'node:console'
import { copyFileSync, readFileSync } from 'node:fs'
import { hash } from 'sonolus-core'

/** @type import('sonolus.js').SonolusCLIConfig */
export default {
    entry: './src/index.ts',

    devServer(sonolus) {
        try {
            copyFileSync('./src/level/bgm.ogg', './.dev/bgm.ogg')

            const level = sonolus.db.levels[0]
            level.bgm = {
                type: 'LevelBgm',
                hash: hash(readFileSync('./.dev/bgm.ogg')),
                url: '/bgm.ogg',
            }
        } catch (_) {
            error('Error: failed to setup bgm, using fallback')
            log()
        }
    },
}