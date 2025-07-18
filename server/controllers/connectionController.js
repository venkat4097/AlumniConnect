import User from "../models/User.js";

// Send request (Student → Alumni)
export const sendRequest = async (req, res) => {
  const studentId = req.user.id;
  const alumniId = req.params.alumniId;

  const alumni = await User.findById(alumniId);
  if (!alumni || alumni.role !== "alumni") {
    return res.status(404).json({ message: "Alumni not found" });
  }

  if (alumni.connectionRequests.includes(studentId)) {
    return res.status(400).json({ message: "Request already sent" });
  }

  alumni.connectionRequests.push(studentId);
  await alumni.save();

  res.json({ message: "Request sent" });
};


// View pending requests (Alumni)
export const getIncomingRequests = async (req, res) => {
  const alumni = await User.findById(req.user.id).populate("connectionRequests", "name email");
  res.json(alumni.connectionRequests);
};


// Accept request
export const acceptRequest = async (req, res) => {
  const alumniId = req.user.id;
  const studentId = req.params.studentId;

  const alumni = await User.findById(alumniId);
  const student = await User.findById(studentId);

  if (!alumni || !student) return res.status(404).json({ message: "User not found" });

  alumni.connections.push(studentId);
  student.connections.push(alumniId);

  alumni.connectionRequests = alumni.connectionRequests.filter(id => id.toString() !== studentId);
  await alumni.save();
  await student.save();

  res.json({ message: "Request accepted" });
};


// Reject request
export const rejectRequest = async (req, res) => {
  const alumni = await User.findById(req.user.id);
  alumni.connectionRequests = alumni.connectionRequests.filter(
    id => id.toString() !== req.params.studentId );
  await alumni.save();

  res.json({ message: "Request rejected" });
};


// Get all connections
export const getConnections = async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("connections", "name email role")
    .populate("connectionRequests", "name email"); // if alumni

  let sent = [];
  if (user.role === "student") {
    // Fetch alumni who received this student's request
    sent = await User.find({
      role: "alumni",
      connectionRequests: req.user.id,
    }).select("name email");
  }

  res.json({
    connections: user.connections,
    requests: user.connectionRequests || [],
    sent,
  });
};


