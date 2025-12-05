import { useState } from 'react';

const SimResult = ({ step, text, icon, color }: { step: number; text: string; icon: string; color: string }) => (
  <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500">
    <div className={`size-6 rounded-full flex items-center justify-center ${color === 'primary' ? 'bg-primary/20 text-primary' : color === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
      <span className="material-symbols-outlined text-sm">{icon}</span>
    </div>
    <span className={`${color === 'primary' ? 'text-white' : color === 'green' ? 'text-green-400' : 'text-slate-400'} text-sm`}>
       {text}
    </span>
  </div>
);

export default function BestPractices() {
  const [simState, setSimState] = useState<{id: string, stage: number}>({ id: '', stage: 0 });

  const runSim = (id: string) => {
    setSimState({ id, stage: 1 });
    setTimeout(() => setSimState({ id, stage: 2 }), 800);
    setTimeout(() => setSimState({ id, stage: 3 }), 1600);
    setTimeout(() => setSimState({ id, stage: 4 }), 2400);
  };

  return (
    <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl flex flex-col gap-16">
        
        <div className="text-center space-y-4">
           <h1 className="text-4xl font-black text-white">封装最佳实践：<span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-mono text-3xl">http.ts</span></h1>
           <p className="text-slate-400 max-w-3xl mx-auto">学习如何通过封装 `http.ts` 来统一管理项目中的网络请求，包括错误处理、动态请求头、重试逻辑、文件上传和下载。</p>
        </div>

        {/* Global Config Block */}
        <section className="scroll-mt-24">
           <h2 className="text-2xl font-bold text-white mb-4">全局封装：<span className="font-mono text-primary bg-primary/10 px-2 py-1 rounded text-lg">http.ts</span> 最佳实践</h2>
           <p className="text-slate-400 mb-6">在一个独立的文件中配置 `toAwaitFetch` 实例，统一处理请求头、拦截器和错误。</p>
           
           <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden shadow-2xl">
             <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-xs text-slate-400 font-mono">src/utils/http.ts</div>
             <div className="p-6 overflow-x-auto">
               <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre">
                 <span className="text-purple-400">import</span> {'{ createToAwaitFetch }'} <span className="text-purple-400">from</span> <span className="text-amber-300">'to-await-fetch'</span>;{'\n'}
                 <span className="text-purple-400">import</span> {'{ Toast }'} <span className="text-purple-400">from</span> <span className="text-amber-300">'@/components/Toast'</span>;{'\n'}
                 {'\n'}
                 <span className="text-purple-400">export const</span> http = <span className="text-sky-300">createToAwaitFetch</span>({'{'}{'\n'}
                 {'  '}<span className="text-slate-500">// 基础配置</span>{'\n'}
                 {'  '}baseURL: <span className="text-amber-300">'https://api.demo.com'</span>,{'\n'}
                 {'  '}timeout: <span className="text-teal-300">10000</span>,{'\n'}
                 {'\n'}
                 {'  '}<span className="text-slate-500">// 动态设置请求头</span>{'\n'}
                 {'  '}<span className="text-cyan-300">headers</span>: () =&gt; {'{'}{'\n'}
                 {'    '}<span className="text-purple-400">const</span> token = localStorage.getItem(<span className="text-amber-300">'token'</span>);{'\n'}
                 {'    '}<span className="text-purple-400">return</span> token ? {'{'} <span className="text-green-400">'Authorization'</span>: <span className="text-amber-300">{"`Bearer ${token}`"}</span> {'}'} : {'{}'};{'\n'}
                 {'  '}{'}'},{'\n'}
                 {'\n'}
                 {'  '}<span className="text-slate-500">// 业务错误处理器 code !== 0</span>{'\n'}
                 {'  '}<span className="text-cyan-300">onBusinessError</span>: (res, <span className="text-orange-300">suppress</span>) =&gt; {'{'}{'\n'}
                 {'    '}<span className="text-purple-400">if</span> (res.code === <span className="text-teal-300">401</span>) {'{'}{'\n'}
                 {'      '}router.push(<span className="text-amber-300">'/login'</span>);{'\n'}
                 {'      '}<span className="text-orange-300">suppress</span>(); <span className="text-slate-500">// 抑制报错，业务侧不用处理</span>{'\n'}
                 {'    '}{'}'} <span className="text-purple-400">else</span> {'{'}{'\n'}
                 {'      '}Toast.show(res.message);{'\n'}
                 {'    '}{'}'}{'\n'}
                 {'  '}{'}'},{'\n'}
                 {'\n'}
                 {'  '}<span className="text-slate-500">// 网络/HTTP错误处理器</span>{'\n'}
                 {'  '}<span className="text-cyan-300">onNetworkError</span>: (err) =&gt; {'{'}{'\n'}
                 {'     '}Toast.show(<span className="text-amber-300">'网络开小差了'</span>);{'\n'}
                 {'  '}{'}'},{'\n'}
                 {'\n'}
                 {'  '}<span className="text-slate-500">// 自动重试</span>{'\n'}
                 {'  '}<span className="text-cyan-300">retry</span>: {'{'}{'\n'}
                 {'    '}retries: <span className="text-teal-300">3</span>,{'\n'}
                 {'    '}shouldRetry: (err) =&gt; err.response?.status &gt;= <span className="text-teal-300">500</span>{'\n'}
                 {'  '}{'}'}{'\n'}
                 {'}'});
               </pre>
             </div>
           </div>
        </section>

        {/* Usage Demo */}
        <section className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-white">业务侧调用示例</h2>
              <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden flex-1">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-xs text-slate-400 font-mono">src/api/user.ts</div>
                <div className="p-6">
                  <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre">
                    <span className="text-purple-400">import</span> {'{ http }'} <span className="text-purple-400">from</span> <span className="text-amber-300">'@/utils/http'</span>;{'\n'}
                    {'\n'}
                    <span className="text-purple-400">export async function</span> <span className="text-sky-300">getUserInfo</span>(userId) {'{'}{'\n'}
                    {'  '}<span className="text-slate-500">// 自动应用全局配置</span>{'\n'}
                    {'  '}<span className="text-purple-400">const</span> [err, data] = <span className="text-purple-400">await</span> http.<span className="text-sky-300">sendGet</span>({'\n'}
                    {'    '}<span className="text-amber-300">{"`/users/${'{'}`"}userId{'}'}`</span>{'\n'}
                    {'  '});{'\n'}
                    {'  '}<span className="text-purple-400">if</span> (err) <span className="text-purple-400">return</span> <span className="text-teal-300">null</span>;{'\n'}
                    {'  '}<span className="text-purple-400">return</span> data;{'\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-dark border border-white/10 rounded-xl p-8 flex flex-col justify-center">
               <button 
                 onClick={() => runSim('usage')}
                 disabled={simState.id === 'usage' && simState.stage < 4}
                 className="w-full h-12 bg-primary text-background-dark font-bold rounded flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
               >
                 <span className="material-symbols-outlined">play_circle</span> 模拟调用
               </button>
               
               <div className="mt-6 space-y-4 min-h-[160px]">
                  {simState.id === 'usage' && simState.stage >= 1 && <SimResult step={1} text="调用: getUserInfo('123')" icon="login" color="default" />}
                  {simState.id === 'usage' && simState.stage >= 2 && <SimResult step={2} text="继承全局配置: 添加 Authorization 请求头" icon="add_moderator" color="primary" />}
                  {simState.id === 'usage' && simState.stage >= 3 && <SimResult step={3} text="发送请求: GET /users/123" icon="public" color="primary" />}
                  {simState.id === 'usage' && simState.stage >= 4 && <SimResult step={4} text="成功, 返回 [null, { id: '123', name: 'Alice' }]" icon="check" color="green" />}
               </div>
            </div>
        </section>

        {/* Upload Demo */}
        <section className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-white">文件上传 (FormData)</h2>
              <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden flex-1">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-xs text-slate-400 font-mono">src/api/upload.ts</div>
                <div className="p-6">
                  <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre">
                    <span className="text-purple-400">export function</span> <span className="text-sky-300">uploadAvatar</span>(file, uid) {'{'}{'\n'}
                    {'  '}<span className="text-purple-400">return</span> http.<span className="text-sky-300">sendPostForm</span>({'\n'}
                    {'    '}<span className="text-amber-300">{"`/users/${'{'}`"}uid{'}'}/avatar`</span>,{'\n'}
                    {'    '}{'{'}{'\n'}
                    {'      '}<span className="text-slate-500">// file字段自动作为文件处理</span>{'\n'}
                    {'      '}file: file,{'\n'}
                    {'      '}<span className="text-slate-500">// 其他字段作为文本</span>{'\n'}
                    {'      '}type: <span className="text-amber-300">'avatar'</span>{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'  '});{'\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-dark border border-white/10 rounded-xl p-8 flex flex-col justify-center">
               <button 
                 onClick={() => runSim('upload')}
                 disabled={simState.id === 'upload' && simState.stage < 4}
                 className="w-full h-12 bg-primary text-background-dark font-bold rounded flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
               >
                 <span className="material-symbols-outlined">upload_file</span> 模拟上传
               </button>
               
               <div className="mt-6 space-y-4 min-h-[160px]">
                  {simState.id === 'upload' && simState.stage >= 1 && <SimResult step={1} text="选择文件: avatar.png" icon="attach_file" color="default" />}
                  {simState.id === 'upload' && simState.stage >= 2 && <SimResult step={2} text="自动打包为 FormData (multipart/form-data)" icon="inventory_2" color="primary" />}
                  {simState.id === 'upload' && simState.stage >= 3 && <SimResult step={3} text="发送请求: POST /users/1/avatar" icon="cloud_upload" color="primary" />}
                  {simState.id === 'upload' && simState.stage >= 4 && <SimResult step={4} text="上传成功, 返回 [null, { url: '...' }]" icon="check" color="green" />}
               </div>
            </div>
        </section>

         {/* Download Demo */}
         <section className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-white">文件下载 (Blob)</h2>
              <div className="bg-surface-dark border border-white/10 rounded-xl overflow-hidden flex-1">
                <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-xs text-slate-400 font-mono">src/api/download.ts</div>
                <div className="p-6">
                  <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre">
                    <span className="text-purple-400">export async function</span> <span className="text-sky-300">downloadFile</span>(id) {'{'}{'\n'}
                    {'  '}<span className="text-purple-400">const</span> [err, blob] = <span className="text-purple-400">await</span> http.<span className="text-sky-300">sendGetBlob</span>({'\n'}
                    {'    '}<span className="text-amber-300">{"`/files/${'{'}`"}id{'}'}/download`</span>{'\n'}
                    {'  '});{'\n'}
                    {'  '}<span className="text-purple-400">if</span> (blob) {'{'}{'\n'}
                    {'    '}<span className="text-purple-400">const</span> url = URL.<span className="text-sky-300">createObjectURL</span>(blob);{'\n'}
                    {'    '}<span className="text-purple-400">const</span> a = document.createElement(<span className="text-amber-300">'a'</span>);{'\n'}
                    {'    '}a.href = url;{'\n'}
                    {'    '}a.download = <span className="text-amber-300">'file.ext'</span>;{'\n'}
                    {'    '}a.click();{'\n'}
                    {'  '}{'}'}{'\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-dark border border-white/10 rounded-xl p-8 flex flex-col justify-center">
               <button 
                 onClick={() => runSim('download')}
                 disabled={simState.id === 'download' && simState.stage < 4}
                 className="w-full h-12 bg-primary text-background-dark font-bold rounded flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
               >
                 <span className="material-symbols-outlined">download</span> 模拟下载
               </button>
               
               <div className="mt-6 space-y-4 min-h-[160px]">
                  {simState.id === 'download' && simState.stage >= 1 && <SimResult step={1} text="发送请求: GET /files/123/download" icon="public" color="primary" />}
                  {simState.id === 'download' && simState.stage >= 2 && <SimResult step={2} text="设置 responseType: 'blob'" icon="settings_ethernet" color="primary" />}
                  {simState.id === 'download' && simState.stage >= 3 && <SimResult step={3} text="接收二进制 Blob 数据流" icon="data_object" color="primary" />}
                  {simState.id === 'download' && simState.stage >= 4 && <SimResult step={4} text="成功, 触发浏览器下载行为" icon="check" color="green" />}
               </div>
            </div>
        </section>

      </div>
    </div>
  );
}