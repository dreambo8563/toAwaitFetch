import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [demoMode, setDemoMode] = useState<'chaining' | 'destructuring'>('chaining');
  const [isAnimating, setIsAnimating] = useState(false);

  const runDemo = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        
        {/* Hero */}
        <section className="flex flex-col items-center text-center gap-8 mb-20">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white">
            Introducing toAwaitFetch
          </h1>
          <h2 className="text-xl sm:text-2xl text-slate-400 max-w-2xl">
            The simplest way to handle HTTP requests and errors.
          </h2>
          <Link to="/config" className="mt-4 px-8 py-3 bg-primary text-background-dark font-bold rounded-lg hover:opacity-90 transition-opacity">
            Start Tutorial
          </Link>
        </section>

        {/* Interactive Demo */}
        <section className="w-full max-w-5xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-white mb-8">See It in Action: Two Powerful Ways to Use</h2>
          
          <div className="flex justify-center mb-6">
            <div className="flex bg-white/5 p-1 rounded-lg">
              <button 
                onClick={() => setDemoMode('chaining')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${demoMode === 'chaining' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Chaining (`.then`)
              </button>
              <button 
                onClick={() => setDemoMode('destructuring')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${demoMode === 'destructuring' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Destructuring (`await`)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Block */}
            <div className="relative bg-surface-dark/70 rounded-xl overflow-hidden border border-white/5 p-6 min-h-[300px]">
               <div className="absolute top-4 right-4">
                 <button onClick={runDemo} className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/30 transition-colors">
                   <span className="material-symbols-outlined text-lg">play_arrow</span> Run
                 </button>
               </div>
               <pre className="font-mono text-sm leading-relaxed text-slate-300">
                {demoMode === 'chaining' ? (
                  <code className="block whitespace-pre">
                    <span className="text-purple-400">import</span> toAwaitFetch <span className="text-purple-400">from</span> <span className="text-amber-300">'to-await-fetch'</span>;{'\n'}
                    {'\n'}
                    toAwaitFetch(<span className="text-amber-300">'https://api.example.com/data'</span>){'\n'}
                    {'  '}.<span className="text-sky-300">then</span>({'({ data, error })'} =&gt; {'{'}{'\n'}
                    {'    '}<span className="text-purple-400">if</span> (error) {'{'}{'\n'}
                    {'      '}console.<span className="text-sky-300">error</span>(error.message);{'\n'}
                    {'      '}<span className="text-purple-400">return</span>;{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'    '}console.<span className="text-sky-300">log</span>(data);{'\n'}
                    {'  '}{'}'});
                  </code>
                ) : (
                  <code className="block whitespace-pre">
                    <span className="text-purple-400">import</span> toAwaitFetch <span className="text-purple-400">from</span> <span className="text-amber-300">'to-await-fetch'</span>;{'\n'}
                    {'\n'}
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch({'\n'}
                    {'  '}<span className="text-amber-300">'https://api.example.com/data'</span>{'\n'}
                    );{'\n'}
                    {'\n'}
                    <span className="text-purple-400">if</span> (error) {'{'}{'\n'}
                    {'  '}console.<span className="text-sky-300">error</span>(error.message);{'\n'}
                    {'  '}<span className="text-purple-400">return</span>;{'\n'}
                    {'}'}{'\n'}
                    console.<span className="text-sky-300">log</span>(data);
                  </code>
                )}
              </pre>
            </div>

            {/* Animation Output */}
            <div className="bg-surface-dark/70 rounded-xl border border-white/5 p-6 flex flex-col justify-center items-center min-h-[300px]">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-auto w-full">Animated Output</h3>
              
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                {isAnimating ? (
                   <div className="flex items-center gap-4 animate-pulse">
                     <span className="material-symbols-outlined text-4xl text-primary">sync</span>
                     <span className="text-slate-300">Fetching data...</span>
                   </div>
                ) : (
                  <>
                    <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                      <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <p className="font-bold text-green-400 text-lg">API Call Successful</p>
                    <p className="text-slate-400 text-sm">Data object would appear here.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           <div className="bg-white/5 p-6 rounded-xl text-center hover:bg-white/10 transition-colors">
              <div className="size-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">link</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Effortless Chaining</h3>
              <p className="text-slate-400 text-sm">Intuitive `.then()` flow for handling data and errors in one place.</p>
           </div>
           <div className="bg-white/5 p-6 rounded-xl text-center hover:bg-white/10 transition-colors">
              <div className="size-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">data_object</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Clean Destructuring</h3>
              <p className="text-slate-400 text-sm">Leverage `async/await` for modern, readable asynchronous code.</p>
           </div>
           <div className="bg-white/5 p-6 rounded-xl text-center hover:bg-white/10 transition-colors">
              <div className="size-12 bg-primary/20 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">gpp_good</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Graceful Handling</h3>
              <p className="text-slate-400 text-sm">Never miss an error. Caught automatically and returned simply.</p>
           </div>
        </section>

        {/* CTA */}
        <section className="mt-24 bg-gradient-to-r from-primary/30 to-primary/5 rounded-2xl p-10 text-center max-w-6xl mx-auto w-full border border-primary/20">
           <h2 className="text-3xl font-bold text-white mb-4">Ready to Dive Deeper?</h2>
           <p className="text-slate-300 mb-8 max-w-xl mx-auto">Explore advanced features and master your data fetching workflow.</p>
           <Link to="/config" className="px-6 py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-colors">
             Learn about Configuration & Error Handling
           </Link>
        </section>

      </div>
    </div>
  );
}