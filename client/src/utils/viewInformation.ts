

export function viewInformation(data: NewSong[]): boolean {
    for (const a of data) {
        if (!a.title.trim() || !a.audio || !a.image)
            return false;
    }
    return true;
}