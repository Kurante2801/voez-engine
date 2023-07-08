import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { chartToLevelData } from './chart/convert.cjs'
export * from './chart/index.cjs'
export { sourceToChart } from './source/convert.cjs'
export * from './source/index.cjs'

export const version = '1.0.0'

export const engineInfo = {
    name: 'voez',
    version: 8,
    title: {
        en: 'VOEZ',
    },
    subtitle: {
        en: '',
    },
    author: {
        en: 'Kurante',
    },
    description: {
        en: `VOEZ engine for Sonolus.\nVersion: ${version}\nGitHub: https://github.com/Kurante2801/voez-engine`,
        es: `Motor VOEZ para Sonolus.\nVersion: ${version}\nGitHub: https://github.com/Kurante2801/voez-engine`,
    },
} as const satisfies Partial<EngineInfo>

export const engineConfiguration = new Resource('EngineConfiguration')
export const engineData = new Resource('EngineData')
export const engineThumbnail = new Resource('thumbnail.png')
