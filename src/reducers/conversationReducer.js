export function conversationList(state = [], action) {
  switch (action.type) {
    case 'CONVERSATION_FETCH_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}