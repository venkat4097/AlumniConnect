import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useConnection } from "../contexts/connectionContext";

const Connections = () => {
  const { token, user } = useAuth();
  const {
    connections,
    incomingRequests,
    sentRequests,
    getConnections,
    respondToRequest,
  } = useConnection();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      await getConnections();
      setLoading(false);
    };
    fetchConnections();
  }, []);

  const handleAction = async (id, action) => {
    await respondToRequest(id, action);
    await getConnections(); // Refresh after action
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
    

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">My Connections</h2>

        {/* ✅ Approved Connections */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-[#1DB954] mb-4">Connected</h3>
          {connections.length === 0 ? (
            <p className="text-gray-400">You haven't connected with anyone yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from(new Map(connections.map((c) => [c._id, c])).values()).map((c) => (
                <div
                  key={c._id}
                  className="p-4 bg-[#1e1e1e] border border-[#1DB954]/30 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium">{c.name}</p>
                  <p className="text-sm text-gray-400">{c.email}</p>
                  <span className="text-sm text-[#1DB954] mt-2 inline-block">Connected</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 📨 Incoming Requests (Alumni only) */}
        {user.role === "alumni" && (
          <section className="mb-12">
            <h3 className="text-xl font-semibold text-[#1DB954] mb-4">Incoming Requests</h3>
            {incomingRequests.length === 0 ? (
              <p className="text-gray-400">No new connection requests.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {incomingRequests.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-sm"
                  >
                    <p className="text-lg font-medium">{r.name}</p>
                    <p className="text-sm text-gray-400">{r.email}</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleAction(r._id, "accept")}
                        className="px-3 py-1 text-sm bg-[#1DB954] text-black rounded hover:bg-[#17a44b]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(r._id, "reject")}
                        className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ✉️ Sent Requests (Student only) */}
        {user.role === "student" && (
          <section>
            <h3 className="text-xl font-semibold text-[#1DB954] mb-4">Sent Requests</h3>
            {sentRequests.length === 0 ? (
              <p className="text-gray-400">You haven't sent any requests yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sentRequests.map((s) => (
                  <div
                    key={s._id}
                    className="p-4 bg-[#1e1e1e] border border-yellow-500/20 rounded-lg shadow-sm"
                  >
                    <p className="text-lg font-medium">{s.name}</p>
                    <p className="text-sm text-gray-400">{s.email}</p>
                    <span className="text-sm text-yellow-400 mt-2 inline-block">Pending...</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Connections;
