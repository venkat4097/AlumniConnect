import Message from "../models/Message.js";

// 📥 GET messages between two users
// export const getMessages = async (req, res) => {
//   const { userId } = req.params;
//   const currentUserId = req.user.id;

//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: currentUserId, receiver: userId },
//         { sender: userId, receiver: currentUserId }
//       ]
//     })
//       .sort({ createdAt: 1 })
//       .populate("sender", "_id name")
//       .populate("receiver", "_id name");

//     res.status(200).json(messages);
//   } catch (err) {
//     console.error("❌ Error fetching messages:", err.message);
//     res.status(500).json({ message: "Failed to fetch messages", error: err.message });
//   }
// };

export const getMessages = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;
  const { limit = 20, skip = 0 } = req.query;

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    })
      .sort({ createdAt: -1 }) // Newest first for pagination
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("sender", "_id name")
      .populate("receiver", "_id name");

    res.status(200).json(messages.reverse()); // Oldest first for display
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};

// 📤 POST message (REST fallback)
export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  if (!receiverId || !content?.trim()) {
    return res.status(400).json({ message: "Receiver and content are required." });
  }

  try {
    const newMsg = await Message.create({ sender: senderId, receiver: receiverId, content });
    const populatedMsg = await newMsg.populate("sender", "_id name");

    res.status(201).json(populatedMsg); // ✅ Return populated message like socket does
  } catch (err) {
    console.error("❌ Error sending message:", err.message);
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};
