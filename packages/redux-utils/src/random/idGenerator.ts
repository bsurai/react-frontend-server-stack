export function generateRandomId(): string {
    return Math.random().toString(36).substr(2, 6);
}