import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

export const GET_ROOM_INFO = gql`
  query GetRoomInfo($roomId: String) {
    room(id: $roomId) {
      id
      messages {
        id
        body
        insertedAt
        user {
          id
        }
      }
      name
      user {
        id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($body: String, $roomId: String) {
    sendMessage(body: $body, roomId: $roomId) {
      id
    }
  }
`;

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

export type GetRoomsType = {
  data: {
    room: {
      id: string;
      messages: Message[];
    };
  };
};
