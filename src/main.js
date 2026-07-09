import './style.css';
import productsData from './data/products.json';
import algeriaCities from './data/algeria_cities.json';

const wilayasAr = {
    "1": "أدرار", "2": "الشلف", "3": "الأغواط", "4": "أم البواقي", "5": "باتنة", "6": "بجاية", "7": "بسكرة", "8": "بشار", "9": "البليدة", "10": "البويرة", "11": "تمنراست", "12": "تبسة", "13": "تلمسان", "14": "تيارت", "15": "تيزي وزو", "16": "الجزائر", "17": "الجلفة", "18": "جيجل", "19": "سطيف", "20": "سعيدة", "21": "سكيكدة", "22": "سيدي بلعباس", "23": "عنابة", "24": "قالمة", "25": "قسنطينة", "26": "المدية", "27": "مستغانم", "28": "المسيلة", "29": "معسكر", "30": "ورقلة", "31": "وهران", "32": "البيض", "33": "إليزي", "34": "برج بوعريريج", "35": "بومرداس", "36": "الطارف", "37": "تندوف", "38": "تسمسيلت", "39": "الوادي", "40": "خنشلة", "41": "سوق أهراس", "42": "تيبازة", "43": "ميلة", "44": "عين الدفلى", "45": "النعامة", "46": "عين تموشنت", "47": "غرداية", "48": "غليزان", "49": "تيميمون", "50": "برج باجي مختار", "51": "أولاد جلال", "52": "بني عباس", "53": "إن صالح", "54": "إن قزام", "55": "تقرت", "56": "جانت", "57": "المغير", "58": "المنيعة", "59": "آفلو", "60": "بريكة", "61": "القنطرة", "62": "بئر العاتر", "63": "العريشة", "64": "قصر الشلالة", "65": "عين وسارة", "66": "مسعد", "67": "قصر البخاري", "68": "بوسعادة", "69": "الأبيض سيدي الشيخ"
};

const wilayasMap = {};
algeriaCities.forEach(city => {
    const wid = String(city.wilaya_id);
    const wName = wilayasAr[wid] ? `${wid} - ${wilayasAr[wid]}` : wid;

    if (!wilayasMap[wName]) {
        wilayasMap[wName] = [];
    }
    // Using ar_name since the user requested Arabic names
    if (city.ar_name) {
        wilayasMap[wName].push(city.ar_name);
    }
});

for (let wilaya in wilayasMap) {
    wilayasMap[wilaya].sort((a, b) => a.localeCompare(b, 'ar'));
}

// Sort the list numerically by wilaya_id
const wilayasList = Object.keys(wilayasMap).sort((a, b) => {
    const numA = parseInt(a.split(' - ')[0]) || 0;
    const numB = parseInt(b.split(' - ')[0]) || 0;
    return numA - numB;
});

// --- CONFIG ---
const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzeKflloO6mflbwxjXjD7XrB2xt_MI5ZCkycSCAcuStu0SjL9Nk32K2m2WCmokPhLwbJA/exec";
const COUNTRY_MAP = {
    "DZ": "الجزائر"
};
const LIVRAISON_FEES = {
    "1": { domicile: 1400, bureau: 870 }, "2": { domicile: 700, bureau: 520 }, "3": { domicile: 950, bureau: 670 }, "4": { domicile: 800, bureau: 520 }, "5": { domicile: 800, bureau: 520 }, "6": { domicile: 800, bureau: 520 }, "7": { domicile: 900, bureau: 570 }, "8": { domicile: 1100, bureau: 670 }, "9": { domicile: 750, bureau: 520 }, "10": { domicile: 750, bureau: 520 }, "11": { domicile: 1600, bureau: 1120 }, "12": { domicile: 850, bureau: 520 }, "13": { domicile: 800, bureau: 520 }, "14": { domicile: 800, bureau: 520 }, "15": { domicile: 800, bureau: 520 }, "16": { domicile: 600, bureau: 520 }, "17": { domicile: 950, bureau: 570 }, "18": { domicile: 800, bureau: 520 }, "19": { domicile: 800, bureau: 520 }, "20": { domicile: 750, bureau: 570 }, "21": { domicile: 800, bureau: 520 }, "22": { domicile: 800, bureau: 520 }, "23": { domicile: 850, bureau: 520 }, "24": { domicile: 800, bureau: 520 }, "25": { domicile: 800, bureau: 520 }, "26": { domicile: 800, bureau: 520 }, "28": { domicile: 800, bureau: 570 }, "29": { domicile: 700, bureau: 520 }, "30": { domicile: 950, bureau: 670 }, "31": { domicile: 700, bureau: 520 }, "32": { domicile: 1100, bureau: 670 }, "33": { domicile: 0, bureau: 0 }, "34": { domicile: 800, bureau: 520 }, "35": { domicile: 750, bureau: 520 }, "36": { domicile: 750, bureau: 520 }, "37": { domicile: 0, bureau: 0 }, "38": { domicile: 850, bureau: 520 }, "39": { domicile: 950, bureau: 670 }, "40": { domicile: 800, bureau: 520 }, "41": { domicile: 800, bureau: 520 }, "42": { domicile: 750, bureau: 520 }, "43": { domicile: 800, bureau: 520 }, "44": { domicile: 700, bureau: 520 }, "45": { domicile: 1100, bureau: 670 }, "46": { domicile: 750, bureau: 520 }, "47": { domicile: 950, bureau: 620 }, "48": { domicile: 800, bureau: 520 }, "49": { domicile: 1400, bureau: 870 }, "50": { domicile: 0, bureau: 0 }, "51": { domicile: 950, bureau: 570 }, "52": { domicile: 1400, bureau: 870 }, "53": { domicile: 1600, bureau: 1120 }, "54": { domicile: 1600, bureau: 0 }, "55": { domicile: 950, bureau: 670 }, "56": { domicile: 0, bureau: 0 }, "57": { domicile: 950, bureau: 0 }, "58": { domicile: 1000, bureau: 0 }
};

