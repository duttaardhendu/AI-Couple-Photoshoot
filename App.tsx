
import React, { useState, useMemo } from 'react';
import { THEMES, ASPECT_RATIOS } from './constants';
import { Theme, GeneratedImage } from './types';
import { generateCouplePhotoshoot } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import { CopyIcon, DownloadIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [maleImageFile, setMaleImageFile] = useState<File | null>(null);
  const [femaleImageFile, setFemaleImageFile] = useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(THEMES[0]);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

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
        setGeneratedImages(images);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };
  
  const handleDownload = (src: string, index: number) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `couple-photoshoot-${selectedTheme?.name.replace(/\s+/g, '-').toLowerCase()}-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">AI Couple Photoshoot</h1>
          <p className="mt-4 text-lg text-gray-600">Two faces, infinite memories — powered by Nano Banana.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Controls Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">1. Upload Faces</h2>
              <div className="grid grid-cols-2 gap-4">
                <ImageUploader label="Male Face" onImageUpload={setMaleImageFile} />
                <ImageUploader label="Female Face" onImageUpload={setFemaleImageFile} />
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">2. Choose a Theme</h2>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {THEMES.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                      selectedTheme?.id === theme.id
                        ? 'bg-indigo-50 border-indigo-500 shadow-sm'
                        : 'bg-gray-50 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{theme.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
               <h2 className="text-xl font-semibold text-gray-900">3. Select Aspect Ratio</h2>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {ASPECT_RATIOS.map((ratio) => (
                  <option key={ratio} value={ratio}>{ratio}{ratio === '21:9' && ' (Cinematic)'}</option>
                ))}
              </select>
            </div>

            <div className="sticky bottom-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerationDisabled}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-6 h-6" />
                    Generate Photoshoot
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2">
            {isLoading && (
               <div className="flex flex-col items-center justify-center h-full min-h-[50vh] bg-white rounded-xl shadow-md p-8">
                  <div className="text-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto animate-spin" style={{borderTopColor: '#4f46e5'}}></div>
                    <h3 className="text-lg font-semibold text-gray-800">Your photoshoot is being created...</h3>
                    <p className="text-gray-500 mt-2">The AI is warming up the studio lights and finding the perfect poses. This may take a moment.</p>
                  </div>
              </div>
            )}
            {error && <div className="text-center p-8 bg-red-50 text-red-700 rounded-xl shadow-md">{error}</div>}
            
            {!isLoading && generatedImages.length === 0 && (
                <div className="flex items-center justify-center h-full min-h-[50vh] bg-white/50 border-2 border-dashed border-gray-300 rounded-xl p-8">
                    <div className="text-center text-gray-500">
                        <SparklesIcon className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-xl font-semibold">Your Generated Photos Will Appear Here</h3>
                        <p className="mt-2">Upload two faces, select a theme, and click generate!</p>
                    </div>
                </div>
            )}

            {generatedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {generatedImages.map((image, index) => (
                  <div key={index} className="group relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img src={image.src} alt={`Generated couple photo ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col justify-between p-3">
                        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            {aspectRatio}
                        </div>
                       <div className="absolute bottom-12 right-2 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => handleCopyPrompt(image.prompt)} className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-110">
                            <CopyIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDownload(image.src, index)} className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white hover:text-indigo-600 transition-all transform hover:scale-110">
                            <DownloadIcon className="w-5 h-5" />
                        </button>
                       </div>
                       <p className="absolute bottom-2 left-2 text-white text-xs font-mono opacity-50 select-none">Generated by Nano Banana</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
             {copiedPrompt && (
                <div className="fixed bottom-5 right-5 bg-gray-900 text-white py-2 px-4 rounded-lg shadow-lg text-sm transition-opacity duration-300">
                    Prompt copied to clipboard!
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
