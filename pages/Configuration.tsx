import React, { useState } from 'react';

const tabs = [
  { id: 'basic', label: '基础用法', icon: 'code' },
  { id: 'headers', label: 'Headers 配置', icon: 'http' },
  { id: 'retry', label: '重试机制', icon: 'repeat' },
  { id: 'status', label: 'validateStatus', icon: 'verified' },
  { id: 'response', label: 'validateResponse', icon: 'task_alt' },
  { id: 'transform', label: 'transformResponse', icon: 'transform' },
];

export default function Configuration() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">`toAwaitFetch` 配置详解</h1>
          <p className="text-lg text-slate-300">通过交互式示例，深入了解每个配置项如何增强您的 HTTP 请求。</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-700 mb-10 pb-1 gap-6 justify-start md:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Section */}
          <div className="flex flex-col gap-4">
             <h3 className="text-xl font-bold text-white">
               {tabs.find(t => t.id === activeTab)?.label} 演示
             </h3>
             <p className="text-slate-300">
               {activeTab === 'basic' && "最简单的用法，发起一个 GET 请求并获取数据。体验 `toAwaitFetch` 如何简化请求流程。"}
               {activeTab === 'headers' && "修改 `headers` 对象，动态改变请求头。观察动画中请求头信息如何被添加并发送至服务器。"}
               {activeTab === 'retry' && "当请求失败时，`toAwaitFetch` 可以自动重试。此动画模拟了一次失败和一次成功的重试。"}
               {activeTab === 'status' && "自定义 `validateStatus` 函数，决定哪些 HTTP 状态码表示成功。默认情况下，只有 2xx 状态码被视为成功。"}
               {activeTab === 'response' && "`validateResponse` 允许你检查响应体内的业务代码，即使 HTTP 状态码是 200，也能标记业务失败。"}
               {activeTab === 'transform' && "`transformResponse` 可以在数据返回前对其进行转换，例如，从嵌套结构中提取所需数据。"}
             </p>
             
             <div className="min-h-[300px] bg-surface-dark/90 rounded-xl p-6 border border-white/5 overflow-hidden font-mono text-sm leading-relaxed">
                {activeTab === 'basic' && (
                  <>
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">sendGet</span>(<span className="text-amber-300">'/api/user/1'</span>);
                    <br/><span className="text-purple-400">if</span> (data) {'{'}
                    <br/>&nbsp;&nbsp;<span className="text-gray-500">// Request succeeded</span>
                    <br/>&nbsp;&nbsp;console.<span className="text-sky-300">log</span>(data);
                    <br/>{'}'} <span className="text-purple-400">else</span> {'{'}
                    <br/>&nbsp;&nbsp;<span className="text-gray-500">// Request failed</span>
                    <br/>&nbsp;&nbsp;console.<span className="text-sky-300">error</span>(error);
                    <br/>{'}'}
                  </>
                )}
                {activeTab === 'headers' && (
                  <>
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">create</span>({'{'}
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-blue-500/20 border-l-2 border-blue-500 pl-2 block my-1">
                      <span className="text-cyan-300">headers</span>: {'{'}
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">'X-API-KEY'</span>: <span className="text-amber-300">'YOUR_KEY'</span>,
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">'Content-Type'</span>: <span className="text-amber-300">'application/json'</span>
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                    </span>
                    &nbsp;&nbsp;{'}'})
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">sendPost</span>(<span className="text-amber-300">'/users'</span>, {'{'} <span className="text-cyan-300">name</span>: <span className="text-amber-300">'Alice'</span> {'}'});
                  </>
                )}
                {activeTab === 'retry' && (
                   <>
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">create</span>({'{'}
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-blue-500/20 border-l-2 border-blue-500 pl-2 block my-1">
                      <span className="text-cyan-300">retry</span>: {'{'}
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-300">retries</span>: <span className="text-teal-300">1</span>,
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-300">delay</span>: <span className="text-teal-300">1000</span>
                      <br/>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}
                    </span>
                    &nbsp;&nbsp;{'}'})
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">sendGet</span>(<span className="text-amber-300">'/api/flaky'</span>);
                   </>
                )}
                {activeTab === 'status' && (
                   <>
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">create</span>({'{'}
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-blue-500/20 border-l-2 border-blue-500 pl-2 block my-1">
                       <span className="text-cyan-300">validateStatus</span>: (<span className="text-orange-300">s</span>) =&gt; <span className="text-orange-300">s</span> &gt;= <span className="text-teal-300">200</span> &amp;&amp; <span className="text-orange-300">s</span> &lt; <span className="text-teal-300">400</span>
                    </span>
                    &nbsp;&nbsp;{'}'})
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">sendGet</span>(<span className="text-amber-300">'/api/resource'</span>);
                   </>
                )}
                {activeTab === 'response' && (
                  <>
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">create</span>({'{'}
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-blue-500/20 border-l-2 border-blue-500 pl-2 block my-1">
                       <span className="text-cyan-300">validateResponse</span>: (<span className="text-orange-300">res</span>) =&gt; <span className="text-orange-300">res</span>.<span className="text-cyan-300">code</span> === <span className="text-teal-300">0</span>
                    </span>
                    &nbsp;&nbsp;{'}'})
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">sendGet</span>(<span className="text-amber-300">'/api/data'</span>);
                  </>
                )}
                {activeTab === 'transform' && (
                  <>
                    <span className="text-purple-400">const</span> {'{ data, error }'} = <span className="text-purple-400">await</span> toAwaitFetch
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">create</span>({'{'}
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;<span className="bg-blue-500/20 border-l-2 border-blue-500 pl-2 block my-1">
                       <span className="text-cyan-300">transformResponse</span>: (<span className="text-orange-300">res</span>) =&gt; <span className="text-orange-300">res</span>.<span className="text-cyan-300">data</span>.<span className="text-cyan-300">user</span>
                    </span>
                    &nbsp;&nbsp;{'}'})
                    <br/>&nbsp;&nbsp;.<span className="text-sky-300">sendGet</span>(<span className="text-amber-300">'/api/user'</span>);
                  </>
                )}
             </div>
          </div>

          {/* Animation Section */}
          <div className="flex flex-col gap-4">
             <h3 className="text-sm font-medium uppercase tracking-wider text-slate-400">动画输出</h3>
             <div className="flex-1 min-h-[300px] bg-surface-dark/90 rounded-xl p-6 border border-white/5 flex flex-col justify-center overflow-hidden">
                
                {/* Basic & Headers & Retry Animation Base */}
                {(activeTab === 'basic' || activeTab === 'headers' || activeTab === 'retry') && (
                  <div className="flex flex-col h-full justify-center">
                    <div className="flex items-center gap-4 w-full relative">
                        {/* Client Node */}
                        <div className="flex flex-col items-center gap-2 z-10">
                           <div className="size-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                             <span className="material-symbols-outlined text-3xl">source</span>
                           </div>
                           <p className="text-xs text-slate-300">Client</p>
                        </div>

                        {/* Connection Line */}
                        <div className="flex-1 relative h-1 bg-slate-700 overflow-hidden rounded-full">
                           {activeTab === 'retry' ? (
                              <>
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0 animate-[pulsePacket_2s_ease-in-out_infinite]" />
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 animate-[pulsePacket_2s_ease-in-out_1s_infinite]" />
                              </>
                           ) : (
                              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 animate-pulse-packet" />
                           )}
                        </div>

                        {/* Headers Box Floating */}
                        {activeTab === 'headers' && (
                          <div className="absolute left-1/2 top-10 -translate-x-1/2 bg-slate-800 p-2 rounded border border-primary/50 text-[10px] text-slate-300 z-20 shadow-lg animate-pulse">
                            <p className="font-bold">X-API-KEY: YOUR_KEY</p>
                            <p>Content-Type: application/json</p>
                          </div>
                        )}

                        {/* Server Node */}
                        <div className="flex flex-col items-center gap-2 z-10">
                           <div className={`size-12 rounded-full flex items-center justify-center ring-1 ring-inset ${activeTab === 'retry' ? 'bg-red-500/20 text-red-400 ring-red-500/30' : 'bg-green-500/20 text-green-400 ring-green-500/30'}`}>
                             <span className="material-symbols-outlined text-3xl">dns</span>
                           </div>
                           <p className="text-xs text-slate-300">Server</p>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm">
                       {activeTab === 'basic' && (
                         <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg">
                           <span className="text-slate-400">Response:</span>
                           <span className="text-green-400 font-mono">Success</span>
                         </div>
                       )}
                       {activeTab === 'headers' && <p className="text-slate-400">Server received headers successfully.</p>}
                       {activeTab === 'retry' && (
                         <div className="space-y-2">
                           <p className="text-red-400">Attempt 1: Failed</p>
                           <p className="text-slate-500 text-xs animate-retry-pulse">Retrying in 1s...</p>
                           <p className="text-green-400 pt-2 border-t border-white/5 mt-2">Attempt 2: Success</p>
                         </div>
                       )}
                    </div>
                  </div>
                )}

                {/* Status Animation */}
                {activeTab === 'status' && (
                  <div className="space-y-4 px-4">
                     <div className="flex items-center gap-4">
                        <div className="bg-slate-800 px-2 py-1 rounded text-xs font-mono text-slate-300">Status: 200</div>
                        <div className="h-px bg-slate-700 flex-1"></div>
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <span className="material-symbols-outlined text-sm">check_circle</span> Success
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="bg-slate-800 px-2 py-1 rounded text-xs font-mono text-slate-300">Status: 304</div>
                        <div className="h-px bg-slate-700 flex-1"></div>
                        <div className="flex items-center gap-1 text-green-400 text-sm ring-1 ring-green-500 rounded px-2 py-0.5 bg-green-500/10">
                          <span className="material-symbols-outlined text-sm">check_circle</span> Success
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="bg-slate-800 px-2 py-1 rounded text-xs font-mono text-slate-300">Status: 404</div>
                        <div className="h-px bg-slate-700 flex-1"></div>
                        <div className="flex items-center gap-1 text-red-400 text-sm">
                          <span className="material-symbols-outlined text-sm">cancel</span> Error
                        </div>
                     </div>
                     <div className="mt-4 p-3 bg-slate-800/50 rounded text-xs text-center text-slate-400">
                        Custom logic accepts 304 as Success.
                     </div>
                  </div>
                )}

                {/* Validate Response Animation */}
                {activeTab === 'response' && (
                  <div className="flex flex-col gap-4 items-center w-full">
                     <div className="text-xs text-slate-400 mb-2">Server Response (HTTP 200)</div>
                     
                     <div className="relative w-full bg-slate-800 p-3 rounded border border-white/5 font-mono text-xs text-slate-300">
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-green-500 rounded-full p-1 text-white shadow-lg"><span className="material-symbols-outlined text-sm block">task_alt</span></div>
                        <pre>
{`{
  "code": `}<span className="bg-blue-500/20 text-blue-300 px-1">0</span>{`,
  "message": "Success",
  "data": { ... }
}`}
                        </pre>
                     </div>
                     <div className="text-green-400 text-xs font-bold">✔ Business Logic Success</div>

                     <div className="relative w-full bg-slate-800 p-3 rounded border border-white/5 font-mono text-xs text-slate-300 mt-2">
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-red-500 rounded-full p-1 text-white shadow-lg"><span className="material-symbols-outlined text-sm block">error</span></div>
                        <pre>
{`{
  "code": `}<span className="bg-red-500/20 text-red-300 px-1">1001</span>{`,
  "message": "Permission Denied",
  "data": null
}`}
                        </pre>
                     </div>
                     <div className="text-red-400 text-xs font-bold">❌ Business Logic Error</div>
                  </div>
                )}

                {/* Transform Animation */}
                {activeTab === 'transform' && (
                  <div className="flex flex-col gap-4 items-center w-full">
                     <div className="w-full">
                       <p className="text-[10px] uppercase text-slate-500 mb-1">Original Response</p>
                       <div className="bg-slate-800 p-3 rounded font-mono text-xs text-slate-300">
<pre>{`{
  "code": 0,
  "message": "Success",
  `}<span className="bg-green-500/10 text-green-300 px-1">{`"data": {
    "user": {
      "id": 1,
      "name": "Alice"
    }
  }`}</span>{`
}`}</pre>
                       </div>
                     </div>
                     
                     <span className="material-symbols-outlined text-primary text-3xl animate-bounce">arrow_downward</span>

                     <div className="w-full">
                       <p className="text-[10px] uppercase text-slate-500 mb-1">Transformed `data`</p>
                       <div className="bg-slate-800 p-3 rounded font-mono text-xs text-green-300 border border-primary/30">
<pre>{`{
  "id": 1,
  "name": "Alice"
}`}</pre>
                       </div>
                     </div>
                  </div>
                )}

             </div>
          </div>
        </div>

      </div>
    </div>
  );
}