// --- STATE ---
let state = {
    currentProduct: null,
    quantity: 1,
    price: 0,
    deliveryFee: 0,
    currency: 'DA',
    cartSessionId: "ORD-" + Date.now().toString().slice(-6) + "-" + Math.floor(Math.random() * 1000),
    isSubmitting: false,
    initiateCheckoutFired: false,
    lastAbandonedStr: "",
    igIndex: 0
};

// --- UTILS ---
const fmtPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const optimizeBloggerImg = (url, size = '600') => {
    if (!url || !url.includes('blogger.googleusercontent.com')) return url;
    return url.replace(/\/s\d+\//, `/w${size}/`).replace(/\/s\d+$/, `/w${size}`);
};

const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utms.forEach(p => { if (urlParams.has(p)) sessionStorage.setItem(p, urlParams.get(p)); });
    return {
        utm_source: sessionStorage.getItem('utm_source') || '',
        utm_medium: sessionStorage.getItem('utm_medium') || '',
        utm_campaign: sessionStorage.getItem('utm_campaign') || '',
        utm_term: sessionStorage.getItem('utm_term') || '',
        utm_content: sessionStorage.getItem('utm_content') || ''
    };
};

const firePixel = (event, data) => {
    if (typeof fbq === 'function') fbq('track', event, data);
};

const navigate = (path) => {
    window.history.pushState({}, '', path);
    router();
};

const updateMeta = (name, content, attr = 'property') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const updateSEO = (p = null) => {
    const brand = "Skillio DZ";
    const baseUrl = "https://skillio-dz.pages.dev";
    const oldSchema = document.getElementById('product-schema');
    if (oldSchema) oldSchema.remove();

    if (!p) {
        document.title = `${brand} - متجر الكتروني للأزياء وملابس النوم`;
        updateMeta('og:title', `${brand} - ملابس نوم مميزة`);
        updateMeta('og:description', "اكتشف تشكيلتنا الحصرية.");
        updateMeta('og:image', "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200");
        updateMeta('og:url', baseUrl);
        return;
    }

    const title = `${p.title} - ${brand}`;
    const desc = p.description.replace(/<[^>]*>/g, '').slice(0, 160) + '...';
    const url = `${baseUrl}/product/${p.id}`;

    document.title = title;
    updateMeta('description', desc, 'name');
    updateMeta('og:title', title);
    updateMeta('og:description', desc);
    updateMeta('og:image', p.featuredImage);
    updateMeta('og:url', url);
    updateMeta('og:type', 'product');
    updateMeta('product:price:amount', p.price);
    updateMeta('product:price:currency', p.currency);

    updateMeta('twitter:title', title, 'name');
    updateMeta('twitter:description', desc, 'name');
    updateMeta('twitter:image', p.featuredImage, 'name');

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": p.title,
        "image": [p.featuredImage],
        "description": desc,
        "sku": p.code || p.id,
        "brand": { "@type": "Brand", "name": brand },
        "offers": {
            "@type": "Offer",
            "url": url,
            "priceCurrency": p.currency === 'DA' ? 'DZD' : p.currency,
            "price": p.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };
    const script = document.createElement('script');
    script.id = 'product-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    firePixel('ViewContent', {
        content_name: p.title,
        content_category: p.category,
        content_ids: [p.id],
        content_type: 'product',
        value: p.price,
        currency: p.currency === 'DA' ? 'DZD' : p.currency
    });
};

