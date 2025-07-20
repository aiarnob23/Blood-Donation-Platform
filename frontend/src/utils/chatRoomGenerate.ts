export const createRoom = (user1: string, user2: string) => {
    console.log('room generate', user1, user2);
    const sortedIds = [user1, user2].sort();
    const roomId = `${sortedIds[0]}${sortedIds[1]}`;
    return roomId;
}