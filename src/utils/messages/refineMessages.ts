export const refineMyConversationData = (data: any) => {
  const refinedData = [];

  for (let i = 0; i < data.length; i++) {
    const conversation = data[i];
    const { otherUser, newestChat, updatedAt, id } = conversation;
    const { name, email } = otherUser;
    const { message, createdAt } = newestChat;

    const formattedTime = new Date(updatedAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    refinedData.push({
      userName: name, // Name of the other user in the conversation
      message: message, // Last message in the conversation
      time: formattedTime, // Time when the last message was sent
      avatar: '', // You can add logic for avatars or image URL
      conversationId: id,
    });
  }

  return refinedData;
};
