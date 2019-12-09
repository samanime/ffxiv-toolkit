const updateMeta = meta => {
  Object.entries(meta).forEach(([key, value]) => {
    if (key === 'title') {
      document.querySelector('title').innerText = value;
    } else {
      const meta = document.querySelector(`meta[name=${key}]`) || document.createElement('meta');

      meta.charset = 'UTF-8';
      meta.name = key;
      meta.content = value;

      !meta.parentNode && document.head.appendChild(meta);
    }
  });
};

export default updateMeta;