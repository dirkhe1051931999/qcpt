// 树形数据处理工具函数集合，所有方法均支持自定义字段名配置

interface RawItem extends Record<string, any> {
  [key: string]: any;
}

interface TargetOption {
  label: string;
  value: string | number;
  row: RawItem;
  children?: TargetOption[];
}

interface TransformConfig {
  optionLabel?: string;
  optionValue?: string;
  optionChildren?: string;
}

// 将数组转换为 label/value/children 格式
export function transformTreeUseLabelAndValue(array: RawItem[], config: TransformConfig = {}): TargetOption[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const { optionLabel = 'label', optionValue = 'value', optionChildren = 'children' } = config;

  return array.map((item) => {
    const label = String(item[optionLabel] ?? '');
    const value = item[optionValue] as string | number;

    const targetItem: TargetOption = {
      label,
      value,
      row: item,
    };

    const rawChildren = item[optionChildren];
    if (Array.isArray(rawChildren) && rawChildren.length > 0) {
      targetItem.children = transformTreeUseLabelAndValue(rawChildren, config);
    }

    return targetItem;
  });
}

interface BuildTreeConfig {
  data: any[];
  key?: string;
  idKey?: string;
  rootId?: string | number;
  isMapOption?: boolean;
  labelValue?: { label: string; value: string };
}

// 根据 parentId 构建树形结构，支持自定义字段名
export function buildTree(config: BuildTreeConfig): { data: any[]; flatData: any[] } {
  let { data, key, idKey, rootId, isMapOption, labelValue } = config;
  data = data || [];
  key = key || 'parentId';
  idKey = idKey || 'id';
  isMapOption = isMapOption !== false; // 默认 true
  labelValue = labelValue || { label: 'name', value: 'id' };
  rootId = rootId || '1';

  // 1. 创建一个映射，用于快速查找节点
  const nodeMap = new Map();
  const detachedNode = new Set();
  let rootNode: any = null;

  data.forEach((node: any) => {
    const newNode: any = { ...node, children: [] };
    if (isMapOption) {
      newNode.label = node[labelValue.label];
      newNode.value = String(node[labelValue.value].toString());
    }
    nodeMap.set(String(node[idKey]), newNode);

    // 检查是否为特殊根节点
    if (node[idKey].toString() === '1' && node[key].toString() === '0') {
      rootNode = newNode;
    } else {
      detachedNode.add(String(node[idKey]));
    }
  });

  // 2. 初始化树的根节点
  const tree: any = [];

  // 3. 遍历所有节点，建立父子关系
  nodeMap.forEach((node) => {
    if (rootNode) {
      if (node[idKey].toString() === '1' && node[key].toString() === '0') {
        // 特殊根节点，不需要添加到任何地方
      } else {
        if (rootNode[idKey] === node[key]) {
          rootNode.children.push(node);
          detachedNode.delete(String(node[idKey]));
        } else {
          const parent = nodeMap.get(String(node[key]));
          if (parent) {
            parent.children.push(node);
            detachedNode.delete(String(node[idKey]));
          }
        }
      }
    } else {
      if (node[key].toString() === String(rootId)) {
        tree.push(node); // 根节点
        detachedNode.delete(String(node[idKey]));
      } else {
        const parent = nodeMap.get(String(node[key]));
        if (parent) {
          parent.children.push(node);
          detachedNode.delete(String(node[idKey]));
        }
      }
    }
  });

  // 如果找到特殊根节点，则将其作为树的根
  if (rootNode) {
    tree.push(rootNode);
  }

  for (const node of detachedNode) {
    tree.push(nodeMap.get(node));
  }

  // 4. 生成扁平化数据
  const flatData = Array.from(nodeMap.values()).map((node: any) => {
    const newNode = { ...node }; // 浅拷贝节点
    delete newNode.children;
    return newNode;
  });

  return {
    data: tree,
    flatData: JSON.parse(JSON.stringify(flatData)),
  };
}

interface ArrayToTreeConfig {
  data: any[];
  parentKey?: string;
  idKey?: string;
  rootId: string | number;
  childrenKey?: string;
}

// 将数组转换为树形结构，支持自定义字段名
export function arrayToTree(config: ArrayToTreeConfig): any[] {
  const { data, parentKey = 'parentId', idKey = 'id', rootId, childrenKey = 'children' } = config;

  const buildTree = (arr: any[], pid: any): any[] => {
    return arr.reduce((res: any, current: any) => {
      if (current[parentKey] === pid) {
        current[childrenKey] = buildTree(arr, current[idKey]);
        return res.concat(current);
      }
      return res;
    }, []);
  };

  return buildTree(data, rootId);
}

interface FindParentIdsConfig {
  targetIds: (string | number)[];
  allData: any[];
  parentKey?: string;
  idKey?: string;
  excludeRootParent?: boolean;
  rootParentValue?: string | number | null;
}

// 查找给定节点的所有父级节点 ID，支持自定义字段名和排除根节点父级
export function findParentIds(config: FindParentIdsConfig): (string | number)[] {
  const { 
    targetIds, 
    allData, 
    parentKey = 'parentId', 
    idKey = 'id',
    excludeRootParent = false,
    rootParentValue = 0
  } = config;
  const parentIds = new Set<string | number>();

  const findParent = (id: string | number) => {
    const item = allData.find((item) => item[idKey] === id);
    if (item && item[parentKey] != null && !parentIds.has(item[parentKey])) {
      if (excludeRootParent && item[parentKey] === rootParentValue) {
        return;
      }
      parentIds.add(item[parentKey]);
      findParent(item[parentKey]);
    }
  };

  targetIds.forEach((id) => {
    findParent(id);
  });

  return Array.from(parentIds);
}

interface FilterLeafIdsConfig {
  treeData: any[];
  idList: (string | number)[];
  idKey?: string;
  childrenKey?: string;
}

// 从 id 列表中剔除父级节点的 id，只保留叶子节点的 id，支持自定义字段名
export function filterLeafIds(config: FilterLeafIdsConfig): (string | number)[] {
  const { treeData, idList, idKey = 'id', childrenKey = 'children' } = config;
  const parentIds = new Set<string | number>();

  // 递归遍历树形数据，找出所有父级节点的 id
  const findParentIds = (nodes: any[]) => {
    nodes.forEach((node) => {
      const children = node[childrenKey];
      if (Array.isArray(children) && children.length > 0) {
        parentIds.add(node[idKey]);
        findParentIds(children);
      }
    });
  };

  findParentIds(treeData);

  // 从 idList 中过滤掉父级节点的 id
  return idList.filter((id) => !parentIds.has(id));
}
