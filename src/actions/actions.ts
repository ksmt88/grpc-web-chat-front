import * as types   from "./types"
import {Message}    from "../proto/chat_pb"
import {ChatClient} from "../proto/ChatServiceClientPb"
import {Empty}      from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc"

const client = new ChatClient(`http://${process.env.REACT_APP_GRPC_HOST}:${process.env.REACT_APP_GRPC_PORT}`, {}, {});

export const getMessages = () => async (dispatch: any) => {
    const messageStream = client.getMessages(new Empty())
    await messageStream.on(
        'data',
        (message) => {
            dispatch({type: types.GET_MESSAGES, message});
        }
    )
};



export const postMessage = (args: Message.AsObject) => async (dispatch: any) => {
    const messageRequest = new Message()
    messageRequest.setName(args.name)
    messageRequest.setMessage(args.message)

    await client.postMessage(
        messageRequest,
        {},
        (error, response) => {
            dispatch({type: types.POST_MESSAGE, response});
        }
    );
}
