import { useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import { useAuth } from "../contexts/AuthContext";
import LoginButton from "../components/LoginButton";

const HomePage = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      // Only fetch notes if user is authenticated
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else if (error.response?.status === 401) {
          // Handle authentication error
          toast.error("Please sign in to view your notes");
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchNotes();
    }
  }, [isAuthenticated, authLoading]);

  // Show loading state while auth is being determined
  if (authLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="mt-4 text-base-content">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show welcome screen for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 mt-16">
          <div className="text-center py-16">
            <h1 className="text-5xl font-bold text-primary mb-6">Welcome to ThinkBoard</h1>
            <p className="text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
              Your personal space to capture thoughts, ideas, and inspiration. 
              Sign in with Google to start creating and organizing your notes.
            </p>
            <LoginButton />
          </div>
          
          {/* Feature showcase */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-primary">Secure & Private</h3>
                <p>Your notes are protected and only accessible to you</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-primary">Easy to Use</h3>
                <p>Simple interface to create, edit, and organize your thoughts</p>
              </div>
            </div>
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <h3 className="card-title justify-center text-primary">Always Available</h3>
                <p>Access your notes from anywhere, anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;