// --- ROUTER ---
const router = () => {
    const path = window.location.pathname;
    const app = document.getElementById('app');
    app.className = ''; // Reset classes
    document.body.classList.remove('lp-mode-active', 'is-merci-page');

    // Handle base paths if deployed in a subdirectory
    const segments = path.split('/').filter(s => s.length > 0);

    // Simple logic: if last segment is 'merci', show thank you page. 
    // If it starts with 'product', find id.
    if (path.endsWith('/merci') || path.endsWith('/merci/')) {
        renderMerci();
        updateSEO();
    } else if (path.includes('/product/')) {
        const id = path.split('/product/').pop().replace(/\//g, '');
        const products = productsData;
        const product = products.find(p => p.id === id);
        if (product) {
            renderProduct(product);
            updateSEO(product);
        } else {
            navigate('/');
        }
    } else {
        renderHome();
        updateSEO();
    }
    window.scrollTo(0, 0);
};

// --- VIEWS ---
const renderHome = () => {
    const app = document.getElementById('app');
    const products = productsData;
    app.innerHTML = `
        <div class="topbar">
            <span><i class="fa fa-truck"></i> توصيل مجاني</span>
            <span><i class="fa fa-rotate-left"></i> إرجاع خلال 7 أيام</span>
        </div>
        <header class="site-header">
            <div class="header-inner">
                <div class="header-spacer"></div>
                <a href="/" class="site-logo">
                    <div class="site-logo-icon">🛒</div>
                    USB كولشي فـ
                </a>
                <div class="header-spacer" style="display:flex; justify-content:flex-end;">
                    <button class="mode-toggle" id="dark-mode-toggle" aria-label="تغيير المظهر"><i class="fa fa-moon"></i><i class="fa fa-sun"></i></button>
                </div>
            </div>
        </header>
        <section class="hero">
            <div class="hero-inner">
                <div class="hero-pill">🔥 عرض محدود</div>
                <h1>منتجات عالية الجودة<br/>تصلك إلى باب منزلك</h1>
                <p>الدفع عند الاستلام · إرجاع مجاني · توصيل سريع</p>
                <a class="hero-btn" href="#catalogue"><i class="fa fa-bag-shopping"></i> تصفح المنتجات</a>
            </div>
        </section>
        <div class="trust-bar">
            <div class="trust-inner">
                <div class="trust-item ti-green"><div class="trust-icon"><i class="fa fa-check"></i></div> توصيل مجاني</div>
                <div class="trust-item ti-blue"><div class="trust-icon"><i class="fa fa-lock"></i></div> دفع آمن</div>
                <div class="trust-item ti-orange"><div class="trust-icon"><i class="fa fa-headset"></i></div> دعم على مدار الساعة</div>
                <div class="trust-item ti-green"><div class="trust-icon"><i class="fa fa-rotate-left"></i></div> إرجاع خلال 7 أيام</div>
            </div>
        </div>
        <div class="catalogue fade-in" id="catalogue">
            <div class="catalogue-hdr">
                <h2>🛒 منتجاتنا</h2>
                <p>توصيل مجاني · الدفع عند الاستلام</p>
            </div>
            <div class="catalogue-grid">
                ${products.map(p => `
                    <a class="pcard ${p.modeBlack === 'yes' ? 'mode-nuit' : ''}" href="/product/${p.id}">
                        <div class="pcard-img">
                            <img src="${optimizeBloggerImg(p.featuredImage, 400)}" alt="${p.title}" loading="lazy">
                            <span class="pcard-badge">🔥 عرض</span>
                        </div>
                        <div class="pcard-body">
                            <div class="pcard-title">${p.title}</div>
                            <div class="pcard-price" style="font-size: 15px; margin-top: 5px;">اكتشف العرض ➔</div>
                            <div class="pcard-stars">★★★★★</div>
                            <div class="pcard-cta"><i class="fa fa-bag-shopping"></i> اطلب الآن</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
        <div class="sticky-bar">
            <a class="sticky-order" href="#catalogue" style="width: 100%;"><i class="fa fa-bag-shopping"></i> تصفح منتجاتنا</a>
        </div>
        ${renderFooter()}
    `;
    setupGlobalEvents();
};

const renderProduct = (p) => {
    state.currentProduct = p;
    state.price = p.price;
    state.quantity = 1;
    state.igIndex = 0;
    const isLP = p.isLandingPage && p.isLandingPage.toLowerCase() === 'yes';

    // LP Body Classes
    if (isLP) document.body.classList.add('lp-mode-active');
    else document.body.classList.remove('lp-mode-active');

    // Hide footer if LP
    if (isLP) document.body.classList.add('is-merci-page');
    else document.body.classList.remove('is-merci-page');

    if (p.modeBlack && p.modeBlack.toLowerCase() === 'yes') document.body.classList.add('mode-nuit');
    else document.body.classList.remove('mode-nuit');

    // --- LCP PRELOAD: inject <link rel="preload"> for featured image ASAP ---
    const lcpImg = optimizeBloggerImg((Array.isArray(p.gallery) && p.gallery.length > 0) ? p.gallery[0] : p.featuredImage, 800);
    const existingPreload = document.getElementById('lcp-preload');
    if (existingPreload) existingPreload.remove();
    const preloadLink = document.createElement('link');
    preloadLink.id = 'lcp-preload';
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = lcpImg;
    preloadLink.setAttribute('fetchpriority', 'high');
    document.head.appendChild(preloadLink);

    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="topbar">
            <span><i class="fa fa-truck"></i> توصيل مجاني</span>
            <span><i class="fa fa-rotate-left"></i> إرجاع خلال 7 أيام</span>
        </div>
        <header class="site-header" style="${isLP ? 'display:none' : ''}">
            <div class="header-inner">
                <div class="header-spacer"></div>
                <a href="/" class="site-logo">
                    <div class="site-logo-icon">🛒</div>
                    USB كولشي فـ
                </a>
                <div class="header-spacer" style="display:flex; justify-content:flex-end;">
                    <button class="mode-toggle" id="dark-mode-toggle" aria-label="تغيير المظهر"><i class="fa fa-moon"></i><i class="fa fa-sun"></i></button>
                </div>
            </div>
        </header>
        <main class="product-page ${p.theme === '2' ? 'theme-2' : ''}">
            ${isLP ? `<div class="prod-desc landing-mode-desc" style="margin-top:0; margin-bottom: 24px;">
                <div id="d-desc-content">${(() => {
                let desc = p.description;
                // For LP, the first image is likely the LCP. Let's make it eager and optimized.
                let imgCount = 0;
                return desc.replace(/<img([^>]+)>/g, (match, attrs) => {
                    imgCount++;
                    const hasAlt = /alt=/i.test(attrs);
                    const altAttr = hasAlt ? '' : ` alt="${p.title}"`;
                    if (imgCount === 1) {
                        // First image: eager, high priority
                        return `<img${attrs.replace(/loading=["']lazy["']/gi, '').replace(/fetchpriority=["'][^"']*["']/gi, '')}${altAttr} loading="eager" fetchpriority="high">`;
                    } else {
                        // Subsequent images: lazy
                        return `<img${attrs.replace(/loading=["']eager["']/gi, '').replace(/fetchpriority=["'][^"']*["']/gi, '')}${altAttr} loading="lazy">`;
                    }
                });
            })()}</div>
            </div>` : ''}

            <div class="product-card">
                ${!isLP ? `
                <div class="prod-gallery">
                    ${(Array.isArray(p.gallery) && p.gallery.length > 0) || (typeof p.gallery === 'string' && p.gallery.toLowerCase() === 'yes') ? `
                        <div id="interactive-gallery">
                            <div class="ig-main">
                                <button class="ig-btn ig-prev" id="prev-ig" aria-label="Image précédente"><i class="fa fa-chevron-left"></i></button>
                                <img src="${optimizeBloggerImg(p.featuredImage, 800)}" id="ig-main-img" alt="${p.title}" fetchpriority="high" loading="eager">
                                <button class="ig-btn ig-next" id="next-ig" aria-label="Image suivante"><i class="fa fa-chevron-right"></i></button>
                            </div>
                            <div class="ig-thumbs" id="ig-thumbs">
                                ${[p.featuredImage, ...(Array.isArray(p.gallery) ? p.gallery : (p.images || []))].map((img, i) => `
                                    <div class="ig-thumb ${i === 0 ? 'active' : ''}" data-index="${i}"><img src="${optimizeBloggerImg(img, 200)}" width="105" height="105" style="width: 105px; height: 105px; object-fit: cover;" alt="${p.title}" loading="lazy"></div>
                                `).join('')}
                            </div>
                        </div>
                    ` : `
                        <img src="${optimizeBloggerImg(p.featuredImage, 800)}" alt="${p.title}" fetchpriority="high" loading="eager">
                    `}
                    <div class="prod-badges">
                        <span class="badge badge-sale">🔥 عرض خاص</span>
                    </div>
                </div>
                ` : ''}
                <div class="prod-info">
                    <h1 class="prod-title">${p.title}</h1>
                    <div class="prod-rating">
                        <div class="stars">★★★★★</div>
                        <span class="rating-count">(${p.reviews} تقييم)</span>
                        <span class="rating-badge"><i class="fa fa-circle-check"></i> بائع معتمد</span>
                    </div>
                    <div class="price-row" style="margin-bottom: 10px; align-items: center;">
                        <span class="price-now" id="d-price" style="font-size: 42px; color: var(--red);">${fmtPrice(p.price)} ${p.currency}</span>
                        ${p.priceOld ? `<span class="price-old" id="d-price-old" style="font-size: 21px; color: var(--gray-500);">${fmtPrice(p.priceOld)} ${p.currency}</span>` : ''}
                        ${p.priceOld ? `<span class="price-save" id="d-price-save" style="font-size: 13.5px; padding: 5px 12px; background: #fef08a; color: #92400e;">وفر ${fmtPrice(p.priceOld - p.price)} ${p.currency} (-${Math.round((p.priceOld - p.price) / p.priceOld * 100)}%)</span>` : ''}
                    </div>
                    <p class="price-note" style="margin-bottom: 28px; font-size: 14.5px; color: var(--gray-500);"><span style="font-size: 15px;">💰</span> الدفع عند الاستلام — بدون مخاطرة</p>
                    
                    <div class="stock-wrap" style="margin-bottom: 28px;">
                        <div class="stock-lbl" style="font-size: 15px; font-weight: 700; color: var(--gray-800); margin-bottom: 10px;">
                            <span>المخزون المتوفر</span> 
                            <strong id="d-stock-lbl" style="color: var(--red);">⚠️ تبقى ${p.stock} قطع فقط!</strong>
                        </div>
                        <div class="stock-track" style="height: 10px; background: var(--gray-200); border-radius: 10px;">
                            <div class="stock-fill" style="width: 90%; height: 100%; border-radius: 10px; background: var(--orange); background: linear-gradient(90deg, var(--orange), #f97316); animation: none;"></div>
                        </div>
                    </div>

                    <ul class="feat-list" style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
                        <li class="feat-item" style="font-size: 15.5px; color: var(--gray-700); align-items: center;"><i class="fa fa-check-circle" style="color: var(--green); font-size: 19px; border-radius: 50%; fill: currentColor;"></i> توصيل سريع لجميع الولايات</li>
                        <li class="feat-item" style="font-size: 15.5px; color: var(--gray-700); align-items: center;"><i class="fa fa-check-circle" style="color: var(--green); font-size: 19px; border-radius: 50%; fill: currentColor;"></i> الدفع عند الاستلام فقط</li>
                        <li class="feat-item" style="font-size: 15.5px; color: var(--gray-700); align-items: center;"><i class="fa fa-check-circle" style="color: var(--green); font-size: 19px; border-radius: 50%; fill: currentColor;"></i> إرجاع مجاني خلال 7 أيام</li>
                        <li class="feat-item" style="font-size: 15.5px; color: var(--gray-700); align-items: center;"><i class="fa fa-check-circle" style="color: var(--green); font-size: 19px; border-radius: 50%; fill: currentColor;"></i> خدمة عملاء طوال أيام الأسبوع</li>
                    </ul>
                </div>
            </div>

            <div class="order-col" id="orderFormBlock">
                <div class="order-card">
                    <div class="order-hdr">
                        <h2><i class="fa fa-shopping-cart"></i> إتمام الطلب</h2>
                        <p>يرجى ملء النموذج أدناه</p>
                    </div>
                    <div class="order-body">
                        <div id="countdown-container" style="${p.countdown && p.countdown.toLowerCase() === 'yes' ? '' : 'display:none'}">
                             <div class="countdown-wrap">
                                 <div class="countdown-title">🔥 ينتهي العرض خلال:</div>
                                 <div class="countdown-timer">
                                     <div class="time-box"><span id="cd-min">15</span><small>دقيقة</small></div>
                                     <div class="time-sep">:</div>
                                     <div class="time-box"><span id="cd-sec">00</span><small>ثانية</small></div>
                                 </div>
                             </div>
                        </div>

                        ${p.bundle && p.bundle.toLowerCase() === 'yes' ? `
                            <div class="bundle-wrap">
                                <div class="bundle-hdr">اختر العرض المناسب:</div>
                                <div id="bundle-options">
                                    ${p.offres.map((o, i) => `
                                        <div class="bundle-opt ${i === 0 ? 'active' : ''}" data-qty="${o.qty}" data-price="${o.price}" data-title="${o.title}">
                                            <div class="bundle-radio"></div>
                                            <div class="bundle-title">${o.title}</div>
                                            <div class="bundle-prices">
                                                <span class="bundle-price-now">${fmtPrice(o.price)} ${p.currency}</span>
                                                <span class="bundle-price-old">${fmtPrice(o.oldPrice)} ${p.currency}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <div class="commit-msg" style="text-align: center; gap: 12px; margin-bottom: 24px; font-size: 13px; display: flex; align-items: center; justify-content: center; padding: 0 10px;">
                            <i class="fa fa-phone" style="color: var(--blue); transform: rotate(90deg); font-size: 18px;"></i>
                            <span style="color: var(--gray-500); line-height: 1.6;">سيتصل بك أحد وكلائنا لتأكيد طلبك قبل الشحن. يرجى الطلب فقط إذا كنت متأكدًا من الشراء.</span>
                        </div>

                        <form id="orderForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label" for="nom"><i class="fa fa-user" style="color: #c084fc;"></i> الاسم <span class="req">*</span></label>
                                    <input type="text" class="form-control" id="nom" placeholder="الاسم الكامل" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="tel"><i class="fa fa-mobile-screen-button" style="color: #a78bfa;"></i> رقم الهاتف <span class="req">*</span></label>
                                    <input type="tel" class="form-control" id="tel" placeholder="XX XXX XX XX" required>
                                    <div class="error-msg" id="error-tel">الرجاء إدخال رقم صحيح (8 أرقام على الأقل)</div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label" for="wilaya"><i class="fa fa-map" style="color: #60a5fa;"></i> الولاية <span class="req">*</span></label>
                                    <select class="form-control" id="wilaya" required>
                                        <option value="">اختر الولاية</option>
                                        ${wilayasList.map(w => `<option value="${w}">${w}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="baladiya"><i class="fa fa-location-dot" style="color: #c084fc;"></i> البلدية <span class="req">*</span></label>
                                    <select class="form-control" id="baladiya" required>
                                        <option value="">اختر البلدية</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="delivery_method">🚚 طريقة التوصيل <span class="req">*</span></label>
                                <select class="form-control" id="delivery_method" required>
                                    <option value="توصيل للمنزل" selected>توصيل للمنزل</option>
                                    <option value="توصيل للمكتب (Stop Desk)">توصيل للمكتب (Stop Desk)</option>
                                </select>
                            </div>

                            <div class="confirm-box">
                                <label>
                                    <input type="checkbox" checked required style="width: 18px; height: 18px; accent-color: var(--blue); margin: 0; flex-shrink: 0; border-radius: 4px;">
                                    <span>أؤكد أنني مستعد لتلقي مكالمة لتأكيد طلبي</span>
                                </label>
                            </div>

                            <div class="form-row">
                                ${p.couleur ? `
                                    <div class="form-group">
                                        <label class="form-label" for="var-couleur"><i class="fa fa-palette"></i> اللون</label>
                                        <select class="form-control" id="var-couleur">
                                            ${p.couleur.split(',').map(c => `<option value="${c}">${c}</option>`).join('')}
                                        </select>
                                    </div>
                                ` : ''}

                                ${p.taille ? `
                                    <div class="form-group">
                                        <label class="form-label" for="var-taille"><i class="fa fa-ruler-combined"></i> المقاس</label>
                                        <select class="form-control" id="var-taille">
                                            ${p.taille.split(',').map(s => `<option value="${s}">${s}</option>`).join('')}
                                        </select>
                                    </div>
                                ` : ''}
                            </div>

                            ${p.showQuantity && p.showQuantity.toLowerCase() === 'yes' && p.bundle && p.bundle.toLowerCase() !== 'yes' ? `
                                <div class="qty-action-wrap">
                                    <label class="qty-action-lbl" for="manual-qty">الكمية</label>
                                    <div class="qty-box">
                                        <button type="button" class="qty-btn" id="btn-qty-minus" aria-label="Diminuer la quantité">-</button>
                                        <input type="number" class="qty-val" id="manual-qty" value="1" readonly>
                                        <button type="button" class="qty-btn" id="btn-qty-plus" aria-label="Augmenter la quantité">+</button>
                                    </div>
                                </div>
                            ` : ''}

                            <div class="order-summary">
                                <div class="sum-row"><span>سعر المنتج</span> <span id="sum-prod-price">${fmtPrice(state.price)} ${p.currency}</span></div>
                                <div class="sum-row"><span>الكمية</span> <span id="sum-qty">${state.quantity}</span></div>
                                <div class="sum-row"><span>سعر التوصيل</span> <span id="sum-delivery">يرجى تحديد الولاية</span></div>
                                <div class="sum-total">
                                    <span>المجموع الإجمالي</span>
                                    <span id="sum-total">${fmtPrice(state.price)} ${p.currency}</span>
                                </div>
                            </div>

                            <button type="submit" class="submit-btn ${p.animated && p.animated.toLowerCase() === 'yes' ? 'animated-yes' : ''}" id="submitBtn">
                                <i class="fa fa-lock"></i> تأكيد الطلب
                            </button>
                            <div class="pay-icons" style="margin-top: 15px; gap: 10px;">
                                <span class="trust-badge"><i class="fa fa-money-bill-1"></i> نقداً</span>
                                <span class="trust-badge"><i class="fa fa-truck-fast"></i> الدفع عند الاستلام</span>
                                <span class="trust-badge"><i class="fa fa-shield-check"></i> آمن 100%</span>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="guar-card">
                    <div class="guar-icon"><i class="fa fa-shield-halved"></i></div>
                    <div class="guar-text">
                        <h4>ضمان الرضا</h4>
                        <p>إذا لم تكن راضيًا، سنعيد لك أموالك خلال 7 أيام.</p>
                    </div>
                </div>
            </div>

            ${!isLP ? `<div class="prod-desc">
                <h2 class="section-ttl"><i class="fa fa-file-lines"></i> الوصف</h2>
                <div id="d-desc-content"><div class="desc-placeholder" style="height:200px;background:var(--gray-100);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--gray-400)"><i class="fa fa-image" style="font-size:32px"></i></div></div>
            </div>` : ''}

        </main>
        
        <div class="sticky-bar">
            <a class="sticky-order" href="#orderFormBlock"><i class="fa fa-shopping-basket"></i> طلب</a>
            <a aria-label="WhatsApp" class="sticky-wa" href="https://wa.me/${p.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(`مرحباً، أود طلب: ${p.title}\nالرابط: ${window.location.origin + window.location.pathname}`)}" target="_blank"><i class="fab fa-whatsapp"></i></a>
        </div>

        <!-- Modals -->
        <div class="modal" id="modal-confirm">
            <div class="modal-bg"></div>
            <div class="modal-box">
                <div class="modal-ico green"><i class="fa fa-circle-check"></i></div>
                <h3 class="modal-ttl">تأكيد طلبك؟</h3>
                <p class="modal-body">هل ترغب في تأكيد طلبك لـ <strong>${p.title}</strong>؟</p>
                <div class="order-summary" style="margin-bottom: 20px;">
                    <div class="sum-row"><span>المنتج:</span> <span id="modal-prod-qty">${p.title} x ${state.quantity}</span></div>
                    <div class="sum-total"><span>المجموع:</span> <span id="modal-total-price">${fmtPrice(state.price * state.quantity)} ${p.currency}</span></div>
                </div>
                <div class="modal-btns">
                    <button class="modal-btn mbtn-cancel" id="m-cancel">إلغاء</button>
                    <button class="modal-btn mbtn-confirm" id="m-ok">نعم، تأكيد</button>
                </div>
            </div>
        </div>

        <div class="modal remise-modal" id="modal-remise">
            <div class="modal-bg"></div>
            <div class="modal-box">
                <div class="remise-title">انتظر! 🎁</div>
                <p class="remise-sub">لا تغادر خالي اليدين. استفد من خصم فوري!</p>
                <div class="remise-discount">خصم 5%</div>
                <p class="remise-note">صالح فقط خلال الـ 15 دقيقة القادمة.</p>
                <button class="remise-btn" id="btn-apply-remise">تطبيق الخصم</button>
            </div>
        </div>

        ${renderFooter()}
    `;
    setupProductEvents(p);
    setupGlobalEvents();

    // Defer description HTML injection (only for non-LP mode; LP injects directly)
    if (!isLP) {
        const injectDesc = () => {
            const descEl = document.getElementById('d-desc-content');
            if (!descEl) return;
            // Strip competing fetchpriority=high from description images & ensure lazy loading
            const cleanDesc = p.description
                .replace(/fetchpriority="high"/gi, 'loading="lazy"')
                .replace(/<img(?!([^>]*loading=))/g, '<img loading="lazy" ')
                .replace(/<img(?!([^>]*alt=))/gi, `<img alt="${p.title}" `);
            descEl.innerHTML = cleanDesc;
        };
        if ('requestIdleCallback' in window) {
            requestIdleCallback(injectDesc, { timeout: 3000 });
        } else {
            setTimeout(injectDesc, 300);
        }
    }
};

const renderMerci = () => {
    document.body.classList.add('is-merci-page');
    const order = JSON.parse(sessionStorage.getItem('last_order') || '{}');
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="product-page fade-in" style="max-width: 500px; padding: 50px 20px;">
            <div class="product-card" style="text-align: center; padding: 40px 20px;">
                <div class="modal-ico green" style="margin-bottom: 20px;"><i class="fa fa-circle-check"></i></div>
                <h1 style="font-family:var(--fh); margin-bottom: 10px;">شكراً لك ${order.customer_name || '!'}</h1>
                <p style="color:var(--gray-600); margin-bottom: 30px;">تم استلام طلبك لـ <strong>${order.product_name || 'المنتج'}</strong> بنجاح.</p>
                <div class="order-summary" style="margin-top: 20px;">
                    <div class="sum-row"><span>المنتج:</span> <span>${order.product_name} x ${order.quantity}</span></div>
                    <div class="sum-row"><span>المجموع:</span> <span>${fmtPrice(order.total || 0)} ${order.currency || state.currency}</span></div>
                    <div class="sum-total"><span>الحالة:</span> <span style="color:var(--green)">قيد المعالجة</span></div>
                </div>
                <p style="font-size: 13px; color: var(--gray-400); margin-bottom: 30px;">سيتصل بك أحد المستشارين في أقرب وقت ممكن لتأكيد التوصيل.</p>
            </div>
        </div>
    `;
};

const renderFooter = () => `
    <footer class="site-footer" style="text-align: center;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 600px; margin: 0 auto;">
            <div class="footer-logo" style="justify-content: center;"><div class="footer-logo-icon">🛒</div> USB كولشي فـ</div>
            <p class="footer-desc">متجرك الموثوق. توصيل سريع، الدفع عند الاستلام.</p>
        </div>
    </footer>
`;

// --- EVENT HANDLERS ---
const setupGlobalEvents = () => {
    const toggle = document.getElementById('dark-mode-toggle');
    if (toggle) {
        toggle.onclick = () => {
            const isDark = document.body.classList.toggle('mode-nuit');
            localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
        };
    }
};

const setupProductEvents = (p) => {
    // --- WILAYA & BALADIYA LINKING ---
    const wilayaSelect = document.getElementById('wilaya');
    const baladiyaSelect = document.getElementById('baladiya');
    if (wilayaSelect && baladiyaSelect) {
        wilayaSelect.addEventListener('change', (e) => {
            const selectedWilaya = e.target.value;
            const communes = wilayasMap[selectedWilaya] || [];
            baladiyaSelect.innerHTML = '<option value="">اختر البلدية</option>' +
                communes.map(c => `<option value="${c}">${c}</option>`).join('');
            if (typeof updateOrderSummary === 'function') updateOrderSummary();
        });
    }
    const methodSelect = document.getElementById('delivery_method');
    if (methodSelect) {
        methodSelect.addEventListener('change', () => {
            if (typeof updateOrderSummary === 'function') updateOrderSummary();
        });
    }

    // --- GALLERY ---
    if ((Array.isArray(p.gallery) && p.gallery.length > 0) || p.gallery === 'yes') {
        const images = [p.featuredImage, ...(Array.isArray(p.gallery) ? p.gallery : (p.images || []))];
        const mainImg = document.getElementById('ig-main-img');
        const thumbs = document.querySelectorAll('.ig-thumb');

        const changeIg = (idx) => {
            state.igIndex = idx;
            mainImg.src = images[idx];
            thumbs.forEach(t => t.classList.remove('active'));
            thumbs[idx].classList.add('active');
        };

        const prevBtn = document.getElementById('prev-ig');
        const nextBtn = document.getElementById('next-ig');

        if (prevBtn) {
            prevBtn.onclick = () => {
                let n = state.igIndex - 1;
                if (n < 0) n = images.length - 1;
                changeIg(n);
            };
        }
        if (nextBtn) {
            nextBtn.onclick = () => {
                let n = state.igIndex + 1;
                if (n >= images.length) n = 0;
                changeIg(n);
            };
        }
        thumbs.forEach(t => {
            t.onclick = () => changeIg(parseInt(t.dataset.index));
        });
    }

    // --- BUNDLES ---
    if (p.bundle === 'yes') {
        const bundleOpts = document.querySelectorAll('.bundle-opt');
        bundleOpts.forEach(opt => {
            opt.onclick = () => {
                bundleOpts.forEach(b => b.classList.remove('active'));
                opt.classList.add('active');
                state.quantity = parseInt(opt.dataset.qty);
                state.price = parseInt(opt.dataset.price);
                updateOrderSummary();
            };
        });
    }

    // --- QUANTITY ---
    const btnM = document.getElementById('btn-qty-minus');
    const btnP = document.getElementById('btn-qty-plus');
    if (btnM && btnP) {
        btnM.onclick = () => { if (state.quantity > 1) { state.quantity--; updateOrderSummary(); } };
        btnP.onclick = () => { state.quantity++; updateOrderSummary(); };
    }

    const updateOrderSummary = () => {
        let deliveryCost = 0;
        const wilayaSelect = document.getElementById('wilaya');
        const methodSelect = document.getElementById('delivery_method');

        if (wilayaSelect && wilayaSelect.value) {
            const wid = wilayaSelect.value.split(' - ')[0];
            const method = (methodSelect && methodSelect.value.includes('مكتب')) ? 'bureau' : 'domicile';
            if (LIVRAISON_FEES[wid]) {
                deliveryCost = LIVRAISON_FEES[wid][method] !== undefined ? LIVRAISON_FEES[wid][method] : 0;
            } else {
                deliveryCost = 1200;
            }
        }

        state.deliveryFee = deliveryCost;
        const total = (state.price * state.quantity) + deliveryCost;

        if (document.getElementById('sum-prod-price')) {
            document.getElementById('sum-prod-price').innerText = fmtPrice(state.price * state.quantity) + ' ' + p.currency;
        }
        document.getElementById('sum-qty').innerText = state.quantity;

        const deliveryText = deliveryCost > 0 ? fmtPrice(deliveryCost) + ' ' + p.currency : (wilayaSelect?.value ? 'مجاني' : 'يرجى تحديد الولاية');
        if (document.getElementById('sum-delivery')) document.getElementById('sum-delivery').innerText = deliveryText;

        document.getElementById('sum-total').innerText = fmtPrice(total) + ' ' + p.currency;
        if (document.getElementById('manual-qty')) document.getElementById('manual-qty').value = state.quantity;
    };

    // --- COUNTDOWN ---
    if (p.countdown === 'yes') {
        let timer = 900; // 15 mins
        const minEl = document.getElementById('cd-min');
        const secEl = document.getElementById('cd-sec');
        setInterval(() => {
            if (timer > 0) {
                timer--;
                let m = Math.floor(timer / 60);
                let s = timer % 60;
                minEl.innerText = m < 10 ? '0' + m : m;
                secEl.innerText = s < 10 ? '0' + s : s;
            }
        }, 1000);
    }

    // --- FORM SUBMISSION ---
    const form = document.getElementById('orderForm');
    form.onsubmit = async (e) => {
        e.preventDefault();

        const telInput = document.getElementById('tel');
        const telVal = telInput.value.replace(/\D/g, '');
        if (telVal.length < 8) {
            telInput.parentElement.classList.add('error');
            telInput.classList.add('shake');
            setTimeout(() => telInput.classList.remove('shake'), 400);
            telInput.focus();
            return;
        } else {
            telInput.parentElement.classList.remove('error');
        }

        // Track the completion of the form
        firePixel('InitiateCheckout', {
            value: state.price * state.quantity,
            currency: p.currency === 'DA' ? 'DZD' : p.currency,
            content_name: p.title
        });

        const ok = await new Promise(res => {
            if (document.getElementById('modal-prod-qty')) {
                document.getElementById('modal-prod-qty').innerText = `${p.title} x ${state.quantity}`;
            }
            if (document.getElementById('modal-total-price')) {
                const total = (state.price * state.quantity) + state.deliveryFee;
                document.getElementById('modal-total-price').innerText = `${fmtPrice(total)} ${p.currency}`;
            }
            const modal = document.getElementById('modal-confirm');
            modal.classList.add('open');
            document.getElementById('m-ok').onclick = () => { modal.classList.remove('open'); res(true); };
            document.getElementById('m-cancel').onclick = () => { modal.classList.remove('open'); res(false); };
        });
        if (!ok) return;

        state.isSubmitting = true;
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.innerHTML = 'جاري الإرسال... <span class="spinner"></span>';

        const formData = new FormData();
        const wilayaVal = document.getElementById('wilaya').value;
        const methodVal = document.getElementById('delivery_method') ? document.getElementById('delivery_method').value : '';
        const methodSuffix = methodVal.includes('مكتب') ? ' (bureau)' : ' (domicile)';
        const baladiyaVal = document.getElementById('baladiya').value + methodSuffix;
        formData.append("nom", document.getElementById('nom').value);
        formData.append("telephone", document.getElementById('tel').value);
        formData.append("wilaya", wilayaVal);
        formData.append("baladiya", baladiyaVal);
        formData.append("pays", wilayaVal);
        formData.append("adresse", baladiyaVal);
        formData.append("livraison", document.getElementById('delivery_method') ? document.getElementById('delivery_method').value : 'توصيل للمنزل');
        formData.append("produit", p.title);
        formData.append("prix", (state.price * state.quantity + state.deliveryFee) + " " + p.currency);
        formData.append("frais_livraison", state.deliveryFee + " " + p.currency);
        formData.append("quantity", state.quantity);
        formData.append("order_id", state.cartSessionId);
        formData.append("code", p.code || "");
        formData.append("status", "COMPLETED");

        const vCouleur = document.getElementById('var-couleur');
        const vTaille = document.getElementById('var-taille');
        if (vCouleur) formData.append("couleur", vCouleur.value);
        if (vTaille) formData.append("taille", vTaille.value);

        const utms = getUTMParams();
        Object.entries(utms).forEach(([k, v]) => formData.append(k, v));

        try {
            // Use keepalive: true so the request completes even after navigation
            fetch(GOOGLE_SHEETS_WEBAPP_URL, { method: "POST", body: formData, mode: "no-cors", keepalive: true });

            firePixel('Purchase', {
                value: (state.price * state.quantity) + state.deliveryFee,
                currency: p.currency === 'DA' ? 'DZD' : p.currency,
                content_name: p.title,
                content_ids: [p.code || window.location.pathname],
                content_type: 'product',
                num_items: state.quantity
            });
            sessionStorage.setItem('last_order', JSON.stringify({
                customer_name: document.getElementById('nom').value,
                product_name: p.title,
                quantity: state.quantity,
                total: (state.price * state.quantity) + state.deliveryFee,
                currency: p.currency
            }));

            // Redirect after a tiny delay to ensure everything is processed
            setTimeout(() => {
                window.location.pathname = '/merci';
            }, 200);
        } catch (err) {
            btn.innerHTML = '❌ فشل، حاول مرة أخرى';
            btn.style.background = '#c81e1e';
            btn.disabled = false;
        }
    };

    // --- ABANDONED CHECKOUT ---
    const logAbandoned = () => {
        if (state.isSubmitting) return;
        const form = document.getElementById('orderForm');
        if (!form) return;

        const requireds = Array.from(form.querySelectorAll('[required]'));
        const allValid = requireds.every(el => {
            if (el.type === 'checkbox') return el.checked;
            const val = el.value ? el.value.trim() : '';
            if (el.id === 'tel') return val.replace(/\D/g, '').length >= 8;
            return val.length >= 2;
        });

        if (allValid) {
            const tel = document.getElementById('tel').value;
            const nom = document.getElementById('nom').value;
            const methodVal = document.getElementById('delivery_method') ? document.getElementById('delivery_method').value : '';
            const methodSuffix = methodVal.includes('مكتب') ? ' (bureau)' : ' (domicile)';
            const baladiya = document.getElementById('baladiya').value + methodSuffix;
            const wilaya = document.getElementById('wilaya').value;

            const currentStr = tel + nom + baladiya + wilaya;
            if (currentStr === state.lastAbandonedStr) return;
            state.lastAbandonedStr = currentStr;

            const formData = new FormData();
            formData.append("nom", nom);
            formData.append("telephone", tel);
            formData.append("wilaya", wilaya);
            formData.append("baladiya", baladiya);
            formData.append("pays", wilaya);
            formData.append("adresse", baladiya);
            formData.append("livraison", document.getElementById('delivery_method') ? document.getElementById('delivery_method').value : 'توصيل للمنزل');
            formData.append("produit", p.title);
            formData.append("prix", (state.price * state.quantity + state.deliveryFee) + " " + p.currency);
            formData.append("frais_livraison", state.deliveryFee + " " + p.currency);
            formData.append("quantity", state.quantity);
            formData.append("status", "ABANDONED");
            formData.append("code", p.code || "");
            formData.append("order_id", state.cartSessionId);
            fetch(GOOGLE_SHEETS_WEBAPP_URL, { method: "POST", body: formData, mode: "no-cors" });
        }
    };

    const formEl = document.getElementById('orderForm');
    if (formEl) {
        formEl.querySelectorAll('input, select').forEach(el => {
            el.onblur = logAbandoned;
            el.onchange = logAbandoned;
            if (el.id === 'tel') {
                el.oninput = () => {
                    // Force only numbers, spaces and +
                    el.value = el.value.replace(/[^0-9+\s]/g, '');
                    if (el.value.replace(/\D/g, '').length >= 8) {
                        el.parentElement.classList.remove('error');
                    }
                };
            }
        });
    }

    // --- EXIT INTENT ---
    let remiseShown = false;
    const remiseConfig = (p.remisePopup || "no, 5").split(',').map(s => s.trim());
    const remiseEnabled = remiseConfig[0] === 'yes';
    const remisePercent = parseInt(remiseConfig[1]) || 5;

    const showRemise = () => {
        if (!remiseShown && remiseEnabled) {
            const modal = document.getElementById('modal-remise');
            if (modal) {
                modal.querySelector('.remise-discount').innerText = remisePercent + '% OFF';
                modal.classList.add('open');
                remiseShown = true;
            }
        }
    };
    document.addEventListener('mouseleave', (e) => { if (e.clientY < 50) showRemise(); });
    document.getElementById('btn-apply-remise').onclick = () => {
        state.price = Math.round(state.price * (1 - remisePercent / 100));
        updateOrderSummary();
        document.getElementById('d-price').innerText = fmtPrice(state.price) + ' ' + p.currency;
        document.getElementById('modal-remise').classList.remove('open');
        document.getElementById('orderFormBlock').scrollIntoView({ behavior: 'smooth' });
    };

    // --- STICKY ACTIONS TRACKING ---
    const stickyOrder = document.querySelector('.sticky-order');
    if (stickyOrder) {
        stickyOrder.onclick = () => {
            firePixel('AddToCart', {
                content_name: p.title,
                content_ids: [p.id],
                content_type: 'product',
                value: p.price,
                currency: p.currency === 'DA' ? 'DZD' : p.currency
            });
        };
    }

    const stickyWa = document.querySelector('.sticky-wa');
    if (stickyWa) {
        stickyWa.onclick = () => {
            firePixel('Contact', {
                content_name: 'WhatsApp Support',
                content_category: 'Customer Service'
            });
        };
    }
};

// --- INIT ---
window.addEventListener('popstate', router);
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme-mode') === 'dark') document.body.classList.add('mode-nuit');

    // Global link interceptor for SPA navigation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href.startsWith(window.location.origin) && !link.target) {
            // Internal anchor links handler
            if (link.hash && link.pathname === window.location.pathname) {
                const targetId = link.hash.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, null, link.hash);
                    return;
                }
            }

            e.preventDefault();
            navigate(link.pathname);
        }
    });

    router();
});
