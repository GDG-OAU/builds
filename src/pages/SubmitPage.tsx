import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { CommunityName, GoogleTool } from '../types';
import { storage as fbStorage, isFirebaseConfigured } from '../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { GithubIcon } from '../components/GithubIcon';
import {
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

const COMMUNITIES: CommunityName[] = [
  'Web Development',
  'Game Development',
  'Research',
  'Product Management',
  'Mobile App Development',
  'Data Science / Machine Learning',
  'Design',
  'Quantum Computing',
  'Cybersecurity'
];

const GOOGLE_TOOLS: GoogleTool[] = [
  'Google AI Studio',
  'Gemini',
  'Antigravity',
  'Colab',
  'Looker Studio',
  'Firebase',
  'BigQuery',
  'Cloud Run',
  'Google Docs',
  'Forms',
  'Sheets',
  'Android',
  'Other'
];

export const SubmitPage: React.FC = () => {
  const { user, signInWithGoogle, submitProject } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [community, setCommunity] = useState<CommunityName>('Web Development');
  const [selectedTools, setSelectedTools] = useState<GoogleTool[]>([]);

  const [screenshotMode, setScreenshotMode] = useState<'upload' | 'url'>('upload');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const toggleTool = (tool: GoogleTool) => {
    if (selectedTools.includes(tool)) {
      setSelectedTools(selectedTools.filter(t => t !== tool));
    } else {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!user) {
      setErrorMsg('Please sign in with Google first.');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Project title is required.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('One-line project description is required.');
      return;
    }

    const cleanGithub = githubUrl.trim().toLowerCase();
    if (!cleanGithub.startsWith('https://github.com/') && !cleanGithub.startsWith('http://github.com/')) {
      setErrorMsg('Please enter a valid GitHub repository URL starting with https://github.com/...');
      return;
    }

    let finalScreenshot = screenshotUrl.trim();

    if (screenshotMode === 'upload') {
      if (!selectedFile && !filePreview) {
        setErrorMsg('Please select a project screenshot image.');
        return;
      }

      setUploading(true);
      try {
        if (isFirebaseConfigured && fbStorage && selectedFile) {
          const fileRef = ref(fbStorage, `screenshots/${Date.now()}_${selectedFile.name}`);
          const snapshot = await uploadBytes(fileRef, selectedFile);
          finalScreenshot = await getDownloadURL(snapshot.ref);
        } else {
          finalScreenshot = filePreview;
        }
      } catch (err: any) {
        console.warn('Storage upload error, using local data URL fallback:', err);
        finalScreenshot = filePreview;
      } finally {
        setUploading(false);
      }
    } else {
      if (!finalScreenshot) {
        setErrorMsg('Please enter an image URL for the screenshot.');
        return;
      }
    }

    if (selectedTools.length === 0) {
      setErrorMsg('Please select at least one Google tool used in this project.');
      return;
    }

    const res = submitProject({
      title: title.trim(),
      description: description.trim(),
      githubUrl: githubUrl.trim(),
      demoUrl: demoUrl.trim() || undefined,
      community,
      googleTools: selectedTools,
      screenshotUrl: finalScreenshot,
      builderName: user.displayName || user.email.split('@')[0]
    });

    if (!res.success) {
      setErrorMsg(res.error || 'Failed to submit project.');
    } else {
      setSuccessMsg('Project successfully submitted! Redirecting to gallery...');
      setTimeout(() => {
        navigate('/gallery');
      }, 1500);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-green-50 text-[#188038] flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Sign In to Submit
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Submissions are credited directly to your builder profile and count toward your community track’s leaderboard rank.
            </p>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-full inline-flex items-center justify-center space-x-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 px-6 py-3 rounded-full text-sm font-semibold shadow-2xs hover:shadow-xs transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-10 space-y-8">
        
        <div className="border-b border-gray-100 pb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-[#188038] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Builder Jam Submission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Submit Your Project
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Submitting as <span className="font-semibold text-gray-800">{user.displayName}</span> ({user.email})
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-[#D93025] px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 border border-green-200 text-[#188038] px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CampusPulse OAU"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 text-sm outline-hidden transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              One-Line Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what it does and the campus problem it addresses..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 text-sm outline-hidden resize-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-gray-800" /> GitHub Repository <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 text-sm outline-hidden transition-all"
              />
              <p className="text-[11px] text-gray-400 mt-1">Must be a valid github.com link</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#188038]" /> Live Demo Link (Optional)
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://your-demo.web.app"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 text-sm outline-hidden transition-all"
              />
              <p className="text-[11px] text-[#188038] font-semibold mt-1">Boosts your leaderboard completeness score!</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Community Track <span className="text-red-500">*</span>
            </label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value as CommunityName)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-800 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 outline-hidden transition-all"
            >
              {COMMUNITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Google Tools Used (Multi-select) <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-gray-400 font-medium">
                {selectedTools.length} selected {selectedTools.length >= 2 && '· 2+ boosts score ✓'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GOOGLE_TOOLS.map((tool) => {
                const active = selectedTools.includes(tool);
                return (
                  <button
                    type="button"
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                      active
                        ? 'bg-green-50 border-[#188038] text-[#188038] shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate">{tool}</span>
                    {active && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-1 text-[#188038]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Project Screenshot <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 mb-3">
              <button
                type="button"
                onClick={() => setScreenshotMode('upload')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                  screenshotMode === 'upload'
                    ? 'bg-black text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setScreenshotMode('url')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
                  screenshotMode === 'url'
                    ? 'bg-black text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Paste Image Link
              </button>
            </div>

            {screenshotMode === 'upload' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-gray-400 transition-colors">
                {filePreview ? (
                  <div className="space-y-3">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg object-contain shadow-2xs border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview('');
                      }}
                      className="text-xs text-red-600 font-semibold hover:underline"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <div>
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <label className="cursor-pointer">
                      <span className="text-xs sm:text-sm font-semibold text-[#188038] hover:underline">
                        Click to select an image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, or WEBP up to 5MB</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={screenshotUrl}
                  onChange={(e) => setScreenshotUrl(e.target.value)}
                  placeholder="https://example.com/screenshot.png"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#188038] focus:ring-2 focus:ring-[#188038]/20 text-sm outline-hidden"
                />
                {screenshotUrl && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
                    <img
                      src={screenshotUrl}
                      alt="Preview"
                      className="max-h-44 rounded-lg border border-gray-200 object-cover"
                      onError={() => setErrorMsg('Unable to load image from the provided URL.')}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/gallery')}
              className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all disabled:opacity-50"
            >
              {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{uploading ? 'Uploading...' : 'Publish Submission'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
