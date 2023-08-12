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
