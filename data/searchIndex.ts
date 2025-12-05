export interface SearchItem {
  id: string;
  title: string;
  content: string;
  path: string;
  category: string;
  keywords: string[];
  priority: number; // 1-5, 5 being highest priority
}

export const searchIndex: SearchItem[] = [
  // 首页内容
  {
    id: 'home-intro',
    title: 'toAwaitFetch 介绍',
    content: 'toAwaitFetch 是处理 HTTP 请求和错误的最简单方式。支持链式调用和解构赋值两种使用方式。',
    path: '/',
    category: '介绍',
    keywords: ['toAwaitFetch', '介绍', 'HTTP', '请求', '错误处理', '简单'],
    priority: 5
  },
  {
    id: 'home-chaining',
    title: '链式调用 (.then)',
    content: 'toAwaitFetch(url).then(({ data, error }) => { if (error) { console.error(error.message); return; } console.log(data); });',
    path: '/',
    category: '使用方式',
    keywords: ['链式调用', 'then', '方法链', 'Promise'],
    priority: 4
  },
  {
    id: 'home-destructuring',
    title: '解构赋值 (await)',
    content: 'const { data, error } = await toAwaitFetch(url); if (error) { console.error(error.message); return; } console.log(data);',
    path: '/',
    category: '使用方式',
    keywords: ['解构赋值', 'await', 'async', '异步'],
    priority: 4
  },
  {
    id: 'home-features',
    title: '核心特性',
    content: '轻松链式调用，直观的 .then() 流程处理数据和错误。清晰解构，利用 async/await 实现现代可读的异步代码。优雅处理，永不遗漏错误，自动捕获并简单返回。',
    path: '/',
    category: '特性',
    keywords: ['特性', '链式', '解构', '错误处理', '异步', '优雅'],
    priority: 3
  },

  // 配置详解页面
  {
    id: 'config-basic',
    title: '基础用法',
    content: 'const { data, error } = await toAwaitFetch.sendGet(\'/api/user/1\'); 最简单的用法，发起一个 GET 请求并获取数据。',
    path: '/config',
    category: '配置',
    keywords: ['基础用法', 'sendGet', 'GET请求', '基本配置'],
    priority: 5
  },
  {
    id: 'config-headers',
    title: 'Headers 配置',
    content: 'headers: { \'X-API-KEY\': \'YOUR_KEY\', \'Content-Type\': \'application/json\' } 修改 headers 对象，动态改变请求头。',
    path: '/config',
    category: '配置',
    keywords: ['headers', '请求头', 'X-API-KEY', 'Content-Type', 'API密钥'],
    priority: 4
  },
  {
    id: 'config-retry',
    title: '重试机制',
    content: 'retry: { retries: 1, delay: 1000 } 当请求失败时，toAwaitFetch 可以自动重试。',
    path: '/config',
    category: '配置',
    keywords: ['重试', 'retry', 'retries', 'delay', '自动重试', '失败重试'],
    priority: 4
  },
  {
    id: 'config-validate-status',
    title: 'validateStatus',
    content: 'validateStatus: (s) => s >= 200 && s < 400 自定义 validateStatus 函数，决定哪些 HTTP 状态码表示成功。',
    path: '/config',
    category: '配置',
    keywords: ['validateStatus', '状态码', 'HTTP状态', '成功判断', '200', '400'],
    priority: 3
  },
  {
    id: 'config-validate-response',
    title: 'validateResponse',
    content: 'validateResponse: (res) => res.code === 0 允许你检查响应体内的业务代码，即使 HTTP 状态码是 200，也能标记业务失败。',
    path: '/config',
    category: '配置',
    keywords: ['validateResponse', '业务代码', '响应验证', 'code', '业务失败'],
    priority: 3
  },
  {
    id: 'config-transform-response',
    title: 'transformResponse',
    content: 'transformResponse: (res) => res.data.user 可以在数据返回前对其进行转换，例如，从嵌套结构中提取所需数据。',
    path: '/config',
    category: '配置',
    keywords: ['transformResponse', '数据转换', '响应转换', '嵌套结构', '数据提取'],
    priority: 3
  },

  // 最佳实践页面
  {
    id: 'practices-http-wrapper',
    title: 'http.ts 封装最佳实践',
    content: '在一个独立的文件中配置 toAwaitFetch 实例，统一处理请求头、拦截器和错误。export const http = createToAwaitFetch({ baseURL, timeout, headers, onBusinessError, onNetworkError, retry });',
    path: '/practices',
    category: '最佳实践',
    keywords: ['http.ts', '封装', '全局配置', 'createToAwaitFetch', 'baseURL', 'timeout'],
    priority: 5
  },
  {
    id: 'practices-global-config',
    title: '全局配置',
    content: '基础配置 baseURL, timeout；动态请求头 headers 函数；业务错误处理器 onBusinessError；网络错误处理器 onNetworkError；自动重试 retry 配置。',
    path: '/practices',
    category: '最佳实践',
    keywords: ['全局配置', 'baseURL', 'timeout', 'onBusinessError', 'onNetworkError', '动态请求头'],
    priority: 4
  },
  {
    id: 'practices-file-upload',
    title: '文件上传 (FormData)',
    content: 'http.sendPostForm(url, { file: file, type: \'avatar\' }) 文件字段自动作为文件处理，其他字段作为文本。自动打包为 FormData (multipart/form-data)。',
    path: '/practices',
    category: '最佳实践',
    keywords: ['文件上传', 'FormData', 'sendPostForm', 'multipart', 'form-data', 'avatar'],
    priority: 4
  },
  {
    id: 'practices-file-download',
    title: '文件下载 (Blob)',
    content: 'http.sendGetBlob(url) 设置 responseType: \'blob\'，接收二进制 Blob 数据流，触发浏览器下载行为。',
    path: '/practices',
    category: '最佳实践',
    keywords: ['文件下载', 'Blob', 'sendGetBlob', 'responseType', '二进制', '下载'],
    priority: 4
  },
  {
    id: 'practices-business-usage',
    title: '业务侧调用示例',
    content: 'export async function getUserInfo(userId) { const [err, data] = await http.sendGet(`/users/${userId}`); if (err) return null; return data; }',
    path: '/practices',
    category: '最佳实践',
    keywords: ['业务调用', 'getUserInfo', 'sendGet', '用户信息', 'API调用'],
    priority: 3
  },

  // 错误处理页面
  {
    id: 'error-http-errors',
    title: 'HTTP 错误 (404 Not Found)',
    content: 'HTTP 404 Not Found 错误。当请求的资源不存在时发生。Error: HTTP 404 Not Found',
    path: '/debug',
    category: '错误处理',
    keywords: ['HTTP错误', '404', 'Not Found', '资源不存在', 'HTTP状态码'],
    priority: 4
  },
  {
    id: 'error-business-errors',
    title: '业务错误 (API code)',
    content: '业务错误 API code: 4001。服务器返回的业务逻辑错误代码。Error: Business Code 4001',
    path: '/debug',
    category: '错误处理',
    keywords: ['业务错误', 'API code', '4001', '业务逻辑', '错误代码'],
    priority: 4
  },
  {
    id: 'error-network-errors',
    title: '网络错误 (CORS/Network Down)',
    content: '网络错误 CORS 或网络中断。跨域请求被阻止或网络连接问题。TypeError: Failed to fetch',
    path: '/debug',
    category: '错误处理',
    keywords: ['网络错误', 'CORS', 'Network Down', '跨域', '网络中断', 'Failed to fetch'],
    priority: 4
  },
  {
    id: 'error-exception-handling',
    title: '异常处理机制',
    content: '异常是否抛出的核心决策。默认抛出异常 Promise Rejects；抑制异常返回 [null, error]。满足条件：全局 suppressError、解构 error、链式 catch。',
    path: '/debug',
    category: '错误处理',
    keywords: ['异常处理', '异常抛出', '异常抑制', 'suppressError', '解构error', 'catch'],
    priority: 5
  },
  {
    id: 'error-destructure-method',
    title: '解构 error 方法',
    content: 'const [data, error] = await toAwaitFetch(url); 解构 error 会自动抑制异常抛出。请求失败但未抛出异常。',
    path: '/debug',
    category: '错误处理',
    keywords: ['解构error', '异常抑制', '自动抑制', '解构赋值'],
    priority: 3
  },
  {
    id: 'error-catch-method',
    title: '链式 catch 方法',
    content: 'await toAwaitFetch(url).catch(err => { ... }); 链式 catch 捕获异常，防止异常向上传播。',
    path: '/debug',
    category: '错误处理',
    keywords: ['链式catch', '捕获异常', 'catch方法', '异常传播'],
    priority: 3
  },
  {
    id: 'error-suppress-global',
    title: '全局 suppressError',
    content: '全局配置了 suppressError。异常被全局钩子拦截，不会在调用处抛出。',
    path: '/debug',
    category: '错误处理',
    keywords: ['suppressError', '全局配置', '全局钩子', '异常拦截'],
    priority: 3
  },

  // API 方法
  {
    id: 'api-sendget',
    title: 'sendGet 方法',
    content: 'toAwaitFetch.sendGet(url) 发送 GET 请求获取数据。最常用的 HTTP 方法。',
    path: '/config',
    category: 'API方法',
    keywords: ['sendGet', 'GET请求', 'HTTP方法', '获取数据'],
    priority: 4
  },
  {
    id: 'api-sendpost',
    title: 'sendPost 方法',
    content: 'toAwaitFetch.sendPost(url, data) 发送 POST 请求提交数据。用于创建资源或提交表单。',
    path: '/practices',
    category: 'API方法',
    keywords: ['sendPost', 'POST请求', '提交数据', '创建资源', '表单提交'],
    priority: 4
  },
  {
    id: 'api-sendpostform',
    title: 'sendPostForm 方法',
    content: 'toAwaitFetch.sendPostForm(url, formData) 发送表单数据，自动处理文件上传。',
    path: '/practices',
    category: 'API方法',
    keywords: ['sendPostForm', '表单数据', '文件上传', 'FormData'],
    priority: 4
  },
  {
    id: 'api-sendgetblob',
    title: 'sendGetBlob 方法',
    content: 'toAwaitFetch.sendGetBlob(url) 获取二进制数据，用于文件下载。',
    path: '/practices',
    category: 'API方法',
    keywords: ['sendGetBlob', '二进制数据', '文件下载', 'Blob'],
    priority: 4
  },
  {
    id: 'api-create',
    title: 'create 方法',
    content: 'toAwaitFetch.create(config) 创建配置实例，支持自定义配置选项。',
    path: '/config',
    category: 'API方法',
    keywords: ['create', '创建实例', '自定义配置', '配置选项'],
    priority: 3
  }
];

// 搜索权重配置
export const SEARCH_WEIGHTS = {
  TITLE_EXACT: 100,
  TITLE_PARTIAL: 80,
  KEYWORDS_EXACT: 60,
  KEYWORDS_PARTIAL: 40,
  CONTENT_EXACT: 30,
  CONTENT_PARTIAL: 20
};
