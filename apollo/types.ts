export type Message = {
  body: string;
  id: string;
  insertedAt: string;
  user: {
    firstName: string;
    id: string;
    lastName: string;
  };
};

export type RoomFullData = {
  id: string;
  messages: Message[];
};

export type RoomData = {
  id: string;
  name: string;
};

export type GetRoomsType = {
  data: {
    usersRooms: {
      rooms: RoomData[];
    };
  };
};
