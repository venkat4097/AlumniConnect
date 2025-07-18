import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useConnection } from "../contexts/connectionContext"; // ✅ Use context
import { useState } from "react";

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
    const fetch = async () => {
      await getConnections();
      setLoading(false);
    };
    fetch();
  }, []);

  const handleAction = async (id, action) => {
    await respondToRequest(id, action);
    await getConnections(); // Refresh after action
  };

 if (loading) return <p className="text-center mt-10">Loading...</p>;

return (
  <div className="min-h-screen bg-gray-50 text-gray-800">
    {/* 🧭 Top Header */}
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center border-b">
      <h1 className="text-2xl font-bold text-green-700">Alumni Portal</h1>
    
    </header>

    {/* 📄 Page Content */}
    <main className="px-8 py-10">
      <h1 className="text-4xl font-bold mb-10 text-green-800">My Connections</h1>

      {/* ✅ Approved Connections */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">✅ Approved Connections</h2>
        {connections.length === 0 ? (
          <p className="text-gray-500">You haven't connected with anyone yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((c) => (
              <div
                key={c._id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <p className="font-medium text-lg">{c.name}</p>
                <p className="text-sm text-gray-600">{c.email}</p>
                <span className="inline-block mt-2 text-green-600 text-sm font-semibold">
                  Connected
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 📨 Incoming Requests */}
      {user.role === "alumni" && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">📨 Incoming Requests</h2>
          {incomingRequests.length === 0 ? (
            <p className="text-gray-500">No new connection requests.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {incomingRequests.map((r) => (
                <div
                  key={r._id}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <p className="font-medium text-lg">{r.name}</p>
                    <p className="text-sm text-gray-600">{r.email}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAction(r._id, "accept")}
                      className="flex-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(r._id, "reject")}
                      className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

      {/* ✉️ Sent Requests */}
      {user.role === "student" && (
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">✉️ Sent Requests</h2>
          {sentRequests.length === 0 ? (
            <p className="text-gray-500">You haven't sent any requests yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sentRequests.map((s) => (
                <div
                  key={s._id}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                >
                  <p className="font-medium text-lg">{s.name}</p>
                  <p className="text-sm text-gray-600">{s.email}</p>
                  <span className="inline-block mt-2 text-yellow-500 text-sm font-semibold">
                    Pending...
                  </span>
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
