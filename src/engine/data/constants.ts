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
    HOLD_NOTE_CONNECTOR,
    NOTE,
    HOLD_TICK,
    STAGE,
}

export const judgmentPivot = -0.67

// Percentage of the screen a track with 1 size would take
export const trackWidth = 0.115

// Percentage of the screen the track margins take
export const trackMarginLeft = 0.09375
export const trackMarginRight = 1.0 - trackMarginLeft

// Track animations' durations
export const trackSpawnDuration = 0.35
export const trackDespawnDuration = 0.25

// Time in seconds a track will have the active effect after being touched
export const trackActiveTime = 0.25

// Time in seconds a note takes to reach the judgment line from the top of the screen at different speed options
// https://github.com/AndrewFM/VoezEditor/blob/99353b587696ea9935091b1b803514c9267dec1b/Assets/Scripts/Note.cs#L18
export const scrollDurations = [
    1.5, // 1x
    1.3, // 2x
    1.1, // 3x
    0.9, // 4x
    0.8, // 5x
    0.7, // 6x
    0.55, // 7x
    0.425, // 8x
    0.3, // 9x
    0.2, // 10x
]

// Seconds until an sfx can play again
export const minSFXDistance = 0.02

export const effectRadius = 0.6

// Time in seconds a note will be visible after it is missed (not counting hold notes)
export const noteMissDuration = 1

// Position where a missed note will travel
export const noteMissPosition = judgmentPivot - 0.4
