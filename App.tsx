import React, { useState, useMemo, useEffect } from 'react';
import JSZip from 'jszip';
import { THEMES, ASPECT_RATIOS } from './constants';
import { Theme, GeneratedImage } from './types';
import { generateCouplePhotoshoot } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import { CopyIcon, DownloadIcon, SparklesIcon } from './components/icons';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}

const SkeletonCard = () => (
  <div className="aspect-[3/4] rounded-2xl bg-white/20 border border-white/40 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
    <div className="h-full w-full flex flex-col justify-end p-6 gap-3">
      <div className="h-4 w-3/4 bg-white/20 rounded-full animate-pulse"></div>
      <div className="h-4 w-1/2 bg-white/20 rounded-full animate-pulse"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [maleImageFile, setMaleImageFile] = useState<File | null>(null);
  const [femaleImageFile, setFemaleImageFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(THEMES[0]);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();
  }, []);

  const handleApiKeySelect = async () => {
    try {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        setHasApiKey(true);
      }
    } catch (e) {
      console.error("API Key selection failed", e);
    }
  };

  const isGenerationDisabled = useMemo(() => {
    return !maleImageFile || !femaleImageFile || !selectedTheme || isLoading;
  }, [maleImageFile, femaleImageFile, selectedTheme, isLoading]);

  const handleGenerate = async () => {
    if (isGenerationDisabled) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      if (maleImageFile && femaleImageFile && selectedTheme) {
        const images = await generateCouplePhotoshoot(
          maleImageFile,
          femaleImageFile,
          selectedTheme.prompts,
          aspectRatio
        );
        if (images.length === 0) throw new Error("No images generated");
        setGeneratedImages(images);
      }
    } catch (err) {
      console.error(err);
      setError('Studio encountered an issue. Please ensure high-quality source photos and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyPrompt = (prompt: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };
  
  const handleDownload = (src: string, index: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const link = document.createElement('a');
    link.href = src;
    link.download = `amour-ai-${selectedTheme?.name.toLowerCase().replace(/\s/g, '-')}-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (generatedImages.length === 0) return;
    setIsZipping(true);
    const zip = new JSZip();
    const folderName = `amour-ai-${selectedTheme?.name.toLowerCase().replace(/\s/g, '-')}`;
    const folder = zip.folder(folderName);
    generatedImages.forEach((img, index) => {
      const base64Data = img.src.split(',')[1];
      folder?.file(`shoot-${index + 1}.png`, base64Data, { base64: true });
    });
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${folderName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Zipping failed", err);
    } finally {
      setIsZipping(false);
    }
  };

  const backgroundClass = "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-indigo-50 to-emerald-50";

  if (!hasApiKey) {
    return (
      <div className={`min-h-screen ${backgroundClass} flex items-center justify-center p-6`}>
        <div className="max-w-md w-full bg-white/60 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl p-10 text-center border border-white/60">
          <div className="mb-8 bg-gradient-to-tr from-rose-500 to-indigo-600 w-24 h-24 rounded-3xl rotate-12 flex items-center justify-center mx-auto shadow-2xl shadow-rose-500/20">
             <SparklesIcon className="w-12 h-12 text-white -rotate-12" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Amour Studio</h1>
          <p className="text-gray-600 mb-10 leading-relaxed font-medium">
            Experience the next generation of couple photography with <span className="text-indigo-600">Nano Banana Pro</span>.
          </p>
          <button
            onClick={handleApiKeySelect}
            className="w-full bg-gray-900 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Connect Studio Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${backgroundClass} text-gray-900 font-sans selection:bg-rose-200`}>
      <main className="max-w-[1700px] mx-auto px-6 lg:px-12 py-12">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-rose-900 to-indigo-950">
              Amour AI
            </h1>
            <p className="mt-4 text-lg text-gray-500 font-medium tracking-wide uppercase">The High-Fashion Identity Engine</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/60 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-bold text-gray-600">Studio Pro Active</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="xl:col-span-4 space-y-8">
            <div className="p-8 bg-white/40 backdrop-blur-3xl rounded-[2rem] border border-white/60 shadow-xl">
              <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-gray-900 text-white text-xs flex items-center justify-center">01</span>
                 The Identities
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <ImageUploader label="Partner One" onImageUpload={setMaleImageFile} />
                <ImageUploader label="Partner Two" onImageUpload={setFemaleImageFile} />
              </div>
            </div>

            <div className="p-8 bg-white/40 backdrop-blur-3xl rounded-[2rem] border border-white/60 shadow-xl flex flex-col max-h-[500px]">
               <h2 className="text-xl font-serif font-bold mb-8 flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-gray-900 text-white text-xs flex items-center justify-center">02</span>
                 The Visual Narrative
              </h2>
              <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar space-y-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                      selectedTheme?.id === theme.id
                        ? 'bg-gray-900 text-white shadow-2xl scale-[1.02]'
                        : 'bg-white/40 hover:bg-white/60 text-gray-700'
                    }`}
                  >
                    <div className="relative z-10">
                      <h3 className="font-bold text-base tracking-tight">{theme.name}</h3>
                      <p className={`text-xs mt-1 transition-colors ${selectedTheme?.id === theme.id ? 'text-gray-400' : 'text-gray-500'}`}>{theme.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

             <div className="p-8 bg-white/40 backdrop-blur-3xl rounded-[2rem] border border-white/60 shadow-xl space-y-6">
               <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-serif font-bold">03 Framing</h2>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="bg-transparent border-none font-bold text-rose-600 focus:ring-0 cursor-pointer text-lg"
                  >
                    {ASPECT_RATIOS.map((ratio) => <option key={ratio} value={ratio}>{ratio}</option>)}
                  </select>
               </div>
            
              <button
                onClick={handleGenerate}
                disabled={isGenerationDisabled}
                className="w-full h-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-[1.5rem] font-bold text-xl shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-30 transition-all duration-500 flex items-center justify-center gap-4 group"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="animate-pulse">Orchestrating AI...</span>
                  </div>
                ) : (
                  <>
                    <span>Generate Editorial</span>
                    <SparklesIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="xl:col-span-8 min-h-[700px]">
            {isLoading ? (
              <div className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
                 </div>
              </div>
            ) : error ? (
              <div className="h-full flex flex-col items-center justify-center bg-rose-50/50 backdrop-blur-md rounded-[2.5rem] border border-rose-100 p-12 text-center">
                 <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 </div>
                 <h3 className="text-2xl font-serif font-bold text-rose-950 mb-2">Studio Error</h3>
                 <p className="text-rose-700 max-w-sm mx-auto">{error}</p>
                 <button onClick={handleGenerate} className="mt-8 px-8 py-3 bg-rose-600 text-white rounded-full font-bold shadow-lg hover:bg-rose-700 transition-all">Retry Shoot</button>
              </div>
            ) : generatedImages.length === 0 ? (
              <div className="h-full border-2 border-dashed border-gray-300 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center bg-white/20">
                  <div className="w-24 h-24 bg-white/60 rounded-full flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform">
                     <SparklesIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Awaiting Your Vision</h3>
                  <p className="text-gray-500 max-w-md text-lg leading-relaxed">Select your themes and upload portraits to begin a photoshoot that preserves your identity with 100% accuracy.</p>
              </div>
            ) : (
              <div className="space-y-10 animate-in fade-in duration-1000">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white/60 backdrop-blur-3xl p-8 rounded-[2rem] shadow-xl border border-white/80">
                   <div>
                     <h2 className="text-4xl font-serif font-bold tracking-tight text-gray-900">{selectedTheme?.name}</h2>
                     <p className="text-gray-500 font-medium mt-1">Nano Banana Pro Render • {generatedImages.length} Editorial Shots</p>
                   </div>
                   <button 
                      onClick={handleDownloadAll}
                      disabled={isZipping}
                      className="mt-6 md:mt-0 flex items-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300 font-bold disabled:bg-gray-400"
                   >
                     {isZipping ? <span className="animate-pulse">Preparing Gallery...</span> : <><DownloadIcon className="w-5 h-5" /> Download Full Set</>}
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {generatedImages.map((image, index) => (
                    <div 
                      key={index} 
                      onClick={() => setSelectedImage(image)}
                      className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl cursor-zoom-in bg-white border border-white/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-rose-200/50"
                    >
                      <img src={image.src} alt="shoot result" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                         <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                           <button 
                             onClick={(e) => handleCopyPrompt(image.prompt, e)} 
                             className="p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white hover:text-gray-900 transition-all border border-white/20"
                           >
                              <CopyIcon className="w-5 h-5" />
                           </button>
                           <button 
                             onClick={(e) => handleDownload(image.src, index, e)} 
                             className="p-4 bg-white text-gray-900 rounded-full hover:scale-110 transition-all shadow-2xl"
                           >
                              <DownloadIcon className="w-5 h-5" />
                           </button>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/95 backdrop-blur-xl p-4 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
             <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedImage(null)}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <div className="relative max-w-5xl w-full flex flex-col items-center gap-10" onClick={(e) => e.stopPropagation()}>
               <div className="w-full rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10">
                 <img src={selectedImage.src} alt="full view" className="w-full max-h-[80vh] object-contain mx-auto" />
               </div>
               <div className="flex gap-6">
                  <button onClick={() => handleCopyPrompt(selectedImage.prompt)} className="flex items-center gap-3 bg-white/10 text-white px-10 py-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                    <CopyIcon className="w-6 h-6" />
                    <span className="font-bold">Copy Vision Details</span>
                  </button>
                  <button onClick={() => handleDownload(selectedImage.src, generatedImages.indexOf(selectedImage))} className="flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all shadow-2xl">
                    <DownloadIcon className="w-6 h-6" />
                    <span className="font-bold">Download Masterwork</span>
                  </button>
               </div>
             </div>
          </div>
        )}

        {copiedPrompt && (
          <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-[60] bg-gray-900/90 backdrop-blur-xl text-white py-4 px-8 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-8 border border-white/10">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
              <span className="font-bold">Prompt Captured</span>
          </div>
        )}
      </main>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </div>
  );
};

export default App;