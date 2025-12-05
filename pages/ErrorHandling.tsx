import React, { useState } from 'react';

const scenarios = [
  { id: '404', label: 'HTTP 错误 (404 Not Found)', errorObj: 'Error: HTTP 404 Not Found' },
  { id: 'biz', label: '业务错误 (API code: 4001)', errorObj: 'Error: Business Code 4001' },
  { id: 'net', label: '网络错误 (CORS/Network Down)', errorObj: 'TypeError: Failed to fetch' },
];

const methods = [
  { id: 'none', label: '不处理 (默认，抛出异常)', suppresses: false },
  { id: 'destructure', label: '解构 `error` (抑制异常)', suppresses: true },
  { id: 'catch', label: '链式 `.catch()` (抑制异常)', suppresses: true },
  { id: 'suppress', label: '全局 `suppressError()` (抑制异常)', suppresses: true },
];

export default function ErrorHandling() {
  const [scenarioId, setScenarioId] = useState('404');
  const [methodId, setMethodId] = useState('destructure');

  const selectedMethod = methods.find(m => m.id === methodId) || methods[0];
  const selectedScenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];
  const isSuppressed = selectedMethod.suppresses;

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-4">错误处理机制可视化页 - 核心逻辑修正版</h1>
          <p className="text-slate-400 max-w-3xl">通过交互式流程图、代码示例和模拟器，深入理解 `toAwaitFetch` 的错误处理机制。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          
          <div className="flex flex-col gap-6">
            {/* Flow Chart */}
            <div className="bg-black/20 rounded-xl border border-white/10 p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold">可视化流程图</h3>
              </div>

              <div className="relative flex flex-col items-center gap-6">
                {/* Nodes */}
                <div className="w-48 bg-white/5 border border-white/10 rounded-lg p-3 text-center text-sm font-medium text-white shadow-lg">
                  1. 发起请求
                </div>
                
                <span className="material-symbols-outlined text-slate-500">arrow_downward</span>

                <div className="w-48 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center text-sm font-medium text-red-300 shadow-lg ring-2 ring-primary">
                  2. 请求失败
                </div>

                <span className="material-symbols-outlined text-slate-500">arrow_downward</span>

                <div className="w-56 bg-yellow-500/10 border-2 border-yellow-500/40 border-dashed rounded-lg p-3 text-center text-sm font-medium text-white relative ring-2 ring-primary">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background-dark px-2 text-xs text-yellow-500 font-bold">核心决策</span>
                   3. 异常是否抛出？
                </div>

                {/* Branches */}
                <div className="w-full grid grid-cols-2 gap-4 relative mt-2">
                   {/* Connection Lines */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-4 border-t border-slate-600"></div>
                   <div className="absolute top-0 left-[25%] h-4 border-l border-slate-600"></div>
                   <div className="absolute top-0 left-[75%] h-4 border-l border-slate-600"></div>

                   {/* YES Branch */}
                   <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${!isSuppressed ? 'opacity-100 scale-105' : 'opacity-30'}`}>
                      <div className="w-full bg-red-900/30 border border-red-800/50 rounded-lg p-4 text-center">
                         <span className="material-symbols-outlined text-red-500 text-2xl mb-1">gpp_bad</span>
                         <p className="text-red-400 font-bold text-sm">是：抛出异常</p>
                         <p className="text-xs text-slate-500 font-mono mt-1">Promise Rejects</p>
                      </div>
                      <div className="text-xs text-slate-500 border border-white/5 bg-white/5 px-2 py-1 rounded">默认行为</div>
                   </div>

                   {/* NO Branch */}
                   <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${isSuppressed ? 'opacity-100 scale-105 ring-2 ring-primary rounded-xl p-2 bg-primary/5' : 'opacity-30'}`}>
                      <div className="w-full bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                         <span className="material-symbols-outlined text-green-400 text-2xl mb-1">unpublished</span>
                         <p className="text-green-300 font-bold text-sm">否：抑制异常</p>
                         <p className="text-xs text-slate-500 font-mono mt-1">返回 [null, error]</p>
                      </div>
                      <div className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-slate-300 text-left">
                         <p className="text-primary font-bold mb-1">满足任一条件:</p>
                         <ul className="list-disc pl-4 space-y-1">
                           <li className={methodId === 'suppress' ? 'text-white font-bold' : ''}>全局 suppressError</li>
                           <li className={methodId === 'destructure' ? 'text-white font-bold' : ''}>解构 `error`</li>
                           <li className={methodId === 'catch' ? 'text-white font-bold' : ''}>链式 `.catch()`</li>
                         </ul>
                      </div>
                   </div>
                </div>

              </div>
            </div>
            
            {/* Status & Result */}
            <div className="bg-black/20 rounded-xl border border-white/10 p-6 space-y-4">
              <h3 className="text-white font-bold">状态与结果</h3>
              
              <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg">
                <span className="text-slate-400 text-sm">当前场景:</span>
                <span className="text-white text-sm font-medium">{selectedScenario.label}</span>
              </div>

              <div className="flex justify-between items-center bg-black/30 p-3 rounded-lg">
                <span className="text-slate-400 text-sm">异常是否抛出:</span>
                {isSuppressed ? (
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                     <span className="material-symbols-outlined text-sm">unpublished</span> 否 (已被抑制)
                  </span>
                ) : (
                  <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">
                     <span className="material-symbols-outlined text-sm">warning</span> 是 (Promise Rejected)
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 bg-black/30 p-3 rounded-lg">
                 <span className="text-slate-400 text-sm">最终返回值:</span>
                 <code className="text-slate-300 bg-black/50 px-3 py-2 rounded font-mono text-sm break-all">
                    {isSuppressed ? `[null, ${selectedScenario.errorObj}]` : `Uncaught (in promise) ${selectedScenario.errorObj}`}
                 </code>
              </div>
            </div>
          </div>

          {/* Controls & Code */}
          <div className="flex flex-col gap-6">
            <div className="bg-black/20 rounded-xl border border-white/10 p-6 space-y-6">
               <h3 className="text-white font-bold">交互式控制区</h3>

               <div className="space-y-2">
                 <label className="text-slate-400 text-sm">1. 选择错误场景</label>
                 <select 
                    value={scenarioId}
                    onChange={(e) => setScenarioId(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-lg text-white text-sm p-2.5 focus:ring-primary focus:border-primary"
                 >
                   {scenarios.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                 </select>
               </div>

               <div className="space-y-2 border-t border-white/10 pt-4">
                 <label className="text-slate-400 text-sm">2. 选择异常处理方式</label>
                 <div className="space-y-2">
                    {methods.map(m => (
                      <div 
                        key={m.id}
                        onClick={() => setMethodId(m.id)}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors border ${methodId === m.id ? 'bg-primary/20 border-primary/50' : 'bg-black/30 border-transparent hover:bg-white/5'}`}
                      >
                         <div className={`size-4 rounded-full border flex items-center justify-center mr-3 ${methodId === m.id ? 'border-primary' : 'border-slate-500'}`}>
                            {methodId === m.id && <div className="size-2 bg-primary rounded-full"></div>}
                         </div>
                         <span className={`text-sm ${methodId === m.id ? 'text-white' : 'text-slate-400'}`}>{m.label}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

            <div className="bg-black/20 rounded-xl border border-white/10 overflow-hidden">
               <div className="px-6 py-3 border-b border-white/10 flex gap-4">
                  <button className="text-primary text-sm font-bold border-b-2 border-primary py-1">代码示例</button>
               </div>
               <div className="p-6 bg-black/50 font-mono text-sm leading-relaxed overflow-x-auto">
<pre>
<code className="block text-slate-300">
<span className="text-slate-500">// 场景: {selectedScenario.label}</span>
<span className="text-purple-400">async function</span> <span className="text-yellow-300">fetchData</span>() {'{'}
  
{methodId === 'destructure' && (
<>
  <span className="text-slate-500">// 解构 error 会自动抑制异常抛出</span>
  <span className="bg-primary/20 block -mx-2 px-2 py-1"><span className="text-purple-400">const</span> [ data, error ] = <span className="text-purple-400">await</span> toAwaitFetch(url);</span>
  <span className="text-purple-400">if</span> (error) {'{'}
    console.log(<span className="text-green-400">'请求失败, 但未抛出异常'</span>, error);
    <span className="text-purple-400">return</span>;
  {'}'}
</>
)}

{methodId === 'none' && (
<>
  <span className="text-slate-500">// 默认模式：未捕获，将抛出异常</span>
  <span className="bg-red-500/20 block -mx-2 px-2 py-1"><span className="text-purple-400">await</span> toAwaitFetch(url);</span>
  <span className="text-slate-500">// 代码将在此处中断，进入 Promise.reject</span>
</>
)}

{methodId === 'catch' && (
<>
  <span className="text-slate-500">// 链式 catch 捕获异常</span>
  <span className="bg-primary/20 block -mx-2 px-2 py-1"><span className="text-purple-400">await</span> toAwaitFetch(url).<span className="text-sky-300">catch</span>(err =&gt; {'{'} ... {'}'});</span>
</>
)}

{methodId === 'suppress' && (
<>
  <span className="text-slate-500">// 全局配置了 suppressError</span>
  <span className="bg-primary/20 block -mx-2 px-2 py-1"><span className="text-purple-400">await</span> toAwaitFetch(url);</span>
  <span className="text-slate-500">// 异常被全局钩子拦截，不会在此处抛出</span>
</>
)}

{'}'}
</code>
</pre>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}