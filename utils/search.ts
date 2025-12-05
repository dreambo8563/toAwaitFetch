import { searchIndex, SearchItem, SEARCH_WEIGHTS } from '../data/searchIndex';

export interface SearchResult extends SearchItem {
  score: number;
  matchedText: string;
  highlightedTitle: string;
  highlightedContent: string;
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 高亮匹配文本
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark class="bg-primary/30 text-primary">$1</mark>');
}

// 转义正则表达式特殊字符
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 计算文本相似度得分
function calculateScore(item: SearchItem, query: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerTitle = item.title.toLowerCase();
  const lowerContent = item.content.toLowerCase();
  const lowerKeywords = item.keywords.map(k => k.toLowerCase());
  
  let score = 0;
  
  // 标题完全匹配
  if (lowerTitle === lowerQuery) {
    score += SEARCH_WEIGHTS.TITLE_EXACT;
  }
  // 标题包含查询词
  else if (lowerTitle.includes(lowerQuery)) {
    score += SEARCH_WEIGHTS.TITLE_PARTIAL;
  }
  
  // 关键词完全匹配
  if (lowerKeywords.includes(lowerQuery)) {
    score += SEARCH_WEIGHTS.KEYWORDS_EXACT;
  }
  // 关键词部分匹配
  else if (lowerKeywords.some(keyword => keyword.includes(lowerQuery))) {
    score += SEARCH_WEIGHTS.KEYWORDS_PARTIAL;
  }
  
  // 内容完全匹配
  if (lowerContent.includes(lowerQuery)) {
    if (lowerContent.split(lowerQuery).length > 2) {
      // 多次出现给更高分
      score += SEARCH_WEIGHTS.CONTENT_EXACT * (lowerContent.split(lowerQuery).length - 1);
    } else {
      score += SEARCH_WEIGHTS.CONTENT_EXACT;
    }
  }
  
  // 内容部分匹配（按字符匹配）
  const queryChars = lowerQuery.split('');
  let partialMatches = 0;
  for (const char of queryChars) {
    if (lowerContent.includes(char)) {
      partialMatches++;
    }
  }
  if (partialMatches > 0) {
    score += SEARCH_WEIGHTS.CONTENT_PARTIAL * (partialMatches / queryChars.length);
  }
  
  // 优先级加权
  score *= item.priority;
  
  return score;
}

// 查找最佳匹配文本片段
function findBestMatch(item: SearchItem, query: string): string {
  const lowerQuery = query.toLowerCase();
  const lowerContent = item.content.toLowerCase();
  
  // 如果标题匹配，返回标题
  if (item.title.toLowerCase().includes(lowerQuery)) {
    return item.title;
  }
  
  // 如果关键词匹配，返回匹配的关键词
  const matchedKeyword = item.keywords.find(keyword => 
    keyword.toLowerCase().includes(lowerQuery)
  );
  if (matchedKeyword) {
    return matchedKeyword;
  }
  
  // 在内容中查找包含查询词的句子
  const sentences = item.content.split(/[。；！？.;!?]/);
  const matchedSentence = sentences.find(sentence => 
    sentence.toLowerCase().includes(lowerQuery)
  );
  
  if (matchedSentence) {
    // 截取合适长度的文本片段
    const maxLength = 100;
    if (matchedSentence.length <= maxLength) {
      return matchedSentence.trim();
    }
    
    const queryIndex = matchedSentence.toLowerCase().indexOf(lowerQuery);
    const start = Math.max(0, queryIndex - 30);
    const end = Math.min(matchedSentence.length, queryIndex + lowerQuery.length + 30);
    
    let snippet = matchedSentence.substring(start, end).trim();
    if (start > 0) snippet = '...' + snippet;
    if (end < matchedSentence.length) snippet = snippet + '...';
    
    return snippet;
  }
  
  // 如果没有找到匹配，返回内容的前100个字符
  return item.content.substring(0, 100) + (item.content.length > 100 ? '...' : '');
}

// 主搜索函数
export function searchContent(query: string, maxResults: number = 8): SearchResult[] {
  if (!query.trim()) {
    return [];
  }
  
  const results: SearchResult[] = [];
  
  for (const item of searchIndex) {
    const score = calculateScore(item, query);
    
    if (score > 0) {
      const matchedText = findBestMatch(item, query);
      const highlightedTitle = highlightText(item.title, query);
      const highlightedContent = highlightText(matchedText, query);
      
      results.push({
        ...item,
        score,
        matchedText,
        highlightedTitle,
        highlightedContent
      });
    }
  }
  
  // 按得分排序并返回前N个结果
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// 获取搜索建议（当没有输入时显示）
export function getSearchSuggestions(): string[] {
  return [
    'toAwaitFetch 介绍',
    '基础用法',
    'headers 配置',
    '重试机制',
    '错误处理',
    '文件上传',
    '文件下载',
    'http.ts 封装'
  ];
}

// 获取热门搜索词
export function getPopularSearches(): SearchItem[] {
  return searchIndex
    .filter(item => item.priority >= 4)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6);
}
