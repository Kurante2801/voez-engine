export const judgmentPivot = -0.67

// Percentage of the screen a track with 1 size would take
export const trackWidth = 0.115

// Percentage of the screen the track margins take
export const trackMarginLeft = 0.09375
export const trackMarginRight = 1.0 - trackMarginLeft

// Track animations' durations
export const trackSpawnDuration = 0.35
export const trackDespawnDuration = 0.25

export enum Layer {
    TRACK_GLOW,
    TRACK_BACKGROUND,
    TRACK_FOREGROUND,
    TRACK_CENTER_ANIMATING,
    TRACK_BORDER,
    TRACK_CENTER,
    JUDGMENT,
    TRACK_ACTIVE,
    TRACK_SLOT,
    STAGE_COVER,
}
