interface IWebSiteConfig {
  title: string;
  logo: string;
  navLogo: string;
  titleZh: Record<string, string>;
  titleEn: Record<string, string>;
}

const websiteConfig: Record<string, IWebSiteConfig> = {
  simlessly: {
    title: 'IoT simlessly',
    logo: '/login/favicon.ico',
    navLogo: '/login/logo.png',
    titleZh: {
      login: 'IoT simlessly',
      eim: 'IoT eSIM 管理平台',
      cmp: '连接管理平台',
      dataOps: '全球流量运营平台',
      hub: '资源管理',
    },
    titleEn: {
      login: 'IoT simlessly',
      eim: 'IoT eSIM Orchestration',
      cmp: 'Connection Management',
      dataOps: 'Global Data Operations',
      hub: 'Resource',
    }
  },
  iot: {
    title: 'IoT eSIM 管理平台',
    logo: '/login/redtea.ico',
    navLogo: '/login/redtea.png',
    titleZh: {
      login: 'IoT eSIM 管理平台',
      eim: 'IoT eSIM 管理平台',
      cmp: '连接管理平台',
      dataOps: '全球流量运营平台',
      hub: '资源管理',
    },
    titleEn: {
      login: 'IoT eSIM Management',
      eim: 'IoT eSIM Management',
      cmp: 'Connection Management',
      dataOps: 'Global Data Operations',
      hub: 'Resource',
    }
  },
  sunmi: {
    title: 'IoT eSIM 管理平台',
    logo: '/login/sunmi.ico',
    navLogo: '/login/sunmi.png',
    titleZh: {
      login: 'IoT eSIM 管理平台',
      eim: 'IoT eSIM 管理平台',
      cmp: '连接管理平台',
      dataOps: '全球流量运营平台',
      hub: '资源管理',
    },
    titleEn: {
      login: 'IoT eSIM Management',
      eim: 'IoT eSIM Management',
      cmp: 'Connection Management',
      dataOps: 'Global Data Operations',
      hub: 'Resource',
    }
  },
};

function getWebsiteConfig() {
  const host = document.querySelector('meta[name="host"]')?.getAttribute('content') || '';
  if (['auto.redteamobile.com', 'iot.redteaready.com', 'eim-eu.esim.plus'].includes(host)) {
    return websiteConfig.iot;
  }
  if (['sunmi.redteaready.com'].includes(host)) {
    return websiteConfig.sunmi;
  }
  return websiteConfig.simlessly;
}

/**
 * 根据域名修改网页的标签栏logo
 */
export function setTitleAndLogo() {
  const config: IWebSiteConfig = getWebsiteConfig();
  document.title = config.title;
  const faviconLink: any = document.getElementById('favicon-link')!;
  faviconLink.href = config.logo;
}

/**
 * 根据域名返回平台名称
 * @param lang 
 * @returns 
 */
export function getTitle(lang: string) {
  const config: IWebSiteConfig = getWebsiteConfig();
  return lang === 'zh-CN' ? config.titleZh : config.titleEn
}

/**
 * 根据域名返回导航栏logo
 * @returns 
 */
export function getNavLogo() {
  const config: IWebSiteConfig = getWebsiteConfig();
  return config.navLogo
}