import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { debounce, getSearchSuggestions, searchContent, SearchResult } from '../utils/search';

interface SearchBoxProps {
  className?: string;
}

export interface SearchBoxRef {
  focus: () => void;
}

const SearchBox = forwardRef<SearchBoxRef, SearchBoxProps>(({ className = '' }, ref) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const suggestions = getSearchSuggestions();

  // 暴露 focus 方法给父组件
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  // 快捷键支持
  useKeyboardShortcuts({
    onSearchFocus: () => {
      inputRef.current?.focus();
    }
  });

  // 防抖搜索
  const debouncedSearch = debounce((searchQuery: string) => {
    if (searchQuery.trim()) {
      const searchResults = searchContent(searchQuery, 8);
      setResults(searchResults);
      setShowSuggestions(false);
    } else {
      setResults([]);
      setShowSuggestions(true);
    }
  }, 300);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    debouncedSearch(value);
  };

  // 处理输入框聚焦
  const handleFocus = () => {
    setIsOpen(true);
    if (!query.trim()) {
      setShowSuggestions(true);
    }
  };

  // 处理输入框失焦
  const handleBlur = (e: React.FocusEvent) => {
    // 延迟关闭，允许点击下拉选项
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const itemCount = showSuggestions ? suggestions.length : results.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % itemCount);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? itemCount - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (showSuggestions) {
            const suggestion = suggestions[selectedIndex];
            setQuery(suggestion);
            debouncedSearch(suggestion);
          } else {
            const result = results[selectedIndex];
            handleResultClick(result);
          }
        } else if (query.trim()) {
          // 如果没有选中项但有查询内容，搜索并跳转到第一个结果
          const searchResults = searchContent(query, 1);
          if (searchResults.length > 0) {
            handleResultClick(searchResults[0]);
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // 处理结果点击
  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    debouncedSearch(suggestion);
    inputRef.current?.focus();
  };

  // 清空搜索
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* 搜索输入框 */}
      <div className="relative">
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
          search
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-40 rounded-md border-0 bg-white/10 py-2 pl-10 pr-2 text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary focus:w-60 transition-all duration-200"
          placeholder="搜索... (Ctrl+K)"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && (showSuggestions || results.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-surface-dark border border-white/10 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto"
        >
          {showSuggestions ? (
            // 搜索建议
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                搜索建议
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedIndex === index
                      ? 'bg-primary/20 text-primary'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm mr-2 opacity-60">
                    trending_up
                  </span>
                  {suggestion}
                </button>
              ))}
            </div>
          ) : (
            // 搜索结果
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                搜索结果 ({results.length})
              </div>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left px-3 py-3 rounded-md transition-colors ${
                    selectedIndex === index
                      ? 'bg-primary/20 text-primary'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-lg opacity-60">
                        {result.category === '介绍' ? 'info' :
                         result.category === '配置' ? 'settings' :
                         result.category === '最佳实践' ? 'star' :
                         result.category === '错误处理' ? 'bug_report' :
                         result.category === 'API方法' ? 'code' : 'description'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div 
                        className="font-medium text-sm mb-1"
                        dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                      />
                      <div 
                        className="text-xs text-slate-400 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: result.highlightedContent }}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 bg-white/10 rounded text-slate-400">
                          {result.category}
                        </span>
                        <span className="text-xs text-slate-500">
                          {result.path === '/' ? '首页' : 
                           result.path === '/config' ? '配置详解' :
                           result.path === '/practices' ? '最佳实践' :
                           result.path === '/debug' ? '错误调试' : result.path}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* 无结果状态 */}
          {!showSuggestions && results.length === 0 && query.trim() && (
            <div className="p-8 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">
                search_off
              </span>
              <p className="text-sm">未找到相关内容</p>
              <p className="text-xs mt-1">尝试使用其他关键词</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

SearchBox.displayName = 'SearchBox';

export default SearchBox;
