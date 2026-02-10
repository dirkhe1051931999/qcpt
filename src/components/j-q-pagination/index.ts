import { reactive } from 'vue';

/**
 * 分页参数接口
 */
export interface PaginationParams {
  currentPage: number;
  pageSize: number;
}

/**
 * 完整的分页信息接口
 */
export interface PaginationInfo extends PaginationParams {
  total: number;
}

/**
 * 使用分页的配置选项
 */
export interface UsePaginationOptions {
  currentPage?: number;
  pageSize?: number;
  total?: number;
}

/**
 * 使用分页的返回值
 */
export interface UsePaginationReturn {
  paginationInfo: PaginationInfo;
  getCurrentPage: () => number;
  getPageSize: () => number;
  getTotal: () => number;
  getPaginationParams: () => PaginationParams;
  setCurrentPage: (value?: number) => void;
  setPageSize: (value?: number) => void;
  setTotal: (value?: number) => void;
  reset: () => void;
}

/**
 * 默认每页显示数量
 */
export const DEFAULT_PAGE_SIZE = 15;

/**
 * 默认每页显示数量选项
 */
export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 20, 30, 50];

/**
 * 分页 Composable 函数
 * 用于在非表格场景下管理分页状态
 * 
 * @param options 分页配置选项
 * @returns 分页状态和操作方法
 * 
 * @example
 * ```ts
 * const { paginationInfo, setTotal, getPaginationParams } = usePagination({
 *   pageSize: 20
 * });
 * 
 * // 获取数据后设置总数
 * setTotal(100);
 * 
 * // 获取分页参数用于请求
 * const params = getPaginationParams();
 * ```
 */
export function usePagination(options?: UsePaginationOptions): UsePaginationReturn {
  const defaultPageSize = options?.pageSize ?? DEFAULT_PAGE_SIZE;

  const paginationInfo = reactive<PaginationInfo>({
    currentPage: options?.currentPage ?? 1,
    pageSize: defaultPageSize,
    total: options?.total ?? 0,
  });

  const getCurrentPage: UsePaginationReturn['getCurrentPage'] = () => {
    return paginationInfo.currentPage;
  };

  const getPageSize: UsePaginationReturn['getPageSize'] = () => {
    return paginationInfo.pageSize;
  };

  const getTotal: UsePaginationReturn['getTotal'] = () => {
    return paginationInfo.total;
  };

  const getPaginationParams: UsePaginationReturn['getPaginationParams'] = () => {
    return {
      currentPage: paginationInfo.currentPage,
      pageSize: paginationInfo.pageSize,
    };
  };

  const setCurrentPage: UsePaginationReturn['setCurrentPage'] = (value) => {
    paginationInfo.currentPage = value ?? 1;
  };

  const setPageSize: UsePaginationReturn['setPageSize'] = (value) => {
    paginationInfo.pageSize = value ?? defaultPageSize;
  };

  const setTotal: UsePaginationReturn['setTotal'] = (value) => {
    paginationInfo.total = value ?? 0;
  };

  const reset: UsePaginationReturn['reset'] = () => {
    paginationInfo.currentPage = options?.currentPage ?? 1;
    paginationInfo.pageSize = defaultPageSize;
    paginationInfo.total = 0;
  };

  return {
    paginationInfo,
    getCurrentPage,
    getPageSize,
    getTotal,
    getPaginationParams,
    setCurrentPage,
    setPageSize,
    setTotal,
    reset,
  };
}
