document.addEventListener('DOMContentLoaded', async function() {
  const loading = document.getElementById('__bundler_loading');
  function setStatus(msg) { if (loading) loading.textContent = msg; }

  const FONT_MIME = /^(font[/]|application[/](x-)?font-|application[/]vnd\.ms-fontobject)/i;
  const MIME_TOKEN = /^[\w.+-]+[/][\w.+-]+$/;
  function toBase64(bytes) {
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(bin);
  }

  // Error sink persists across replaceWith since it's on window, not the DOM.
  window.addEventListener('error', function(e) {
    // Failed resource loads (CSP-blocked links, scripts, images) fire plain
    // events at the element — warn only; real JS errors carry message/error.
    if (!e.message && !e.error && e.target && e.target !== window) {
      console.warn('[bundle] resource failed to load:',
        e.target.tagName, String(e.target.src || e.target.href || ''));
      return;
    }
    var p = document.body || document.documentElement;
    var d = document.getElementById('__bundler_err') || p.appendChild(document.createElement('div'));
    d.id = '__bundler_err';
    d.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;font:12px/1.4 ui-monospace,monospace;background:#2a1215;color:#ff8a80;padding:10px 14px;border-radius:8px;border:1px solid #5c2b2e;z-index:99999;white-space:pre-wrap;max-height:40vh;overflow:auto';
    d.textContent = (d.textContent ? d.textContent + String.fromCharCode(10) : '') +
      '[bundle] ' + (e.message || e.type) +
      (e.filename ? ' (' + e.filename.slice(0, 60) + ':' + e.lineno + ')' : '');
  }, true);

  try {
    const manifest = window.__bundlerManifest;
    let template = window.__bundlerTemplate;
    if (!manifest || !template) {
      setStatus('Error: missing bundle data');
      console.error('[bundler] Missing external bundle data');
      return;
    }
    template = template
      .replace('Violations IQ — Closed Beta · Sliceo', 'CINC Violation Catalog Automation | Violations IQ')
      .replace('Violation catalogs, without the paper stack.', 'Turn HOA governing documents into a CINC-ready violation catalog.')
      .replace("Reading governing documents shouldn't be a data-entry job.", "Reading HOA governing documents shouldn't be a data-entry job.")
      .replace('From documents to CINC in five steps.', 'From governing documents to CINC in five steps.')
      .replace('Help shape the future of violation management.', 'Help shape the future of HOA violation management.')
      .replace(/\u2014/g, '-')
      .replace(/\u2013/g, '-');

    const answerSection = `
<section id="faq" data-screen-label="Product answers" aria-labelledby="product-answers-title" style="background:#F6F8FC;padding:96px 24px;border-top:1px solid #D3D6E0;border-bottom:1px solid #D3D6E0">
  <div style="max-width:1120px;margin:0 auto">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr));gap:48px 72px;align-items:start">
      <div data-reveal="">
        <h2 id="product-answers-title" style="margin:0;max-width:520px;font-size:clamp(30px,4vw,46px);line-height:1.12;font-weight:800;letter-spacing:-0.02em;color:#0A1333;text-wrap:balance">Violations IQ, at a glance</h2>
        <p style="margin:18px 0 0;max-width:590px;font-size:17px;line-height:1.7;color:#40424D;text-wrap:pretty">Violations IQ is HOA violation catalog automation for community association management teams that use CINC. It turns CC&amp;Rs, bylaws, and fine schedules into a standardized catalog with source evidence, human review, and approval before delivery to CINC.</p>
        <p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#6E7180">Product information updated August 12, 2026. Published by Sliceo.</p>
      </div>
      <dl data-reveal="" style="margin:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));background:#FFFFFF;border:1px solid #D3D6E0;border-radius:12px;overflow:hidden">
        <div style="padding:22px;border-right:1px solid #D3D6E0;border-bottom:1px solid #D3D6E0"><dt style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1F8FDC">Product type</dt><dd style="margin:8px 0 0;font-size:15px;line-height:1.55;font-weight:700;color:#0A1333">HOA violation catalog automation</dd></div>
        <div style="padding:22px;border-bottom:1px solid #D3D6E0"><dt style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1F8FDC">Designed for</dt><dd style="margin:8px 0 0;font-size:15px;line-height:1.55;font-weight:700;color:#0A1333">CAM teams using CINC</dd></div>
        <div style="padding:22px;border-right:1px solid #D3D6E0"><dt style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1F8FDC">Inputs</dt><dd style="margin:8px 0 0;font-size:15px;line-height:1.55;font-weight:700;color:#0A1333">CC&amp;Rs, bylaws, and fine schedules</dd></div>
        <div style="padding:22px"><dt style="font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#1F8FDC">Output</dt><dd style="margin:8px 0 0;font-size:15px;line-height:1.55;font-weight:700;color:#0A1333">A reviewed catalog prepared for CINC</dd></div>
      </dl>
    </div>
    <div data-reveal="" style="margin-top:64px">
      <h3 style="margin:0;font-size:25px;line-height:1.2;font-weight:800;color:#0A1333">Common questions</h3>
      <dl style="margin:24px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:0 48px;border-top:1px solid #D3D6E0">
        <div style="padding:24px 0;border-bottom:1px solid #D3D6E0"><dt style="font-size:16px;font-weight:800;color:#0A1333">What does Violations IQ do?</dt><dd style="margin:8px 0 0;font-size:14.5px;line-height:1.65;color:#40424D">Violations IQ turns CC&amp;Rs, bylaws, and fine schedules into a standardized HOA violation catalog with source evidence, human review, and approval before delivery to CINC.</dd></div>
        <div style="padding:24px 0;border-bottom:1px solid #D3D6E0"><dt style="font-size:16px;font-weight:800;color:#0A1333">Which documents can Violations IQ process?</dt><dd style="margin:8px 0 0;font-size:14.5px;line-height:1.65;color:#40424D">Violations IQ is designed to process HOA CC&amp;Rs, bylaws, and fine schedules used to define violations and enforcement requirements.</dd></div>
        <div style="padding:24px 0;border-bottom:1px solid #D3D6E0"><dt style="font-size:16px;font-weight:800;color:#0A1333">Does AI make the final decisions?</dt><dd style="margin:8px 0 0;font-size:14.5px;line-height:1.65;color:#40424D">No. AI assists with extracting and organizing information, while a human reviews source evidence, fine schedules, and catalog details before approval.</dd></div>
        <div style="padding:24px 0;border-bottom:1px solid #D3D6E0"><dt style="font-size:16px;font-weight:800;color:#0A1333">How does Violations IQ work with CINC?</dt><dd style="margin:8px 0 0;font-size:14.5px;line-height:1.65;color:#40424D">After review and approval, Violations IQ prepares standardized violation catalog entries for delivery to CINC.</dd></div>
        <div style="padding:24px 0;border-bottom:1px solid #D3D6E0"><dt style="font-size:16px;font-weight:800;color:#0A1333">Who is Violations IQ for?</dt><dd style="margin:8px 0 0;font-size:14.5px;line-height:1.65;color:#40424D">Violations IQ is built for community association management teams that use CINC and need a more consistent way to create violation catalogs from governing documents.</dd></div>
        <div style="padding:24px 0;border-bottom:1px solid #D3D6E0"><dt style="font-size:16px;font-weight:800;color:#0A1333">How can I request access?</dt><dd style="margin:8px 0 0;font-size:14.5px;line-height:1.65;color:#40424D">Violations IQ is currently in closed beta. CINC users can request a free trial through the application form on this page.</dd></div>
      </dl>
    </div>
  </div>
</section>`;
    const betaSection = '<section id="beta" data-screen-label="Beta program"';
    if (template.includes(betaSection)) template = template.replace(betaSection, answerSection + betaSection);

    const uuids = Object.keys(manifest);
    setStatus('Unpacking ' + uuids.length + ' assets...');

    const blobUrls = {};
    const resourceBlobs = {};
    await Promise.all(uuids.map(async (uuid) => {
      const entry = manifest[uuid];
      try {
        const binaryStr = atob(entry.data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

        let finalBytes = bytes;
        if (entry.compressed) {
          if (typeof DecompressionStream !== 'undefined') {
            const ds = new DecompressionStream('gzip');
            const writer = ds.writable.getWriter();
            const reader = ds.readable.getReader();
            writer.write(bytes);
            writer.close();
            const chunks = [];
            let totalLen = 0;
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
              totalLen += value.length;
            }
            finalBytes = new Uint8Array(totalLen);
            let offset = 0;
            for (const chunk of chunks) { finalBytes.set(chunk, offset); offset += chunk.length; }
          } else {
            console.warn('DecompressionStream not available, asset ' + uuid + ' may not render');
          }
        }

        if (FONT_MIME.test(entry.mime) && MIME_TOKEN.test(entry.mime)) {
          // Strict artifact hosts allow font-src data: but not blob:.
          blobUrls[uuid] = 'data:' + entry.mime + ';base64,' +
            (entry.compressed ? toBase64(finalBytes) : entry.data);
        } else {
          const blob = new Blob([finalBytes], { type: entry.mime });
          blobUrls[uuid] = URL.createObjectURL(blob);
          resourceBlobs[blobUrls[uuid]] = blob;
        }
      } catch (err) {
        console.error('Failed to decode asset ' + uuid + ':', err);
        const blob = new Blob([], { type: entry.mime });
        blobUrls[uuid] = URL.createObjectURL(blob);
        resourceBlobs[blobUrls[uuid]] = blob;
      }
    }));

    const extResEl = document.querySelector('script[type="__bundler/ext_resources"]');
    const extResources = extResEl ? JSON.parse(extResEl.textContent) : [];
    const resourceMap = {};
    for (const entry of extResources) {
      if (blobUrls[entry.uuid]) resourceMap[entry.id] = blobUrls[entry.uuid];
    }

    // Artifact-host CSP (connect-src 'self') refuses fetch() of blob: URLs —
    // consumers read these Blobs directly. Survives the swap like the error sink.
    window.__resourceBlobs = resourceBlobs;

    setStatus('Rendering...');
    for (const uuid of uuids) template = template.split(uuid).join(blobUrls[uuid]);

    // Strip integrity + crossorigin — blob URLs from a file:// document inherit
    // a null origin, so crossorigin forces a CORS fetch that SRI then rejects.
    // The manifest bytes are ours; SRI protects against CDN compromise, not this.
    template = template.replace(/\s+integrity="[^"]*"/gi, '').replace(/\s+crossorigin="[^"]*"/gi, '');

    const resourceScript = '<script>window.__resources = ' +
      JSON.stringify(resourceMap).replace(/<\//g, '<\\/') +
      ';</' + 'script>';
    // Inject after <head> so the DOCTYPE stays first; prepending the script
    // would push the parser into quirks mode. DOMParser always emits a <head>
    // (synthesizing one if the source HTML omitted it) but may carry
    // attributes through, so match the full opening tag. slice() rather than
    // replace() keeps us clear of $-pattern substitution in resourceScript.
    const headOpen = template.match(/<head[^>]*>/i);
    if (headOpen) {
      const i = headOpen.index + headOpen[0].length;
      template = template.slice(0, i) + resourceScript + template.slice(i);
    }

    // Parse the template and swap the root element. Scripts inserted via
    // DOMParser/replaceWith are inert per spec — re-create each with
    // createElement so they execute, awaiting onload for src scripts to
    // preserve ordering (React before ReactDOM before Babel before text/babel).
    const doc = new DOMParser().parseFromString(template, 'text/html');
    doc.documentElement.lang = 'en';
    doc.title = 'CINC Violation Catalog Automation | Violations IQ';
    const seoMeta = [
      ['name', 'description', 'Convert HOA CC&Rs, bylaws, and fine schedules into an accurate, human-reviewed violation catalog prepared for CINC with Violations IQ.'],
      ['name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'],
      ['name', 'theme-color', '#0A1333'],
      ['property', 'og:type', 'website'],
      ['property', 'og:locale', 'en_US'],
      ['property', 'og:url', 'https://violationsiq-beta.sliceo.co/'],
      ['property', 'og:site_name', 'Violations IQ'],
      ['property', 'og:title', 'CINC Violation Catalog Automation | Violations IQ'],
      ['property', 'og:description', 'Convert HOA governing documents into an accurate, human-reviewed violation catalog prepared for CINC.'],
      ['property', 'og:image', 'https://violationsiq-beta.sliceo.co/og-image.png'],
      ['property', 'og:image:alt', 'Violations IQ converts HOA governing documents into CINC-ready violation catalogs.'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', 'CINC Violation Catalog Automation | Violations IQ'],
      ['name', 'twitter:description', 'Convert HOA governing documents into an accurate, human-reviewed violation catalog prepared for CINC.'],
      ['name', 'twitter:image', 'https://violationsiq-beta.sliceo.co/og-image.png']
    ];
    for (const [attr, key, content] of seoMeta) {
      let el = doc.head.querySelector('meta[' + attr + '="' + key + '"]');
      if (!el) { el = doc.createElement('meta'); el.setAttribute(attr, key); doc.head.appendChild(el); }
      el.setAttribute('content', content);
    }
    let canonical = doc.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = doc.createElement('link'); canonical.rel = 'canonical'; doc.head.appendChild(canonical); }
    canonical.href = 'https://violationsiq-beta.sliceo.co/';
    const structuredData = doc.createElement('script');
    structuredData.type = 'application/ld+json';
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://www.sliceo.co/#organization',
          name: 'Sliceo',
          url: 'https://www.sliceo.co/'
        },
        {
          '@type': 'Service',
          '@id': 'https://violationsiq-beta.sliceo.co/#service',
          name: 'Violations IQ',
          url: 'https://violationsiq-beta.sliceo.co/',
          serviceType: 'HOA violation catalog automation',
          description: 'AI-assisted, human-reviewed HOA violation catalog automation prepared for CINC.',
          provider: { '@id': 'https://www.sliceo.co/#organization' }
        },
        {
          '@type': 'WebPage',
          '@id': 'https://violationsiq-beta.sliceo.co/#webpage',
          url: 'https://violationsiq-beta.sliceo.co/',
          name: 'CINC Violation Catalog Automation | Violations IQ',
          description: 'Convert HOA governing documents into an accurate, human-reviewed violation catalog prepared for CINC.',
          dateModified: '2026-08-12',
          publisher: { '@id': 'https://www.sliceo.co/#organization' },
          mainEntity: { '@id': 'https://violationsiq-beta.sliceo.co/#service' }
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://violationsiq-beta.sliceo.co/#faq',
          mainEntity: [
            { '@type': 'Question', name: 'What does Violations IQ do?', acceptedAnswer: { '@type': 'Answer', text: 'Violations IQ turns CC&Rs, bylaws, and fine schedules into a standardized HOA violation catalog with source evidence, human review, and approval before delivery to CINC.' } },
            { '@type': 'Question', name: 'Which documents can Violations IQ process?', acceptedAnswer: { '@type': 'Answer', text: 'Violations IQ is designed to process HOA CC&Rs, bylaws, and fine schedules used to define violations and enforcement requirements.' } },
            { '@type': 'Question', name: 'Does AI make the final decisions?', acceptedAnswer: { '@type': 'Answer', text: 'No. AI assists with extracting and organizing information, while a human reviews source evidence, fine schedules, and catalog details before approval.' } },
            { '@type': 'Question', name: 'How does Violations IQ work with CINC?', acceptedAnswer: { '@type': 'Answer', text: 'After review and approval, Violations IQ prepares standardized violation catalog entries for delivery to CINC.' } },
            { '@type': 'Question', name: 'Who is Violations IQ for?', acceptedAnswer: { '@type': 'Answer', text: 'Violations IQ is built for community association management teams that use CINC and need a more consistent way to create violation catalogs from governing documents.' } },
            { '@type': 'Question', name: 'How can I request access?', acceptedAnswer: { '@type': 'Answer', text: 'Violations IQ is currently in closed beta. CINC users can request a free trial through the application form on this page.' } }
          ]
        }
      ]
    });
    doc.head.appendChild(structuredData);
    document.documentElement.replaceWith(doc.documentElement);
    const dead = Array.from(document.scripts);
    for (const old of dead) {
      const s = document.createElement('script');
      for (const a of old.attributes) s.setAttribute(a.name, a.value);
      s.textContent = old.textContent;
      // text/babel scripts with a src: read and inline. transformScriptTags
      // does XHR against the src, but blob:null/ from a file:// origin is
      // silently dropped. Inlining makes it a plain inline babel script,
      // which transformScriptTags handles unconditionally.
      if ((s.type === 'text/babel' || s.type === 'text/jsx') && s.src) {
        const pre = resourceBlobs[s.src.split('#')[0]];
        s.textContent = pre ? await pre.text() : await (await fetch(s.src)).text();
        s.removeAttribute('src');
      }
      const p = s.src ? new Promise(function(r) { s.onload = s.onerror = r; }) : null;
      old.replaceWith(s);
      if (p) await p;
    }
    // Babel standalone auto-transforms type=text/babel on DOMContentLoaded,
    // which fired before we swapped the document. Trigger manually if present.
    if (window.Babel && typeof window.Babel.transformScriptTags === 'function') {
      window.Babel.transformScriptTags();
    }
  } catch (err) {
    setStatus('Error unpacking: ' + err.message);
    console.error('Bundle unpack error:', err);
  }
});
