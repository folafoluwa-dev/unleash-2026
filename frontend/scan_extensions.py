import re
from pathlib import Path
root = Path('src')
pat = re.compile(r'import\s+(?:[^;]+?)\s+from\s+["\'](\.{1,2}/[^"\']+)["\']')
exts = ('.js','.jsx','.ts','.tsx','.css','.json','.svg','.jpeg','.jpg','.png','.gif','.webp')
for file in sorted(root.rglob('*.[jJ][sSxX]?')):
    text = file.read_text(encoding='utf-8')
    for idx, line in enumerate(text.splitlines(),1):
        m = pat.search(line)
        if m:
            path = m.group(1)
            if not path.endswith(exts):
                target = file.parent / path
                ext = None
                for candidate in ['.jsx','.js','.tsx','.ts']:
                    if (target.with_suffix(candidate)).exists():
                        ext = candidate
                        break
                if ext is None:
                    for candidate in ['index.jsx','index.js','index.tsx','index.ts']:
                        if (target / candidate).exists():
                            ext = '/' + candidate
                            break
                print(f'{file}:{idx}:{path}:{ext}:{line.strip()}')
