export function rand(len: number): string {
    const key = "abcdefghijklmnopqrstuvwxyz0123456789";
    let word = "";
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * key.length);
        word += key[randomIndex];
    }
    return word;
}
