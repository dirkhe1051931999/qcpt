import type { ComponentInfo, ComponentResolver } from 'unplugin-vue-components/types';

/**
 * Resolver for qcpt components
 * Automatically imports qcpt components (JQ*, JC*, JCh*) when used in templates
 *
 * @example
 * ```ts
 * import { qcptResolver } from 'qcpt/resolver'
 *
 * // in vite.config.ts
 * Components({
 *   resolvers: [qcptResolver()]
 * })
 * ```
 */
export function qcptResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      // Match qcpt component prefixes
      if (name.match(/^(JQ|JC|JCh)[A-Z]/)) {
        const componentName = name; // JCButton, JQInput, etc.
        return {
          name: componentName,
          from: 'qcpt',
          sideEffects: componentName.startsWith('JCh') ? ['qcpt/charts'] : undefined,
        } as ComponentInfo;
      }
    },
  };
}

/**
 * Options for qcptResolver
 */
export interface QcptResolverOptions {
  /**
   * Exclude components that should not be auto-imported
   * @example ['JQInput', 'JCButton']
   */
  exclude?: string[];
  /**
   * Prefix for component resolution (default: none, matches JQ*, JC*, JCh*)
   */
  prefix?: string;
}

/**
 * Configurable resolver for qcpt components
 *
 * @example
 * ```ts
 * import { qcptResolver } from 'qcpt/resolver'
 *
 * // in vite.config.ts
 * Components({
 *   resolvers: [
 *     qcptResolver({
 *       exclude: ['JQInput'], // exclude specific components
 *     })
 *   ]
 * })
 * ```
 */
export function qcptResolverWithOptions(options: QcptResolverOptions = {}): ComponentResolver {
  const { exclude = [], prefix = '' } = options;

  return {
    type: 'component',
    resolve: (name: string) => {
      // Add prefix if configured
      const targetName = prefix ? name.replace(new RegExp(`^${prefix}`), '') : name;

      // Check if component should be excluded
      if (exclude.includes(targetName) || exclude.includes(name)) {
        return;
      }

      // Match qcpt component prefixes
      if (targetName.match(/^(JQ|JC|JCh)[A-Z]/)) {
        const componentName = targetName;
        return {
          name: componentName,
          from: 'qcpt',
          sideEffects: componentName.startsWith('JCh') ? ['qcpt/charts'] : undefined,
        } as ComponentInfo;
      }
    },
  };
}

