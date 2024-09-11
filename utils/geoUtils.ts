export function calculateRadians(kilometers: number) {
    const earthRadiusKm = 6371;
    return kilometers / earthRadiusKm;
}
