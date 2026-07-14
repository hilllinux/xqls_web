(() => {
  const solutions = window.XQLS_SOLUTIONS || [];
  const currentId = document.body.dataset.solutionId;
  const solution = solutions.find((item) => item.id === currentId) || solutions[0];

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const solutionMenu = () =>
    `
      <div>
        <a href="index.html#lifeline-platform" class="solution-menu-link product-menu-link text-base font-semibold text-river">综合服务平台</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="index.html#lifeline-platform">城市运行总览</a>
          <a class="product-menu-link" href="index.html#lifeline-platform">风险监测与闭环处置</a>
        </div>
      </div>
    ` + solutions
      .filter((item) => item.id !== "ai")
      .map(
        (item) => `
          <div>
            <a href="${item.page}" class="solution-menu-link product-menu-link text-base font-semibold text-river" ${item.id === solution.id ? 'aria-current="page"' : ""}>${escapeHtml(item.menuTitle)}</a>
            <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
              ${item.stats
                .slice(0, 2)
                .map((stat) => `<a class="product-menu-link" href="${item.page}#core-systems">${escapeHtml(stat)}</a>`)
                .join("")}
            </div>
          </div>
        `,
      )
      .join("");

  const productMenu = () => `
    <div class="grid gap-5 lg:grid-cols-6">
      <div>
        <a href="products.html?category=sampling" class="product-menu-link text-base font-semibold text-river">水质采样</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="product-detail.html?id=xw-1d3">XW-1D3户外水质采样器</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-1j2">XW-1J2便携式地下水采样器</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-1j">XW-1J地下水在线采样器</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-1h2">XW-1H2环保水质采样器</a>
        </div>
      </div>
      <div>
        <a href="products.html?category=analysis" class="product-menu-link text-base font-semibold text-river">水质分析</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="product-detail.html?id=xw-9308">XW-9308全光谱水质分析仪</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-9b">XW-9B一体化多参数分析仪</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-9203">XW-9203多参数水质在线分析仪</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-p100">XW-P100便携式五参数分析仪</a>
        </div>
      </div>
      <div>
        <a href="products.html?category=sensor" class="product-menu-link text-base font-semibold text-river">数字传感</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="product-detail.html?id=xw-2duv">XW-2DUV数字COD传感器</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-2dan">XW-2DAN数字氨氮传感器</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-2ddo">XW-2DDO数字溶解氧传感器</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-2dph">XW-2DpH数字pH传感器</a>
        </div>
      </div>
      <div>
        <a href="products.html?category=monitoring" class="product-menu-link text-base font-semibold text-river">管网监测</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="product-detail.html?id=xw-9103">XW-9103微功耗智能终端</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-2ddf">XW-2DDF多普勒流量计</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-9102e">XW-9102E小型浮标站</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-9105lv">XW-9105LV井盖传感器</a>
        </div>
      </div>
      <div>
        <a href="products.html?category=control" class="product-menu-link text-base font-semibold text-river">系统控制</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="product-detail.html?id=xw-4f2">XW-4F2智能控制仪</a>
          <a class="product-menu-link" href="product-detail.html?id=xw-9108">XW-9108雨污分流控制系统</a>
        </div>
      </div>
      <div>
        <a href="products.html?category=solid" class="product-menu-link text-base font-semibold text-river">固废管理</a>
        <div class="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <a class="product-menu-link" href="product-detail.html?id=xs-2s">XS-2S固废管理系统终端</a>
        </div>
      </div>
    </div>
  `;

  const headerTemplate = () => `
    <header id="siteHeader" class="site-header fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300">
      <div class="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <a href="index.html#home" class="flex items-center gap-3 leading-none" aria-label="小桥流水环境科技首页">
          <span class="relative h-11 w-20 shrink-0">
            <img src="assets/logo-white.png" alt="小桥流水环境科技 Logo" class="brand-logo-white absolute inset-0 h-full w-full object-contain" />
            <img src="assets/logo.png" alt="" class="brand-logo-color absolute inset-0 h-full w-full object-contain" />
          </span>
          <span>
            <span class="header-brand block">小桥流水环境科技</span>
            <span class="header-brand-en block">XQLS Environmental Technology</span>
          </span>
        </a>

        <nav class="header-nav hidden items-center gap-7 xl:gap-11 lg:flex" aria-label="主导航">
          <a class="nav-link" href="index.html#about">关于我们</a>
          <div class="nav-dropdown">
            <a class="nav-link" href="products.html">产品与服务</a>
            <div class="nav-dropdown-panel z-50 rounded-lg border border-slate-200 bg-white p-6 text-ink shadow-xl">
              ${productMenu()}
            </div>
          </div>
          <div class="nav-dropdown">
            <a class="nav-link is-active" href="index.html#solutions">解决方案</a>
            <div class="nav-dropdown-panel z-50 rounded-lg border border-slate-200 bg-white p-6 text-ink shadow-xl">
              <div class="grid gap-5 lg:grid-cols-6">${solutionMenu()}</div>
            </div>
          </div>
          <a class="nav-link" href="cases.html">典型客户</a>
          <a class="nav-link" href="#contact">联系我们</a>
        </nav>

        <div class="flex items-center gap-3">
          <a href="tel:0571-88212121" class="phone-link hidden h-11 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition md:inline-flex">
            <i data-lucide="phone" class="h-4 w-4"></i>
            0571-88212121
          </a>
          <button id="menuToggle" class="menu-button inline-flex h-11 w-11 items-center justify-center rounded-md border transition lg:hidden" aria-label="打开菜单" aria-expanded="false" type="button">
            <i data-lucide="menu" class="h-5 w-5"></i>
          </button>
        </div>
      </div>

      <div id="mobileMenu" class="mx-4 mb-4 hidden rounded-lg border border-white/15 bg-ink/95 p-6 text-white shadow-xl lg:hidden">
        <nav class="grid gap-4 text-base" aria-label="移动端导航">
          <a href="index.html#about">关于我们</a>
          <a href="products.html">产品与服务</a>
          <a href="index.html#solutions">解决方案</a>
          <div class="grid gap-2 border-l border-river/50 pl-4 text-sm">
            <a href="index.html#lifeline-platform" class="mobile-menu-muted text-white/60">综合服务平台</a>
            ${solutions
              .filter((item) => item.id !== "ai")
              .map((item) => `<a href="${item.page}" class="mobile-menu-muted text-white/60">${escapeHtml(item.menuTitle)}</a>`)
              .join("")}
          </div>
          <a href="cases.html">典型客户</a>
          <a href="#contact">联系我们</a>
        </nav>
      </div>
    </header>
  `;

  const statItems = () =>
    solution.stats
      .map(
        (stat) => `
          <div class="border border-white/15 bg-white/[0.06] px-5 py-5 backdrop-blur-sm">
            <p class="text-base font-semibold">${escapeHtml(stat)}</p>
          </div>
        `,
      )
      .join("");

  const systemCards = () =>
    solution.systems
      .map(
        (item, index) => `
          <article class="solution-card bg-white p-7 lg:p-8">
            <div class="flex items-center justify-between gap-4">
              <span class="text-sm font-semibold text-river">${String(index + 1).padStart(2, "0")}</span>
              <i data-lucide="${solution.icon}" class="h-5 w-5 text-river"></i>
            </div>
            <h3 class="mt-7 text-2xl font-semibold leading-snug">${escapeHtml(item.title)}</h3>
            <p class="mt-5 text-base leading-8 text-slate-600">${escapeHtml(item.text)}</p>
          </article>
        `,
      )
      .join("");

  const supportItems = () =>
    solution.supportItems
      .map(
        (item) => `
          <li class="flex gap-4 border-b border-slate-200 py-5 last:border-b-0">
            <i data-lucide="check-circle-2" class="mt-1 h-5 w-5 shrink-0 text-river"></i>
            <span class="text-base leading-8 text-slate-700">${escapeHtml(item)}</span>
          </li>
        `,
      )
      .join("");

  const valueItems = () =>
    solution.values
      .map(
        (item) => `
          <li class="flex gap-4">
            <i data-lucide="arrow-up-right" class="mt-1 h-5 w-5 shrink-0 text-river"></i>
            <span>${escapeHtml(item)}</span>
          </li>
        `,
      )
      .join("");

  const relatedSolutions = () => {
    const platformCard = `
      <a href="index.html#lifeline-platform" class="group border border-white/12 bg-white/[0.04] p-6 transition hover:bg-white hover:text-ink">
        <p class="text-sm text-white/45 transition group-hover:text-river">PLATFORM</p>
        <h3 class="mt-5 text-xl font-semibold">综合服务平台</h3>
        <p class="mt-4 text-sm leading-6 text-white/58 transition group-hover:text-slate-600">城市运行总览、风险监测与闭环处置</p>
      </a>
    `;
    const sceneCards = solutions
      .filter((item) => item.id !== solution.id && item.id !== "ai")
      .map(
        (item) => `
          <a href="${item.page}" class="group border border-white/12 bg-white/[0.04] p-6 transition hover:bg-white hover:text-ink">
            <p class="text-sm text-white/45 transition group-hover:text-river">${item.order}</p>
            <h3 class="mt-5 text-xl font-semibold">${escapeHtml(item.menuTitle)}</h3>
            <p class="mt-4 text-sm leading-6 text-white/58 transition group-hover:text-slate-600">${escapeHtml(item.subtitle)}</p>
          </a>
        `,
      )
      .join("");
    return platformCard + sceneCards;
  };

  const mainTemplate = () => `
    <main>
      <section
        class="solution-hero bg-cover bg-center text-white"
        style="background-image: linear-gradient(90deg, rgba(3, 12, 18, 0.96) 0%, rgba(3, 12, 18, 0.78) 46%, rgba(3, 12, 18, 0.28) 100%), url('${solution.image}')"
      >
        <div class="mx-auto flex min-h-[720px] max-w-[1440px] items-end px-6 pb-12 pt-32 lg:px-12 lg:pb-16">
          <div class="max-w-5xl">
            <a href="index.html#solutions" class="mb-8 inline-flex h-11 items-center gap-2 rounded-md border border-white/30 px-4 text-sm font-semibold text-white/78 hover:bg-white hover:text-ink">
              <i data-lucide="arrow-left" class="h-4 w-4"></i>
              返回解决方案
            </a>
            <h1 class="max-w-5xl text-5xl font-semibold leading-[1.04] md:text-7xl">${escapeHtml(solution.title)}</h1>
            <p class="mt-6 text-2xl font-semibold text-white/86">${escapeHtml(solution.subtitle)}</p>
            <p class="mt-8 max-w-3xl text-xl leading-9 text-white/76">${escapeHtml(solution.description)}</p>
            <div class="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">${statItems()}</div>
          </div>
        </div>
      </section>

      <section id="overview" class="bg-white py-20 lg:py-24">
        <div class="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-12">
          <div>
            <h2 class="text-4xl font-semibold leading-tight md:text-5xl">${escapeHtml(solution.title)}解决方案架构</h2>
            <p class="mt-8 text-lg leading-9 text-slate-600">${escapeHtml(solution.description)}</p>
          </div>
          <div class="overflow-hidden rounded-lg border border-slate-200 bg-pale p-3">
            <img src="${solution.image}" alt="${escapeHtml(solution.title)}方案架构图" class="w-full rounded-md object-cover" />
          </div>
        </div>
      </section>

      <section id="core-systems" class="bg-pale py-20 lg:py-24">
        <div class="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div class="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p class="text-sm font-semibold text-river">核心模块</p>
              <h2 class="mt-5 text-4xl font-semibold md:text-5xl">平台与系统能力</h2>
            </div>
            <p class="max-w-2xl text-base leading-8 text-slate-600">围绕业务场景形成从感知接入、数据治理、算法研判到联动处置的闭环能力。</p>
          </div>
          <div class="grid gap-px overflow-hidden bg-slate-200 md:grid-cols-2 xl:grid-cols-3">${systemCards()}</div>
        </div>
      </section>

      <section class="bg-white py-20 lg:py-24">
        <div class="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:items-start">
          <div class="bg-ink p-9 text-white lg:p-12">
            <p class="text-sm font-semibold text-white/55">关键支撑</p>
            <h2 class="mt-5 text-4xl font-semibold leading-tight">${escapeHtml(solution.supportTitle)}</h2>
            <p class="mt-7 text-base leading-8 text-white/66">以场景化感知、专业模型和业务闭环为基础，让方案能够真正接入项目现场并支撑长期运营。</p>
          </div>
          <ul class="rounded-lg border border-slate-200 bg-white px-8 py-4 shadow-sm">${supportItems()}</ul>
        </div>
      </section>

      <section class="bg-pale py-20 lg:py-24">
        <div class="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:items-center">
          <div>
            <p class="text-sm font-semibold text-river">交付价值</p>
            <h2 class="mt-5 text-4xl font-semibold leading-tight md:text-5xl">从方案设计到平台落地，形成可运营的城市生命线能力。</h2>
          </div>
          <ul class="grid gap-5 text-lg leading-9 text-slate-700">${valueItems()}</ul>
        </div>
      </section>

      <section class="bg-ink py-20 text-white lg:py-24">
        <div class="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div class="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p class="text-sm font-semibold text-white/55">更多解决方案</p>
              <h2 class="mt-5 text-4xl font-semibold md:text-5xl">继续查看其他场景</h2>
            </div>
            <a href="index.html#solutions" class="inline-flex h-12 w-fit items-center gap-3 rounded-md bg-white px-7 text-sm font-semibold text-ink hover:bg-pale">
              返回方案总览
              <i data-lucide="layout-grid" class="h-4 w-4"></i>
            </a>
          </div>
          <div class="grid gap-px overflow-hidden bg-white/12 md:grid-cols-2 xl:grid-cols-5">${relatedSolutions()}</div>
        </div>
      </section>

      <section id="contact" class="bg-pale py-20 lg:py-24">
        <div class="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div class="grid overflow-hidden rounded-lg bg-white lg:grid-cols-[1.1fr_0.9fr]">
            <div class="p-10 lg:p-16">
              <p class="text-sm font-semibold text-river">联系咨询</p>
              <h2 class="mt-6 text-4xl font-semibold leading-tight md:text-6xl">获取解决方案与项目建设支持</h2>
              <p class="mt-8 max-w-2xl text-lg leading-9 text-slate-600">如需确认项目场景、点位布设、平台联动、算法能力或运维方式，可联系小桥流水技术团队。</p>
              <a href="tel:0571-88212121" class="mt-9 inline-flex h-12 items-center gap-3 rounded-md bg-ink px-7 text-sm font-semibold text-white hover:bg-river">
                <i data-lucide="phone" class="h-4 w-4"></i>
                联系我们
              </a>
            </div>
            <div class="bg-ink p-10 text-white lg:p-16">
              <div class="grid gap-8 text-base text-white/76">
                <a href="tel:0571-88212121" class="flex gap-4 hover:text-white"><i data-lucide="phone" class="h-5 w-5 shrink-0 text-white"></i>0571-88212121</a>
                <p class="flex gap-4"><i data-lucide="mail" class="h-5 w-5 shrink-0 text-white"></i>xqls@xqls.com.cn</p>
                <p class="flex gap-4"><i data-lucide="clock" class="h-5 w-5 shrink-0 text-white"></i>周一至周五（9:00-18:00）</p>
                <p class="flex gap-4 leading-8"><i data-lucide="map-pin" class="h-5 w-5 shrink-0 text-white"></i>浙江省杭州市余杭区余杭塘路2301号海智中心3号楼801室</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `;

  const footerTemplate = () => `
    <footer class="bg-ink py-10 text-white/60">
      <div class="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p>© 2026 浙江小桥流水环境科技有限公司</p>
        <div class="flex flex-wrap gap-4">
          <a href="index.html#about" class="hover:text-white">关于我们</a>
          <a href="products.html" class="hover:text-white">产品中心</a>
          <a href="index.html#solutions" class="hover:text-white">解决方案</a>
          <a href="#contact" class="hover:text-white">联系我们</a>
        </div>
      </div>
    </footer>
  `;

  const render = () => {
    if (!solution) return;

    document.title = `${solution.title}解决方案 | 浙江小桥流水环境科技有限公司`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", solution.description);

    document.body.innerHTML = `${headerTemplate()}${mainTemplate()}${footerTemplate()}`;

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const setHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    window.addEventListener("scroll", setHeaderState, { passive: true });
    setHeaderState();

    menuToggle.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    if (window.lucide) lucide.createIcons();
  };

  render();
})();
